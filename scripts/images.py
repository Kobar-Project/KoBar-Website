"""Generate the website's image assets from the KoBar source folders.

Run from the repo root:  python -I scripts/images.py

Outputs (all overwritten on every run, same inputs give the same bytes):
  public/img/ui/<base>-<width>.avif|.webp   dark UI screenshots, responsive
  public/img/trailer-poster-<width>.avif|.webp
  public/Assets/Screenshots/{screen,AI-hub,Color}.png   legacy 1280x720 PNGs
  src/data/images.json                      responsive image manifest
"""

import json
import os
from pathlib import Path

from PIL import Image

SOURCE_ROOT = Path("D:/Work/Code/KoBar v2")
UI_SRC_DIR = SOURCE_ROOT / "KoBar/remaster/store/screenshots/ui/dark"
FRAMES_DIR = SOURCE_ROOT / "KoBar/remaster/store/screenshots/frames"
TRAILER_SRC = SOURCE_ROOT / "KoBar-Logo/store/trailer-thumb-1920x1080.png"

REPO_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = REPO_ROOT / "public"
IMG_DIR = PUBLIC_DIR / "img"
UI_OUT_DIR = IMG_DIR / "ui"
LEGACY_OUT_DIR = PUBLIC_DIR / "Assets" / "Screenshots"
MANIFEST_PATH = REPO_ROOT / "src" / "data" / "images.json"

RESAMPLE = Image.Resampling.LANCZOS
AVIF_OPTS = {"quality": 60, "speed": 4}
WEBP_OPTS = {"quality": 82, "method": 6}

TRAILER_WIDTHS = [640, 960, 1280, 1920]
LEGACY_SIZE = (1280, 720)
LEGACY_PAIRS = [
    ("01-your-tools.png", "screen.png"),
    ("09-ai-hub.png", "AI-hub.png"),
    ("07-screenshot-color.png", "Color.png"),
]
SUFFIX_2X = "@2x.png"


def ui_widths(src_width):
    """Sorted unique [W//2, W], plus 480 when W//2 > 600."""
    widths = {src_width // 2, src_width}
    if src_width // 2 > 600:
        widths.add(480)
    return sorted(widths)


def scaled(img, width):
    """Return img resized to the given width, keeping aspect ratio."""
    if width == img.width:
        return img.copy()
    height = round(img.height * width / img.width)
    return img.resize((width, height), RESAMPLE)


def write_variants(img, widths, out_prefix):
    """Write AVIF and WebP for every width.

    Returns (heights by width, per-width (avif_bytes, webp_bytes)).
    """
    heights = {}
    sizes = {}
    for width in widths:
        variant = scaled(img, width)
        heights[width] = variant.height
        avif_path = Path(f"{out_prefix}-{width}.avif")
        webp_path = Path(f"{out_prefix}-{width}.webp")
        variant.save(avif_path, "AVIF", **AVIF_OPTS)
        variant.save(webp_path, "WEBP", **WEBP_OPTS)
        sizes[width] = (os.path.getsize(avif_path), os.path.getsize(webp_path))
    return heights, sizes


def process_ui(manifest, rows):
    UI_OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src in sorted(UI_SRC_DIR.glob("*.png")):
        if not src.name.endswith(SUFFIX_2X):
            raise ValueError(f"unexpected UI file name: {src.name}")
        base = src.name[: -len(SUFFIX_2X)]
        key = f"ui/{base}"
        with Image.open(src) as im:
            im.load()
            src_width, src_height = im.size
            has_alpha = "A" in im.getbands()
            widths = ui_widths(src_width)
            heights, sizes = write_variants(im, widths, UI_OUT_DIR / base)
        largest = max(widths)
        manifest[key] = {
            "width": largest,
            "height": heights[largest],
            "widths": widths,
            "alpha": has_alpha,
        }
        rows.append((key, widths, sizes))


def process_trailer(manifest, rows):
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    with Image.open(TRAILER_SRC) as im:
        im.load()
        src_width, src_height = im.size
        has_alpha = "A" in im.getbands()
        widths = sorted(TRAILER_WIDTHS)
        heights, sizes = write_variants(im, widths, IMG_DIR / "trailer-poster")
    largest = max(widths)
    manifest["trailer-poster"] = {
        "width": largest,
        "height": heights[largest],
        "widths": widths,
        "alpha": has_alpha,
    }
    rows.append(("trailer-poster", widths, sizes))


def process_legacy():
    LEGACY_OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src_name, dst_name in LEGACY_PAIRS:
        with Image.open(FRAMES_DIR / src_name) as im:
            out = im.resize(LEGACY_SIZE, RESAMPLE)
        out.save(LEGACY_OUT_DIR / dst_name, "PNG", optimize=True)


def write_manifest(manifest):
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    text = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    with open(MANIFEST_PATH, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)


def print_table(rows):
    header = f"{'key':<30} {'widths':<26} {'AVIF bytes':>12} {'WebP bytes':>12}"
    print(header)
    print("-" * len(header))
    total_avif = 0
    total_webp = 0
    for key, widths, sizes in rows:
        avif_sum = sum(sizes[w][0] for w in widths)
        webp_sum = sum(sizes[w][1] for w in widths)
        total_avif += avif_sum
        total_webp += webp_sum
        width_text = ",".join(str(w) for w in widths)
        print(f"{key:<30} {width_text:<26} {avif_sum:>12,} {webp_sum:>12,}")
        for w in widths:
            avif_b, webp_b = sizes[w]
            if avif_b > webp_b:
                print(f"  note: AVIF larger than WebP at width {w}: {avif_b:,} > {webp_b:,}")
    print("-" * len(header))
    print(f"{'GRAND TOTAL':<30} {'':<26} {total_avif:>12,} {total_webp:>12,}")


def main():
    manifest = {}
    rows = []
    process_ui(manifest, rows)
    process_trailer(manifest, rows)
    process_legacy()
    write_manifest(manifest)
    print_table(rows)


if __name__ == "__main__":
    main()

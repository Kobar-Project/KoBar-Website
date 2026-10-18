import { useEffect, useId, useRef } from 'react';

// The KoBar head, adapted from KoBar-Logo/animation/KoBarHead.tsx (same geometry and motion limits).
// The eyes follow the cursor in two stages: the head drifts and tilts a little (slow ease), the eyes move inside it
// (fast ease). They are cut out of the head with a mask, so they are real holes on any background.
//
// Website rules on top of the original: nothing runs unless the head is on screen, the tab is visible, the pointer
// can hover and the visitor has not asked for reduced motion. requestAnimationFrame only runs while the head is still
// easing; once it settles, and whenever the head is idle, no frame or timer is scheduled.

const HEAD_PATH =
  'M82 58C82 72.91 67.67 85 50 85C32.33 85 18 72.91 18 58C18 52.84 19.72 48.02 22.69 43.92L24.4 23.97Q24.7 20.49 26.31 19.71Q27.91 18.94 30.82 20.88L43.18 29.12Q44.78 30.19 45.51 31.26C46.97 31.09 48.47 31 50 31C51.53 31 53.03 31.09 54.49 31.26Q55.22 30.19 56.82 29.12L69.18 20.88Q72.09 18.94 73.69 19.71Q75.3 20.49 75.6 23.97L77.31 43.92C80.28 48.02 82 52.84 82 58Z';
const EYES = [
  { x: 36.5, y: 50, width: 8, height: 16 },
  { x: 55.5, y: 50, width: 8, height: 16 },
] as const;
const HEAD_PIVOT = { x: 50, y: 58 } as const;
const MOTION = { headShift: 2, headTilt: 6, eyeShiftX: 5, eyeShiftY: 4, headEase: 0.09, eyeEase: 0.24 } as const;

type Props = {
  className?: string;
  color?: string;
  /** Eyes follow the cursor. */
  track?: boolean;
  /** Cursor distance (px) at which the look reaches its limit. */
  reach?: number;
  /** Blink every few seconds while visible, and once when tapped. */
  blink?: boolean;
  /** Accessible name; without it the head is decorative. */
  label?: string;
};

export default function KoBarHead({ className, color = 'currentColor', track = false, reach = 150, blink = false, label }: Props) {
  const maskId = 'kobar-head-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const eyeRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const head = headRef.current;
    const eyes = eyesRef.current;
    if (!svg || !head || !eyes || (!track && !blink)) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Follow
    const target = { x: 0, y: 0 };
    const h = { x: 0, y: 0 };
    const e = { x: 0, y: 0 };
    let raf = 0;

    const apply = () => {
      const tx = (h.x * MOTION.headShift).toFixed(2);
      const ty = (h.y * MOTION.headShift * 0.75).toFixed(2);
      const rot = (h.x * MOTION.headTilt).toFixed(2);
      head.setAttribute('transform', `translate(${tx} ${ty}) rotate(${rot} ${HEAD_PIVOT.x} ${HEAD_PIVOT.y})`);
      eyes.setAttribute('transform', `translate(${(e.x * MOTION.eyeShiftX).toFixed(2)} ${(e.y * MOTION.eyeShiftY).toFixed(2)})`);
    };
    const tick = () => {
      h.x += (target.x - h.x) * MOTION.headEase;
      h.y += (target.y - h.y) * MOTION.headEase;
      e.x += (target.x - e.x) * MOTION.eyeEase;
      e.y += (target.y - e.y) * MOTION.eyeEase;
      apply();
      const settled =
        Math.abs(target.x - h.x) + Math.abs(target.y - h.y) < 0.002 && Math.abs(target.x - e.x) + Math.abs(target.y - e.y) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (ev: MouseEvent) => {
      const r = svg.getBoundingClientRect();
      const dx = ev.clientX - (r.left + r.width / 2);
      const dy = ev.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const pull = Math.min(dist / reach, 1);
      target.x = dist < 1 ? 0 : (dx / dist) * pull;
      target.y = dist < 1 ? 0 : (dy / dist) * pull;
      kick();
    };
    const recenter = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    const onOut = (ev: MouseEvent) => {
      if (!ev.relatedTarget) recenter();
    };

    // Blink
    let blinkTimer = 0;
    let reopenTimer = 0;
    const setOpen = (open: boolean) => {
      eyeRefs.current.forEach((rect, i) => {
        if (!rect) return;
        const eye = EYES[i];
        const height = open ? eye.height : 2;
        rect.setAttribute('height', String(height));
        rect.setAttribute('y', String(eye.y + (eye.height - height) / 2));
        rect.setAttribute('rx', String(Math.min(eye.width, height) / 2));
      });
    };
    const blinkOnce = (then?: () => void) => {
      window.clearTimeout(reopenTimer);
      setOpen(false);
      reopenTimer = window.setTimeout(() => {
        setOpen(true);
        then?.();
      }, 120);
    };
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => blinkOnce(scheduleBlink), 3500 + Math.random() * 3500);
    };
    const stopBlink = () => {
      window.clearTimeout(blinkTimer);
      window.clearTimeout(reopenTimer);
      blinkTimer = 0;
      reopenTimer = 0;
      setOpen(true);
    };
    const onTap = () => {
      if (!reduce.matches) blinkOnce();
    };

    // Run only while it can be seen
    let visible = false;
    let following = false;
    const sync = () => {
      const active = visible && document.visibilityState === 'visible' && !reduce.matches;
      const follow = active && track && finePointer.matches;
      if (follow && !following) {
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseout', onOut);
        following = true;
      } else if (!follow && following) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseout', onOut);
        following = false;
        recenter();
      }
      if (active && blink && !blinkTimer) scheduleBlink();
      else if (!active && blinkTimer) stopBlink();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(svg);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    finePointer.addEventListener('change', sync);
    if (blink) svg.addEventListener('pointerdown', onTap);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
      finePointer.removeEventListener('change', sync);
      svg.removeEventListener('pointerdown', onTap);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
      stopBlink();
    };
  }, [track, blink, reach]);

  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const, focusable: 'false' as const };

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" className={className} style={{ overflow: 'visible' }} {...a11y}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
          <rect x="-20" y="-20" width="140" height="140" fill="#fff" />
          <g ref={eyesRef}>
            {EYES.map((eye, i) => (
              <rect
                key={i}
                ref={(el) => {
                  eyeRefs.current[i] = el;
                }}
                x={eye.x}
                y={eye.y}
                width={eye.width}
                height={eye.height}
                rx={eye.width / 2}
                fill="#000"
              />
            ))}
          </g>
        </mask>
      </defs>
      <g ref={headRef}>
        <path d={HEAD_PATH} fill={color} mask={`url(#${maskId})`} />
      </g>
    </svg>
  );
}

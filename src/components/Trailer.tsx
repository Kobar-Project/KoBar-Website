import { useState } from 'react';
import { links } from '../site';
import { Icon } from './Icon';
import Picture from './Picture';

/** The YouTube trailer behind a local poster: nothing is requested from YouTube until the visitor presses play. */
export default function Trailer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-line">
      {playing ? (
        <iframe
          src={links.trailerEmbed}
          title="KoBar trailer"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 block size-full cursor-pointer focus-visible:outline-offset-[-4px]"
        >
          <Picture
            image="trailer-poster"
            alt=""
            retina={false}
            sizes="(min-width: 70rem) 70rem, 100vw"
            className="size-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-18 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_10px_40px_-8px_rgb(0_0_0/0.8)] transition-transform duration-200 group-hover:scale-105 sm:size-20">
              <Icon name="play_arrow" className="ml-1 size-9 sm:size-10" />
            </span>
          </span>
          <span className="sr-only">Play the KoBar trailer. The video loads from YouTube.</span>
        </button>
      )}
    </div>
  );
}

import { BrandIcon, MicrosoftLogo } from '../../components/Icon';
import LatestVersion from '../../components/LatestVersion';
import Picture from '../../components/Picture';
import { ButtonLink, Eyebrow } from '../../components/ui';
import { heroImage, links } from '../../site';

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="glow relative overflow-hidden">
      {/* On wide screens the text sits in the page column and the screenshot runs to the right edge of the window,
          so KoBar's bar is docked where it would be on a real desktop. */}
      <div className="grid items-center gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(1.5rem,1fr)_minmax(0,31rem)_3rem_minmax(0,33rem)_minmax(1.5rem,1fr)] lg:gap-0 lg:pt-24 lg:pb-28">
        <div className="px-4 sm:px-6 lg:col-start-2 lg:px-0">
          <Eyebrow>Free for Windows 10 and 11</Eyebrow>
          <h1 id="hero-title" className="mt-4 text-[2.625rem] sm:text-6xl lg:text-[4rem]">
            Your tools, one&nbsp;click away.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg sm:text-xl">
            KoBar docks to the edge of your screen and stays on top of your windows. Notes are built in. Everything else
            is a plugin you choose.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={links.storeWeb}>
              <MicrosoftLogo />
              Get it from Microsoft Store
            </ButtonLink>
            <ButtonLink href={links.releasesLatest} variant="secondary">
              <BrandIcon name="github" className="size-[18px]" />
              Download from GitHub
            </ButtonLink>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 text-sm text-muted">
            <span>Free and open source</span>
            <span aria-hidden="true">·</span>
            <span>No account needed</span>
          </p>
          {/* Own line with reserved height: the version arrives after load and must not move anything. */}
          <LatestVersion className="mt-1 block min-h-6 text-sm text-muted" />
        </div>

        <div className="pl-4 sm:pl-6 lg:col-span-2 lg:col-start-4 lg:pl-0">
          <div className="relative overflow-hidden rounded-l-2xl border-y border-l border-line bg-[#131316]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_100%,rgb(22_45_92/0.75),transparent_75%)]"
            />
            <div className="relative flex justify-end pt-8 pb-6 pl-5 sm:pt-12 sm:pb-10 sm:pl-10">
              <Picture
                image={heroImage.key}
                sizes={heroImage.sizes}
                priority
                alt="KoBar's note panel open next to the vertical bar, which is docked to the right edge of the screen."
                className="h-auto w-full max-w-[58rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

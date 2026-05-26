import { useState } from 'react';
import { Sparkles, Store, Github, Star, Heart, Play } from 'lucide-react';
import { Reveal } from './Reveal';

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="max-w-5xl mx-auto text-center mb-16 md:mb-32 flex flex-col items-center">
      <Reveal className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
        <Sparkles size={16} />
        <span className="text-sm font-bold tracking-wide">Meet Your Creative Companion</span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="text-3xl md:text-5xl lg:text-[44px] leading-tight font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary tracking-tight">
          Work with Flow. The sidebar that adapts to you.
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="text-lg md:text-2xl font-bold text-on-surface-variant mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Your modular, always-on-top desktop utility sidebar.
          <br className="hidden md:block" />
          A multi-threaded creative assistant that lives on the edge of your screen.
        </h2>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto mb-8 md:mb-12 opacity-80 leading-relaxed font-medium">
          KoBar is a transparent, multi-functional workspace assistant that docks seamlessly to the edge of your screen. It keeps your essential tools like a multi-slot Clipboard Manager, AI Hub, Note, and Screenshot tool just a click away.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mb-12 md:mb-20 w-full max-w-xl mx-auto flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
          <a className="btn-shimmer flex-1 bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-3xl font-mono text-xs md:text-[11px] uppercase font-bold hover:shadow-xl hover:shadow-primary/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3" href="https://apps.microsoft.com/store/detail/9P2KPFF3G9L9?cid=DevShareMCLPCS" target="_blank" rel="noreferrer">
            <Store size={20} />
            Get it from Microsoft Store
          </a>
          <a className="btn-shimmer flex-1 glass-panel px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-3xl font-mono text-xs md:text-[11px] uppercase text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 md:gap-3 border-2 font-bold" href="https://github.com/Kobar-Project/KoBar" target="_blank" rel="noreferrer">
            <Github size={20} />
            GitHub for Win/Mac
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
          <a className="btn-shimmer flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary transition-all text-sm font-bold" href="https://patreon.com/kobarproject" target="_blank" rel="noreferrer">
            <Star size={16} fill="currentColor" />
            Support on Patreon
          </a>
          <a className="btn-shimmer flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary transition-all text-sm font-bold" href="https://kobar.lemonsqueezy.com/checkout/buy/1af57754-ce9f-4d8d-8225-2eb46b46c9e9" target="_blank" rel="noreferrer">
            <Heart size={16} fill="currentColor" />
            Support via Lemon Squeezy
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.3} className="w-full max-w-4xl mx-auto rounded-2xl md:rounded-[3rem] overflow-hidden p-1.5 md:p-2 bg-gradient-to-br from-primary/40 via-secondary/20 to-surface-container-high shadow-2xl shadow-primary/20 glow-effect">
        <div className="relative pt-[56.25%] rounded-xl md:rounded-[2.5rem] overflow-hidden bg-surface-container border border-white/5">
          {!isVideoPlaying ? (
            <div
              className="absolute inset-0 w-full h-full cursor-pointer group"
              onClick={() => setIsVideoPlaying(true)}
            >
              <img
                src="/Assets/Screenshots/screen.png"
                alt="KoBar Overview Thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/30">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Play size={32} className="ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-[2.5rem]"
              frameBorder="0"
              src="https://www.youtube.com/embed/vxoaziWOpsU?autoplay=1"
              title="KoBar Overview">
            </iframe>
          )}
        </div>
      </Reveal>
    </section>
  );
}

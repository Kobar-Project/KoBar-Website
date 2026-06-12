import { useState } from 'react';
import { Store, Github, Star, Heart, Play } from 'lucide-react';
import { Reveal } from './Reveal';

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="w-full max-w-7xl mx-auto mb-24 md:mb-40 pt-10 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="hero">
      {/* Left Content */}
      <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-high/40 border border-white/5 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-on-surface-variant uppercase">Desktop Utility Sidebar</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-6xl lg:text-[68px] leading-[1.05] font-bold mb-6 tracking-tight text-on-surface">
            Work with <span className="text-primary italic pr-2">Flow.</span><br />
            The sidebar that adapts to you.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed font-medium">
            KoBar is a modular, always-on-top workspace assistant that docks seamlessly to the edge of your screen. 
            Keep your multi-slot Clipboard, AI Hub, and Screenshot tools just a click away.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="w-full flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-max">
            <a 
              className="btn-premium bg-primary text-on-primary px-8 py-4 rounded-xl font-mono text-[13px] uppercase font-bold flex items-center justify-center gap-3 w-full sm:w-auto shadow-lg shadow-primary/20" 
              href="https://apps.microsoft.com/store/detail/9P2KPFF3G9L9?cid=DevShareMCLPCS" 
              target="_blank" 
              rel="noreferrer"
            >
              <Store size={18} />
              Get for Windows
            </a>
            <a 
              className="btn-premium bg-surface-container hover:bg-surface-container-high border border-white/5 text-on-surface px-8 py-4 rounded-xl font-mono text-[13px] uppercase font-bold flex items-center justify-center gap-3 w-full sm:w-auto transition-colors" 
              href="https://github.com/Kobar-Project/KoBar" 
              target="_blank" 
              rel="noreferrer"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center mt-2 pl-2">
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group" href="https://patreon.com/kobarproject" target="_blank" rel="noreferrer">
              <Star size={14} className="group-hover:fill-current transition-colors" /> Patreon
            </a>
            <span className="text-surface-container-high text-xs">•</span>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group" href="https://opencollective.com/kobar" target="_blank" rel="noreferrer">
              <Heart size={14} className="group-hover:fill-current transition-colors" /> Open Collective
            </a>
          </div>
        </Reveal>
      </div>

      {/* Right Content - Video/Image Showcase */}
      <div className="lg:col-span-7 relative w-full aspect-video rounded-3xl overflow-hidden glass-panel group shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] lg:-mr-16 xl:-mr-24 z-20">
        <Reveal delay={0.4} className="absolute inset-0 w-full h-full p-2 md:p-3">
          <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-surface border border-white/5">
            {!isVideoPlaying ? (
              <div
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img
                  src="/Assets/Screenshots/screen.png"
                  alt="KoBar Overview Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-surface/30 flex items-center justify-center transition-colors group-hover:bg-surface/10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-transform duration-300 group-hover:scale-110">
                    <Play size={28} className="ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full bg-surface"
                frameBorder="0"
                src="https://www.youtube.com/embed/vxoaziWOpsU?autoplay=1"
                title="KoBar Overview">
              </iframe>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

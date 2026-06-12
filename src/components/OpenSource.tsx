import { Code2 } from 'lucide-react';
import { Reveal } from './Reveal';

export default function OpenSource() {
  return (
    <section id="open-source" className="w-full">
      <Reveal className="max-w-5xl mx-auto text-center mb-24 md:mb-40 px-4 md:px-8">
        <div className="glass-panel p-10 md:p-20 rounded-[2.5rem] relative overflow-hidden border border-white/5">
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-8 shadow-2xl">
              <Code2 size={32} className="text-primary" />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-on-surface tracking-tight">
              100% Free & Open Source
            </h3>
            
            <p className="text-lg md:text-xl font-medium text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              KoBar is built for the community. Download it easily from the Microsoft Store or explore the code and contribute on GitHub. No tracking, no hidden fees.
            </p>
            
            <a 
              className="btn-premium inline-flex items-center gap-3 bg-on-surface text-surface-container-lowest px-8 py-4 rounded-xl font-mono text-[13px] uppercase transition-all hover:-translate-y-1 font-bold shadow-lg shadow-white/10" 
              href="https://github.com/Kobar-Project/KoBar"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={18} />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

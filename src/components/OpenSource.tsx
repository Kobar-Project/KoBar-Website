import { Code2 } from 'lucide-react';
import { Reveal } from './Reveal';

export default function OpenSource() {
  return (
    <Reveal className="max-w-4xl mx-auto text-center mb-32 glass-panel p-10 md:p-16 rounded-[3rem] relative overflow-hidden border-2 border-primary/20 mx-4" id="open-source">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[64px] -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[64px] -ml-20 -mb-20 pointer-events-none"></div>
      
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-on-surface">
        100% Free & Open Source
      </h3>
      
      <p className="text-lg font-medium text-on-surface-variant mb-10 max-w-2xl mx-auto space-y-1">
        <span className="block">KoBar is built for the community.</span>
        <span className="block">It is completely free to use and fully open-source.</span>
        <span className="block">Download it easily from the Microsoft Store or explore the code and contribute on GitHub.</span>
      </p>
      
      <a 
        className="btn-shimmer inline-flex items-center gap-3 bg-surface-container-high border-2 border-primary/30 hover:border-primary text-on-surface px-8 py-4 rounded-3xl font-mono text-[11px] uppercase transition-all hover:bg-surface-container-high hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 font-bold" 
        href="https://github.com/Kobar-Project/KoBar"
        target="_blank"
        rel="noreferrer"
      >
        <Code2 size={20} />
        Contribute on GitHub
      </a>
    </Reveal>
  );
}

import { Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-2xl border-b border-primary/20 shadow-lg shadow-primary/5">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            alt="KoBar Logo"
            className="w-10 h-10 rounded-2xl"
            src="/Assets/Logo/512_pixel.png"
          />
          <span className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tight hidden sm:block">
            KoBar
          </span>
        </div>

        <div>
          <a
            className="btn-shimmer bg-gradient-to-r from-primary to-secondary text-on-primary px-5 py-2.5 rounded-full font-mono text-[11px] uppercase font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            href="https://github.com/Kobar-Project/KoBar"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

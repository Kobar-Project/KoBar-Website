import { Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-2xl border-b border-white/5">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            alt="KoBar Logo"
            className="w-10 h-10 rounded-xl shadow-lg border border-white/5"
            src="/Assets/Logo/512_pixel.png"
          />
          <span className="text-2xl font-bold tracking-tight text-on-surface hidden sm:block">
            KoBar
          </span>
        </div>

        <div>
          <a
            className="btn-premium bg-surface-container border border-white/5 hover:border-white/10 text-on-surface px-6 py-2.5 rounded-lg font-mono text-[12px] uppercase font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2"
            href="https://github.com/Kobar-Project/KoBar"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

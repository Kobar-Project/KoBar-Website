export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 mt-auto w-full z-10 relative py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 max-w-7xl mx-auto gap-8">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold tracking-tight text-on-surface">
            KoBar
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://discord.gg/t93jsgqwax" target="_blank" rel="noreferrer">Discord</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://www.reddit.com/r/kobarproject/" target="_blank" rel="noreferrer">Reddit</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://x.com/kobarproject" target="_blank" rel="noreferrer">X</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://github.com/Kobar-Project/KoBar">GitHub</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[11px] lowercase tracking-widest font-bold" href="mailto:hello@kobar.org">hello@kobar.org</a>
        </div>

        <div className="font-mono font-medium text-on-surface-variant text-[11px] uppercase tracking-widest">
          © 2026 KoBar Project
        </div>
      </div>
    </footer>
  );
}

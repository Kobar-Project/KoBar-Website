export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest/80 backdrop-blur-md border-t border-primary/10 mt-auto w-full z-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto gap-8">
        <div className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tight">
          KoBar
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
          <a className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://discord.gg/t93jsgqwax" target="_blank" rel="noreferrer">Discord</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://www.reddit.com/r/kobarproject/" target="_blank" rel="noreferrer">Reddit</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://x.com/kobarproject" target="_blank" rel="noreferrer">X</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[11px] uppercase tracking-widest font-bold" href="https://github.com/Kobar-Project/KoBar">GitHub</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[11px] lowercase tracking-widest font-bold" href="mailto:hello@kobar.org">hello@kobar.org</a>
        </div>

        <div className="font-medium text-on-surface-variant/70 text-sm">
          © 2026 KoBar Project. Open Source under MIT.
        </div>
      </div>
    </footer>
  );
}

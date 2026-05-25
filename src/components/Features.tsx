import { ClipboardList, Bot, FileText, MonitorPlay, Hammer, Wrench } from 'lucide-react';
import { Reveal } from './Reveal';

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto mb-32" id="features">
      <Reveal>
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Your Creative Toolbox
        </h3>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-auto md:auto-rows-[280px]">
        {/* Card 1 */}
        <Reveal className="feature-card md:col-span-2 glass-panel p-8 rounded-3xl group flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-inner shadow-primary/30">
              <ClipboardList size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">Sequential Clipboard</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">Multi-slot FIFO queue for intelligent copying and pasting workflows. Keep your ideas flowing without losing track.</p>
          </div>
        </Reveal>

        {/* Card 2 */}
        <Reveal delay={0.1} className="feature-card md:col-span-1 glass-panel p-8 rounded-3xl group flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform shadow-inner shadow-secondary/30">
              <Bot size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">AI Hub</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">Chat with OpenAI, Gemini, Claude, or local LLMs directly from your sidebar.</p>
          </div>
        </Reveal>

        {/* Card 3 */}
        <Reveal delay={0.2} className="feature-card md:col-span-1 glass-panel p-8 rounded-3xl group flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-tertiary/20 flex items-center justify-center mb-6 text-tertiary group-hover:scale-110 transition-transform shadow-inner shadow-tertiary/30">
              <FileText size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">Rich Notes</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">Tiptap-powered multi-tab note editor for quick thoughts and drafts.</p>
          </div>
        </Reveal>

        {/* Card 4 */}
        <Reveal className="feature-card md:col-span-1 glass-panel p-8 rounded-3xl group flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-inner shadow-primary/30">
              <MonitorPlay size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">Screenshot Studio</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">Capture, annotate, and copy instantly without breaking your flow.</p>
          </div>
        </Reveal>

        {/* Card 5 */}
        <Reveal delay={0.1} className="feature-card md:col-span-2 glass-panel p-8 rounded-3xl group flex flex-col justify-between bg-gradient-to-br from-surface-container-high/50 to-primary/5 h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform shadow-inner shadow-secondary/30">
              <Hammer size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">Productivity Arsenal</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">To-Do List, Snippet Vault, Focus Mode, and Calculator built right in. Everything you need to stay in the zone.</p>
          </div>
        </Reveal>

        {/* Card 6 */}
        <Reveal delay={0.2} className="feature-card md:col-span-1 glass-panel p-8 rounded-3xl group flex flex-col justify-between h-full">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-tertiary/20 flex items-center justify-center mb-6 text-tertiary group-hover:scale-110 transition-transform shadow-inner shadow-tertiary/30">
              <Wrench size={28} />
            </div>
            <h4 className="text-xl font-bold mb-3 text-on-surface">Utilities</h4>
            <p className="text-base font-medium text-on-surface-variant opacity-90">Color Picker, KoPlayer, Pin to Top, and KoBox dropzone.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

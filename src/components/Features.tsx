import { Sidebar, ClipboardList, FileText, Bot, Camera, Music, Calendar, Timer, Wrench } from 'lucide-react';
import { Reveal } from './Reveal';

const featuresData = [
  {
    id: 'modular-sidebar',
    title: 'Modular Sidebar',
    desc: 'Always-on-top transparent overlay with edge docking, mini mode, and multi-monitor support.',
    icon: Sidebar,
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'ai-hub',
    title: 'AI Hub',
    desc: 'Multi-provider support (OpenAI, Gemini, Claude, Local), streaming, and file context.',
    icon: Bot,
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'sequential-clipboard',
    title: 'Sequential Clipboard',
    desc: 'Multi-slot FIFO queue, copy/paste modes with image support, and quick reset capability.',
    icon: ClipboardList,
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'screenshot-studio',
    title: 'Screenshot Studio',
    desc: 'Region/Full-screen capture, Konva.js annotation editor, and multi-display support.',
    icon: Camera,
    span: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'rich-notes',
    title: 'Rich Notes Panel',
    desc: 'Tiptap-powered editor with multi-tabs, voice-to-text, password lock, and color categories.',
    icon: FileText,
    span: 'md:col-span-1 md:row-span-2'
  },
  {
    id: 'koplayer',
    title: 'KoPlayer (Media)',
    desc: 'System media integration, album art display, and full transport controls.',
    icon: Music,
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'kocalendar',
    title: 'KoCalendar',
    desc: 'Google Calendar integration, event alerts, and visual monthly calendar view.',
    icon: Calendar,
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'focus-mode',
    title: 'Focus Mode',
    desc: 'Customizable timer, ambient melodies, loop mode, and desktop notifications.',
    icon: Timer,
    span: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'more-tools',
    title: 'More Tools',
    desc: 'Calculator, Color Picker, To-Do List, Pin Injector, KoBox, Snippet Vault, and App Launcher.',
    icon: Wrench,
    span: 'md:col-span-2 md:row-span-1'
  }
];

export default function Features() {
  return (
    <section className="w-full max-w-7xl mx-auto mb-24 md:mb-40 px-4 md:px-8" id="features">
      <Reveal className="max-w-3xl mb-16">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-on-surface leading-[1.1]">
          Everything you need,<br />
          <span className="text-on-surface-variant">nothing you don't.</span>
        </h3>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
          A suite of modular tools designed to keep you in the flow without cluttering your workspace.
        </p>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        {featuresData.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal 
              key={feature.id} 
              delay={index * 0.05} 
              className={`glass-panel group p-6 md:p-8 rounded-[2rem] flex flex-col justify-between ${feature.span}`}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high/50 border border-white/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
                  <Icon size={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 text-on-surface tracking-tight">{feature.title}</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

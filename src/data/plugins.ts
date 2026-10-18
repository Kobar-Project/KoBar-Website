// Site copy for the 13 official plugins. Names, repositories and icons come from the manifests (plugins.json, generated
// by scripts/sync-plugins.mjs). Every claim below was checked against the plugin code or
// KoBar/remaster/store/listing-facts.md; do not add a feature here without checking it the same way.
import manifests from './plugins.json';
import type { SymbolName } from './icons';

type Copy = {
  slug: string;
  /** One line for the home page grid. */
  summary: string;
  /** Opening sentence(s) on the plugins page. */
  lead: string;
  points: string[];
  /** Key in images.json, when a screenshot of the plugin exists, and its alt text. */
  shot?: string;
  shotAlt?: string;
  /** From the repository's LICENSE file; null when the repository has none. */
  license: 'MIT' | null;
};

const copy: Record<string, Copy> = {
  aiHub: {
    slug: 'ai-hub',
    summary: 'Chat with cloud or local AI models',
    lead: 'An AI assistant on your sidebar. Use OpenAI, Google Gemini or Anthropic Claude with your own API key, or run a local model through Ollama or LM Studio.',
    points: [
      'Your key is sent only to the provider you pick.',
      'Local models need no key and are reached on your own machine only.',
      'Chats are saved on your PC.',
    ],
    shot: 'ui/plugin-ai-hub',
    shotAlt: 'AI Hub open next to the KoBar bar: a chat list on the left and a conversation about planning a week.',
    license: 'MIT',
  },
  ClipboardManager: {
    slug: 'clipboard-manager',
    summary: 'Copy several things, paste them in order',
    lead: 'A sequential clipboard. Turn on copy mode, copy a few things, then paste them back one after another with Ctrl+V.',
    points: [
      '4 to 20 slots, 8 by default.',
      'Copied items wait in visual slots on the bar.',
      'The clipboard is read only while copy mode is on.',
    ],
    shot: 'ui/plugin-clipboard-manager',
    shotAlt: 'Clipboard Manager slots on the KoBar bar, with a preview bubble showing a copied item.',
    license: 'MIT',
  },
  screenshot: {
    slug: 'screenshot-studio',
    summary: 'Capture, mark up and save screenshots',
    lead: 'Capture a region or the whole screen on any of your displays, mark it up and save it.',
    points: ['Pen, highlighter, text, arrows, rectangles and circles.', 'Crop to the part you need.', 'Saves as PNG.'],
    shot: 'ui/plugin-screenshot-studio',
    shotAlt: 'Screenshot Studio editing a capture of a bar chart, with an arrow, a rectangle and the annotation toolbar.',
    license: null,
  },
  colorPicker: {
    slug: 'color-picker',
    summary: 'Pick colors and build palettes',
    lead: 'Pick a color from anywhere on your screen and copy it as HEX, RGB, HSV or HSL.',
    points: ['A color wheel that suggests matching harmonies.', 'Save colors into your own palettes.'],
    shot: 'ui/plugin-color-picker',
    shotAlt: 'Color Picker with a color square, a hue slider, the HEX value and suggested color harmonies.',
    license: 'MIT',
  },
  snippetVault: {
    slug: 'snippet-vault',
    summary: 'Keep text, code and prompts at hand',
    lead: 'Save the text you type again and again: code, replies, prompts. Give each snippet a title, tags and a color.',
    points: [
      'Search across titles and tags.',
      'Copy a snippet, or send it to a Clipboard Manager slot.',
      'Hide a snippet’s content behind a password.',
    ],
    shot: 'ui/plugin-snippet-vault',
    shotAlt: 'Snippet Vault listing saved snippets such as a Git command and an email signature.',
    license: 'MIT',
  },
  koBox: {
    slug: 'kobox',
    summary: 'A drop zone for files on your bar',
    lead: 'Drop files or folders on KoBox to clear them off your desktop. They are moved into KoBox, and a click opens it.',
    points: [
      'Items go to the Recycle Bin after 24 hours, or when you quit. You choose.',
      'Nothing is deleted permanently.',
      'Name clashes are renamed automatically.',
    ],
    shot: 'ui/plugin-kobox',
    shotAlt: 'The KoBox drop zone button on the KoBar bar, with its label shown.',
    license: 'MIT',
  },
  Shortcuts: {
    slug: 'shortcuts',
    summary: 'Launch apps, folders and links fast',
    lead: 'Keep the programs, files, folders and websites you open every day one click away.',
    points: ['Add a program, a document, a folder or a web link.', 'Drag shortcuts to reorder them.'],
    shot: 'ui/plugin-shortcuts',
    shotAlt: 'Shortcuts showing a grid of app icons next to the KoBar bar.',
    license: 'MIT',
  },
  pinWindowToTop: {
    slug: 'pin-window-to-top',
    summary: 'Keep any window on top',
    lead: 'Keep another app’s window above everything else, even when that app has no always-on-top option.',
    points: ['Pin a window from the bar.', 'Unpin it the same way when you are done.'],
    license: 'MIT',
  },
  koPlayer: {
    slug: 'koplayer',
    summary: 'Control the music or video that is playing',
    lead: 'Play, pause and skip whatever is playing on your PC, with its title, artist and cover art on your sidebar.',
    points: [
      'Works with apps that use the Windows media controls.',
      'KoBar watches media only while koPlayer is on.',
    ],
    shot: 'ui/plugin-koplayer',
    shotAlt: 'koPlayer showing cover art, the track title and play, previous and next buttons.',
    license: 'MIT',
  },
  focusMode: {
    slug: 'focus-mode',
    summary: 'A Pomodoro-style focus timer',
    lead: 'Set a focus session in minutes and seconds and let the bar count down. When time is up, a melody plays and you get a notification.',
    points: ['The remaining time shows on the bar.', 'Pick the melody, and loop the session if you like.'],
    shot: 'ui/plugin-focus-mode',
    shotAlt: 'Focus Mode with minutes and seconds, a melody picker, a loop switch and a Start button.',
    license: 'MIT',
  },
  toDoList: {
    slug: 'to-do-list',
    summary: 'A small, draggable to-do list',
    lead: 'A short list of today’s tasks that stays at the edge of your screen.',
    points: ['Drag tasks to put the most important first.', 'Tick tasks off as you go.'],
    shot: 'ui/plugin-todo',
    shotAlt: 'To-Do List with a few tasks, some of them ticked off.',
    license: 'MIT',
  },
  koCalender: {
    slug: 'kocalendar',
    summary: 'A month calendar with event alerts',
    lead: 'A calendar popup you can drag anywhere. Add events with a description, a meeting link and an alert.',
    points: ['Join a meeting straight from the event.', 'Turn on a desktop notification per event.'],
    shot: 'ui/plugin-kocalendar',
    shotAlt: 'KoCalendar showing a month grid and the day’s events below it.',
    license: 'MIT',
  },
  calculator: {
    slug: 'calculator',
    summary: 'Scientific calculator and currency converter',
    lead: 'A calculator that floats next to your work, with basic and scientific modes and a currency converter.',
    points: [
      'Copy any result with one click.',
      'Exchange rates come from open.er-api.com and are kept for 12 hours.',
      'Your local currency is preselected with an IP lookup (ipapi.co).',
    ],
    shot: 'ui/plugin-calculator',
    shotAlt: 'Calculator with its keypad, open next to the KoBar bar.',
    license: 'MIT',
  },
};

export type Plugin = Copy & {
  name: string;
  description: string;
  repoUrl: string;
  icon: SymbolName;
  categories: string[];
};

export const plugins: Plugin[] = manifests.map((m) => {
  const c = copy[m.folder];
  if (!c) throw new Error(`No site copy for plugin folder ${m.folder}`);
  return {
    ...c,
    name: m.name,
    description: m.description,
    repoUrl: `https://github.com/${m.repo}`,
    icon: m.icon as SymbolName,
    categories: m.categories,
  };
});

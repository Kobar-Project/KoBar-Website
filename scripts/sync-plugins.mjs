// Copies the fields the site needs from the official plugin manifests into src/data/plugins.json.
// The JSON is committed, so the build never depends on a local plugins folder.
//
//   node scripts/sync-plugins.mjs ["D:/Work/Code/KoBar Plugins"]
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ?? 'D:/Work/Code/KoBar Plugins';

// Display order on the site (same as the store listing fact sheet), by manifest folder.
const ORDER = [
  'aiHub', 'ClipboardManager', 'screenshot', 'colorPicker', 'snippetVault', 'koBox', 'Shortcuts',
  'pinWindowToTop', 'koPlayer', 'focusMode', 'toDoList', 'koCalender', 'calculator',
];

// Manifests without a githubRepo field; the repository is listed in the KoBar README.
const REPO_FALLBACK = { screenshot: 'Kobar-Project/Screenshot-plugin' };

const folders = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(root, d.name, 'manifest.json')))
  .map((d) => d.name);

const missing = ORDER.filter((f) => !folders.includes(f));
if (missing.length) throw new Error(`manifest folders not found: ${missing.join(', ')}`);

const plugins = ORDER.map((folder) => {
  const m = JSON.parse(readFileSync(path.join(root, folder, 'manifest.json'), 'utf8'));
  const repo = m.githubRepo ?? REPO_FALLBACK[folder];
  if (!repo) throw new Error(`${folder}: no repository`);
  return {
    folder,
    id: m.id,
    name: m.name,
    description: m.description,
    version: m.version,
    repo,
    icon: m.icon,
    categories: m.categories ?? [],
    languages: m.languages ?? [],
  };
});

const out = path.join(import.meta.dirname, '..', 'src', 'data', 'plugins.json');
writeFileSync(out, JSON.stringify(plugins, null, 2) + '\n');
console.log(`plugins.json: ${plugins.length} plugins`);

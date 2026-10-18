// Full-page screenshots of the built site at desktop (1440) and mobile (390) widths, plus a few viewport shots.
//
//   npm run build && npx vite preview --port 4173 --strictPort   (in another terminal)
//   node scripts/shots.mjs [http://localhost:4173] [home,plugins,privacy,license,404]
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4173';
const only = process.argv[3]?.split(',');
const outDir = path.join(import.meta.dirname, '..', 'redesign', 'screenshots');
mkdirSync(outDir, { recursive: true });

const pages = [
  { name: 'home', path: '/' },
  { name: 'plugins', path: '/plugins/' },
  { name: 'privacy', path: '/privacy/' },
  { name: 'license', path: '/license/' },
  { name: '404', path: '/404.html' },
].filter((p) => !only || only.includes(p.name));

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { name: 'mobile-390', width: 390, height: 844, mobile: true },
];

// Uses the installed Google Chrome, so no Playwright browser download is needed.
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    // Keep the shots deterministic: no GitHub API call (the version line simply stays empty).
    await page.route('https://api.github.com/**', (route) => route.abort());
    for (const p of pages) {
      await page.goto(base + p.path, { waitUntil: 'networkidle' });
      // Scroll through the page so lazy images load, then return to the top.
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += vp.height / 2) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(60);
      }
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outDir, `${p.name}-${vp.name}-full.jpg`), fullPage: true, type: 'jpeg', quality: 85 });
      await page.screenshot({ path: path.join(outDir, `${p.name}-${vp.name}-top.png`) });
      if (p.name === 'home' && !vp.mobile) {
        // The docked section bar only shows once the hero has scrolled away.
        await page.evaluate(() => document.getElementById('mini-mode')?.scrollIntoView({ block: 'center' }));
        await page.mouse.move(300, 200);
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(outDir, `${p.name}-${vp.name}-edgebar.png`) });
      }
      console.log(`${p.name} ${vp.name}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

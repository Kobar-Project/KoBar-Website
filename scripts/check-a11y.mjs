// Accessibility scan (axe-core, WCAG 2.1 AA rules including color contrast) of every page at desktop and mobile width,
// plus a keyboard check: every interactive element must be reachable with Tab and show a visible focus indicator.
//
//   npx vite preview --port 4173 --strictPort   (in another terminal, after npm run build)
//   node scripts/check-a11y.mjs [http://localhost:4173]
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4173';
const paths = ['/', '/plugins/', '/privacy/', '/license/', '/404.html'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ channel: 'chrome' });
let failures = 0;
try {
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.route('https://api.github.com/**', (route) => route.abort());
    for (const p of paths) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
      for (const v of result.violations) {
        failures++;
        console.log(`[${vp.name}] ${p} ${v.impact} ${v.id}: ${v.help}`);
        for (const node of v.nodes.slice(0, 5)) console.log(`    ${node.target.join(' ')}  ${node.failureSummary?.split('\n')[1] ?? ''}`);
      }

      // Keyboard: tab through the page and make sure focus never lands on something invisible.
      if (vp.name === 'desktop') {
        await page.evaluate(() => window.scrollTo(0, 0));
        const seen = new Set();
        for (let i = 0; i < 250; i++) {
          await page.keyboard.press('Tab');
          const info = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            if (el.dataset.kbSeen) return { repeat: true };
            el.dataset.kbSeen = '1';
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const outlined = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
            const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40);
            return { label, visible: r.width > 0 && r.height > 0, outlined };
          });
          if (!info || info.repeat) break;
          seen.add(i);
          if (!info.visible || !info.outlined) {
            failures++;
            console.log(`[keyboard] ${p} focus problem on "${info.label}" visible=${info.visible} outline=${info.outlined}`);
          }
        }
        console.log(`[keyboard] ${p}: ${seen.size} focus stops`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
console.log(failures === 0 ? 'No accessibility violations.' : `${failures} problem(s).`);
process.exitCode = failures ? 1 : 0;

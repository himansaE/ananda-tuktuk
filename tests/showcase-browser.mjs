import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const modules = process.env.ANANDA_BROWSER_MODULES;
const { chromium } = require(modules ? path.join(modules, "playwright") : "playwright");
const base = process.env.ANANDA_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir(".artifacts/screenshots", { recursive: true });
let failed = 0;
async function check(name, run) {
  try { await run(); console.log(`PASS ${name}`); }
  catch (error) { failed++; console.log(`FAIL ${name}: ${error.message}`); }
}
async function open(page) {
  await page.goto(base, { waitUntil: "load" });
  await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
  await page.evaluate(() => document.fonts.ready);
}
async function enter(page) {
  await page.locator('.destination-showcase').evaluate(node => scrollTo({ top: node.offsetTop, behavior: "instant" }));
  await page.waitForFunction(() => [...document.querySelectorAll('.showcase-background img')].length === 3 && [...document.querySelectorAll('.showcase-background img')].every(image => image.complete && image.naturalWidth > 0));
}
function selected(page) { return page.locator('.showcase-card[aria-pressed="true"]').getAttribute('aria-label'); }

try {
  for (const [width, height] of [[320, 640], [390, 844], [1440, 900]]) {
    await check(`Full-screen destinations and photo controls fit ${width}px`, async () => {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
      try {
        await open(page); await enter(page);
        const bounds = await page.locator('.destination-showcase').boundingBox();
        assert.ok(bounds.height >= height, 'The section should fill the screen');
        assert.equal(await page.locator('.showcase-card').count(), 3);
        const controls = await page.locator('.showcase-card, .showcase-actions a').evaluateAll(nodes => nodes.map(node => {
          const rect = node.getBoundingClientRect();
          return { left: rect.left, right: rect.right, width: rect.width, height: rect.height };
        }));
        for (const rect of controls) assert.ok(rect.left >= 0 && rect.right <= width && rect.width >= 44 && rect.height >= 44, JSON.stringify(rect));
        await page.getByRole('button', { name: 'View Dambulla', exact: true }).click();
        assert.match(await page.locator('.showcase-title').textContent(), /Dambulla/);
        assert.equal(await selected(page), 'View Dambulla');
        await page.screenshot({ path: `.artifacts/screenshots/destinations-${width}.png` });
        assert.equal(await page.locator('.ride-options, .outing-section, .how-section, .booking-section').count(), 0, 'Homepage should not repeat ride and outing blocks');
        assert.equal(await page.locator('.faq-item').count(), 4);
      } finally { await page.close(); }
    });
  }

  await check('Timed destinations cycle while visible and stop while a destination has focus, without a pause button', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    try {
      await open(page);
      await page.waitForTimeout(5200);
      assert.equal(await selected(page), 'View Sigiriya', 'Offscreen destinations must stay paused');
      await enter(page);
      await page.waitForFunction(() => document.querySelector('.showcase-card[aria-pressed="true"]').ariaLabel === 'View Dambulla', null, { timeout: 7500 });
      await page.waitForFunction(() => document.querySelector('.showcase-card[aria-pressed="true"]').ariaLabel === 'View Minneriya', null, { timeout: 7500 });
      assert.equal(await page.getByRole('button', { name: /Pause slideshow|Play slideshow/ }).count(), 0);
      await page.getByRole('button', { name: 'View Minneriya', exact: true }).focus();
      const stopped = await selected(page);
      const transform = await page.locator('.showcase-drift').nth(2).evaluate(node => getComputedStyle(node).transform);
      await page.waitForTimeout(5300);
      assert.equal(await selected(page), stopped);
      assert.equal(await page.locator('.showcase-drift').nth(2).evaluate(node => getComputedStyle(node).transform), transform, 'Paused photo should stop drifting');
      await page.locator('.showcase-card[aria-pressed="true"]').evaluate(node => node.blur());
      await page.waitForFunction(() => document.querySelector('.showcase-card[aria-pressed="true"]').ariaLabel === 'View Sigiriya', null, { timeout: 7500 });
    } finally { await page.close(); }
  });

  await check('Keyboard destination selection is immediate and rapid pointer selection settles on the requested image', async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await open(page); await enter(page);
      const cave = page.getByRole('button', { name: 'View Dambulla', exact: true });
      await cave.focus();
      assert.equal(await page.locator('.showcase-cards').evaluate(node => getComputedStyle(node).transform), 'none', 'Keyboard focus should settle the entrance before activation');
      await page.keyboard.press('Enter');
      assert.equal(await selected(page), 'View Dambulla');
      assert.equal(await page.locator('.showcase-slide').nth(1).evaluate(node => getComputedStyle(node).opacity), '1');
      assert.equal(await page.locator('.showcase-title').evaluate(node => getComputedStyle(node).transform), 'none');
      await page.getByRole('button', { name: 'View Minneriya', exact: true }).click();
      await page.getByRole('button', { name: 'View Sigiriya', exact: true }).click();
      await page.getByRole('button', { name: 'View Dambulla', exact: true }).click();
      await page.waitForFunction(() => getComputedStyle(document.querySelectorAll('.showcase-slide')[1]).opacity === '1');
      assert.equal(await selected(page), 'View Dambulla');
      const opacity = await page.locator('.showcase-slide').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity));
      assert.deepEqual(opacity, ['0', '1', '0']);
      assert.match(await page.locator('.showcase-title').textContent(), /Dambulla/);
      assert.equal(await page.locator('.showcase-title').evaluate(node => getComputedStyle(node).opacity), '1', 'Returning quickly to the current caption must keep it visible');
    } finally { await page.close(); }
  });

  await check('Reduced motion disables automatic switching and photo drift, including a live preference change', async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    try {
      await open(page); await enter(page);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.showcase-drift')).transform === 'none');
      await page.getByRole('button', { name: 'View Dambulla', exact: true }).click();
      await page.waitForTimeout(5300);
      assert.equal(await selected(page), 'View Dambulla');
      assert.equal(await page.locator('.showcase-drift').nth(1).evaluate(node => getComputedStyle(node).transform), 'none');
      const photoOffset = () => page.locator('.showcase-background').evaluate(frame => frame.querySelectorAll('img')[1].getBoundingClientRect().top - frame.getBoundingClientRect().top);
      const before = await photoOffset();
      await page.evaluate(() => scrollBy({ top: 150, behavior: 'instant' }));
      assert.ok(Math.abs(await photoOffset() - before) < 1);
    } finally { await page.close(); }
  });

  if (failed) process.exitCode = 1;
} finally { await browser.close(); }

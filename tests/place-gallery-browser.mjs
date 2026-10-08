import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const modules = process.env.ANANDA_BROWSER_MODULES;
const { chromium } = require(modules ? path.join(modules, "playwright") : "playwright");
const base = process.env.ANANDA_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];

async function touchSwipe(page, from, to) {
  const client = await page.context().newCDPSession(page);
  try {
    await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: from.x, y: from.y }] });
    for (let i = 1; i <= 10; i++) {
      await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: from.x + (to.x - from.x) * i / 10, y: from.y + (to.y - from.y) * i / 10 }] });
      await new Promise(resolve => setTimeout(resolve, 18));
    }
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } finally { await client.detach(); }
}

try {
  for (const width of [320, 390, 430, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 320 ? 640 : 844 }, hasTouch: width < 700, isMobile: width < 700 });
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator('.experience-open').filter({ hasText: 'Woodwork & crafts' }).click();
    const dialog = page.getByRole('dialog', { name: 'Woodwork & crafts', exact: true });
    await dialog.waitFor();
    await page.waitForFunction(() => document.querySelector('.place-gallery-track')?.scrollWidth > document.querySelector('.place-gallery-track')?.clientWidth);
    assert.equal(await dialog.locator('.place-gallery-slide').count(), 3);
    assert.equal(await dialog.locator('.place-gallery-count').innerText(), '1 / 3');
    assert.ok(await dialog.getByRole('button', { name: 'Previous photo', exact: true }).isDisabled());
    assert.equal(await dialog.locator('.detail-panel').evaluate(n => getComputedStyle(n).touchAction), 'auto');
    const fit = await dialog.locator('.detail-panel').evaluate(n => ({ width: n.clientWidth, content: n.scrollWidth }));
    assert.ok(fit.content <= fit.width + 1, `Drawer overflow at ${width}: ${JSON.stringify(fit)}`);
    await dialog.getByRole('button', { name: 'Next photo', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.place-gallery-count').textContent === '2 / 3');
    await dialog.getByRole('button', { name: 'View photo 3 of 3', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.place-gallery-count').textContent === '3 / 3');
    assert.ok(await dialog.getByRole('button', { name: 'Next photo', exact: true }).isDisabled());
    await dialog.locator('.place-gallery-track').focus();
    await page.keyboard.press('Home');
    assert.equal(await dialog.locator('.place-gallery-count').innerText(), '1 / 3');
    await page.keyboard.press('ArrowRight');
    assert.equal(await dialog.locator('.place-gallery-count').innerText(), '2 / 3');
    await page.keyboard.press('Home');

    if (width < 700) {
      await dialog.locator('.place-gallery-track').evaluate(n => n.blur());
      const rect = await dialog.locator('.place-gallery-track').boundingBox();
      const y = rect.y + Math.min(rect.height / 2, 100);
      await touchSwipe(page, { x: rect.x + rect.width - 45, y }, { x: rect.x + 40, y });
      await page.waitForFunction(() => document.querySelector('.place-gallery-count').textContent === '2 / 3');
      const panel = dialog.locator('.detail-panel');
      if (await panel.evaluate(n => n.scrollHeight > n.clientHeight + 20)) {
        const before = await panel.evaluate(n => n.scrollTop);
        await touchSwipe(page, { x: rect.x + rect.width / 2, y: y + 40 }, { x: rect.x + rect.width / 2, y: y - 95 });
        await page.waitForFunction(before => document.querySelector('.detail-panel').scrollTop > before + 20, before);
        assert.equal(await dialog.locator('.place-gallery-count').innerText(), '2 / 3', 'Vertical gestures must not change the photo');
      }
      assert.equal(await dialog.evaluate(n => n.open), true);
    } else {
      const rect = await dialog.locator('.place-gallery-track').boundingBox();
      await page.mouse.move(rect.x + rect.width - 70, rect.y + 100);
      await page.mouse.down();
      await page.mouse.move(rect.x + 70, rect.y + 100, { steps: 14 });
      await page.mouse.up();
      await page.waitForFunction(() => document.querySelector('.place-gallery-count').textContent === '2 / 3');
    }
    await page.screenshot({ path: `.artifacts/place-gallery-${width}.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    const card = page.locator('.experience-open').filter({ hasText: 'Woodwork & crafts' });
    assert.equal(await card.evaluate(n => n === document.activeElement), true);
    await card.click();
    await page.waitForFunction(() => document.querySelector('.place-gallery-count').textContent === '1 / 3');
    assert.equal(await dialog.locator('.detail-panel').evaluate(n => n.scrollTop), 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await dialog.getByRole('button', { name: 'View photo 3 of 3', exact: true }).click();
    assert.equal(await dialog.locator('.place-gallery-count').innerText(), '3 / 3');
    await dialog.getByRole('button', { name: 'Add this stop', exact: true }).click();
    assert.ok(await dialog.getByRole('button', { name: 'Remove this stop', exact: true }).isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Added to my ride : Woodwork & crafts', exact: true }).getAttribute('aria-pressed'), 'true');
    if (width === 390) {
      assert.equal(await page.locator('.experience-open').filter({ hasText: 'Heritage & antique shops' }).count(), 0);
      for (const [title, photoCount] of [['Sri Lankan food', 3], ['Herbal massage centre', 4], ['Herbs & spices', 4], ['Village safari', 4]]) {
        await page.locator('.experience-open').filter({ hasText: title }).click();
        assert.equal(await page.locator('dialog[open] .place-gallery-slide').count(), photoCount);
        await page.getByRole('button', { name: `View photo ${photoCount} of ${photoCount}`, exact: true }).click();
        await page.waitForFunction(() => { const images = [...document.querySelectorAll('dialog[open] img')]; return images.every(n => n.complete && n.naturalWidth > 0); });
        await page.keyboard.press('Escape');
      }
      await page.goto(base + '/tours', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.experience-open').filter({ hasText: 'Heritage & antique shops' }).count(), 0);
      await page.locator('.experience-open').filter({ hasText: 'Dambulla Golden Temple' }).click();
      assert.equal(await page.locator('dialog[open] .place-gallery-slide').count(), 3);
      await page.keyboard.press('Escape');
      await page.locator('.experience-open').filter({ hasText: 'Pidurangala views' }).click();
      assert.equal(await page.locator('dialog[open] .place-gallery-slide').count(), 3);
      assert.equal(await page.locator('dialog[open] .place-gallery-controls').count(), 1);
    }
    console.log(`PASS gallery gestures, tap controls, keyboard, focus return, reset and reduced motion at ${width}px`);
    await page.close();
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }

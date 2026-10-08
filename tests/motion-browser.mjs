import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const modules = process.env.ANANDA_BROWSER_MODULES;
const { chromium } = require(modules ? path.join(modules, "playwright") : "playwright");
const base = process.env.ANANDA_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome", headless: true });
let failed = 0;
async function check(name, run) {
  try { await run(); console.log(`PASS ${name}`); }
  catch (error) { failed++; console.log(`FAIL ${name}: ${error.message}`); }
}

try {
  for (const width of [390, 1440]) {
    await check(`Stop actions align within every row at ${width}px`, async () => {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      try {
        await page.goto(`${base}/tours`, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        const rows = await page.locator(".experience-card").evaluateAll(cards => {
          const rows = new Map();
          for (const card of cards) {
            const top = Math.round(card.getBoundingClientRect().top);
            const action = card.querySelector(".add-stop").getBoundingClientRect();
            rows.set(top, [...(rows.get(top) ?? []), action.bottom]);
          }
          return [...rows.values()];
        });
        assert.ok(rows.some(row => row.length > 1), "Expected a multi-column layout");
        for (const row of rows) assert.ok(Math.max(...row) - Math.min(...row) <= 1, `Uneven action baseline: ${row}`);
      } finally { await page.close(); }
    });
  }

  for (const [width, fallback] of [[390, false], [1440, false], [390, true]]) {
    await check(`The hero photo tracks scrolling and reverses at ${width}px${fallback ? " without native scroll timelines" : ""}`, async () => {
      const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: "no-preference", isMobile: width === 390, hasTouch: width === 390 });
      try {
        if (fallback) await page.addInitScript(() => {
          const supports = CSS.supports.bind(CSS);
          CSS.supports = (property, value) => property === "animation-timeline" ? false : supports(property, value);
        });
        await page.goto(base, { waitUntil: "load" });
        await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
        await page.waitForFunction(() => {
          const image = document.querySelector(".hero-photo-frame img");
          const layer = document.querySelector(".hero-photo-frame [data-parallax]");
          return image?.complete && image.naturalWidth > 0 && layer?.style.transform ;
        });
        // Measure the scroll effect after the separate opening camera settles.
        // Otherwise its temporary scale changes the initial photo bounds.
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(() => getComputedStyle(document.querySelector("[data-hero-photo]")).transform === "none");
        const offset = () => page.locator(".hero-photo-frame").evaluate(frame => frame.querySelector("img").getBoundingClientRect().top - frame.getBoundingClientRect().top);
        const initial = await offset();
        await page.evaluate(() => scrollTo({ top: 320, behavior: "instant" }));
        await page.waitForFunction(initial => {
          const frame = document.querySelector(".hero-photo-frame");
          return Math.abs(frame.querySelector("img").getBoundingClientRect().top - frame.getBoundingClientRect().top - initial) > 6;
        }, initial, { timeout: 3000 });
        const moved = await offset();
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForFunction(initial => {
          const frame = document.querySelector(".hero-photo-frame");
          return Math.abs(frame.querySelector("img").getBoundingClientRect().top - frame.getBoundingClientRect().top - initial) < 1;
        }, initial, { timeout: 3000 });
        assert.ok(Math.abs(moved - initial) > 6);
      } finally { await page.close(); }
    });
  }

  await check("Desktop wheel scrolling interpolates and reduced motion restores native scrolling", async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    try {
      await page.goto(base, { waitUntil: "load" });
      await page.waitForFunction(() => document.documentElement.classList.contains("lenis"));
      await page.mouse.move(100, 100);
      await page.mouse.wheel(0, 600);
      const first = await page.evaluate(() => scrollY);
      assert.ok(first < 590, `Wheel movement should interpolate: ${first}`);
      await page.waitForFunction(() => scrollY > 550, null, { timeout: 3000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => !document.documentElement.classList.contains("lenis"));
    } finally { await page.close(); }
  });

  await check("Reduced motion keeps photos steady while scrolling", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    try {
      await page.goto(base, { waitUntil: "load" });
      const relative = () => page.locator(".hero-photo-frame").evaluate(frame => frame.querySelector("img").getBoundingClientRect().top - frame.getBoundingClientRect().top);
      const before = await relative();
      await page.evaluate(() => scrollTo({ top: 320, behavior: "instant" }));
      assert.ok(Math.abs(await relative() - before) < 1);
      assert.equal(await page.locator(".hero h1").evaluate(node => getComputedStyle(node).opacity), "1");
    } finally { await page.close(); }
  });
  await check("Sections enter on scroll and keyboard focus settles controls immediately", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference", isMobile: true, hasTouch: true });
    try {
      await page.goto(base, { waitUntil: "load" });
      await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
      const heading = page.locator('.faq-section [data-reveal="heading"]');
      assert.equal(await heading.evaluate(node => getComputedStyle(node).opacity), "0.12", "Cinema starts with a softened scroll entrance");
      const card = page.locator('.experience-card').last();
      await card.evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 400, behavior: "instant" }));
      await page.waitForFunction(() => { const opacity = Number(getComputedStyle([...document.querySelectorAll('.experience-card')].at(-1)).opacity); return opacity > 0 && opacity < 1; });
      await card.locator('.add-stop').focus();
      assert.equal(await card.evaluate(node => getComputedStyle(node).transform), "none");
      assert.equal(await card.evaluate(node => getComputedStyle(node).opacity), "1");
      await heading.evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 650, behavior: "instant" }));
      await page.waitForFunction(() => { const opacity = Number(getComputedStyle(document.querySelector('.faq-section [data-reveal="heading"]')).opacity); return opacity > 0 && opacity < 1; });
      await heading.evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 250, behavior: "instant" }));
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.faq-section [data-reveal="heading"]')).opacity) === 1);
      assert.equal(await heading.evaluate(node => getComputedStyle(node).opacity), "1");
    } finally { await page.close(); }
  });

  await check("Data-saving preference skips photo parallax", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference", isMobile: true, hasTouch: true });
    try {
      await page.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true }));
      await page.goto(base, { waitUntil: "load" });
      await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-photo-frame img')).transform === "none");
      const layer = page.locator('.hero-photo-frame [data-parallax]');
      assert.equal(await layer.evaluate(node => getComputedStyle(node).transform), "none");
      await page.evaluate(() => scrollTo({ top: 320, behavior: "instant" }));
      assert.equal(await layer.evaluate(node => getComputedStyle(node).transform), "none");
    } finally { await page.close(); }
  });

  await check("Changing to reduced motion stops active photo motion", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference", isMobile: true, hasTouch: true });
    try {
      await page.goto(base, { waitUntil: "load" });
      await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const layer = page.locator('.hero-photo-frame [data-parallax]');
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-photo-frame [data-parallax]')).transform === "none");
      await page.evaluate(() => scrollTo({ top: 320, behavior: "instant" }));
      assert.equal(await layer.evaluate(node => getComputedStyle(node).transform), "none");
    } finally { await page.close(); }
  });

  await check("A dialog reverses smoothly when closed during its entrance, then restores focus", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference", isMobile: true, hasTouch: true });
    try {
      await page.goto(base, { waitUntil: "load" });
      await page.locator('.mobile-ridebar[data-keyboard]').waitFor({ state: 'attached' });
      const trigger = page.getByRole('button', { name: 'Open menu', exact: true });
      const position = await trigger.boundingBox();
      await page.mouse.click(position.x + position.width / 2, position.y + position.height / 2);
      await page.waitForFunction(() => document.querySelector('.menu-sheet').open);
      const result = await page.evaluate(async () => {
        const dialog = document.querySelector('.menu-sheet');
        const panel = dialog.querySelector('.sheet-panel');
        const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
        await frame(); await frame();
        const before = Number(getComputedStyle(panel).opacity);
        panel.querySelector('[aria-label="Close menu"]').dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
        const immediate = Number(getComputedStyle(panel).opacity);
        await frame();
        return { before, immediate, after: Number(getComputedStyle(panel).opacity), state: dialog.dataset.state };
      });
      assert.ok(result.before > 0 && result.before < 1, `Expected an entrance in progress: ${JSON.stringify(result)}`);
      assert.ok(Math.abs(result.immediate - result.before) < 0.05, `Closing must start from the current frame: ${JSON.stringify(result)}`);
      assert.ok(result.after <= result.before + 0.02, `Closing must reverse toward hidden: ${JSON.stringify(result)}`);
      assert.equal(result.state, 'closing');
      await page.waitForFunction(() => !document.querySelector('.menu-sheet').open);
      assert.equal(await trigger.evaluate(node => node === document.activeElement), true);
      await trigger.focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('.menu-sheet').getAttribute('data-instant'), 'true');
      assert.equal(await page.locator('.menu-panel').evaluate(node => getComputedStyle(node).opacity), '1');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog[open]').count(), 0);
    } finally { await page.close(); }
  });

  if (failed) process.exitCode = 1;
} finally { await browser.close(); }

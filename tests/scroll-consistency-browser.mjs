import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const modules = process.env.ANANDA_BROWSER_MODULES;
const { chromium } = require(modules ? path.join(modules, "playwright") : "playwright");
const base = process.env.ANANDA_BASE_URL ?? "http://localhost:3100";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];

async function position(page, selector, fraction) {
  await page.locator(selector).first().evaluate((node, fraction) => {
    const y = new DOMMatrixReadOnly(getComputedStyle(node).transform).m42;
    // ScrollTrigger measures the group in its initial, translated position.
    // Compare that same anchor across sections regardless of current progress.
    const top = node.getBoundingClientRect().top - y + scrollY + (innerWidth < 700 ? 26 : 44);
    scrollTo({ top: top - innerHeight * fraction, behavior: "instant" });
  }, fraction);
  return page.locator(selector).first().evaluate(async node => {
    for (let i = 0; i < 5; i++) await new Promise(requestAnimationFrame);
    const style = getComputedStyle(node);
    return { opacity: Number(style.opacity), y: new DOMMatrixReadOnly(style.transform).m42 };
  });
}

async function followsCurve(page, selector, width) {
  const middle = await position(page, selector, .78);
  assert.ok(Math.abs(middle.opacity - .56) < .035, `${selector}: midpoint opacity ${middle.opacity}`);
  assert.ok(Math.abs(middle.y - (width < 700 ? 13 : 22)) < 1.5, `${selector}: midpoint rise ${middle.y}`);
  const entered = await position(page, selector, .3);
  assert.equal(entered.opacity, 1, `${selector}: fully readable in the reading area`);
  const reversed = await position(page, selector, .94);
  assert.ok(reversed.opacity > .15 && reversed.opacity < .35, `${selector}: reverse scroll ${reversed.opacity}`);
  const repeated = await position(page, selector, .78);
  assert.ok(Math.abs(repeated.opacity - middle.opacity) < .01, `${selector}: progress must depend on scroll, not elapsed time`);
  const above = await position(page, selector, -.15);
  assert.equal(above.opacity, 1, `${selector}: no disappearance at the top`);
}

try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, isMobile: width === 390, hasTouch: width === 390 });
    page.on("pageerror", error => errors.push(error.message));
    for (const [route, selectors] of [
      ["/", [".notebook-ride .notebook-section-heading", ".experience-section .section-heading", ".experience-card", ".showcase-cards", ".showcase-text", ".showcase-actions", ".notebook-gallery .notebook-section-heading", ".notebook-review", ".faq-item"]],
      ["/tours", [".category-filters", ".experience-card", ".explore-bottom", ".outing-footnote", ".planner-form"]],
      ["/about", [".notebook-ride .notebook-section-heading", ".notebook-panorama [data-reveal]", ".notebook-closing [data-reveal=title]"]],
    ]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      for (const selector of selectors) await followsCurve(page, selector, width);
      console.log(`PASS ${route} content groups share the same reversible curve at ${width}px`);
      if (route === "/tours") {
        await page.locator('.filter-chip').nth(1).focus();
        await page.keyboard.press("Enter");
        assert.equal(await page.locator('.category-filters').evaluate(n => getComputedStyle(n).opacity), "1", "Filter remains readable while changing results");
      }
    }
    await page.goto(base + "/contact", { waitUntil: "networkidle" });
    await page.locator('input[name="pickup"]').focus();
    assert.equal(await page.locator('.planner-form').evaluate(n => getComputedStyle(n).transform), "none", "The form settles immediately on keyboard focus");
    await page.locator('input[name="pickup"]').fill("Test hotel");
    assert.equal(await page.locator('input[name="pickup"]').inputValue(), "Test hotel");
    await page.locator('input[name="pickup"]').evaluate(n => n.blur());
    await page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await page.waitForFunction(() => [...document.querySelectorAll('.site-footer [data-reveal]')].every(n => getComputedStyle(n).opacity === "1"));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => [...document.querySelectorAll('[data-reveal]')].every(n => getComputedStyle(n).opacity === "1" && getComputedStyle(n).transform === "none"));
    console.log(`PASS keyboard filtering/form focus, complete footer and reduced-motion cleanup at ${width}px`);
    await page.close();
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }

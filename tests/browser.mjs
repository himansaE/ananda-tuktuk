import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const modulePath = process.env.ANANDA_BROWSER_MODULES;
const { chromium } = require(modulePath ? path.join(modulePath, "playwright") : "playwright");
const base = process.env.ANANDA_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const failures = [];
const report = [];
let activePage;
await mkdir(".artifacts/screenshots", { recursive: true });

async function check(name, fn) {
  try { await fn(); report.push({ name, passed: true }); console.log(`PASS ${name}`); }
  catch (error) {
    failures.push({ name, message: error.message }); report.push({ name, passed: false }); console.log(`FAIL ${name}: ${error.message}`);
    console.log(`Page at failure: ${activePage?.url()}\n${error.stack}`);
    await activePage?.evaluate(() => document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close())).catch(() => {});
  }
}

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  // Check the generated request without opening a live chat or sending a message.
  await context.addInitScript(() => {
    window.__anandaOpenedUrls = [];
    window.open = url => { window.__anandaOpenedUrls.push(String(url)); return null; };
  });
  const page = await context.newPage();
  activePage = page;
  page.setDefaultTimeout(7000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  async function go(route = "/") {
    await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
    await page.locator("main h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    // The viewport handler runs after the shared client controls have mounted.
    await page.locator(".mobile-ridebar[data-keyboard]").waitFor({ state: "attached" });
  }
  async function fits() {
    const size = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
    assert.ok(size.content <= size.width + 1, `Horizontal overflow: ${JSON.stringify(size)}`);
  }
  async function photoReady(selector) {
    await page.waitForFunction((selector) => {
      const image = document.querySelector(selector);
      return image?.complete && image.naturalWidth > 0;
    }, selector, { timeout: 12000 });
  }
  await go();
  assert.match(await page.title(), /Ananda/);

  await check("Home clearly describes the confirmed service without placeholder contacts", async () => {
    await page.getByText("I'm Ananda, your local driver. Choose a short ride or an outing with the stops you like.", { exact: true }).waitFor();
    for (const text of ["Hotel pickup", "I can wait", "Ride back"]) await page.getByText(text, { exact: true }).waitFor();
    assert.equal(await page.locator('a[href*="94770000000"]').count(), 0);
    assert.equal(await page.locator(".experience-card").count(), 6);
  });

  await check("Place details trap focus and Escape returns to the photo", async () => {
    await page.locator(".experience-open").filter({ hasText: "Woodwork & crafts" }).click();
    try { await page.getByRole("dialog", { name: "Woodwork & crafts", exact: true }).waitFor(); }
    catch (error) {
      console.log("Dialog state", await page.evaluate(() => ({ open: document.querySelector(".detail-sheet")?.open, title: document.querySelector("#stop-title")?.textContent, state: document.querySelector(".detail-sheet")?.dataset.state })));
      throw error;
    }
    assert.equal(await page.getByRole("button", { name: "Close place details" }).evaluate((node) => node === document.activeElement), true);
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement === document.body || Boolean(document.activeElement?.closest("dialog"))), true);
    }
    await page.bringToFront();
    await page.getByRole("button", { name: "Close place details" }).focus();
    await photoReady("dialog[open] img");
    await page.screenshot({ path: ".artifacts/screenshots/place-details-mobile.png" });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog[open]").count(), 0);
    assert.equal(await page.locator(".experience-open").filter({ hasText: "Woodwork & crafts" }).evaluate((node) => node === document.activeElement), true);
  });

  await check("Chosen stops survive navigation and reload", async () => {
    await page.getByRole("button", { name: "Add this stop : Woodwork & crafts", exact: true }).click();
    await page.getByRole("button", { name: "Add this stop : Sri Lankan food", exact: true }).click();
    assert.equal(await page.locator('.add-stop[aria-pressed="true"]').count(), 2);
    await page.locator(".mobile-ridebar").getByRole("link", { name: "Plan my ride" }).click();
    await page.waitForURL("**/contact#plan", { waitUntil: "domcontentloaded" });
    await page.locator(".planner-form").waitFor();
    await page.locator(".selected-stops li").first().waitFor();
    assert.equal(await page.locator(".selected-stops li").count(), 2);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator(".selected-stops li").first().waitFor();
    assert.equal(await page.locator(".selected-stops li").count(), 2);
  });

  await check("WhatsApp receives the correct number and complete ride request, with a separate call number", async () => {
    await page.locator('input[name="pickup"]').fill("Hôtel & Spa + a quiet lunch");
    await page.locator('input[name="date"]').fill("2099-10-12");
    await page.locator('input[name="time"]').fill("09:30");
    await page.locator('select[name="guests"]').selectOption("2");
    await page.getByRole("checkbox", { name: /Bring me back to my hotel/ }).focus();
    await page.keyboard.press("Space");
    await page.locator('textarea[name="notes"]').fill("Vegetarian food, please. ස්තුතියි!");
    await page.getByRole("button", { name: "Send request on WhatsApp", exact: true }).click();
    await page.getByRole("status").filter({ hasText: "Your request is ready in WhatsApp" }).waitFor();
    const link = new URL(await page.evaluate(() => window.__anandaOpenedUrls.at(-1)));
    assert.equal(link.hostname, "wa.me");
    assert.equal(link.pathname, "/94761432320");
    assert.equal(await page.locator('.call-alternative').getAttribute('href'), 'tel:+94767797873');
    assert.equal(await page.getByRole('button', { name: /Copy my/ }).count(), 0);
    const message = link.searchParams.get("text");
    for (const text of ["Hôtel & Spa + a quiet lunch", "2099-10-12", "09:30", "Guests: 2", "Woodwork & crafts", "Sri Lankan food", "one-way", "ස්තුතියි"]) assert.ok(message.includes(text), `Missing ${text}`);
    assert.equal(await page.locator(".mobile-ridebar").evaluate((node) => getComputedStyle(node).visibility), "hidden");
    await page.screenshot({ path: ".artifacts/screenshots/planner-mobile.png" });
  });

  await check("Browsing more stops preserves every enquiry field across both planners", async () => {
    await page.getByRole("link", { name: "Add another stop", exact: true }).click();
    await page.waitForURL("**/tours#explore", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Add this stop : Sigiriya Rock", exact: true }).click();
    await page.locator(".explore-bottom").getByRole("link", { name: /Plan with my/ }).click();
    await page.waitForURL("**/contact#plan", { waitUntil: "domcontentloaded" });
    await page.locator(".selected-stops li").first().waitFor();
    const verifyDraft = async () => {
      for (const [name, value] of [["pickup", "Hôtel & Spa + a quiet lunch"], ["date", "2099-10-12"], ["time", "09:30"], ["guests", "2"], ["notes", "Vegetarian food, please. ස්තුතියි!"]]) {
        assert.equal(await page.locator(`[name="${name}"]`).inputValue(), value);
      }
      assert.equal(await page.getByRole("checkbox", { name: /Bring me back to my hotel/ }).isChecked(), false);
      assert.equal(await page.locator(".selected-stops li").count(), 3);
    };
    await verifyDraft();
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator(".selected-stops li").first().waitFor();
    await verifyDraft();
  });

  await check("Returning from the planner hides the home bar until the stops section", async () => {
    await page.locator("#plan").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".mobile-ridebar")?.dataset.plannerVisible === "true");
    await page.locator(".nav-shell .brand").click();
    await page.waitForURL(`${base}/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector(".mobile-ridebar").dataset.exploreReached === "false");
    assert.equal(await page.locator(".mobile-ridebar").evaluate(node => node.inert), true);
    await page.locator("#explore").evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY - 120, behavior: "instant" }));
    await page.waitForFunction(() => getComputedStyle(document.querySelector(".mobile-ridebar")).visibility === "visible");
    assert.equal(await page.locator(".mobile-ridebar").getAttribute("data-planner-visible"), "false");
    await go("/contact#plan");
  });

  await check("The menu supports keyboard use, navigation and focus return", async () => {
    await page.getByRole("button", { name: "Open menu" }).focus();
    await page.keyboard.press("Enter");
    await page.getByRole("dialog", { name: "Where shall we go?" }).waitFor();
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("button", { name: "Open menu" }).evaluate((node) => node === document.activeElement), true);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Explore", exact: true }).click();
    await page.waitForURL("**/tours", { waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("dialog[open]").count(), 0);
  });

  await check("Interest filters show the right stops without losing the selected stops", async () => {
    await page.getByRole("button", { name: "Crafts & shops", exact: true }).click();
    assert.equal(await page.locator(".experience-card").count(), 2);
    assert.equal(await page.locator('.experience-card[data-selected="true"]').count(), 1);
    await page.getByRole("button", { name: "Herbs & massage", exact: true }).click();
    assert.equal(await page.locator(".experience-card").count(), 2);
    await page.getByRole("button", { name: "Everything", exact: true }).click();
    assert.equal(await page.locator(".experience-card").count(), 10);
    assert.equal(await page.locator(".selected-stops li").count(), 3);
  });

  await check("An outing idea carries its stops and ride type into the planner", async () => {
    await page.getByRole("button", { name: "Clear stops", exact: true }).click();
    await page.getByRole("link", { name: "Choose this outing", exact: true }).first().click();
    await page.waitForURL("**/contact?ride=outing#plan", { waitUntil: "domcontentloaded" });
    await page.locator(".selected-stops li").first().waitFor();
    assert.equal(await page.locator(".selected-stops li").count(), 2);
    assert.equal(await page.getByRole("radio", { name: "A few stops", exact: true }).isChecked(), true);
  });

  await check("FAQ state remains correct through rapid toggles and keyboard input", async () => {
    const question = page.getByRole("button", { name: "Can you pick me up at my hotel?", exact: true });
    await question.click();
    await question.click();
    await question.focus();
    await page.keyboard.press("Enter");
    assert.equal(await question.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#faq-answer-0").isVisible(), true);
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#faq-answer-0").isVisible(), false);
  });

  for (const [width, height] of [[320, 640], [360, 800], [390, 844], [430, 932], [844, 390], [1440, 900]]) {
    await check(`Home and planner fit ${width} × ${height}`, async () => {
      await page.setViewportSize({ width, height });
      await go(); await fits();
      if (width === 390 || width === 1440) {
        await photoReady(".hero-photo-frame img");
        await page.waitForFunction(() => !document.querySelector('.hero-actions').style.opacity);
        await page.screenshot({ path: `.artifacts/screenshots/home-${width}.png` });
      }
      await go("/contact"); await fits();
      const controls = await page.locator(".planner-form .btn-brand, .planner-form .form-field input, .planner-form .form-field select").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
      assert.ok(controls.every((height) => height >= 44), `Small controls: ${controls}`);
    });
  }

  for (const width of [320, 390, 1440]) {
    await check(`Content fits with 200% text at ${width}px`, async () => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/", "/tours", "/about", "/contact"]) {
        await go(route);
        await page.evaluate(() => { document.documentElement.style.fontSize = "32px"; });
        await fits();
      }
    });
  }

  await check("Reduced motion keeps content and controls usable", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await go();
    assert.equal(await page.locator(".hero-copy").evaluate((node) => getComputedStyle(node).opacity), "1");
    assert.equal(await page.locator(".hero h1").evaluate((node) => getComputedStyle(node).transform), "none");
    await page.getByRole("button", { name: "Open menu" }).click();
    assert.equal(await page.locator("dialog[open]").getAttribute("data-instant"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog[open]").count(), 0);
  });

  await check("No runtime errors occurred", async () => { assert.deepEqual(errors, []); });
  console.log(JSON.stringify({ passed: report.filter((item) => item.passed).length, total: report.length, failures, checks: report }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally { await browser.close(); }

# Implementation record

Plan: `2026-10-01-service-content-plan.md`.

The user approved implementation with “go”. Confirmed services: short rides, outings with several stops, hotel pickup, waiting at attractions and hotel return. Keep the existing visual identity, friendly simple English, mobile-first composition and deliberately choreographed motion.

## Decisions

- Work in the existing checkout. The approved visual draft and components already contain substantial uncommitted work; a new worktree would omit that starting point. Do not commit, reset or move those changes.
- Use built-in Node tests for meaningful enquiry encoding, missing contacts and saved-selection validation. Verify copy and motion in the browser rather than writing tests that mirror markup.
- Analytics stays deferred as agreed in the plan. The installed Mixpanel skill explicitly targets the emmathining app, which this repository is not.
- Initially no real contact number or final domain had been supplied. The temporary copy fallback was used until the owner confirmed the numbers on 2026-10-02; the latest WhatsApp handoff is recorded below.
- Use existing local travel imagery and suitable category imagery without claiming any unverified person is Ananda or that a generic photo is an actual partner venue.

## Progress

- Context and installed Next.js server/client, image and metadata guides read.
- Shared stop content and session selection implemented. Guests can select individual stops, filter interests and start with an outing idea.
- Enquiry draft helpers: six tests observed failing before implementation, then six passing. Unicode and line breaks are preserved; missing/malformed/placeholder phone numbers cannot open a chat.
- Home, Explore, About Ananda and Arrange a ride now use the service content. Visible unverified prices, ratings, reviews and personal statistics are removed. Confirmed pickup, waiting and hotel return are explained.
- Mobile layout and scoped motion implemented. Native dialogs provide focus containment and restoration. Reduced motion disables choreography; smooth wheel scrolling is limited to wide screens with a fine pointer.
- Local WebP photos and locally bundled Fraunces/Inter fonts added. Source credits and official font licenses retained.
- Next.js production build passed, including TypeScript and all four routes. Initial rendered browser pass: no runtime errors, desktop page width fits its viewport.
- The in-app browser automation runtime could not initialize its kernel assets and the agent-browser CLI is not installed. Use the supplied Playwright runtime with system Chrome as the verification fallback; no browser dependency was added to the app.
- Reuse the existing project dev server at `http://localhost:3001`, identified by its project directory in the Next.js log. Port 3000 serves another project. Do not stop that other project.
- Full browser interaction and enlarged-text verification, final review and final build checks follow.

## Final review and repairs

- A fresh independent reviewer reproduced two planning-flow bugs: leaving a visible planner kept the mobile action hidden, and browsing additional stops discarded the entered hotel and notes. Both are repaired. The route observer resets its visibility flag, and both planners share a validated session draft. Draft details stay in the current browser session and are only shared when the guest copies or sends the request.
- Added Dambulla and Sigiriya to the opening screen, as required by the approved content plan. One-way enquiries no longer ask for a return-trip quote.
- Regression assertions for the one-way message and saved enquiry data were observed failing, then passing. All seven enquiry tests pass.
- Native place dialogs now request their photo when opened, avoiding a hidden lazy image. Enlarged-text layout adjustments allow cards, headings, navigation and form rows to reflow on narrow screens.
- The reused development server stopped during verification. The latest production build passed; verification continues against an isolated production preview at `http://localhost:3100`. Port 3000 and the other project remain untouched.
- Whole-project ESLint passed after the final interaction repairs.
- Repeated planner navigation exposed a hash duplication in the installed Next.js route cache (`route.canonicalUrl + url.hash`). Section links now use native anchors, retaining correct URLs and scroll targets while the validated session draft preserves the enquiry. Ordinary page navigation continues to use Next.js Link.
- Category assets now use their original licensed photo URLs rather than the source pages' branded social-preview variants.
- The last phone preview brought the form ahead of the practical notes and reduced its introduction. Native anchors now use one header offset rather than stacking scroll margin and scroll padding.

## Completed verification

- Latest production build: passed, including TypeScript and all four routes.
- Whole-project ESLint: passed without errors or warnings.
- Enquiry unit tests: 7/7 passed.
- Production-browser checks: 21/21 passed. Covered stop selection, form preservation across browsing and reloads, native dialog focus/Escape, mobile navigation, outing prefills, filters, rapid FAQ toggles, widths 320–1440px, landscape, 200% text, reduced motion and runtime errors.
- Visual captures inspected on desktop and in a 390px touch viewport. Images and local fonts load correctly. Physical-device keyboard and display-safe-area behavior cannot be reproduced fully by headless emulation.
- Local production preview remains available at `http://localhost:3100`. No deployment, commit or reset performed.
- Business setup at this stage awaited Ananda's WhatsApp number and final HTTPS domain. The phone numbers have since been supplied and connected below. The final domain remains needed for sharing metadata and a printable visiting-card QR.

## Visual restoration — 2026-10-02

- Restored the user's full-screen, timed Sigiriya/Dambulla/Minneriya photo showcase, with manual selection, scenic crossfades, subtle drift and photo parallax. Added visibility/interaction-aware pause/play, instant keyboard selection and live reduced-motion handling.
- Restored the coordinated opening entrance and the earlier 1.2s desktop wheel smoothing. Phone touch remains native. GSAP, native timelines and WAAPI follow the installed project motion skills.
- Reduced the homepage from eight sections to five. Keep hotel pickup, waiting, hotel return and price agreement clear. Separate the three destinations from six local interests; keep outing ideas on Explore. Card Add actions align across grid rows.
- Final build, whole-project lint, 7 unit checks, 21 visitor-flow browser checks, 10 motion browser checks and 6 showcase browser checks passed. Inspected settled mobile/desktop captures. Final mobile Lighthouse: 82 performance, 100 accessibility/best practices/SEO, 80ms blocking, 0 layout shift; simulated LCP 4.7s.
- Details and the motion-review verdict: `2026-10-02-motion-and-ui-polish.md`. Production preview remains at `http://localhost:3100`.

## Owner's voice and contact handoff — 2026-10-02

- The owner confirmed WhatsApp `+94761432320` and calls `+94767797873`, and asked for a constants file. Both are saved in `src/lib/contact.ts`; WhatsApp and call links use their respective numbers.
- Replaced the planner's copy action with a WhatsApp request containing all selected stops and enquiry fields. The guest sends the prefilled message in WhatsApp; no message is sent automatically. The browser checks intercept this navigation without contacting anyone.
- Changed the live website's service descriptions, introduction, FAQs and booking notes to Ananda's first-person voice. The enquiry remains written by the guest to him.
- Restored the earlier service/navigation/photo icons and the classic GSAP fade-and-rise entrances, gentler opening zoom and heading rise, GSAP photo parallax and original Lenis wheel feel. The full-screen three-destination showcase uses the earlier slow zoom and crossfade without an additional scroll transform on its background.
- Kept the “More than the sights” photo section, short copy, five homepage sections and aligned Add actions. Did not restore unverified fares, ratings, portraits or testimonials.
- Reproduced a focused card continuing to animate inside a nested stagger. Separate item tweens now let focus stop that card immediately; confirmed it stays visible and still on subsequent frames. The saved-draft browser check also now waits for hydration before reading server-rendered form state.
- Final production build and whole-project lint passed. All 7 unit, 21 visitor-flow, 10 motion and 6 showcase checks passed. Inspected mobile/desktop captures of the preserved photo section, destination showcase and WhatsApp form.
- Mobile Lighthouse measured 81 performance and 100 accessibility/best practices/SEO, with 120ms blocking and no layout shift. Matched the slideshow's accessible name to its visible label; the targeted label audit and the showcase checks passed after that correction. Details and the final **Approve** review are in `2026-10-02-motion-and-ui-polish.md`.
- Preview remains at `http://localhost:3100`. The supplied phone numbers are fully connected; only the final website domain is still needed for the printable QR and canonical sharing metadata. No deployment, commit or reset performed.

## Motion refinement — 2026-10-02

- Refined the approved choreography: a shorter overlapping destination entrance, quicker caption transitions, subtle service-detail staggering and lighter mobile reveals. Removed the additional parallax scrub delay while retaining desktop Lenis and native phone touch scrolling.
- Replaced dialog/backdrop restart keyframes with interruptible CSS transitions and starting states. The backdrop uses opacity; panels use the installed skill's drawer curve. Keyboard focus completes the destination entrance before activation.
- Final production build, whole-project lint, 21 visitor-flow checks, 11 motion checks and 6 showcase checks passed. The new check closes a dialog during its entrance and confirms no jump, smooth reversal and restored focus. Mobile/desktop visual captures reviewed.
- Motion review **Approve**; detailed table and verification in `2026-10-02-motion-refinement.md`. No installation was needed. Preview remains at `http://localhost:3100`.

## Footer and slideshow control — 2026-10-02

- Rebuilt the footer around Ananda's brand and introduction, a ride-planning link, page navigation and separate WhatsApp/call contacts. Phone labels remain derived from the saved constants. The layout stacks on phones, uses two columns on tablets and three on desktops; links keep comfortable touch targets.
- Removed the visible “Pause slideshow” control and its unused state/styles. Keep timed destination switching, manual photo selection, pausing during focus/hover, offscreen/hidden-tab pausing, reduced motion and data saving.
- Footer captures and contact/touch/layout checks passed at 320/390/900/1440px. All six destination checks passed. The enlarged-text visitor check found the larger footer wordmark overflowing at 320px; constrained its width and allowed wrapping rather than hiding or shrinking text.
- Final production build, whole-project lint and all 21 visitor-flow checks passed after the fix, including 200% text at 320/390/1440px. The focused overflow check also found no overflow while page motion ran. Preview remains at `http://localhost:3100`.

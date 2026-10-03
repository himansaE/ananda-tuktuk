# Ananda’s homepage story plan

**Status:** B selected by the user on 2026-10-03, with a request for a stronger opening animation, more motion and smoothness. The live homepage has not been changed for this plan.

**Scroll refinement:** The user selected Cinema and approved its overall feel, then requested removal of top-exit motion. The B preview keeps scroll-controlled entry, photo parallax, smoothing and microinteractions; content stays clear as it leaves the top. See `2026-10-03-continuous-cinema-motion.md`; it supersedes the once-only motion settings below. Production integration remains a later step.

**Purpose:** A visitor who scans Ananda’s QR code should quickly understand who he is, where he drives and how to arrange a ride. The page should feel welcoming and visual, with short, simple English in Ananda’s voice.

**Skill used:** The supplied `C:/Users/himan/Downloads/storytelling-web-1.0.0.tar.gz`, including its scrolling-mode and style-preset references. Use its scrolling story approach and three visual previews. Adapt the direction to the existing website: keep the approved Fraunces/Inter fonts, cream/red palette, real interactions and restrained GSAP motion.

## What stays

The user confirmed these two sections must remain unchanged:

1. **Full-screen destinations:** `DestinationShowcase` — Sigiriya, Dambulla and Minneriya; existing photographs, timed switching, manual choices, captions, responsive layout and animation. Keep the current absence of a visible “Pause slideshow” control.
2. **“More than the sights”:** home-mode `ExperienceBrowser` — the six photo cards, descriptions, aligned Add buttons, details sheets and selected-stop behavior.

Their component code, photographs, CSS rules and motion hooks are protected. Changes to surrounding sections must not alter them indirectly through global typography, containers, spacing or animation settings.

Also retain the current navigation, proper footer, mobile ride bar, separate phone constants and WhatsApp booking flow. About, Places and Arrange pages keep their current behavior.

## Selected direction

**B — Open-road cinema.** Keep the photograph-led opening the user selected, with a stable cream reading wash. Refine the opening with a gentle camera settle, a two-line headline entrance and short supporting-copy stagger. Add restrained scroll parallax and once-only section reveals; keep touch scrolling native.

Three self-contained, animated opening studies are available in `.agent-design/storytelling-web/`:

| Direction | Character | Tradeoff |
| --- | --- | --- |
| A: Roadside editorial | Clear text, generous spacing, wide photograph | The opening prioritizes understanding the service. |
| **B: Open-road cinema — selected** | Large scenic photograph with a calm reading area | More atmosphere; use a bounded mobile height and keep the reading area stable. |
| C: A note from Ananda | Personal introduction with a small photo detail | Warm and direct, with less emphasis on the places. |

The A and C previews show opening styles. B now also includes the proposed ride section to demonstrate scroll motion. Their planning labels and Replay opening control are not proposed website content; the real navigation stays. They reuse existing illustrative travel photographs, not a portrait of Ananda. No new libraries or downloaded skills are needed.

## The page’s story

Keep five main sections, followed by the existing footer. Give each section one job.

| Order | Visitor’s question | Section | Pace |
| --- | --- | --- | --- |
| 1 | Who is this, and what can I arrange? | Clear introduction to Ananda’s tuk-tuk service | Quick |
| 2 | Where can we go? | **Existing full-screen destination switcher — unchanged** | Slow, photographic |
| 3 | What else could I enjoy? | **Existing “More than the sights” — unchanged** | Browse and choose |
| 4 | What happens during my ride? | One compact pickup, waiting and return explanation | Simple and reassuring |
| 5 | What should I know before asking? | Existing compact “Good to know” questions | Quick answers |
| Ending | How do I get in touch? | Existing footer and mobile ride bar | Direct action |

The current homepage introduces Ananda in both the opening and `MeetAnanda`, while the practical ride information is spread between sections. Replace the second introduction with the ride explanation. Avoid adding another destination grid, benefits grid, outing gallery, reviews carousel or large booking banner.

## 1. A clearer opening

**Proposed copy**

- Small line: **Tuk-tuk rides · Dambulla & Sigiriya**
- Heading: **Hop in. Let’s explore.**
- Introduction: **I’m Ananda. Tell me where you’d like to go, or let’s choose a few stops together.**
- Primary action: **Choose your stops** → existing `/tours#explore`.
- Secondary action: **Plan a ride** → existing `/contact#plan`.

The small line identifies the service and location. The first-person introduction invites visitors to choose their outing. The ride explanation below covers pickup, waiting and the option of a one-way drop-off.

**Mobile:** scenic photograph above and behind the lower reading area, with text followed by actions. Use 20–24 px side gutters and a bounded minimum height of about 620–760 px, allowing the section to grow naturally for enlarged text. Avoid pinning or requiring a swipe to dismiss an introduction. Both actions remain reachable without waiting for an animation.

**Desktop:** photograph fills the opening; headline and supporting copy share a row near its lower edge. A static cream gradient protects contrast while the image moves behind it. Preserve the existing site’s type character and red accent. Do not add decorative icons to every sentence. Retain useful action and contact icons where they communicate behavior.

Use one short introductory paragraph, no additional slogan or repeating service chips. The top navigation and footer already carry the brand and contact routes.

## 2–3. The protected sections

Render `DestinationShowcase` and `ExperienceBrowser` in their existing order and with their existing props. Do not rebuild, restyle, retime, remove icons from or add text to either section.

Their jobs are already distinct: the switcher inspires a destination choice; the cards show food, crafts, relaxation, heritage, herbs and a lake visit. The existing All places link provides the fuller catalogue.

## 4. One practical ride story

Replace only the homepage’s `MeetAnanda` instance with a home-specific section. Keep `MeetAnanda` available unchanged for the About page.

**Heading:** **I’ll take care of the ride.**

**Introduction:** **A quick trip or a few stops — tell me what you have in mind.**

Use three short lines arranged as a single journey, not three separate feature cards:

1. **Hotel pickup** — I meet you at the place we agree.
2. **Your stops** — I wait while you explore.
3. **Back to your hotel** — Or a one-way drop-off, if you prefer.

**Closing line:** **We’ll agree the stops, waiting time and price before we go.**

Use the existing country-road photograph beside this explanation on desktop and below it on mobile. A thin static connecting rule can support the numbered sequence. Text and reading order must work without that rule; no animated travelling vehicle, route tracing or sticky sequence is needed.

Finish with one **Plan a ride** action and a quiet **About me** text link. Do not repeat a biography, phone numbers or a second list of every possible stop.

## 5. Practical answers and a useful ending

Keep the current compact FAQ and its four topics: price, separate costs, optional shopping, and family/luggage arrangements. No duplicate FAQ about pickup and waiting is needed here.

Keep the existing footer as the ending. Its Explore links, Plan a ride action, WhatsApp number and call number already give visitors clear ways forward.

- WhatsApp requests: **+94 76 143 2320**, from `src/lib/contact.ts`.
- Calls: **+94 76 779 7873**, from the separate constant in the same file.
- The planner carries selected stops and guest details into WhatsApp. The visitor presses Send there. Do not replace it with copying text or claim a request has been sent before that happens.

Do not invent prices, availability, review scores, testimonials or a photograph of Ananda. Tickets, food, treatments, shopping and safari jeeps remain separate unless his agreed quote includes them.

## Motion and mobile performance

Use the skill’s purposeful motion and varied pacing while preserving the established animation system.

- Leave both protected sections’ existing choreography untouched.
- Opening: settle the photograph from scale 1.075 to 1 over 1.4 seconds. Reveal the location, two headline lines, supporting copy and actions with a 60 ms stagger and 650 ms entrances (400 ms for actions), using the existing strong ease-out token. This longer image motion belongs to the occasional marketing opening; ordinary UI remains under 300 ms. Keep the reading wash stable, avoid a loader and finish decorative animation immediately on keyboard focus.
- New ride section: reuse `MotionSection` and its once-only reveal, 12 px on small screens or 20 px on large screens, about 0.55–0.65 seconds. Group related copy together; avoid a long stagger across individual words or steps.
- Photograph parallax: use independent layers for opening zoom and scroll translation so they do not compete. Restrict travel to roughly ±2.75% on mobile and ±4% on desktop, with 6% image overscan. Use a direct scroll-linked transform without a second smoothing delay. The standalone B study uses passive scroll events and a single requested frame for visible images; production should reuse the established GSAP/Lenis system and keep touch scrolling native.
- Animate transforms and opacity. Do not animate layout height, blur, large shadows or background filters during scrolling. No new pinning, scroll interception, progress bar, particles or endlessly bouncing prompts.
- Reduced-motion and Save-Data visitors get a fully readable static layout. Focus, touch and selected-stop controls never wait for a reveal.
- Reuse local optimized images. Give the first image explicit responsive sizes; lazy-load the lower photograph. Set aspect ratios to reserve space. Add no animation package, video background or remote font dependency.
- Keep controls at least 44 px tall, mobile actions easy to reach, body copy around 16 px and natural wrapping at 320 px and 200% text size. Preserve visible focus and sufficient text contrast.

## Boundaries for a later implementation

This is a proposed design, not an instruction to execute changes during this planning request.

| File | Future responsibility |
| --- | --- |
| `src/components/Hero.tsx` | Apply the selected opening layout and short first-person copy. Keep the existing link and motion utilities. |
| `src/components/HomeRideStory.tsx` — new | Home-only pickup, waiting and return explanation using the existing photo and `MotionSection`. |
| `src/app/page.tsx` | Replace only the home `MeetAnanda` instance with `HomeRideStory`. Preserve section order. |
| `src/app/globals.css` | Add scoped rules for the changed opening and new ride section. Do not change shared type/container rules or either protected section’s selectors. |

Before coding, read the relevant installed Next.js 16 guides in `node_modules/next/dist/docs/`, as required by this repository. No dependency installation, contact-number change, analytics integration, route refactor or asset replacement is part of this design.

## Review checks for implementation

1. Capture the two protected sections at mobile and desktop widths before editing. Compare their layout, imagery, type, controls and motion afterward; no changes are expected.
2. Check the opening and new ride story at 320, 390, 768 and 1440 px, plus 200% text sizing. No horizontal overflow or clipped actions.
3. Check the first viewport explains tuk-tuk rides, location and Ananda’s role without opening a menu or waiting for animation.
4. Keep the existing destination timer, manual choices, automatic suspension, photo details, Add buttons and selection persistence working.
5. Select stops, navigate to the planner, fill a request and inspect the generated WhatsApp link. Confirm it targets the WhatsApp constant, preserves the request and leaves actual sending to the visitor. Confirm calls use the separate call number.
6. Verify keyboard focus, reduced motion, Save-Data and native touch scrolling. Check new transforms do not produce photo-edge gaps or delayed reversal.
7. Run the existing build, lint and meaningful visitor-flow checks once the actual page changes are made. Use a real phone check for Safari/Android behavior; browser emulation alone does not prove that.

## Planning artifacts

- Comparison: `.agent-design/storytelling-web/index.html`
- Selected opening and scroll study: `.agent-design/storytelling-web/style-b.html`
- Alternatives: `style-a.html` and `style-c.html` in the same directory.

The preview documents embed the approved fonts and illustrative image, use finite lightweight CSS motion and work independently of the application. Production would keep assets shared and optimized through the existing Next.js setup.

**Preview verification:** The 20 cross-direction checks passed again after B’s refinement: 320/390/1440 px layouts, loaded fonts and photographs, action sizes, reduced motion, visible content without JavaScript, doubled text sizing and the comparison page. B also passed motion checks at 320/390/768/1440 px covering opening replay, instant keyboard settling, parallax, scroll reversal, once-only reveals, headline masks, image-edge coverage and live reduced-motion changes. Save-Data and native-touch settings passed separate checks. The selected mobile and desktop previews were visually reviewed. These checks cover planning artifacts only; the future implementation checks above still apply to actual website changes.

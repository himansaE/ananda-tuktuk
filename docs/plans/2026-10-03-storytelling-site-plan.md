# Ananda’s website — storytelling plan

Status: **B — Local notebook selected and implemented** on About and the homepage’s supporting sections. Checkpoint `cb104ac` preserves the website before this work. The earlier concepts and page analysis below are archived context.

## Selected B implementation

### Subsequent motion and interaction refinement

The user subsequently requested stronger motion, tighter stop cards and a section swap. The homepage now runs: hero → ride options → More than the sights → destination showcase → gallery → testimonials → FAQ. The original hero content and destination-switcher functionality remain; the hero opening and card actions were intentionally revised.

| Before | After | Why |
| --- | --- | --- |
| Small simultaneous hero entrance | Masked headline lines, staggered supporting copy and a 1.35s photo settle | Give the opening a deliberate sequence while keeping actions available |
| One-time home card reveals; some page intros had no motion targets | Reversible Cinema entrances across the cards, FAQ rows, About and Arrange intros | Consistent scroll response; no top-exit fade |
| Focusing one control settled the entire section | Only the containing animated item settles | Preserve motion elsewhere and keep keyboard controls readable |
| Lenis duration-based easing, fine-pointer-only activation | Frame-independent damping at 0.065 for wheel input, including hybrid devices | Longer controlled glide; touch retains native momentum |
| Always-visible home ride bar and instant count replacement | Bar appears at the stops section, stays below it, hides on return; 260ms rolling count | Reveal the action when relevant and acknowledge additions/removals |
| Add actions at the bottom of equal-height card text | 44px selection pills on the photograph; interruptible plus/check transition | Remove the unhelpful gap while keeping row actions aligned |

Bar boundary checks handle direct scroll jumps as well as normal scrolling, retain the planner/keyboard hiding rules, and remove hidden controls from keyboard navigation. Reduced motion skips the new movement. Validation passed: production build and lint; 7 unit, 21 visitor-flow, 11 motion and 6 destination-showcase checks; targeted counter/bar/section-order checks and all four routes at 320/390/768/1440px.

- Removed “A note from your driver” from the selected preview; it is absent from the actual About page.
- Kept the restored Home hero, destination switcher and “More than the sights” components and their motion unchanged.
- Added the notebook photo composition to About, with open ride rows and a lake panorama. Removed repeated About introductions and arrangement sections.
- Added six tourist-photo placeholders and three generated, clearly labelled sample testimonials to Home, as requested. No invented names, ratings or review-platform claims.
- Used the installed Tabler Icons for new controls and replaced character arrows in the HTML study with Tabler SVG output.
- Replacement photos, captions and quotes are centralized in `src/lib/guest-content.ts`. Set a real local photo path and descriptive alt text for each photo. Replace each generated quote and attribution before changing its `sample` flag to false.
- Actual pages: `http://localhost:3100/` and `http://localhost:3100/about`. The three-way concept study at port 3300 remains available for comparison.
- Validation: production build, TypeScript, lint, 7 unit checks, 21 visitor-flow checks and 11 motion checks pass. Home/About also pass 320/390/768/1440px layout checks and notebook reduced-motion cleanup. The hero test now waits for the opening camera animation to finish before measuring scroll movement.

## New direction study — October 3

The earlier study described a different structure without demonstrating a strong enough visual difference. The replacement uses actual photographs, visitor-facing copy and working interactions. About is the test page, so the protected homepage sections remain untouched.

Open `http://localhost:3300/`. The replacement `ananda-story-plan.html` is a self-contained, three-tab concept study with inline CSS/JavaScript and embedded local fonts and photographs. It follows the supplied storytelling skill’s discovery → narrative analysis → three visual previews → selection workflow, supported by the project’s design-taste skill.

| Concept | Hook and composition | Interaction |
| --- | --- | --- |
| A — A day unfolds | “I’ll drive. You discover.” Large landscape opening followed by sights, food/local stops, then a slower moment and the ride back | Desktop photo stays beside three chapters and crossfades with scroll position; each mobile chapter gets its own photo. Gentle opening-photo drift. No top-exit text animation |
| B — Local notebook | “A little more along the way.” A collection of photo prints, a personal note, open numbered rows and a lake panorama | Quieter editorial alternative with clear links and restrained button feedback. Static photo angles, no floating or spinning |
| C — Choose your day | “What feels like your day?” Three interests change one photographic scene and its suggested starting point | Working photo/copy choices and an idea-selection control. On mobile the choices sit above the changing image. Preview state is explicitly labelled and does not update the production draft |

Recommendation: A offers the clearest About narrative and strongest scroll experience. C’s useful choice interaction would fit near the start of Places. B is a warmer, less cinematic alternative. The user has not selected a direction yet.

Two optional questions are pending: whether the protected homepage sections must retain their exact appearance, and whether the user has a reference website or desired feeling in mind. Until answered, preserve the restored hero, destination switcher and “More than the sights” exactly.

All three concepts were checked at 320px, 390px and 1440px for overflow and runtime errors. Choice changes, selection feedback, reversible desktop photo chapters, keyboard switching and reduced motion pass. Desktop and mobile screenshots were visually inspected. No live WhatsApp messages were sent.

Next: carry the selected composition through About and the visual language through the other routes. Home introduces, About reassures, Places helps choose and Arrange completes the request. Keep the real booking engine, contacts, persisted draft and protected sections. The earlier page breakdown below is background content analysis, not an approved visual design or a description of the current preview.

## Skill and decisions

Source: the user’s `C:/Users/himan/Downloads/storytelling-web-1.0.0.tar.gz`. Read directly from the archive: `SKILL.md`, `references/scrolling-mode.md`, and `references/style-presets.md`.

The skill’s discovery questions are already answered by this conversation: tourists scanning a hotel or driver QR code, short simple first-person English, mobile-first, a scrolling story, friendly confidence with cinematic atmosphere. A/B/C previews were previously shown and B was chosen. This plan continues that decision and the subsequent corrections rather than restarting style selection.

The skill is applied through its narrative analysis: opening hook, story arc, key moments, pacing and ending; its varied section types; and a self-contained visual planning artifact. `ananda-story-plan.html` has four selectable page studies, inline CSS/JS, embedded local fonts and images, and no external runtime dependencies.

Adaptations to the skill are explicit. Its generic font/layout bans and full-screen hero examples yield to the user’s restored home hero and protected components. Existing Fraunces/Inter and cream/red stay for consistency. Next.js remains the production app; the single-file requirement governs this planning artifact. The sample bounce, one-time reveals and progress-bar code are examples, not additions to copy into the site. User-approved motion remains reversible entry with no top exit, smooth desktop scrolling and native touch.

## Fixed boundaries

- Home hero: keep the restored composition, copy, actions, service icons and rounded photograph.
- Full-screen timed Sigiriya/Dambulla/Minneriya switcher: preserve its layout, motion and controls.
- Home “More than the sights”: preserve its photos, aligned Add buttons, selection, sheets and layout.
- Keep the proper footer, navigation, mobile ride bar, session-persisted draft and WhatsApp request behavior.
- WhatsApp `+94761432320`; calls `+94767797873`. A visitor presses Send in WhatsApp; the site cannot claim delivery.
- No invented biography, driver portrait, reviews, years of experience, availability or prices. Existing illustrative photos are scenery, not evidence of Ananda’s identity.

## One story across four pages

The visitor’s progression is **understand → imagine → choose → arrange**. Visitors may land on any page or go directly to the planner. Scrolling never gates navigation or booking.

| Page | Visitor’s question | Main job | Ending |
| --- | --- | --- | --- |
| Home | What is this service? | Introduce Ananda, show destinations and extra stops, explain the ride | Plan a ride / footer contacts |
| About | What will riding with you be like? | Explain personal help, pace, waiting and optional stops | Choose stops or ask for ideas |
| Places | What would I enjoy? | Help compare stops and build a flexible outing | Continue with selected stops |
| Arrange | How do I ask? | Prepare one clear WhatsApp request | Send the prepared message and await confirmation |

## Home: an invitation that becomes a practical plan

| Beat | Section / visitor-facing copy | Treatment | Pace |
| --- | --- | --- | --- |
| Hook | Existing “Hop in. Let’s explore.” hero | Protected restored composition | Quick understanding |
| Imagine | Existing full-screen destinations | Protected photo chapter and timed choices | Slow scenic moment |
| Personalise | Existing “More than the sights” | Protected cards and Add controls | Browse at your pace |
| Reassure | “I’ll take care of the ride.” | One image–text chapter with pickup, waiting and return | Short, sequential |
| Resolve concerns | Compact “Good to know” | Price, extras, optional shops, family/luggage | Quick answers |
| End | Existing footer / mobile ride bar | Clear contacts and selected-stop continuation | Direct |

Keep the existing HomeRideStory copy. Refine its visual connection to the preceding cards: short opening, a single journey line, then one Plan a ride action and an About me link. No extra biography, destination grid or booking banner on Home. Do not add a separate full-screen photo merely to create more animation.

## About: personal reassurance, not a second catalogue

Current repetition: the large hero and MeetAnanda both introduce Ananda and repeat the same road photograph; RideJourney, HowItWorks, full FAQ and BookingCTA repeat arrangement information.

Proposed four beats:

1. **Personal opening — “Hi, I’m Ananda.”** A compact editorial introduction: “I drive around Dambulla and Sigiriya. Tell me what you enjoy and how much time you have.” One scenic image beside the copy on desktop, below it on mobile. No implication that its pictured person is Ananda. One quiet Choose your stops link.
2. **Key reassurance — “Your day. Your pace.”** Three connected lines: “One stop or a few.” / “I can wait while you explore.” / “Shops are always your choice.” Give this text-led chapter generous whitespace. The optional-shopping line is the main confidence moment; avoid testimonial styling or quotation marks.
3. **Resolve — “We’ll agree before we go.”** Pickup, stops, waiting, return and price in one short paragraph. Two simple ride choices: A short ride / A few stops, using the current query parameters. Do not place a second three-step arranging grid directly afterward.
4. **Ending — “Not sure where to start?”** “Tell me what you enjoy. I’ll help you choose.” One Plan a ride action, followed by the existing footer. A compact set of relevant FAQ answers can sit here only if they add information; no duplicated pickup/wait/return questions.

Use the current content as the evidence base. Remove the second photo/intro and repeated HowItWorks/full FAQ/large BookingCTA from this route when implementing the approved plan. Keep shared components available elsewhere; remove only page instances.

## Places: discovery with choice always close

Current friction: the full-height decorative hero delays the catalogue; outing ideas and a full planner make one long page with repeated arrangement content.

1. **Hook — “What would you like to explore?”** Short heading and one sentence: “Sights, food, crafts or a little time to relax. Pick what you like.” A shallow photographic crop may support it on desktop; on phones show the first choices promptly. Avoid promoting masks as the representative image for every interest.
2. **Key moment — the existing full catalogue.** Keep categories, details sheets, Add feedback, button alignment and selection state. Let photographs do the explaining. Keep safari notes clear: a tuk-tuk connection is distinct from a safari jeep/park booking. Do not add a second set of destination cards.
3. **Transition — “Need an idea?”** Three compact, optional outing combinations. Preserve the exact stop IDs and query behavior. On mobile use stacked editorial rows with a small crop and simple route text; on desktop a wider row. This varies rhythm after the catalogue rather than repeating large cards. The combinations are suggestions, not fixed packages or prices.
4. **Ending — “Your stops. Let’s make a plan.”** Selected count and a Continue to arrange action using the existing persisted draft. Move the full Planner instance to Arrange only, so visitors complete one form in one place. Preserve the mobile ride bar and make continuation easy without choosing anything.

## Arrange: confidence through a clear request

1. **Hook — “Let’s plan a ride.”** “Share your pickup and stops. I’ll reply on WhatsApp to confirm the plan and price.” A compact opening, no photo hero or intro overlay.
2. **Key moment — the existing planner.** Selected stops, ride type, pickup, optional time/date/guests, return preference and notes. Maintain optional fields, native inputs, adequate targets and retained values. On mobile the form follows its one-line welcome immediately; no long assurances before it.
3. **Resolution — the WhatsApp action.** “Send request on WhatsApp” followed by “Your details open in my chat. Send the message and I’ll confirm the plan with you.” Keep the separate call option. Tickets, food, shopping and treatments are extra unless agreed otherwise; put this close to the request, once.
4. **Ending — relevant quick answers and the existing footer.** Price, extra costs, undecided stops and group/luggage. Avoid repeating pickup/waiting/return statements above and below the same form.

The form remains immediately usable; no stagger across fields, scroll-locked steps or mandatory route selection. Changes here are presentation and duplication cleanup, not a replacement booking engine.

## Rhythm and motion storyboard

| Element | Motion / purpose | Boundary |
| --- | --- | --- |
| Restored home hero | Its existing introduction and photo drift | Preserve user’s restored design |
| Protected switcher and home cards | Existing choreography | Do not alter through shared rules |
| New supporting chapters | Broad bottom entry: small rise and opacity settle; reverses on scrolling back | No top exit, no sudden trigger followed by a timed flight |
| Scenic images on About / ride story | Restrained photo drift on an overscanned layer | Avoid repeated zoom on every photo |
| Ride sequence | Thin line follows the sequence; text stays readable | Optional visual, not navigation |
| Catalogue / form / sheets | Immediate state feedback and existing sheet motion | Focus cancels decoration; form fields do not animate |
| Page endings | Calm, readable action area | No new full-screen booking billboard |

Desktop smoothing remains the approved Cinema feel, tested with real wheel reversal. Touch stays native. Animate transform/opacity, batch geometry reads, scope and clean up GSAP per route, refresh only for layout changes. Reduced motion and Save-Data get clear static content. No bounce, cursor follower, blur, scroll snapping or pins.

## Future implementation sequence

1. Capture and hash protected component/CSS behavior and verify the restored hero at mobile/desktop widths.
2. Refine About’s story and remove repeated page instances; implement scoped section styles.
3. Shorten Places’ opening, give outing suggestions an editorial layout, replace its duplicate full planner with continuation.
4. Refine Arrange’s surrounding copy and relevant FAQ without changing request construction or persisted fields.
5. Fine-tune HomeRideStory/FAQ transitions around the protected sections; leave the restored hero and cards intact.
6. Review complete routes for visual rhythm before tuning individual animation values. Verify keyboard, reduced motion, 320px, 200% text, real wheel gestures, filtering, sheets, draft persistence and generated WhatsApp URL. No live messages need sending for verification.

## Review artifact and scope

Open `ananda-story-plan.html` to switch between the four visual page studies. It uses proposed visitor-facing copy and visible planning labels. Protected Home sections are represented by labelled placeholders; their layouts are not being redesigned in the study. The form area is a schematic, not a working booking form. Approval of this plan would authorize a later production implementation; the current task changes only planning files.

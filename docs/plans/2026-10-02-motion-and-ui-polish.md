# Ananda's voice, contact details and restored motion

The user asked to retain the full-screen Sigiriya/Dambulla/Minneriya destination switcher and the “More than the sights” photo section, restore the earlier icons and animation style, use first-person copy as Ananda, and replace copying a booking request with WhatsApp. Confirmed WhatsApp: `+94761432320`. Confirmed calls: `+94767797873`.

Project skills applied: GSAP React, ScrollTrigger, performance and timeline; Emil design engineering, design taste and animation review. Preserve the approved cream/red palette, local Fraunces/Inter fonts, routes, accessible dialogs and saved enquiry flow. Design variance 5, motion intensity 5, density 3.

## Content and booking

The homepage keeps five sections: Hero → DestinationShowcase → local experiences → MeetAnanda → four practical FAQs. The “More than the sights” cards keep their photos, short summaries and aligned Add actions. Icons return to service details, navigation, WhatsApp/call actions and photo controls. The longer outing ideas stay on Explore.

The live website speaks as Ananda: “I'm your local driver,” “I can wait” and “I'll confirm.” The generated request speaks as the visitor writing to him. The two phone constants are saved in `src/lib/contact.ts`; WhatsApp and call links use their respective numbers. The form opens a WhatsApp chat with all selected stops and enquiry details filled in. The guest sends the message in WhatsApp; the ride and price are agreed through the reply. The copy action has been removed.

## Motion contract

- Keep the full-screen background, cream wash and three photo controls. Auto-switch every five seconds with a 0.8s scenic crossfade. Restore the earlier slow 1.05–1.12 photo zoom over 12s, without an additional scroll transform on the same background.
- Only the active photo drifts. Preserve the outgoing photo's position during crossfade. Pause timers and drift outside the viewport, in a hidden tab, on focus/hover and through the explicit pause button. Reduced motion and data saving disable automatic switching and drift. Additional background images load near the section.
- Restore the earlier showcase entrance sequence: photo controls, heading, description and actions overlap in a scoped GSAP timeline. Pointer selection responds in 0.25s; keyboard selection is instantaneous. Captions fade out before changing, then fade in. Rapid selection cancels the previous transition and keeps the final caption visible.
- Restore the gentler opening: photo scale 1.03 to 1, heading rise 12px, supporting copy/actions rise 8px, using 0.4–0.6s timings. Focus completes the entrance immediately. The heading remains readable.
- Large photos use the earlier GSAP ScrollTrigger parallax, from -7% to +7% inside clipped overscan. The subsequent motion refinement uses direct scrub progress; Lenis already interpolates desktop wheel input. No pinning, horizontal scroll capture, native scroll timeline or WAAPI reveal competes with these transforms.
- Section entrances retain the classic rise and opacity fade, once per item. The subsequent motion refinement uses 12px/20px travel over 0.55s/0.65s with 60ms peer spacing. Each item has its own tween so focus can cancel it without a nested stagger continuing to write its transform. Focus makes the item immediately visible and still. Already visible content remains still.
- Fine-pointer devices use the original 1.2s Lenis smooth-wheel setting, driven by the GSAP ticker and synchronized with ScrollTrigger. Phone touch remains native. Reduced-motion/data-saving modes skip Lenis. Dialogs retain their own native scrolling. Destroy Lenis and remove ticker callbacks on cleanup.
- Animate transform/opacity; no animated blur, shadow or layout measurements per frame. Scope GSAP contexts and revert them on cleanup. Category filters and FAQ disclosure remain immediate.

## Motion review

| Before | After | Why |
| --- | --- | --- |
| Earlier icons removed in the simplification | Pickup, waiting, return, navigation, photo and contact icons restored | Recover the user's requested visual details while keeping short copy |
| Newer floating section effects and two scroll implementations | Classic GSAP fade/rise and one GSAP photo-parallax implementation | Restore the earlier feel and avoid competing transforms |
| Hero title/visual moved farther | Earlier small title rise and gentle photo zoom | Bring back the calmer opening choreography |
| Showcase combined background parallax and zoom | Earlier slow photo zoom with scenic crossfade | Preserve the full-screen destination composition without stacked motion |
| Caption changed before fading out | Fade out, change caption, fade in; rapid selection overwrites previous work | Keep image and caption changes coherent |
| Staggered batch could continue after a focused card was settled | Individual item tweens and immediate focus cancellation | Keep keyboard controls visible and still |
| “More than the sights” risked being removed or expanded | Existing six photo cards, simple summaries and aligned Add actions retained | Preserve the supplied section and remove repetition |
| Service described Ananda in third person | Owner's first-person voice; guest's voice in the enquiry | Make the website feel like Ananda speaking directly |
| Copy request with no configured number | Prefilled WhatsApp request; separate saved call number | Complete the intended booking handoff |

Verdict: **Approve**. The earlier visual components and motion are restored, with the supplied photo section retained. Keyboard focus and destination selection settle immediately; reduced-motion and data-saving preferences remain supported. Pointer controls respond in 250ms or less; longer timings are confined to the photographic marketing choreography and wheel smoothing. Contexts, observers, timers and ticker callbacks clean up. The slideshow's accessible name now matches its visible label, verified by a targeted audit. Physical-device Safari and low-end phone performance still need device testing; Chrome emulation cannot establish those results.

## Contact-restoration verification, before the subsequent timing refinement

- Final production build, TypeScript and all four routes: passed.
- Whole-project ESLint: passed without errors or warnings.
- Enquiry unit checks: 7/7 passed.
- Visitor-flow browser checks: 21/21 passed. Verified the exact WhatsApp recipient, all enquiry fields and selected stops, separate call number, guest-written message, saved drafts, navigation, keyboard dialogs, filters and outing prefills. Layouts fit 320–1440px, landscape and 200% text. No runtime errors.
- Motion browser checks: 10/10 passed. Verified aligned Add actions, forward/reverse phone/desktop parallax, smooth wheel scrolling, immediate keyboard focus, section entrances, data saving and live reduced motion.
- Showcase browser checks: 6/6 passed, including full-screen composition at 320/390/1440px, complete timed cycling, offscreen pause, pause/play, rapid selection, immediate keyboard selection and live reduced motion. Rechecked after the accessible-label correction.
- Phone and desktop views inspected, including the preserved “More than the sights” section and WhatsApp form. Preview: `http://localhost:3100`.
- Full mobile Lighthouse run: performance **81**, accessibility **100**, best practices **100**, SEO **100**. Simulated LCP **4.7s**, total blocking time **120ms**, cumulative layout shift **0**. These are local lab measurements, with slower-network loading still limiting LCP. Reports: `.artifacts/lighthouse-mobile-personal.report.json` and `.html`.
- The full audit additionally flagged an experimental visible-label/accessibility-name mismatch on the slideshow control. Removed the redundant label so the button's visible text is its accessible name. A targeted rerun against the final build passed with no findings: `.artifacts/lighthouse-label-final.json`. The accessibility-only correction does not change the performance choreography.

No real WhatsApp chat or message was opened by the automated booking checks. No deployment, commit or reset was performed. Phone numbers are configured; only the final HTTPS domain remains for canonical sharing metadata and a printable QR code.

# Motion refinement

Keep the owner's approved full-screen destination component, photographic interests section, cream/red identity, first-person content and WhatsApp booking. Refine the motion using the installed GSAP React/timeline/performance, Emil design engineering and animation-review skills. No additional dependency or skill installation is needed.

## Purpose and timing

The hero and destination entrance are occasional marketing choreography. Stagger the supporting details and bring the content into view as one short sequence. Keep the slow photographic zoom and scenic crossfade. Stop entrance movement as soon as keyboard focus reaches the component.

Scroll parallax provides photographic depth. Use direct ScrollTrigger progress; Lenis already supplies desktop wheel interpolation. Touch scrolling remains native. Section entrances use a short 12px mobile/20px desktop rise, 0.55s/0.65s power3.out and 60ms peer spacing. Each card retains its independent tween so focus can stop it immediately.

Dialog motion expresses a panel arriving from the lower edge. Use 250ms CSS transform/opacity transitions with the skill's drawer curve, `cubic-bezier(.32,.72,0,1)`. Exit in 200ms with the existing ease-out token. `@starting-style` provides entry states without restarting keyframes. Closing during entry reverses from the current frame. The backdrop fades opacity rather than animating its background color. Native dialog semantics, focus containment, Escape and focus return remain in place. Keyboard and reduced-motion actions remain immediate.

## Review

| Before | After | Why |
| --- | --- | --- |
| Showcase entrance ran for about 1.8s with long travel | Overlapping entrance finishes in about 0.8s with smaller travel | Make the full-screen scene arrive coherently without delaying reading |
| Caption transition took 0.75s overall | 160ms exit and 400ms entrance with 40ms text spacing | Keep the scenic character with a quicker response |
| Three hotel/wait/return details entered as one block | 40ms stagger between details | Give the opening a deliberate reading order |
| Lenis plus additional 0.45s/0.8s scrub interpolation | Direct parallax progress with desktop Lenis retained | Avoid a second lag during scroll reversal |
| Section entrances used 20px/28px over 750ms | 12px/20px over 550ms/650ms, with 60ms spacing | Keep the classic reveal while making mobile motion lighter |
| Dialog close keyframe restarted from a fully open frame | Interruptible CSS transitions with starting states | Reverse smoothly when a visitor closes before entry finishes |
| Backdrop animated background color | Backdrop animates opacity | Reduce paint work during the panel transition |
| Keyboard focus could arrive during the showcase entrance | Focus finishes the entrance before activation | Keep the focused control still and readable |

Locations: `DestinationShowcase.tsx:69` (entrance), `:116` (caption), `:153` (focus); `Hero.tsx:23` (service details); `useScrollMotion.ts:37` (reveals), `:47` (parallax); `globals.css:1601` (backdrop), `:1620` (panel), `:1636` and `:1754` (starting states).

Verdict: **Approve**. No remaining feel-breaking regressions found in the verified motion flow. UI feedback stays under 300ms, photographic marketing transitions keep their deliberate longer timing, keyboard actions settle immediately, movement respects reduced-motion/data-saving preferences, hover motion is pointer-gated and interrupted dialog transitions continue from their current frame. Transform/opacity drive the changed motion. Physical-device Safari and lower-end phone smoothness still need device testing; emulation cannot guarantee those results.

## Verification

- Final production build with TypeScript and all routes: passed.
- Whole-project ESLint: passed.
- Visitor-flow browser checks: 21/21 passed, including WhatsApp numbers and full request, session draft, native dialog focus/Escape, 320–1440px, landscape and 200% text.
- Motion browser checks: 11/11 passed, including forward/reverse parallax, native touch/reduced motion/data saving, immediate keyboard focus and closing a dialog during its entrance without jumping to the fully open frame.
- Destination-showcase browser checks: 6/6 passed, including timed cycling, offscreen pause, pause/play, full-screen narrow-phone layout, rapid selection and keyboard focus before activation.
- Settled phone and desktop captures inspected. The approved destination scene and “More than the sights” composition remain.
- Preview: `http://localhost:3100`. No new dependency, skill installation, deployment, commit or reset. The previous 81 performance Lighthouse result belongs to the contact-restoration build; it was not rerun for this timing-only refinement.

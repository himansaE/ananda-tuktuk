# Continuous Cinema preview

**Latest refinement:** The user approved the overall feel but requested removal of the top-exit animation. Content now retains full opacity, neutral position and scale after its scroll-controlled entrance. Entry still reverses at the bottom when scrolling back; photo parallax, smoothing, ride progress and button feedback remain. This supersedes the exit behavior described in the original record below.

**Further smoothing:** Entry now occupies 42% of the measured scroll range instead of 22%, with a sine ease, opacity .12→1 and smaller travel (18px mobile / 28px desktop). This spreads acceleration and settling across a wider distance. Cinema's Lenis duration is 1.45 seconds. The hero camera is scroll-controlled on a separate image layer (scale 1→1.045 mobile / 1→1.075 desktop); Cinema no longer uses a time-based photo zoom. Its introductory copy identifies Ananda as a local tuk-tuk driver and explains short rides, multiple stops, pickup, waiting and return. These current settings supersede the older measurements below.

Cinema is selected. The B preview now links each content scene directly to scroll position: enter at the lower edge, settle into a clear reading span, then drift and fade as it passes the upper edge. Scrolling back reverses the same frames. There is no once-only reveal in this profile.

The hero keeps its opening animation. Its two content groups gain scroll-controlled exits. The ride heading, introduction, three stops, note, actions and photo have individual scenes. Their different positions naturally stagger their motion. Entry occupies the first 22% of each scroll range and exit the final 20%; the middle remains readable. Travel is 26px/−22px on mobile and 42px/−36px on larger screens. Photo frames move between scale .985 and 1. Images retain independent parallax layers and overscan.

The ride's thin red line grows with progress and reverses on return. Primary buttons have a 220ms inset color sweep and existing lift/press feedback; secondary links have a 200ms underline response. Hover is limited to fine pointers. Keyboard focus immediately makes associated content readable, suspending its decorative scroll scene until focus leaves.

Desktop wheel smoothing uses the installed Lenis runtime with a 1.15-second response. ScrollTrigger uses direct scrub, so there is no second smoothing delay. Phones retain native touch scrolling. Reduced motion and Save-Data render static readable content. Scenes revert on profile changes and page exit. No package was installed.

Implementation: `.artifacts/story-continuous-motion.mjs`, `.artifacts/story-motion-options.mjs` and `.artifacts/generate-homepage-story-previews.mjs`, generating `.agent-design/storytelling-web/style-b.html`. These changes are confined to the planning preview; production components are not edited.

## Motion review

| Before | After | Why |
| --- | --- | --- |
| Text revealed once on entry | Reversible entry, steady reading span and top exit | Gives scroll control over the complete scene. |
| Text could continue a reveal after scrolling stopped | Direct scrub with wheel smoothing applied once | Each position corresponds to a stable animation frame. |
| Static connecting rule | Reversible progress line beside the ride steps | Connects motion to the practical pickup–stops–return sequence. |
| Basic button lift | Short color sweep, press response and link underline | Provides feedback on actionable controls. |
| Focus could land on faded content | Related copy becomes fully readable immediately | Keyboard navigation retains its context. |

**Verdict: Approve for preview.** Transform and opacity own scroll motion, pointer hover is gated, keyboard feedback is immediate, and reduced-motion content remains static. Review reference: `.artifacts/story-continuous-motion.mjs:1` (feedback styles), `:24` (scene lifecycle), `:62` (focus handling). Continuous browser checks passed at 320, 390, 768 and 1440px, including entry, exit, reverse, stationary reading, focus, repeated profile cleanup and reduced motion. Pointer feedback passed. Mobile and desktop frames were inspected. No physical-phone frame-rate claim is made.

All 12 additional scroll-option scenarios passed: real desktop wheel interpolation, profile changes without page jumps, native touch at 320/390px, image-edge coverage, enlarged controls, Save-Data, JavaScript disabled and dynamic reduced-motion settings. The Cinema readability assertion now samples the central reading span rather than expecting a completed once-only reveal at any visible position.

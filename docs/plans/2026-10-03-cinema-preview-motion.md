# B: Open-road cinema motion refinement

The user selected B and requested an opening animation, more motion and smoothness. This change updates the standalone B preview and its planning document. Production source, both protected homepage sections, the footer and booking flow remain untouched.

The opening is occasional marketing motion, with delight and visual continuity as its purpose. It uses the browser animation API for the predetermined entrance and passive scroll events with one requested frame for visible parallax layers. The existing ease-out token is reused; no package was added.

| Before | After | Why |
| --- | --- | --- |
| Generic entrance for the whole headline and supporting block | Separate headline lines with a 60 ms stagger and 650 ms rise; actions use 400 ms | Gives the selected cinematic opening a deliberate sequence without a loading screen. See `.artifacts/generate-homepage-story-previews.mjs:89`. |
| One image animation with no scroll response | 1.4 s image settle from scale 1.075 to 1, inside a separate parallax layer | Opening zoom and scroll translation cannot overwrite each other. Only transform is animated. See generator lines 54 and 98. |
| No surrounding section motion study | Compact ride explanation with once-only 550/650 ms reveals and restrained photo travel | Demonstrates the planned scroll pacing while preserving the approved destination and experience components. See generator line 70. |
| Preview entrance continues while navigating with the keyboard | Focus finishes and cancels decorative entrance immediately; focused reveal groups become visible without transition | Navigation never waits for the marketing sequence. See generator lines 119–120. |
| Reduced-motion handling only on the initial CSS animation | Static content for reduced motion and Save-Data, including preference changes during viewing | Movement stops, photos reset and reveal content stays readable. Reduced-motion Replay visibility uses matching specificity. See generator lines 74 and 105. |

Performance: scroll reads are batched before transform writes; only visible photo layers participate; no perpetual animation loop, animated layout, filters, cursor effects or scroll interception. Temporary `will-change` hints are removed when the corresponding motion or visibility ends.

Accessibility: hover movement is limited to a fine pointer; touch scrolling stays native; text remains present without JavaScript; reduced motion and Save-Data suppress decorative movement. The two existing contact routes remain ordinary links; no message is sent from the preview.

Validation: all 20 existing preview checks passed. The focused motion run passed nine checks at each of four widths (320, 390, 768, 1440), plus Save-Data and native-touch checks. Mobile and desktop settled views and the ride section were visually inspected. Real-phone frame pacing has not been measured.

**Verdict: Approve for the preview.** No remaining motion regression was found in the tested behavior. Longer image and headline durations are limited to the marketing opening; ordinary press feedback is 100–160 ms. Production integration remains a separate change governed by the homepage story plan.

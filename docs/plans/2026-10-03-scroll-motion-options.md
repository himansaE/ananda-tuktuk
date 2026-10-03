# Scroll-motion options for B

**Historical comparison:** The user has selected Cinema. Its once-only reveals have been replaced with continuous, reversible entry and top exit. See `2026-10-03-continuous-cinema-motion.md` for the current behavior and verification. The comparison findings below describe the earlier version.

The user asked for stronger scroll animation and smoothing, with a few options to try before confirming. The B preview now offers three profiles in a sticky comparison bar. **Glide is the recommendation; the user's final scroll-profile choice is pending.** Selecting a profile updates the preview URL and preserves the current reading position.

| Option | Desktop feel | Photo and reveal behavior |
| --- | --- | --- |
| 1. Natural | Native wheel response | Light photo drift and quick 450 ms reveals. |
| 2. Glide — recommended | A controlled 0.85 s wheel ease | More photo depth, 600 ms reveals and 60 ms spacing between ride steps. |
| 3. Cinema | A longer 1.15 s wheel ease | Deeper photo drift, a slight scroll-linked zoom and 750 ms desktop / 650 ms mobile reveals. |

Direct previews:

- Natural: `http://localhost:3200/style-b.html?motion=natural`
- Glide: `http://localhost:3200/style-b.html?motion=glide`
- Cinema: `http://localhost:3200/style-b.html?motion=cinema`

On phones, all three keep native touch scrolling. Their photo depth and reveal pacing still differ. Reduced motion and Save-Data use a readable static version. Keyboard navigation interrupts wheel inertia immediately.

The comparison bar is preview UI only. Text settles after its first entrance; only photographs continue moving with scroll. There is no pinned reading sequence, forced snapping or mouse-following effect. The opening animation is consistent across all three profiles so the scroll differences are easy to compare.

The preview embeds the project's installed Lenis 1.3.25 build and its MIT license. This makes the smooth options comparable to the existing site's scrolling without adding a package or making remote requests. Lenis is created only for a fine pointer in Glide/Cinema, destroyed on profile or preference changes, and stopped while the tab is hidden. Image movement remains directly tied to the current scroll position, with no second smoothing delay.

Image layers have 10% vertical overscan. Maximum travel is ±3% / ±5.5% / ±8% on desktop and ±2.25% / ±3.5% / ±5% on mobile for Natural / Glide / Cinema. The optional outer image scale reaches 1.018 or 1.035 in Glide or Cinema. Opening zoom and scroll transforms remain on separate elements.

The live homepage, both protected sections, footer and booking flow are outside this comparison change. Final production integration should use the chosen profile with the existing GSAP/Lenis system.

## Verification and motion review

All 12 browser scenarios passed: each profile on desktop and at 320/390 px with touch, plus enlarged comparison controls, Save-Data and JavaScript disabled. Desktop tests used real wheel gestures and verified intermediate scroll positions and the final distance. Tests also covered changing profiles mid-page, keyboard focus, visible ride details, photo-edge coverage and changing reduced-motion preferences. Desktop and mobile screenshots were reviewed. No real-phone frame-rate measurement is claimed.

| Before | After | Why |
| --- | --- | --- |
| One scroll-motion profile | Three explicit profiles with linkable URLs | Lets the user compare actual feel before choosing. |
| Mobile descriptions changed the toolbar height | Reserved space for the longest default caption | Profile changes preserve the reading position. |
| Large text could split option names mid-word | Controls wrap into extra rows while keeping each label intact | Enlarged text remains readable at 320 px. |
| Keyboard focus revealed only the action group | The entire associated ride explanation settles immediately | Keyboard visitors can read the context without waiting for staggered entrances. |

**Verdict: Approve for comparison.** The options are ready for the user's preference. The 0.85/1.15 s smoothing values describe intentional wheel easing; normal controls respond immediately. Ongoing movement is limited to photographs, and decorative movement is removed for reduced motion and Save-Data.

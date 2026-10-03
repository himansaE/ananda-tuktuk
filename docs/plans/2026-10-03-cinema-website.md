# Cinema across Ananda’s website

The user approved the Cinema preview and requested implementation throughout the existing website. The visitor goal remains understanding Ananda’s tuk-tuk service and arranging a short ride or an outing through WhatsApp.

Home, About and Places share a photographic hero with a stable cream reading wash, concise first-person copy and a clear action. Arrange uses a compact text opening so the form remains easy to reach. Home replaces its repeated introduction with the approved pickup, waiting and return story. About’s ride choices and arrangement steps, Places’ outing ideas and catalogue, and the FAQ use the new bottom entrance. Forms, filters and sheets retain their existing functionality.

The new `useCinemaMotion` hook owns reversible bottom entrances, image parallax, hero camera and ride-line progress. It uses scoped GSAP contexts, media handling and cleanup. Entry travels 18px on phones / 28px on larger screens across a broad scroll range, then stays readable through the top. Fine-pointer Lenis uses 1.45 seconds with lerp disabled; touch scrolling stays native. Keyboard navigation interrupts inertia; focus makes related content immediately readable. Reduced motion and Save-Data skip decorative movement.

The destination switcher is untouched. Home’s ExperienceBrowser retains its old motion and layout; only full catalogue mode opts into Cinema. Existing footer, navigation, mobile ride bar, contact constants and request generation remain. No new dependency, imagery, claim, tracking service or deployment was added.

## Motion and UI review

| Before | After | Why |
| --- | --- | --- |
| Cinema existed only in a separate preview | Shared cinematic opening on Home, About and Places | Carries the approved visual direction into visitor routes. |
| A repeated homepage introduction | Pickup, waiting and return story | Answers practical questions once. |
| Once-only motion on supporting pages | Reversible bottom entry with no top exit | Gives control to scrolling and preserves reading clarity. |
| Introductory image animation based on time | Scroll-driven hero camera on its own layer | Keeps image motion connected to progress. |
| First-screen actions could overlap the mobile ride bar | Mobile hero height reserves space for the bar | Makes actions easier to reach. |
| General smoothing could compete with keyboard scrolling | Immediate interruption of Lenis inertia | Keyboard actions remain responsive. |

**Verdict: Approve for local review.** Scroll movement uses transforms and opacity. Button feedback stays under 300ms, hover is gated, keyboard context and reduced motion are supported. The occasional hero text entrance uses 650ms to establish the marketing opening; it finishes immediately on focus. No physical-phone frame-rate measurement is claimed.

Validation: production compilation and TypeScript, ESLint, seven ride-message tests; 21 visitor journey checks including WhatsApp request interception, filters, sheets, draft persistence, small screens and 200% text; six protected-switcher checks; all four routes at 320/390/1440px with reversible hero cameras and reduced motion. Final verification is recorded in tool output and screenshots under `.artifacts/screenshots/`.

# Ananda's Tuk-Tuk

A mobile-first website for tourists who meet Ananda or scan a QR code at their hotel. It explains short rides and outings with several stops, hotel pickup, waiting, and a return to the hotel.

The visitor flow is: explore photos → choose stops → share a trip request → agree on the ride with Ananda. It does not take payments or automatically confirm bookings.

## Run locally

```sh
npm install
npm run dev
```

Open the address printed by Next.js. If another app uses port 3000, Next.js may use a different port. To choose a port explicitly:

```sh
node node_modules/next/dist/bin/next dev --port 3001
```

## Contact details

The confirmed public contact numbers are saved in `src/lib/contact.ts`:

- WhatsApp: `+94761432320`
- Calls: `+94767797873`

The planner opens the WhatsApp chat with the visitor's stops, pickup and ride details filled in. The visitor sends the message in WhatsApp, then agrees on the plan with Ananda. Call links use the separate call number. Change the constants and rebuild to update these contacts.

Copy `.env.example` to `.env.local` when the final HTTPS website address is confirmed:

```dotenv
NEXT_PUBLIC_SITE_URL=
```

Restart the development server or rebuild after changing this address. Pickup, stops, waiting, return travel, availability and price are agreed in the conversation.

Generate the visiting-card QR code only after the final website address is confirmed.

## Content and design

- `src/lib/content.ts`: place choices, interest categories, outing ideas and practical FAQs.
- `src/lib/contact.ts`: the confirmed WhatsApp and call numbers.
- `src/lib/ride.ts`: enquiry wording, phone validation and saved-draft validation.
- `src/components/RideProvider.tsx`: selected stops and enquiry details, retained in session storage across routes and reloads.
- `src/app/globals.css`: mobile layouts, the red/cream palette, typography and interaction motion.
- `src/components/useScrollMotion.ts`: the earlier GSAP fade-and-rise entrances and bounded photo parallax.
- `src/components/DestinationShowcase.tsx`: the restored full-screen Sigiriya/Dambulla/Minneriya photo switcher, with timed crossfades and manual selection. Automatic motion pauses during interaction; the visible pause control was removed at the owner's request.
- `src/app/fonts`: locally bundled Fraunces and Inter fonts, with their licenses.
- `docs/photo-credits.md`: photo sources and usage notes.
- `docs/plans/2026-10-01-service-content-plan.md`: the approved content and motion direction.
- `docs/plans/2026-10-02-motion-refinement.md`: final choreography, motion-review findings and verification.

Photos illustrate the places and interests. No stock portrait is presented as Ananda. Shops are optional; tickets, meals, shopping, treatments and independently arranged safaris are priced separately unless explicitly included in the agreed quote. The site avoids invented fares, ratings and testimonials.

The website speaks as Ananda using "I", "I'm" and "I'll". The WhatsApp request speaks as the visitor writing to him. The "More than the sights" photo section and aligned Add buttons remain, with icons restored for service details, navigation and photo actions.

## Verification

```sh
npm test
npm run lint
npm run build
```

`tests/browser.mjs` verifies the visitor flow with Playwright and Chrome: choosing stops, keyboard dialogs, reload persistence, trip requests, filters, outing prefills, responsive layouts and reduced motion. WhatsApp navigation is intercepted to check the destination number and complete message without opening a live chat or sending anything. It accepts `ANANDA_BASE_URL` for the preview address and `ANANDA_BROWSER_MODULES` for an existing folder containing the Playwright package. Browser screenshots are written to the ignored `.artifacts/screenshots` directory.

The homepage keeps five sections: a clear service introduction, the full-screen destination switcher, six local interests, Ananda's introduction and four practical questions. Outing ideas and the complete stop list remain on Explore. Hotel pickup, waiting, hotel return and price agreement remain visible.

`tests/motion-browser.mjs` verifies card action alignment, real forward/reverse GSAP parallax on phones and desktops, wheel smoothing, section entrances, instant keyboard focus, interrupted dialog transitions and reduced-motion/data-saving preferences. Entrances start near the viewport. Phones retain native touch scrolling; fine-pointer devices use Lenis at the earlier 1.2s setting. Photo parallax follows scroll directly to avoid adding a second interpolation delay. Large photos move while small browsing photos stay steady. The full-screen showcase uses a slow photo zoom with no additional scroll transform. Dialogs use CSS transitions with starting states so closing during entry reverses from the current frame.

`tests/showcase-browser.mjs` checks the full-screen composition at 320/390/1440px, all three timed destinations, interaction pausing, rapid manual selection, keyboard selection and live reduced-motion changes. Automatic rotation and slow photo drift pause outside the viewport, in a hidden tab, during interaction and when motion or data saving is requested. Additional background images load near the section. The footer groups the brand and ride link, page navigation, and separate WhatsApp/call numbers in a responsive layout.

The code follows the installed Next.js 16 documentation under `node_modules/next/dist/docs`. Read those guides before changing framework conventions.

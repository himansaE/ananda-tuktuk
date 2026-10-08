"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Every content group uses the same viewport range and easing. Clamp only the
// end so the footer can finish without changing the curve near the page top.
const scrollEntrance = { start: "top 108%", end: "clamp(top 48%)", ease: "sine.inOut", opacity: .12 };

/** Reversible bottom entrances with a broad reading area; no top exit. */
export function useCinemaMotion(scope: RefObject<HTMLElement | null>, enabled = true, motionKey?: string, intro = false) {
  useGSAP(() => {
    const root = scope.current;
    if (!root || !enabled) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", context => {
      if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
      let live = true;
      const opening = intro ? gsap.timeline({ defaults: { ease: "power3.out", clearProps: "opacity,transform" } })
        .from(root.querySelectorAll("[data-intro]"), { y: 24, opacity: 0, duration: .75, stagger: .08 }) : null;
      const entries: { node: HTMLElement; tween: gsap.core.Tween; focused: boolean }[] = [];
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(node => {
        const together = root.hasAttribute("data-reveal-together");
        const tween = gsap.fromTo(node, { opacity: scrollEntrance.opacity, y: () => innerWidth < 700 ? 26 : 44 }, {
          opacity: 1, y: 0, ease: scrollEntrance.ease, scrollTrigger: {
            trigger: together ? root : node, start: scrollEntrance.start, end: together ? "clamp(top 24%)" : scrollEntrance.end, scrub: true, invalidateOnRefresh: true,
            onToggle: trigger => { node.style.willChange = trigger.isActive ? "transform,opacity" : "auto"; },
          },
        });
        entries.push({ node, tween, focused: false });
      });
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach(layer => {
        const frame = layer.closest("[data-parallax-frame]");
        if (!frame) return;
        layer.dataset.motion = "gsap";
        gsap.fromTo(layer, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: {
          trigger: frame, start: "top bottom", end: "bottom top", scrub: true,
          onToggle: trigger => { layer.style.willChange = trigger.isActive ? "transform" : "auto"; },
        } });
      });
      root.querySelectorAll<HTMLElement>("[data-cinema-camera]").forEach(camera => {
        gsap.fromTo(camera, { scale: 1 }, { scale: () => innerWidth < 700 ? 1.045 : 1.075, ease: "none", scrollTrigger: {
          trigger: root, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true,
        } });
      });
      const rail = root.querySelector("[data-ride-progress]");
      if (rail) gsap.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: {
        trigger: root.querySelector(".cinema-ride-steps"), start: "top 72%", end: "bottom 42%", scrub: true,
      } });
      const focus = context.add("focus", () => {
        if (root.contains(document.activeElement)) opening?.progress(1);
        entries.forEach(entry => {
          // Settling on pointer-down can move a control before its click lands.
          // Keyboard focus still brings the entire group into its reading state.
          const focused = entry.node.contains(document.activeElement) && !!document.activeElement?.matches(":focus-visible");
          if (focused && !entry.focused) {
            entry.focused = true;
            entry.tween.scrollTrigger?.disable(false);
            gsap.set(entry.node, { clearProps: "opacity,transform" });
          } else if (!focused && entry.focused) {
            entry.focused = false;
            entry.tween.scrollTrigger?.enable(false, false);
            entry.tween.progress(entry.tween.scrollTrigger?.progress ?? 1);
          }
        });
      });
      const onFocus = () => { focus(); };
      root.addEventListener("focusin", onFocus);
      // A filter change can rebuild its triggers while the tab still has focus.
      focus();
      const afterFocus = () => queueMicrotask(() => { if (live) focus(); });
      root.addEventListener("focusout", afterFocus);
      void document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(true); });
      return () => {
        live = false;
        root.removeEventListener("focusin", onFocus);
        root.removeEventListener("focusout", afterFocus);
        root.querySelectorAll<HTMLElement>("[data-parallax],[data-reveal]").forEach(node => {
          delete node.dataset.motion; node.style.removeProperty("will-change");
        });
      };
    });
    return () => media.revert();
  }, { scope, dependencies: [enabled, motionKey, intro], revertOnUpdate: true });
}

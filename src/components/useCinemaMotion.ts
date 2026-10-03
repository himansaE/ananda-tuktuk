"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Reversible bottom entrances with a broad reading area; no top exit. */
export function useCinemaMotion(scope: RefObject<HTMLElement | null>, enabled = true, motionKey?: string) {
  useGSAP(() => {
    const root = scope.current;
    if (!root || !enabled) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", context => {
      if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
      let live = true;
      const entries: { node: HTMLElement; tween: gsap.core.Tween; focused: boolean }[] = [];
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(node => {
        // Content already visible on arrival needs no scroll entrance.
        const visible = node.getBoundingClientRect().top < innerHeight * .75;
        const tween = gsap.fromTo(node, { opacity: visible ? 1 : .12, y: visible ? 0 : (innerWidth < 700 ? 18 : 28) }, {
          opacity: 1, y: 0, ease: "sine.inOut", scrollTrigger: {
            trigger: node, start: "top bottom", end: "top 58%", scrub: true, invalidateOnRefresh: true,
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
        entries.forEach(entry => {
          const focused = root.contains(document.activeElement);
          if (focused && !entry.focused) {
            entry.focused = true;
            entry.tween.scrollTrigger?.disable(false);
            gsap.set(entry.node, { opacity: 1, y: 0 });
          } else if (!focused && entry.focused) {
            entry.focused = false;
            entry.tween.scrollTrigger?.enable(false, false);
            entry.tween.progress(entry.tween.scrollTrigger?.progress ?? 1);
          }
        });
      });
      const onFocus = () => { focus(); };
      root.addEventListener("focusin", onFocus);
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
  }, { scope, dependencies: [enabled, motionKey], revertOnUpdate: true });
}

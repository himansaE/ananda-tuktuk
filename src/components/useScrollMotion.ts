"use client";

import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type ConnectionNavigator = Navigator & { connection?: { saveData?: boolean } };

export function useScrollMotion(scope: RefObject<HTMLElement | null>, motionKey?: string, enabled = true) {
  const seen = useRef(new Set<string>());
  const settle = useRef<(() => void) | null>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root || !enabled) return;
    const media = gsap.matchMedia();
    media.add({ wide: "(min-width: 1000px)", motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
      const layers = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
      const targets = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
      const disabled = context.conditions?.reduce || (navigator as ConnectionNavigator).connection?.saveData;
      layers.forEach(layer => { layer.dataset.motion = disabled ? "static" : "gsap"; });
      if (disabled) return () => layers.forEach(layer => { delete layer.dataset.motion; });

      let live = true;
      const pending = targets.filter(target => {
        const key = target.dataset.reveal ?? "";
        if (target.getBoundingClientRect().top < innerHeight * 0.84) seen.current.add(key);
        return !seen.current.has(key);
      });
      // The earlier choreography: a soft fade and short rise, then leave it still.
      if (pending.length) gsap.set(pending, { y: context.conditions?.wide ? 20 : 12, opacity: 0 });
      const reveal = context.add("reveal", (batch: HTMLElement[]) => {
        if (!live) return;
        const fresh = batch.filter(target => !seen.current.has(target.dataset.reveal ?? ""));
        fresh.forEach(target => seen.current.add(target.dataset.reveal ?? ""));
        // Separate tweens let focus cancel one card without a nested stagger
        // timeline writing its transform again on the next frame.
        fresh.forEach((target, index) => gsap.to(target, { y: 0, opacity: 1, duration: context.conditions?.wide ? 0.65 : 0.55, delay: index * 0.06, ease: "power3.out", overwrite: true, clearProps: "transform,opacity" }));
      });
      if (pending.length) ScrollTrigger.batch(pending, { start: "top 84%", once: true, onEnter: elements => reveal(elements) });

      layers.forEach(layer => {
        const frame = layer.closest<HTMLElement>("[data-parallax-frame]");
        if (!frame) return;
        gsap.fromTo(layer, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: {
          // Lenis already smooths desktop scrolling; a second scrub delay
          // makes the photograph lag behind its frame, especially on reversal.
          trigger: frame, start: "top bottom", end: "bottom top", scrub: true,
          onToggle: trigger => { layer.style.willChange = trigger.isActive ? "transform" : "auto"; },
        } });
      });

      const finish = context.add("finish", (elements: HTMLElement[]) => {
        elements.forEach(target => seen.current.add(target.dataset.reveal ?? ""));
        gsap.killTweensOf(elements);
        gsap.set(elements, { y: 0, opacity: 1, overwrite: true, clearProps: "transform,opacity" });
      });
      const focus = (event: FocusEvent) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-reveal]") : null;
        if (target) finish([target]);
      };
      settle.current = () => finish(targets);
      root.addEventListener("focusin", focus);
      void document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(true); });
      return () => {
        live = false;
        settle.current = null;
        root.removeEventListener("focusin", focus);
        layers.forEach(layer => { delete layer.dataset.motion; layer.style.removeProperty("will-change"); });
      };
    });
    return () => media.revert();
  }, { scope, dependencies: [motionKey, enabled], revertOnUpdate: true });

  return () => settle.current?.();
}

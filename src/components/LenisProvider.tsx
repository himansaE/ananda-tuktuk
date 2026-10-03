"use client";

import { useEffect, type ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let mounted = true;
    let generation = 0;
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let cleanup: (() => void) | undefined;
    const sync = () => {
      cleanup?.();
      cleanup = undefined;
      const request = ++generation;
      const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
      if (!media.matches || connection.connection?.saveData) return;
      void Promise.all([import("lenis"), import("@/lib/gsap")]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (!mounted || request !== generation || !media.matches) return;
        const lenis = new Lenis({
          duration: 1.45, lerp: 0, smoothWheel: true, syncTouch: false,
          prevent: (node) => node.closest("dialog, [data-native-scroll]") !== null,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        const interrupt = (event: KeyboardEvent) => {
          if (["Tab", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].includes(event.key)) lenis.scrollTo(scrollY, { immediate: true });
        };
        window.addEventListener("keydown", interrupt);
        cleanup = () => { window.removeEventListener("keydown", interrupt); gsap.ticker.remove(tick); lenis.destroy(); };
      });
    };
    sync();
    media.addEventListener("change", sync);
    return () => { mounted = false; cleanup?.(); media.removeEventListener("change", sync); };
  }, []);
  return children;
}

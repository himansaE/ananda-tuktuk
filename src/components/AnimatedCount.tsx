"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Two fixed layers roll to the latest total without queuing stale counts. */
export function AnimatedCount({ value }: { value: number }) {
  const scope = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const from = previous.current;
    previous.current = value;
    const old = root.querySelector<HTMLElement>("[data-count-old]")!;
    const current = root.querySelector<HTMLElement>("[data-count-current]")!;
    old.textContent = String(from);
    if (from === value || document.activeElement?.matches(":focus-visible")) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const direction = value > from ? 1 : -1;
      gsap.set(old, { opacity: 1, yPercent: 0 });
      gsap.fromTo(current, { yPercent: direction * 90, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .26, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.to(old, { yPercent: direction * -90, opacity: 0, duration: .22, ease: "power3.out" });
    });
    return () => media.revert();
  }, { scope, dependencies: [value], revertOnUpdate: true });
  return <span ref={scope} className="ride-count" aria-hidden="true"><span data-count-old className="ride-count-old" /><span data-count-current>{value}</span></span>;
}

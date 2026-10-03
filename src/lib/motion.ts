import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Native scroll timelines do not need the ScrollTrigger plugin at startup.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, useGSAP };

export function prefersReducedMotion() {
  return typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

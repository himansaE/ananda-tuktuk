"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionLink as Link } from "./SectionLink";
import { IconArrowUpRight, IconMapPin, IconBuildingCottage, IconClock, IconArrowBackUp } from "@tabler/icons-react";
import { useCinemaMotion } from "./useCinemaMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);
  useCinemaMotion(ref);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
      entrance.current = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" } })
        .from("[data-hero-photo]", { scale: 1.12, duration: 1.35 }, 0)
        .from(".hero-title-line", { yPercent: 108, opacity: .2, duration: .95, stagger: .11 }, .04)
        .from(".hero-kicker", { y: 12, opacity: 0, duration: .55 }, .1)
        .from(".hero-description", { y: 18, opacity: 0, duration: .65 }, .32)
        .from(".hero-actions", { y: 12, opacity: 0, duration: .55 }, .44)
        .from(".service-promises li", { y: 8, opacity: 0, duration: .45, stagger: .06 }, .55);
      return () => { entrance.current = null; };
    });
    return () => media.revert();
  }, { scope: ref });
  return <section ref={ref} className="hero" aria-labelledby="hero-title" onFocusCapture={() => entrance.current?.progress(1)}><div className="container-page hero-grid">
    <div className="hero-copy"><p className="hero-kicker"><IconMapPin size={16} aria-hidden="true" />Tuk-tuk rides around Dambulla &amp; Sigiriya</p><h1 id="hero-title" data-hero-title><span className="hero-line-mask"><span className="hero-title-line">Hop in.</span></span><span className="hero-line-mask"><span className="hero-title-line">Let&apos;s <em>explore.</em></span></span></h1><p className="hero-description">I&apos;m Ananda, your local driver. Choose a short ride or an outing with the stops you like.</p><div className="hero-actions"><Link href="/tours#explore" className="btn-brand">Explore stops<IconArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/tours#explore" className="text-link">Plan a ride</Link></div><ul className="service-promises" aria-label="Ride services"><li><IconBuildingCottage size={16} aria-hidden="true" />Hotel pickup</li><li><IconClock size={16} aria-hidden="true" />I can wait</li><li><IconArrowBackUp size={16} aria-hidden="true" />Ride back</li></ul></div>
    <div className="hero-visual"><div className="hero-photo-frame" data-parallax-frame><div className="parallax-layer" data-parallax><Image data-hero-photo src="/images/hero-red.webp" alt="A red tuk-tuk on a scenic road, with Sigiriya Rock beyond" fill sizes="(max-width: 899px) 92vw, 48vw" quality={65} loading="eager" fetchPriority="high" className="cover-image" /></div></div></div>
  </div></section>;
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionLink as Link } from "./SectionLink";
import { useCinemaMotion } from "./useCinemaMotion";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { eyebrow: string; title: string; emphasis: string; subtitle: string; backgroundImage: string; alt?: string; action?: string; href?: string; home?: boolean };

export function CinematicHero({ eyebrow, title, emphasis, subtitle, backgroundImage, alt = "A scenic tuk-tuk ride in Sri Lanka", action, href, home = false }: Props) {
  const scope = useRef<HTMLElement>(null);
  const opening = useRef<gsap.core.Timeline | null>(null);
  useCinemaMotion(scope);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
      opening.current = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "opacity,transform" } })
        .from(".cinema-eyebrow,.cinema-title-line,.cinema-intro,.cinema-actions", { y: 16, opacity: .35, duration: .65, stagger: .06 });
      return () => { opening.current = null; };
    });
    return () => media.revert();
  }, { scope });
  return <section ref={scope} className={`cinema-hero cinema-ui${home ? " cinema-home" : ""}`} aria-labelledby="cinema-title" onFocusCapture={() => opening.current?.progress(1)}>
    <div className="cinema-backdrop" data-parallax-frame><div className="cinema-photo-layer" data-parallax><Image data-cinema-camera src={backgroundImage} alt={alt} fill sizes="100vw" quality={65} loading="eager" fetchPriority="high" className="cover-image" /></div></div>
    <div className="container-page cinema-opening"><div><p className="cinema-eyebrow">{eyebrow}</p><h1 id="cinema-title"><span className="cinema-title-line">{title}</span><span className="cinema-title-line"><em>{emphasis}</em></span></h1></div><div><p className="cinema-intro">{subtitle}</p><div className="cinema-actions">{action && href && <Link href={href} className="btn-brand">{action}</Link>}{home && <Link href="/tours#explore" className="text-link">Plan a ride</Link>}</div></div></div>
  </section>;
}

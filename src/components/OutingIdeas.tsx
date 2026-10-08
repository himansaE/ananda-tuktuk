"use client";

import Image from "next/image";
import { SectionLink as Link } from "./SectionLink";
import { outings, stops } from "@/lib/content";
import { useRide } from "./RideProvider";
import { MotionSection } from "./MotionSection";
import { IconArrowUpRight } from "@tabler/icons-react";

export function OutingIdeas() {
  const { addStops } = useRide();
  return <MotionSection cinema className="outing-section section-space" label="Ideas for an outing">
    <div className="container-page">
      <div className="section-heading" data-reveal="heading"><h2 className="type-display">A few ideas for <em>your day.</em></h2><p>Choose an outing. Add food, a workshop, herbs or a massage if you like.</p></div>
      <div className="outing-grid">{outings.map((outing) => <article className="outing-card" data-reveal={outing.title} key={outing.title}>
        <div className="outing-photo"><Image src={outing.image} alt={outing.alt} fill sizes="(max-width: 599px) 92vw, (max-width: 999px) 44vw, 30vw" quality={65} className="cover-image" /></div>
        <div className="outing-copy"><h3>{outing.title}</h3><p>{outing.description}</p><ol className="outing-stops">{outing.stops.map((id) => <li key={id}>{stops.find((stop) => stop.id === id)?.title}</li>)}</ol><Link href="/contact?ride=outing#plan" onClick={() => addStops(outing.stops)} className="text-link">Choose this outing<IconArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </article>)}</div>
      <p className="outing-footnote" data-reveal="note">Hotel pickup, waiting and a ride back. We&apos;ll confirm the route and any activity costs together.</p>
    </div>
  </MotionSection>;
}

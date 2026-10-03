import Image from "next/image";
import Link from "next/link";
import { SectionLink } from "./SectionLink";
import { MotionSection } from "./MotionSection";
import { IconArrowUpRight } from "@tabler/icons-react";

export function MeetAnanda({ full = false }: { full?: boolean }) {
  return <MotionSection cinema className="meet-section section-space" label="Meet me, Ananda">
    <div className="container-page meet-grid">
      <div className="meet-visual" data-reveal="photo"><div className="meet-photo" data-parallax-frame><div className="parallax-layer" data-parallax><Image src="/images/story-red.webp" alt="A red tuk-tuk beside a country road in Sri Lanka" fill sizes="(max-width: 799px) 92vw, 45vw" quality={65} className="cover-image" /></div></div></div>
      <div className="meet-copy" data-reveal="copy"><h2 className="type-display">Hi, I&apos;m <em>Ananda.</em></h2><p>I&apos;m based around Dambulla and Sigiriya. Tell me what you enjoy and how much time you have. I&apos;ll help you plan the stops.</p><p>{full ? "I can pick you up at your hotel, wait at your stops and bring you back. Shops and other visits are always your choice." : "Before we go, I’ll agree on pickup, waiting, the ride back and price with you."}</p><div className="meet-actions"><SectionLink href="/contact#plan" className="btn-brand">Plan a ride<IconArrowUpRight size={18} aria-hidden="true" /></SectionLink>{!full && <Link href="/about" className="text-link">About me<IconArrowUpRight size={17} aria-hidden="true" /></Link>}</div></div>
    </div>
  </MotionSection>;
}


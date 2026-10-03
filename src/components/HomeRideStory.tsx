import Image from "next/image";
import { MotionSection } from "./MotionSection";
import { SectionLink as Link } from "./SectionLink";

export function HomeRideStory() {
  return <MotionSection cinema className="cinema-ride section-space cinema-ui" labelledBy="home-ride-title"><div className="container-page cinema-ride-grid">
    <div className="cinema-ride-photo" data-reveal="photo" data-parallax-frame><div className="parallax-layer" data-parallax><Image src="/images/story-red.webp" alt="A red tuk-tuk beside a Sri Lankan country road" fill sizes="(max-width: 799px) 92vw, 45vw" quality={65} className="cover-image" /></div></div>
    <div><h2 id="home-ride-title" className="type-display" data-reveal="title">I’ll take care<br />of <em>the ride.</em></h2><p data-reveal="intro">A quick trip or a few stops — tell me what you have in mind.</p>
      <div className="cinema-ride-line"><span data-ride-progress aria-hidden="true" /><ol className="cinema-ride-steps">{[
        ["Hotel pickup", "I meet you at the place we agree."], ["Your stops", "I wait while you explore."], ["Back to your hotel", "Or a one-way drop-off, if you prefer."],
      ].map(([title, text], index) => <li key={title} data-reveal={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div>
      <p className="cinema-ride-note" data-reveal="note">We’ll agree the stops, waiting time and price before we go.</p><div className="cinema-actions" data-reveal="actions"><Link href="/contact#plan" className="btn-brand">Plan a ride</Link><Link href="/about" className="text-link">About me</Link></div>
    </div></div></MotionSection>;
}

import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { MotionSection } from "./MotionSection";
import { SectionLink } from "./SectionLink";

const prints = [
  { id: "main", src: "/images/sigiriya-view.webp", alt: "Sigiriya Rock above the surrounding forest", caption: "A place you’ve wanted to see." },
  { id: "food", src: "/images/details/food-lamprais.webp", alt: "Sri Lankan rice and curries served on a banana leaf", caption: "A stop for something good." },
  { id: "craft", src: "/images/details/woodcraft-painting.jpg", alt: "A visitor painting a wooden elephant in a craft workshop", caption: "A closer look." },
];

export function LocalNotebook() {
  return <MotionSection cinema intro className="notebook-opening" labelledBy="notebook-title">
    <div className="container-page">
      <div className="notebook-intro">
        <h1 id="notebook-title" data-intro>A little more<br /><em>along the way.</em></h1>
        <p data-intro>I’m Ananda. I drive around Dambulla and Sigiriya.<br />We can keep it simple, or make a few stops.</p>
        <SectionLink href="/tours#explore" className="text-link" data-intro>Plan a ride<IconArrowUpRight size={18} stroke={1.5} aria-hidden="true" /></SectionLink>
      </div>
      <div className="notebook-collage">
        {prints.map((print, index) => <div key={print.id} className={`notebook-collage-item notebook-collage-${print.id}`} data-reveal="print">
          <figure className="notebook-print"><div className="notebook-print-image" data-parallax-frame><div className="parallax-layer" data-parallax><Image src={print.src} alt={print.alt} fill sizes={index === 0 ? "(max-width: 699px) 80vw, 40vw" : "(max-width: 699px) 42vw, 25vw"} quality={75} className="cover-image" loading={index === 0 ? "eager" : "lazy"} /></div></div><figcaption>{print.caption}</figcaption></figure>
        </div>)}
        <p className="notebook-margin-note" data-reveal="note">You choose<br />what goes in<br /><em>your day.</em></p>
      </div>
    </div>
  </MotionSection>;
}

export function NotebookEnding() {
  return <>
    <MotionSection cinema className="notebook-panorama" label="A quieter stop"><div className="notebook-panorama-image" data-parallax-frame><div className="parallax-layer" data-parallax><Image src="/images/details/quieter-stop.webp" alt="Visitors riding a traditional bullock cart along a tree-lined village road" fill sizes="100vw" quality={75} className="cover-image" /></div></div><p data-reveal="caption">Leave room for<br /><em>a quieter stop.</em></p></MotionSection>
    <MotionSection cinema className="notebook-closing section-space" labelledBy="notebook-ending-title"><div className="container-page notebook-section-heading"><h2 className="type-display" id="notebook-ending-title" data-reveal="title">Tell me what<br />you have <em>in mind.</em></h2><div data-reveal="action"><p>A short ride or a few stops. We’ll work it out together.</p><SectionLink href="/tours#explore" className="btn-brand">Plan a ride<IconArrowUpRight size={18} stroke={1.5} aria-hidden="true" /></SectionLink></div></div></MotionSection>
  </>;
}



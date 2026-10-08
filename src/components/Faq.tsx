"use client";

import { useId, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { faqs } from "@/lib/content";
import { ScrollTrigger } from "@/lib/gsap";
import { MotionSection } from "./MotionSection";

export function Faq({ compact = false }: { compact?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();
  const questions = compact ? faqs.filter((_, index) => [4, 5, 6, 8].includes(index)) : faqs;
  return <MotionSection cinema className="faq-section section-space" labelledBy={`${id}-title`}><div className="container-page faq-layout"><div className="section-heading" data-reveal="heading"><h2 id={`${id}-title`} className="type-display">Good to <em>know.</em></h2></div><div className="faq-list" data-reveal="answers">{questions.map((faq, index) => {
    const open = openIndex === index;
    return <div className="faq-item" key={faq.question} data-open={open}>
      <h3><button id={`${id}-question-${index}`} aria-controls={`${id}-answer-${index}`} aria-expanded={open} onClick={() => {
        setOpenIndex(current => current === index ? null : index);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(() => ScrollTrigger.refresh());
      }}>{faq.question}<IconPlus size={20} aria-hidden="true" className={`faq-plus${open ? " is-open" : ""}`} /></button></h3>
      <div className="faq-answer" id={`${id}-answer-${index}`} aria-labelledby={`${id}-question-${index}`} aria-hidden={!open} inert={!open} role="region" onTransitionEnd={event => {
        if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") ScrollTrigger.refresh();
      }}><div className="faq-answer-inner"><p>{faq.answer}</p></div></div>
    </div>;
  })}</div></div></MotionSection>;
}

"use client";

import { useRef, useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { faqs } from "@/lib/content";
import { MotionSection } from "./MotionSection";

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  function toggle() {
    const node = content.current;
    if (!node) return;
    const next = !open;
    setOpen(next);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !CSS.supports("animation-timeline", "view()")) {
      void import("@/lib/gsap").then(({ ScrollTrigger }) => { if (node.isConnected) ScrollTrigger.refresh(true); });
    }
  }
  return <div className="faq-item"><h3><button id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`} aria-expanded={open} onClick={toggle}>{question}{open ? <IconMinus size={20} aria-hidden="true" className="faq-plus" /> : <IconPlus size={20} aria-hidden="true" className="faq-plus" />}</button></h3><div ref={content} id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`} role="region" hidden={!open}><p>{answer}</p></div></div>;
}

export function Faq({ compact = false }: { compact?: boolean }) {
  const questions = compact ? faqs.filter((_, index) => [4, 5, 6, 8].includes(index)) : faqs;
  return <MotionSection cinema className="faq-section section-space" labelledBy="faq-title"><div className="container-page faq-layout"><div className="section-heading" data-reveal="heading"><h2 id="faq-title" className="type-display">Good to <em>know.</em></h2></div><div className="faq-list">{questions.map((faq, index) => <FaqItem key={faq.question} {...faq} index={index} />)}</div></div></MotionSection>;
}

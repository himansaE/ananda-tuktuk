"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { IconArrowRight } from "@tabler/icons-react";

const ADVANTAGES = [
  {
    title: "I'll meet your bus",
    body: "Arriving by bus? I'll be at the Embul Ambe junction with your name on a sign. No hunting for tuk-tuks.",
  },
  {
    title: "5 minutes from everything",
    body: "Dambulla Cave Temple, Sigiriya Rock, Minneriya — all within 30 minutes from where I live.",
  },
  {
    title: "A quieter way to start",
    body: "No hotel lobbies, no tourist traps. Just paddy fields, morning birds, and a good road.",
  },
];

export function Advantage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      if (reduce) return;

      gsap.fromTo(
        ".adv-header",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 82%", once: true },
        }
      );

      /* Rows: scrubbed rise, one after the other */
      gsap.utils.toArray<HTMLElement>(".adv-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, ease: "none",
            scrollTrigger: { trigger: row, start: "top 94%", end: "top 70%", scrub: 1 },
          }
        );
      });

      gsap.fromTo(
        ".adv-cta",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".adv-cta", start: "top 85%", once: true },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-pad bg-[var(--color-surface)]">
      <div className="container-page">
        {/* Header */}
        <div className="adv-header grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <span className="eyebrow block mb-5">Why start from Embul Ambe?</span>
            <h2
              className="text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              My village is <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>perfectly</em> placed.
            </h2>
          </div>
          <p className="type-body text-[var(--color-ink-soft)] leading-relaxed max-w-md lg:justify-self-end">
            Most tourists base themselves in Dambulla or Sigiriya. I&apos;d suggest
            starting from Embul Ambe instead — it&apos;s quieter, cheaper, and
            you&apos;ll have me right there.
          </p>
        </div>

        {/* Editorial rows */}
        <div>
          {ADVANTAGES.map(({ title, body }) => (
            <div
              key={title}
              className="adv-row grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12 py-9 border-t border-[var(--color-border)] last:border-b"
            >
              <h3
                className="text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
              >
                {title}
              </h3>
              <p className="type-body text-[var(--color-ink-soft)] leading-relaxed max-w-md md:justify-self-end md:self-center">
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Personal CTA — red field */}
        <div className="adv-cta mt-16 rounded-[28px] bg-[var(--color-brand)] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full bg-white/[0.05] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <h3
              className="text-white mb-2"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.3rem)", letterSpacing: "-0.015em" }}
            >
              Want to stay in <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Embul Ambe?</em>
            </h3>
            <p className="type-body text-white/75">I can recommend guesthouses — just ask.</p>
          </div>
          <Link
            href="/contact"
            className="relative shrink-0 bg-white text-[var(--color-brand)] rounded-full inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "0.9375rem", padding: "0.9rem 2rem" }}
          >
            Ask Ananda <IconArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconStar } from "@tabler/icons-react";

/* ─── Content (copy preserved from Testimonials) ─────────── */
const VOICES = [
  {
    name: "Sarah M.",
    country: "United Kingdom",
    text: "Ananda took us to places we never would have found on our own — a hidden waterfall, a local spice garden. His warmth and knowledge are unmatched.",
  },
  {
    name: "Jonas K.",
    country: "Germany",
    text: "We did the Sigiriya sunrise tour and it was magical. He timed it perfectly — we were at the summit before the crowds. The whole day felt effortless.",
  },
  {
    name: "Priya R.",
    country: "Australia",
    text: "Honest, reliable, and genuinely passionate about his home. Ananda makes you feel like a guest, not a tourist.",
  },
];

export function Voices() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      /* Each quote rises + sharpens into place as it scrolls through —
         no pin, so this never competes with the ride section's pin. */
      gsap.utils.toArray<HTMLElement>(".voice-quote").forEach((q) => {
        gsap.fromTo(
          q,
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: { trigger: q, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-[var(--color-background)] section-pad overflow-hidden">
      <div className="container-page">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">What riders say</span>
          <span className="h-[1px] flex-1 bg-[var(--color-border)]" />
          <span className="type-caption text-[var(--color-ink-muted)]">Don&apos;t take my word for it.</span>
        </div>

        {/* Quotes — stacked, each rises into place as you scroll */}
        <div className="space-y-16 md:space-y-24">
          {VOICES.map((v) => (
            <figure key={v.name} className="voice-quote will-change-transform">
              <blockquote
                className="text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(1.6rem, 3.6vw, 3.1rem)",
                  lineHeight: 1.22,
                  letterSpacing: "-0.015em",
                  maxWidth: "26ch",
                }}
              >
                <span className="text-[var(--color-brand)]" style={{ fontStyle: "italic" }}>&ldquo;</span>
                {v.text}
                <span className="text-[var(--color-brand)]" style={{ fontStyle: "italic" }}>&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="inline-block w-10 h-[1px] bg-[var(--color-brand)]" />
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem" }} className="text-[var(--color-ink)]">
                  {v.name}
                </span>
                <span className="type-caption text-[var(--color-ink-muted)]">{v.country}</span>
                <span className="flex gap-0.5 ml-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} size={12} strokeWidth={0} fill="var(--color-star)" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

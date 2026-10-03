"use client";
import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconQuote, IconStar } from "@tabler/icons-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    country: "United Kingdom",
    avatar: "S",
    color: "hsl(220,55%,62%)",
    rating: 5,
    text: "Ananda took us to places we never would have found on our own — a hidden waterfall, a local spice garden. His warmth and knowledge are unmatched.",
  },
  {
    name: "Jonas K.",
    country: "Germany",
    avatar: "J",
    color: "hsl(160,48%,52%)",
    rating: 5,
    text: "We did the Sigiriya sunrise tour and it was magical. He timed it perfectly — we were at the summit before the crowds. The whole day felt effortless.",
  },
  {
    name: "Priya R.",
    country: "Australia",
    avatar: "P",
    color: "hsl(350,55%,62%)",
    rating: 5,
    text: "Honest, reliable, and genuinely passionate about his home. Ananda makes you feel like a guest, not a tourist.",
  },
];

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { reduceMotion } = ctx.conditions!;
        const dur = (d: number) => (reduceMotion ? 0 : d);

        /* Header reveal */
        gsap.fromTo(
          ".testi-header",
          { y: 28, opacity: 0, filter: "blur(8px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)", duration: dur(0.85),
            scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
          }
        );

        /* Cards — ScrollTrigger.batch for coordinated entry */
        const cards = Array.from(
          container.current!.querySelectorAll(".testi-card")
        );

        gsap.set(cards, { opacity: 0, y: 48, filter: "blur(10px)" });

        ScrollTrigger.batch(cards, {
          onEnter: (elements) =>
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: dur(0.9),
              ease: "power3.out",
              stagger: { each: 0.14 },
              overwrite: true,
            }),
          start: "top 82%",
          once: true,
        });
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="section-pad bg-[var(--color-surface)]">
      <div className="container-page">
        <div className="testi-header max-w-xl mb-14">
          <span className="type-label text-[var(--color-brand)] block mb-3">What riders say</span>
          <h2 className="type-title text-[var(--color-ink)]">
            Don&apos;t take my word for it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testi-card card p-7 flex flex-col justify-between">
              <div>
                <IconQuote size={26} strokeWidth={1.5} className="text-[var(--color-brand)] mb-4 opacity-50" />
                <p className="type-body text-[var(--color-ink-soft)] leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white type-label font-black"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="type-subtitle text-[var(--color-ink)] font-bold" style={{ fontSize: "0.875rem" }}>
                      {t.name}
                    </div>
                    <div className="type-caption text-[var(--color-ink-muted)]">{t.country}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <IconStar key={i} size={13} strokeWidth={0} fill="var(--color-star)" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

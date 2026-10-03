"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { IconArrowRight } from "@tabler/icons-react";

const TRAITS = [
  "Fluent English — I love a good chat",
  "Safe driver, well-maintained tuk-tuk",
  "Zero-pressure, fully flexible trips",
];

export function Story() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      if (reduce) return;

      /* Portrait: clip-wipe reveal + slow parallax */
      gsap.fromTo(
        ".story-frame",
        { clipPath: "inset(10% 10% 10% 10% round 28px)", opacity: 0.6 },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: ".story-frame", start: "top 92%", end: "top 45%", scrub: 1 },
        }
      );
      gsap.fromTo(
        ".story-portrait",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );

      /* Headline lines: scrubbed rise */
      gsap.utils.toArray<HTMLElement>(".story-line").forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.12, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: line, start: "top 92%", end: "top 62%", scrub: 1 },
          }
        );
      });

      /* Copy reveal */
      gsap.fromTo(
        ".story-reveal",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)",
          duration: 0.85, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".story-copy", start: "top 78%", once: true },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-pad bg-[var(--color-background)] overflow-hidden">
      <div className="container-page">
        {/* Chapter headline */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="eyebrow block mb-6">My story</span>
          <h2
            className="text-[var(--color-ink)]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(2.2rem, 5.5vw, 4.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="story-line block">I was born here.</span>
            <span className="story-line block">
              I know <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>every road.</em>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait — film still */}
          <div className="lg:col-span-6">
            <div className="story-frame relative aspect-[4/5] max-w-lg overflow-hidden rounded-[28px]">
              <div className="story-portrait absolute inset-[-10%] will-change-transform">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw"
                  alt="Ananda"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-7"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
              >
                <p className="text-white" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.25rem" }}>
                  10+ years on the road
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="story-copy lg:col-span-6 space-y-8 max-w-lg">
            <p className="story-reveal type-body text-[var(--color-ink-soft)]" style={{ fontSize: "1.0625rem" }}>
              I grew up in Embul Ambe, right in the heart of Sri Lanka&apos;s
              cultural triangle. My tuk-tuk has covered every village road,
              temple path, and jungle trail in this region — many of them you
              won&apos;t find on any map.
            </p>

            <ul>
              {TRAITS.map((text) => (
                <li key={text} className="story-reveal flex items-baseline gap-4 py-4 border-b border-[var(--color-border)] first:border-t">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0 translate-y-[-2px]" />
                  <span className="text-[var(--color-ink)]" style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem" }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="story-reveal">
              <Link href="/contact" className="btn-ink inline-flex items-center gap-2">
                Ride with me <IconArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

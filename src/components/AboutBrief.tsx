"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconLanguage, IconShieldCheck, IconAdjustments } from "@tabler/icons-react";

const STATS = [
  { number: 350, suffix: "+", label: "Destinations" },
  { number: 650, suffix: "+", label: "Trips Done" },
  { number: 250, suffix: "+", label: "Happy Riders" },
];

export function AboutBrief() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { reduceMotion } = ctx.conditions!;
        const dur = (d: number) => (reduceMotion ? 0 : d);

        /* Collage parallax — three images at different rates */
        gsap.to(".collage-img-1", {
          yPercent: -7, ease: "none",
          scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(".collage-img-2", {
          yPercent: -14, ease: "none",
          scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(".collage-img-3", {
          yPercent: -5, ease: "none",
          scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });

        /* Text stagger reveal */
        gsap.fromTo(
          ".about-reveal",
          { y: 36, opacity: 0, filter: "blur(10px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: dur(0.9), stagger: { each: 0.13 },
            scrollTrigger: { trigger: ".about-text", start: "top 80%", once: true },
          }
        );

        /* Stats count-up on enter */
        STATS.forEach((stat, i) => {
          const el = container.current!.querySelector(`.stat-num-${i}`);
          if (!el) return;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: stat.number,
            duration: dur(1.8),
            ease: "power2.out",
            scrollTrigger: { trigger: el as Element, start: "top 88%", once: true },
            onUpdate() {
              el.textContent = `${Math.round(counter.val)}${stat.suffix}`;
            },
          });
        });
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="section-pad bg-white overflow-hidden">
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Collage ─────────────────────── */}
        <div className="relative h-[500px] md:h-[580px] order-2 lg:order-1">
          {/* Main organic portrait */}
          <div
            className="collage-img-1 absolute left-1/2 top-0 -translate-x-1/2 w-[52%] h-[78%] overflow-hidden"
            style={{ borderRadius: "50% 50% 48% 52% / 60% 60% 40% 40%", border: "6px solid white" }}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw"
              alt="Sri Lanka highlands" fill className="object-cover scale-110"
            />
          </div>

          {/* Circle top-right */}
          <div
            className="collage-img-2 absolute right-3 top-6 w-[29%] aspect-square overflow-hidden"
            style={{ borderRadius: "50%", border: "5px solid white" }}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y"
              alt="Sigiriya" fill className="object-cover"
            />
          </div>

          {/* Pill bottom-left */}
          <div
            className="collage-img-3 absolute left-0 bottom-8 w-[43%] h-[26%] overflow-hidden"
            style={{ borderRadius: "999px", border: "5px solid white", transform: "rotate(-3deg)" }}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e"
              alt="Wildlife" fill className="object-cover"
            />
          </div>

          {/* Years badge */}
          <div className="absolute left-3 top-[36%] bg-[var(--color-brand)] text-white rounded-2xl px-4 py-3 text-center z-10">
            <div className="type-display text-white" style={{ fontSize: "1.6rem", lineHeight: 1 }}>10+</div>
            <div className="type-caption text-white/80 mt-1">yrs on the road</div>
          </div>
        </div>

        {/* ── Text ─────────────────────────── */}
        <div className="about-text order-1 lg:order-2 space-y-7">
          {/* Personal label */}
          <span className="about-reveal type-label text-[var(--color-brand)] block">
            Hi, I&apos;m Ananda 👋
          </span>

          <h2 className="about-reveal type-title text-[var(--color-ink)] max-w-md">
            I&apos;ll take you somewhere you&apos;ll actually remember.
          </h2>

          <p className="about-reveal type-body text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
            I was born in Embul Ambe, grew up riding these roads, and I&apos;ve spent the last decade sharing them with travellers from every corner of the world. I know the quiet spots, the right times, and the people who make every stop memorable.
          </p>

          {/* Checklist — personal bullets */}
          <ul className="space-y-3">
            {[
              { icon: IconLanguage, text: "Fluent in English — let's just talk" },
              { icon: IconShieldCheck, text: "Safe, clean tuk-tuk — always" },
              { icon: IconAdjustments, text: "Your pace, your plan — no rushing" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="about-reveal flex items-center gap-3">
                <div className="icon-wrap shrink-0" style={{ width: 32, height: 32 }}>
                  <Icon size={15} strokeWidth={2} className="text-[var(--color-brand)]" />
                </div>
                <span className="type-body text-[var(--color-ink)]">{text}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="about-reveal grid grid-cols-3 gap-1 py-5 border-t border-b border-[var(--color-border)]">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`text-center ${i < STATS.length - 1 ? "border-r border-[var(--color-border)]" : ""}`}>
                <div className={`stat-num-${i} type-display text-[var(--color-brand)]`} style={{ fontSize: "clamp(1.4rem,2.8vw,1.9rem)" }}>
                  {stat.number}{stat.suffix}
                </div>
                <div className="type-caption text-[var(--color-ink-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="about-reveal flex flex-wrap items-center gap-5">
            <Link href="/about" className="btn-outline type-label" style={{ fontSize: "12px", padding: "0.7rem 1.5rem" }}>
              More About Me
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--color-border)] shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw"
                  alt="Ananda" width={44} height={44} className="object-cover"
                />
              </div>
              <div>
                <div className="type-subtitle text-[var(--color-ink)] font-bold" style={{ fontSize: "0.875rem" }}>Ananda</div>
                <div className="type-caption text-[var(--color-ink-muted)]">Your guide · Embul Ambe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

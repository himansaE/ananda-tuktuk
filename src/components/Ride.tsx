"use client";
import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconLanguage, IconShieldCheck, IconAdjustments, IconMapPin, IconCalendarEvent, IconArrowRight } from "@tabler/icons-react";

const FEATURES = [
  { icon: IconLanguage, title: "I speak your language", body: "English, yes — but also the language of a relaxed, unhurried journey. No scripts, just real conversation." },
  { icon: IconShieldCheck, title: "You're in safe hands", body: "My tuk-tuk is maintained daily. I drive carefully, I know the roads, and I take zero risks with my passengers." },
  { icon: IconAdjustments, title: "Your trip, your way", body: "Want to stop for a coconut? Stay longer at the temple? Change the plan entirely? Fine by me." },
];

const STEPS = [
  { step: "01", icon: IconMapPin, label: "Pick your stops", desc: "Choose from my favourite spots or mix your own." },
  { step: "02", icon: IconCalendarEvent, label: "Tell me when", desc: "Let me know your dates and how much time you have." },
  { step: "03", icon: IconArrowRight, label: "WhatsApp me", desc: "Send your plan directly. No forms, no delays." },
  { step: "04", icon: IconArrowRight, label: "We ride", desc: "I'll be there. Adventure starts on time." },
];

export function Ride() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { reduceMotion } = ctx.conditions!;
        const dur = (d: number) => (reduceMotion ? 0 : d);

        /* Header */
        gsap.fromTo(
          ".ride-header",
          { y: 26, opacity: 0, filter: "blur(8px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)", duration: dur(0.85),
            scrollTrigger: { trigger: container.current, start: "top 85%", once: true },
          }
        );

        /* Feature cards — batch */
        const cards = Array.from(container.current!.querySelectorAll(".ride-card"));
        gsap.set(cards, { opacity: 0, y: 44, filter: "blur(10px)" });
        ScrollTrigger.batch(cards, {
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1, y: 0, filter: "blur(0px)",
              duration: dur(0.85), ease: "power3.out", stagger: { each: 0.13 }, overwrite: true,
            }),
          start: "top 84%",
          once: true,
        });

        /* Step cards — batch */
        const steps = Array.from(container.current!.querySelectorAll(".step-card"));
        gsap.set(steps, { opacity: 0, y: 32 });
        ScrollTrigger.batch(steps, {
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1, y: 0,
              duration: dur(0.7), ease: "power3.out", stagger: { each: 0.1 }, overwrite: true,
            }),
          start: "top 86%",
          once: true,
        });
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="section-pad bg-[var(--color-surface)]">
      <div className="container-page">
        {/* Personal section header */}
        <div className="ride-header max-w-xl mb-14">
          <span className="type-label text-[var(--color-brand)] block mb-3">Why ride with me?</span>
          <h2 className="type-title text-[var(--color-ink)]">Three things I genuinely care about.</h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="ride-card card p-8 group hover:-translate-y-1.5 transition-transform duration-300">
              <div className="icon-wrap mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon size={22} strokeWidth={1.5} className="text-[var(--color-brand)]" />
              </div>
              <h3 className="type-subtitle text-[var(--color-ink)] font-bold mb-3">{title}</h3>
              <p className="type-body text-[var(--color-ink-soft)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="ride-header border-t border-[var(--color-border)] pt-16 mb-10">
          <h3 className="type-subtitle text-[var(--color-ink)] font-bold mb-1">How it works</h3>
          <p className="type-body text-[var(--color-ink-soft)]">Four steps. That&apos;s all it takes.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map(({ step, icon: Icon, label, desc }, i) => (
            <div key={step} className="step-card relative bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col items-start">
              <span className="type-label text-[var(--color-brand)] mb-3 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
                {step}
              </span>
              <div className="icon-wrap mb-4" style={{ width: 36, height: 36 }}>
                <Icon size={18} strokeWidth={1.5} className="text-[var(--color-brand)]" />
              </div>
              <h4 className="type-subtitle text-[var(--color-ink)] font-bold mb-2" style={{ fontSize: "0.9rem" }}>{label}</h4>
              <p className="type-caption text-[var(--color-ink-muted)] leading-relaxed">{desc}</p>
              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[var(--color-border)] z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

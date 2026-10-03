"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroLiteProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export function HeroLite({ title, subtitle, backgroundImage }: HeroLiteProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".herolite-content > *",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-[340px] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/70 via-[var(--color-navy)]/50 to-[var(--color-navy)]/80" />

      {/* Content */}
      <div className="container-page relative z-10 pb-16 pt-32 herolite-content">
        <h1 className="type-display text-white mb-3">{title}</h1>
        {subtitle && (
          <p className="type-body text-white/75 max-w-xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

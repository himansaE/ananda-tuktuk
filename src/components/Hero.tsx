"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background image scrub
    gsap.to(".hero-bg-img", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Reveal animations
    gsap.fromTo(
      [".hero-badge", ".hero-title", ".hero-desc", ".hero-btn"],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15 }
    );
  }, { scope: container });

  return (
    <header ref={container} className="relative pt-32 pb-48 px-6 md:px-16 flex items-center justify-center min-h-[819px] overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="hero-bg-img absolute inset-0 bg-cover bg-center -z-20 scale-110"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyYRbE0inVbL9nON3uC6SyRJhP1v1pguf_QBLpzN03rygBA8V9ng6JwX8eQE6PaFMm-CJ2PcxG8zdfuFQQRljjZltaBANR0oclyqCTpXrhhKFKQBUocmX058Gm61B6ppI56zA7PWoRDRdX0zs5ngTmj7AaRtxXMK6wYZ8KZ1Qorq-8iamTb6qSzF_0Onx8a-eS3F5xgNa43Mu_U4xfLgvd8AgEeIQyImDD9NZpYoRIz4uVhR3o2VxK')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-background -z-10" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span className="hero-badge inline-block bg-primary-container text-on-primary-container text-label-md px-5 py-2 rounded-full mb-8 uppercase tracking-widest">
          Curated Adventures
        </span>
        <h1 className="hero-title text-display-lg text-white mb-6 text-shadow-strong leading-tight">
          Crafted by a Local, <br className="hidden md:inline"/><span className="text-primary-fixed font-accent">Driven by Heart.</span>
        </h1>
        <p className="hero-desc text-body-lg text-white/90 max-w-2xl mx-auto mb-12 text-shadow-strong font-light">
          Discover the soul of the cultural triangle. Not just tours, but immersive journeys customized to your pace and passions.
        </p>
        <Link className="hero-btn inline-flex items-center gap-3 bg-primary-container text-on-primary-container px-10 py-5 rounded-full text-label-md uppercase tracking-wider hover:-translate-y-1 hover:bg-primary hover:text-white transition-all duration-300" href="/tours">
          Explore Tours <span className="material-symbols-outlined">arrow_downward</span>
        </Link>
      </div>

      {/* Curved Divider Bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-16 md:h-32 text-background fill-current" preserveAspectRatio="none" viewBox="0 0 1440 120">
        <path d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z" />
      </svg>
    </header>
  );
}

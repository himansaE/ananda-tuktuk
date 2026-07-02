"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Ride() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on the circular tuk-tuk rear view
    gsap.to(".ride-tuk-img", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: ".ride-tuk-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Reveal animations
    gsap.fromTo(".gsap-reveal-ride", 
      { y: 30, opacity: 0, filter: "blur(4px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 1, 
        ease: "power3.out", 
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section className="py-32 bg-surface-container-low px-6 md:px-16 relative overflow-hidden">
      <div ref={container} className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Ride Details */}
        <div className="col-span-1 lg:col-span-6">
          <span className="gsap-reveal-ride text-label-md inline-block text-secondary tracking-widest uppercase mb-4">
            The Ride
          </span>
          <h2 className="gsap-reveal-ride text-headline-xl font-bold text-primary mb-8 leading-tight">
            Adventure on Three Wheels
          </h2>
          <p className="gsap-reveal-ride text-body-lg text-on-surface-variant mb-12 leading-relaxed">
            Travel in authentic Sri Lankan style. The iconic red tuk-tuk is meticulously maintained, ensuring a clean, safe, and wildly fun ride. It&apos;s the perfect balance of open-air excitement and reliable transport.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="gsap-reveal-ride bg-surface p-8 rounded-2xl border border-surface-variant/40 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-secondary-container/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl text-secondary">verified</span>
              </div>
              <h3 className="text-headline-lg font-bold text-primary mb-3">Immaculate</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Cleaned daily inside and out for your comfort.
              </p>
            </div>
            <div className="gsap-reveal-ride bg-surface p-8 rounded-2xl border border-surface-variant/40 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-secondary-container/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl text-secondary">shield</span>
              </div>
              <h3 className="text-headline-lg font-bold text-primary mb-3">Safe &amp; Secure</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Regularly serviced and inspected thoroughly.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Tuk-Tuk Image */}
        <div className="col-span-1 lg:col-span-5 lg:col-start-8 relative mt-16 lg:mt-0 ride-tuk-wrap flex justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <div className="relative w-full aspect-square overflow-hidden rounded-full border-[12px] border-surface max-w-md">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB80rJuMX3lOIlpPiDsWABQGeUNOXfp9AY4bGz05Jt-NZVgfkTcVLKlLRpPlyuVFTh_hCjLtuGVOejR5YMiNfI1mLvi-gj71ehHKQWotij4gS9VhbcyA12sB8eRp-Y1ls4e13NhTW18bf6a3TP1SG0sct_PNpJCafVHokUC7jxfKsjBj4taulHU6s0iy-xE7tUdcEAh86JzcXww8sHLx1gYY7Om88vYLRoJwslblmOVakytWxiUl-rqdBxsAvZLoL1_vw" 
              alt="Rear of Red Tuk-Tuk"
              fill
              priority
              className="ride-tuk-img object-cover scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

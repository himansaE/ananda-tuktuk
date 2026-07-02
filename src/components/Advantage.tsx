"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Advantage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".gsap-reveal-advantage", 
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
    <section ref={container} className="w-full bg-surface-container-low py-32 px-6 md:px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 gsap-reveal-advantage">
          <h2 className="text-headline-xl font-bold text-primary mb-4">
            The Embul Ambe Advantage
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Strategically located on the main Kurunegala–Dambulla road, we offer the perfect starting point for your cultural triangle adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="gsap-reveal-advantage bg-surface p-8 rounded-2xl border border-surface-variant/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-primary-container/20 rounded-full flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[28px]">directions_bus</span>
            </div>
            <h3 className="text-headline-lg font-bold text-primary mb-3">Easy Bus Pickups</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Arriving by bus from Colombo or Kandy? We can meet you right at the Embul Ambe junction, saving you the hassle of navigating Dambulla town with luggage.
            </p>
          </div>

          {/* Card 2 */}
          <div className="gsap-reveal-advantage bg-surface p-8 rounded-2xl border border-surface-variant/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-primary-container/20 rounded-full flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[28px]">location_on</span>
            </div>
            <h3 className="text-headline-lg font-bold text-primary mb-3">Central Location</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Perfectly situated between the majestic Dambulla Cave Temple and the ancient rock fortress of Sigiriya, making day trips efficient and enjoyable.
            </p>
          </div>

          {/* Card 3 */}
          <div className="gsap-reveal-advantage bg-surface p-8 rounded-2xl border border-surface-variant/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-primary-container/20 rounded-full flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-[28px]">nature</span>
            </div>
            <h3 className="text-headline-lg font-bold text-primary mb-3">Peaceful Surroundings</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Escape the noise of the main tourist hubs. Start your journey in a tranquil village setting, surrounded by paddy fields and local life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

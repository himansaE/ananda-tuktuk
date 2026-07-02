"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Faq() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".gsap-reveal-faq", 
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
    <section ref={container} className="w-full bg-surface-container-low py-32 px-6 border-t border-outline-variant/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 gsap-reveal-faq">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="gsap-reveal-faq bg-surface p-8 rounded-2xl border border-outline-variant/20">
            <h4 className="font-display text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
              How does pricing work?
            </h4>
            <p className="font-sans text-on-surface-variant pl-7 leading-relaxed">
              Prices are generally based on the distance and duration of the trip. I offer clear, upfront pricing before we start any journey, with no hidden fees. Half-day and full-day rates are available for tours.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="gsap-reveal-faq bg-surface p-8 rounded-2xl border border-outline-variant/20">
            <h4 className="font-display text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
              Can you pick me up from my hotel?
            </h4>
            <p className="font-sans text-on-surface-variant pl-7 leading-relaxed">
              Yes, absolutely. I provide door-to-door service from any hotel or guesthouse in the Dambulla, Sigiriya, and Embul Ambe areas. Just share your location via WhatsApp.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="gsap-reveal-faq bg-surface p-8 rounded-2xl border border-outline-variant/20">
            <h4 className="font-display text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
              Is there room for luggage?
            </h4>
            <p className="font-sans text-on-surface-variant pl-7 leading-relaxed">
              The Tuk Tuk can comfortably fit two passengers with standard luggage (two medium suitcases or backpacks). If you have exceptional luggage, please let me know in advance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

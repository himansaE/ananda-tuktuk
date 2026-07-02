"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Story() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on the guide portrait image
    gsap.to(".guide-portrait", {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: ".guide-portrait-wrap",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Reveal animations
    gsap.fromTo(".gsap-reveal-story", 
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
    <section id="about" ref={container} className="py-32 px-6 md:px-16 max-w-[1280px] mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center lg:gap-24">
        {/* Left side: Guide Image */}
        <div className="col-span-1 lg:col-span-5 relative order-2 lg:order-1 mt-16 lg:mt-0 flex justify-center guide-portrait-wrap">
          <div className="absolute -inset-6 bg-primary/5 rounded-[3rem] -z-10 transform -rotate-2" />
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] max-w-md">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw" 
              alt="Ananda Portrait" 
              fill
              priority
              className="guide-portrait object-cover scale-110"
            />
          </div>
        </div>

        {/* Right side: Story Content */}
        <div className="col-span-1 lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <span className="gsap-reveal-story text-label-md inline-block text-secondary tracking-widest uppercase mb-4">
            Meet Your Guide
          </span>
          <h2 className="gsap-reveal-story text-headline-xl font-bold text-primary mb-8 leading-tight">
            The Ananda Experience
          </h2>
          <p className="gsap-reveal-story text-body-lg text-on-surface-variant mb-10 leading-relaxed">
            More than a driver, Ananda is your local compass, storyteller, and friend on the road. With over a decade of navigating the vibrant streets and hidden paths of Sri Lanka, he brings a wealth of knowledge and a warm, welcoming smile to every journey.
          </p>
          <ul className="space-y-6 mb-10 lg:pr-12">
            <li className="gsap-reveal-story flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">check_circle</span>
              <span className="text-body-lg text-on-surface font-medium">Fluent English speaking guide</span>
            </li>
            <li className="gsap-reveal-story flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">check_circle</span>
              <span className="text-body-lg text-on-surface font-medium">Deep knowledge of local history and culture</span>
            </li>
            <li className="gsap-reveal-story flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">check_circle</span>
              <span className="text-body-lg text-on-surface font-medium">Flexible itineraries tailored to you</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

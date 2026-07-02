"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".gsap-reveal-contact", 
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

  const getWhatsAppLink = () => {
    const msg = "Hello Ananda! I have a question about booking a tour.";
    return `https://wa.me/94770000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section ref={container} className="w-full max-w-[1280px] mx-auto px-6 md:px-16 py-32 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Form & Actions */}
        <div className="space-y-8">
          <div className="gsap-reveal-contact">
            <h2 className="text-headline-xl font-bold text-primary mb-6">
              Get in Touch
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Ready to book your adventure or have a question? The fastest way to reach me is via WhatsApp, but feel free to call or send a message here.
            </p>
          </div>

          {/* Booking options */}
          <div className="gsap-reveal-contact flex flex-col sm:flex-row gap-4">
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl text-label-md uppercase tracking-wider hover:opacity-90 transition-opacity active:scale-95 duration-150 text-center"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Message on WhatsApp
            </a>
            <a 
              href="tel:+94770000000"
              className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface px-6 py-4 rounded-xl text-label-md uppercase tracking-wider hover:bg-surface-variant transition-colors border border-outline-variant/30 active:scale-95 duration-150 text-center"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              +94 77 000 0000
            </a>
          </div>

          {/* Simple form */}
          <form className="gsap-reveal-contact space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-label-md text-on-surface mb-2 font-medium" htmlFor="name">Name</label>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md" 
                  id="name" 
                  placeholder="Your name" 
                  type="text"
                />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2 font-medium" htmlFor="email">Email</label>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md" 
                  id="email" 
                  placeholder="your@email.com" 
                  type="email"
                />
              </div>
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-2 font-medium" htmlFor="message">Message</label>
              <textarea 
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md resize-none" 
                id="message" 
                placeholder="How can I help you?" 
                rows={4}
              />
            </div>
            <button 
              className="w-full bg-primary text-on-primary px-6 py-4 rounded-lg text-label-md uppercase tracking-wider hover:bg-primary/90 transition-colors active:scale-95 duration-150" 
              type="button"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Area */}
        <div className="gsap-reveal-contact h-full min-h-[400px] bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 relative flex items-center justify-center">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHf7hf8TsQat6PVrLZWKt-8ZXyPeqTyvY4YmJ_3IeRp62qvTPXL4TfX9pFsVogBLfpu99sA1uqcY8k11-GziVSa4_azGRTF_az-0wqYMU4169UOAN0Nzs8yFcBmu0V6_DMvhLW7DQR7oD5UmAMimJBsRrDfU15EDFFjMi4zHMGFXu7HRIYxu4Nf8XnVhQznJX5f456yQAauNBwKFyUh4_JQqUgANlrIPMARw6vjF-tsBkfS6RGH7jl" 
            alt="Base Map Location"
            fill
            className="object-cover"
          />
          {/* Overlay details */}
          <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/95 backdrop-blur-sm p-6 rounded-xl border border-outline-variant/20">
            <h4 className="text-headline-lg font-bold text-primary mb-2">Our Base: Embul Ambe</h4>
            <p className="text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">distance</span>
              10 mins to Dambulla Cave Temple
            </p>
            <p className="text-body-md text-on-surface-variant flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-[18px]">distance</span>
              25 mins to Sigiriya Rock
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

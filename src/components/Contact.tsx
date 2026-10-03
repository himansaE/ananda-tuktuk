"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { IconBrandWhatsapp, IconPhone, IconCurrentLocation } from "@tabler/icons-react";

const inputStyles =
  "w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";

export function Contact() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      if (reduce) return;

      /* Load-in: signature blur stagger */
      gsap.fromTo(
        ".contact-reveal",
        { y: 40, opacity: 0, filter: "blur(12px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)",
          duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.15,
          clearProps: "filter",
        }
      );

      /* Map image: slow Ken Burns */
      gsap.fromTo(
        ".contact-map-img",
        { scale: 1.05 },
        { scale: 1.14, duration: 16, ease: "none", repeat: -1, yoyo: true }
      );
    },
    { scope: container }
  );

  const whatsappLink = `https://wa.me/94770000000?text=${encodeURIComponent("Hello Ananda! I have a question about booking a tour.")}`;

  return (
    <section ref={container} className="relative bg-[#151312] text-white min-h-screen flex items-center overflow-hidden">
      {/* Faint red glow, like a tail light in the dark */}
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(179,36,43,0.22), transparent 65%)" }}
      />

      <div className="container-page relative z-10 w-full pt-40 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ── Left: talk to me ─────────────────────── */}
        <div className="space-y-9">
          <div className="contact-reveal">
            <span className="eyebrow block mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Ready when you are
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(2.8rem, 6.5vw, 5.25rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.02em",
              }}
            >
              Get in <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Touch</em>
            </h1>
            <p className="type-body text-white/65 leading-relaxed max-w-md mt-6" style={{ fontSize: "1.0625rem" }}>
              Ready to book your adventure or have a question? The fastest way
              to reach Ananda is via WhatsApp.
            </p>
          </div>

          <div className="contact-reveal flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 rounded-full py-4 px-6 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(37,211,102,0.5)] active:scale-95"
              style={{ background: "var(--color-whatsapp)", fontFamily: "var(--font-accent)", fontSize: "0.9375rem" }}
            >
              <IconBrandWhatsapp size={19} strokeWidth={1.8} />
              Message on WhatsApp
            </a>
            <a
              href="tel:+94770000000"
              className="flex-1 flex items-center justify-center gap-2.5 rounded-full py-4 px-6 bg-white/[0.07] text-white border border-white/20 hover:border-white/60 transition-colors active:scale-95 font-semibold"
              style={{ fontFamily: "var(--font-accent)", fontSize: "0.9375rem" }}
            >
              <IconPhone size={19} strokeWidth={1.8} />
              +94 77 000 0000
            </a>
          </div>

          <form className="contact-reveal space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="type-label text-white/50">Name</label>
                <input id="name" type="text" placeholder="Your name" className={inputStyles} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="type-label text-white/50">Email</label>
                <input id="email" type="email" placeholder="your@email.com" className={inputStyles} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="type-label text-white/50">Message</label>
              <textarea id="message" placeholder="How can Ananda help you?" rows={4} className={`${inputStyles} resize-none`} />
            </div>
            <button type="submit" className="btn-brand w-full justify-center" style={{ padding: "1rem" }}>
              Send Message
            </button>
          </form>
        </div>

        {/* ── Right: the base ──────────────────────── */}
        <div className="contact-reveal relative min-h-[420px] lg:min-h-[560px] rounded-[28px] overflow-hidden">
          <div className="contact-map-img absolute inset-0 will-change-transform">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHf7hf8TsQat6PVrLZWKt-8ZXyPeqTyvY4YmJ_3IeRp62qvTPXL4TfX9pFsVogBLfpu99sA1uqcY8k11-GziVSa4_azGRTF_az-0wqYMU4169UOAN0Nzs8yFcBmu0V6_DMvhLW7DQR7oD5UmAMimJBsRrDfU15EDFFjMi4zHMGFXu7HRIYxu4Nf8XnVhQznJX5f456yQAauNBwKFyUh4_JQqUgANlrIPMARw6vjF-tsBkfS6RGH7jl"
              alt="Embul Ambe location"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 p-7 pt-28"
            style={{ background: "linear-gradient(to top, rgba(12,10,9,0.85), transparent)" }}
          >
            <h4 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.4rem" }} className="mb-3">
              Our Base: Embul Ambe
            </h4>
            <div className="flex flex-col gap-2">
              <p className="type-caption text-white/75 flex items-center gap-2">
                <IconCurrentLocation size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                10 mins to Dambulla Cave Temple
              </p>
              <p className="type-caption text-white/75 flex items-center gap-2">
                <IconCurrentLocation size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                25 mins to Sigiriya Rock Fortress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

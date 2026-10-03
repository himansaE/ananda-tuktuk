"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export function Gallery() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1BaO4q6T6Oe56Vw7N6KW3ZRdTq-EVWnGna45PFRbRsj9Tz_4qMt5CeOuyZ7mS8-HuJ4P7KURrbxtKj0Rkd20XQwt8GI2oOUs6-S8PHcVzP2e-YyYC0i6ZVOT-lpThep7OhdpLiJ4rRfLl4516XMAQ7hhWSrBW2NdYmG_J16SJ56SgmddMmoFPqyVprbs7M6bG87VBtbcwz2BYFkdpZA9HZohNh46z_TiubmmK-fI7PKTvI8iKU8q",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw",
  ];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Continuous marquee — the film keeps rolling */
      if (!reduce) {
        gsap.to(track.current, {
          xPercent: -50,
          ease: "none",
          duration: 40,
          repeat: -1,
        });
      }

      /* Header reveal */
      if (!reduce) {
        gsap.fromTo(
          ".gallery-header",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
          }
        );
      }
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-[#151312] pt-24 pb-20 overflow-hidden">
      {/* Header */}
      <div className="gallery-header container-page mb-12 flex items-baseline justify-between flex-wrap gap-4">
        <h2
          className="text-white"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Memories on the <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>road</em>
        </h2>
        <span className="type-caption text-white/40">Every frame, a real ride</span>
      </div>

      {/* ── Film strip ─────────────────────────────── */}
      <div className="relative">
        {/* Sprocket holes — top & bottom */}
        <div
          className="h-6 w-full mb-2"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.16) 5px, transparent 6px)",
            backgroundSize: "42px 100%",
          }}
          aria-hidden
        />
        <div className="flex gap-3 w-max" ref={track}>
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative w-[280px] md:w-[380px] h-[190px] md:h-[250px] flex-shrink-0 overflow-hidden"
            >
              <Image
                src={src}
                alt={`Memory ${(i % images.length) + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
        <div
          className="h-6 w-full mt-2"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.16) 5px, transparent 6px)",
            backgroundSize: "42px 100%",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}

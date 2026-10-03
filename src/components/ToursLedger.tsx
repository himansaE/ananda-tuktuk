"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconStar, IconArrowUpRight, IconArrowRight } from "@tabler/icons-react";

/* ─── Content (copy preserved from Tours) ────────────────── */
const DESTINATIONS = [
  {
    tag: "Cultural Escape", title: "Sigiriya Rock", location: "Central Province",
    rating: 4.9, bestTime: "Nov – Apr", price: "$35",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y",
  },
  {
    tag: "Heritage", title: "Dambulla Cave Temple", location: "Matale District",
    rating: 4.8, bestTime: "Year-round", price: "$25",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
  },
  {
    tag: "Wildlife", title: "Minneriya Safari", location: "North Central",
    rating: 4.7, bestTime: "Jun – Sep", price: "$45",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e",
  },
  {
    tag: "Hidden Gem", title: "Embul Ambe Village", location: "Dambulla Region",
    rating: 5.0, bestTime: "Year-round", price: "$40",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1BaO4q6T6Oe56Vw7N6KW3ZRdTq-EVWnGna45PFRbRsj9Tz_4qMt5CeOuyZ7mS8-HuJ4P7KURrbxtKj0Rkd20XQwt8GI2oOUs6-S8PHcVzP2e-YyYC0i6ZVOT-lpThep7OhdpLiJ4rRfLl4516XMAQ7hhWSrBW2NdYmG_J16SJ56SgmddMmoFPqyVprbs7M6bG87VBtbcwz2BYFkdpZA9HZohNh46z_TiubmmK-fI7PKTvI8iKU8q",
  },
  {
    tag: "Sunrise", title: "Pidurangala Rock", location: "Sigiriya",
    rating: 4.9, bestTime: "Dec – Mar", price: "$30",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw",
  },
  {
    tag: "Safari", title: "Kaudulla Park", location: "North Central",
    rating: 4.6, bestTime: "Aug – Oct", price: "$45",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
  },
];

const waLink = (title: string) =>
  `https://wa.me/94770000000?text=${encodeURIComponent(
    `Hi Ananda! I'd love to visit ${title}. When are you available?`
  )}`;

export function ToursLedger() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Header reveal */
      if (!reduce) {
        gsap.fromTo(
          ".ledger-header",
          { opacity: 0, y: 34, filter: "blur(10px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: container.current, start: "top 78%", once: true },
          }
        );
      }

      /* Rows: scrubbed rise + active tracking for the sticky image */
      gsap.utils.toArray<HTMLElement>(".ledger-row").forEach((row, i) => {
        if (!reduce) {
          gsap.fromTo(
            row,
            { opacity: 0, y: 44 },
            {
              opacity: 1, y: 0, ease: "none",
              scrollTrigger: { trigger: row, start: "top 94%", end: "top 68%", scrub: 1 },
            }
          );
        }
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-[var(--color-background)] section-pad overflow-hidden">
      <div className="container-page">
        {/* ── Header ─────────────────────────────────── */}
        <div className="ledger-header mb-16 lg:mb-24 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow mb-5 block">Field notes</span>
            <h2
              className="text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Where I&apos;ll <em style={{ fontStyle: "italic", color: "var(--color-brand)" }}>take you</em>
            </h2>
          </div>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-3 text-[var(--color-ink)] mb-2"
            style={{ fontFamily: "var(--font-accent)", fontWeight: 600, fontSize: "0.9375rem" }}
          >
            <span className="border-b-2 border-[var(--color-brand)] pb-1 group-hover:border-[var(--color-ink)] transition-colors">
              See all destinations
            </span>
            <IconArrowRight size={18} strokeWidth={2} className="text-[var(--color-brand)] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* ── Ledger + sticky image ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky image panel (desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24 h-[70vh] rounded-[28px] overflow-hidden">
              {DESTINATIONS.map((d, i) => (
                <div
                  key={d.title}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: active === i ? 1 : 0,
                    filter: active === i ? "blur(0px)" : "blur(10px)",
                    transform: active === i ? "scale(1)" : "scale(1.06)",
                  }}
                >
                  <Image src={d.img} alt={d.title} fill className="object-cover" />
                  <div
                    className="absolute inset-x-0 bottom-0 p-7 pt-20"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                  >
                    <span className="type-label text-white/80">{d.tag}</span>
                    <p className="text-white mt-1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.35rem" }}>
                      Best time: {d.bestTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ledger rows */}
          <div className="lg:col-span-7">
            {DESTINATIONS.map((d, i) => (
              <a
                key={d.title}
                href={waLink(d.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-row group block border-t border-[var(--color-border)] last:border-b py-8 lg:py-9"
                onMouseEnter={() => setActive(i)}
              >
                {/* Mobile image */}
                <div className="lg:hidden relative w-full h-52 rounded-2xl overflow-hidden mb-5">
                  <Image src={d.img} alt={d.title} fill className="object-cover" />
                </div>

                <div className="flex items-baseline justify-between gap-6">
                  <h3
                    className="text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-brand)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      fontSize: "clamp(1.7rem, 3.2vw, 2.7rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {d.title}
                  </h3>
                  <span
                    className="shrink-0 text-[var(--color-ink)]"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.15rem, 2vw, 1.6rem)" }}
                  >
                    {d.price}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 type-caption text-[var(--color-ink-soft)]">
                  <span className="text-[var(--color-brand)] font-semibold uppercase tracking-[0.12em]" style={{ fontSize: "0.6875rem" }}>
                    {d.tag}
                  </span>
                  <span>{d.location}</span>
                  <span className="inline-flex items-center gap-1">
                    <IconStar size={11} strokeWidth={0} fill="var(--color-star)" />
                    {d.rating.toFixed(1)}
                  </span>
                  <span>Best: {d.bestTime}</span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-[var(--color-ink)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Plan this ride
                    <IconArrowUpRight size={14} strokeWidth={2.5} className="text-[var(--color-brand)]" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconStar, IconMapPin, IconClock, IconArrowRight } from "@tabler/icons-react";

const DESTINATIONS = [
  {
    tag: "Cultural Escape", title: "Sigiriya Rock", location: "Central Province",
    rating: 4.9, bestTime: "Nov – Apr",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y",
    price: "$35",
  },
  {
    tag: "Heritage", title: "Dambulla Cave Temple", location: "Matale District",
    rating: 4.8, bestTime: "Year-round",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
    price: "$25",
  },
  {
    tag: "Wildlife", title: "Minneriya Safari", location: "North Central",
    rating: 4.7, bestTime: "Jun – Sep",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e",
    price: "$45",
  },
  {
    tag: "Hidden Gem", title: "Embul Ambe Village", location: "Dambulla Region",
    rating: 5.0, bestTime: "Year-round",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1BaO4q6T6Oe56Vw7N6KW3ZRdTq-EVWnGna45PFRbRsj9Tz_4qMt5CeOuyZ7mS8-HuJ4P7KURrbxtKj0Rkd20XQwt8GI2oOUs6-S8PHcVzP2e-YyYC0i6ZVOT-lpThep7OhdpLiJ4rRfLl4516XMAQ7hhWSrBW2NdYmG_J16SJ56SgmddMmoFPqyVprbs7M6bG87VBtbcwz2BYFkdpZA9HZohNh46z_TiubmmK-fI7PKTvI8iKU8q",
    price: "$40",
  },
  {
    tag: "Sunrise", title: "Pidurangala Rock", location: "Sigiriya",
    rating: 4.9, bestTime: "Dec – Mar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw",
    price: "$30",
  },
  {
    tag: "Safari", title: "Kaudulla Park", location: "North Central",
    rating: 4.6, bestTime: "Aug – Oct",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
    price: "$45",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(s => <IconStar key={s} size={11} strokeWidth={0} fill="var(--color-star)" />)}
      </div>
      <span className="type-caption text-[var(--color-ink-soft)] font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Tours() {
  const container = useRef<HTMLDivElement>(null);

  const link = (title: string) => {
    const msg = `Hi Ananda! I'd love to visit ${title}. When are you available?`;
    return `https://wa.me/94770000000?text=${encodeURIComponent(msg)}`;
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { reduceMotion: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { reduceMotion } = ctx.conditions!;
        const dur = (d: number) => (reduceMotion ? 0 : d);

        const cards = Array.from(container.current!.querySelectorAll(".dest-card"));
        gsap.set(cards, { opacity: 0, y: 48 });

        ScrollTrigger.batch(cards, {
          interval: 0.08,
          batchMax: 3,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1, y: 0,
              duration: dur(0.8), ease: "power3.out",
              stagger: { each: 0.1 }, overwrite: true,
            }),
          start: "top 86%",
          once: true,
        });
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="section-pad bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <article key={dest.title} className="dest-card card group hover:-translate-y-1.5 transition-transform duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image src={dest.img} alt={dest.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full type-label" style={{ fontSize: "10px" }}>
                  {dest.tag}
                </div>
                <div className="absolute top-3 right-3 bg-white text-[var(--color-ink)] px-2.5 py-1 rounded-full type-label font-black" style={{ fontSize: "11px" }}>
                  {dest.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="type-subtitle text-[var(--color-ink)] font-bold leading-tight mb-2">{dest.title}</h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <IconMapPin size={12} strokeWidth={1.5} className="text-[var(--color-brand)] shrink-0" />
                  <span className="type-caption text-[var(--color-ink-muted)]">{dest.location}</span>
                </div>
                <Stars rating={dest.rating} />
                <div className="flex items-center gap-1.5 mt-2 mb-4">
                  <IconClock size={12} strokeWidth={1.5} className="text-[var(--color-ink-muted)] shrink-0" />
                  <span className="type-caption text-[var(--color-ink-muted)]">Best: {dest.bestTime}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                  <span className="type-caption text-[var(--color-ink-soft)]">From {dest.price}</span>
                  <a href={link(dest.title)} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-[var(--color-brand)] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[var(--color-brand-dark)] transition-all duration-200">
                    <IconArrowRight size={15} strokeWidth={2.5} color="white" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/tours" className="btn-brand type-label inline-flex items-center gap-2" style={{ fontSize: "12px", padding: "0.875rem 2rem" }}>
            See all destinations <IconArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

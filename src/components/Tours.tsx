"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tours = [
  {
    title: "Sigiriya Sunrise",
    location: "Cultural Triangle",
    price: "$35",
    duration: "4-5 Hours",
    details: "Max 3 Pax",
    desc: "Beat the crowds and the heat. We start at 5:00 AM, ensuring you reach the summit just as the golden light hits the ancient ruins.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y",
    colSpan: "md:col-span-8",
    hasBadge: true,
    badgeText: "Most Popular",
    isDark: false
  },
  {
    title: "Dambulla Caves",
    location: "Heritage",
    price: "$25",
    duration: "3 Hours",
    details: "",
    desc: "A serene journey to the Golden Temple. I'll guide you to the less crowded entrances.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
    colSpan: "md:col-span-4",
    hasBadge: false,
    badgeText: "",
    isDark: false
  },
  {
    title: "Minneriya Wildlife",
    location: "Wildlife",
    price: "$45",
    duration: "Half Day",
    details: "/Jeep",
    desc: "I'll drive you to the park gates and connect you with my trusted safari jeep partners for the great elephant gathering.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e",
    colSpan: "md:col-span-5",
    hasBadge: true,
    badgeText: "Safari Add-on",
    isDark: false
  },
  {
    title: "The Hidden Embul Ambe",
    location: "Hidden Gem",
    price: "$40",
    duration: "Full Day",
    details: "Lunch Included",
    desc: "Escape the tourist trail. We drive through rural villages to a hidden waterfall, ending with a home-cooked Sri Lankan meal at my family home.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1BaO4q6T6Oe56Vw7N6KW3ZRdTq-EVWnGna45PFRbRsj9Tz_4qMt5CeOuyZ7mS8-HuJ4P7KURrbxtKj0Rkd20XQwt8GI2oOUs6-S8PHcVzP2e-YyYC0i6ZVOT-lpThep7OhdpLiJ4rRfLl4516XMAQ7hhWSrBW2NdYmG_J16SJ56SgmddMmoFPqyVprbs7M6bG87VBtbcwz2BYFkdpZA9HZohNh46z_TiubmmK-fI7PKTvI8iKU8q",
    colSpan: "md:col-span-7",
    hasBadge: true,
    badgeText: "Hidden Gem",
    isDark: true
  }
];

export function Tours() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal top titles
    gsap.fromTo(".gsap-reveal-tours", 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out", 
        scrollTrigger: {
          trigger: ".gsap-reveal-tours",
          start: "top 80%",
        }
      }
    );

    // Staggered reveal of bento grid cards
    gsap.fromTo(".gsap-grid > article",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".gsap-grid",
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  const getWhatsAppLink = (tourTitle: string) => {
    const msg = `Hello Ananda! I would like to book the "${tourTitle}" tour. Please let me know your availability and details.`;
    return `https://wa.me/94770000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <main ref={container} className="py-24 px-6 md:px-16 max-w-[1280px] mx-auto relative z-20" id="tours">
      <div className="text-center mb-20 gsap-reveal-tours">
        <h2 className="text-headline-xl font-bold text-primary mb-4">Our Signature Routes</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto font-light">
          Transparent pricing, flexible durations, and unforgettable moments guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 gsap-grid">
        {tours.map((tour, index) => (
          <article 
            key={index}
            className={`col-span-1 ${tour.colSpan} rounded-2xl overflow-hidden flex flex-col ${
              tour.colSpan.includes("col-span-8") || tour.colSpan.includes("col-span-7") ? "md:flex-row" : "md:flex-col"
            } group transition-all duration-500 hover:-translate-y-2 border ${
              tour.isDark 
                ? "bg-primary-container text-on-primary-container border-primary-container/20" 
                : "bg-surface-container-lowest text-on-surface border-surface-variant/30"
            }`}
          >
            {/* Tour Image */}
            <div className={`relative overflow-hidden ${
              tour.colSpan.includes("col-span-8") || tour.colSpan.includes("col-span-7") 
                ? "md:w-1/2 min-h-[300px]" 
                : "h-64"
            }`}>
              <Image 
                src={tour.img} 
                alt={tour.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-in-out"
              />
              {tour.hasBadge && (
                <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest ${
                  tour.isDark 
                    ? "bg-white/10 text-secondary-fixed border border-white/20" 
                    : "bg-secondary text-on-secondary border border-secondary-fixed/30"
                } backdrop-blur-sm`}>
                  {tour.badgeText}
                </div>
              )}
            </div>

            {/* Tour Content */}
            <div className={`p-8 flex flex-col justify-between ${
              tour.colSpan.includes("col-span-8") || tour.colSpan.includes("col-span-7") ? "md:w-1/2" : "flex-grow"
            }`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-headline-lg font-bold">{tour.title}</h3>
                  <span className="text-headline-lg font-bold text-secondary">
                    {tour.price}
                    {tour.details && <span className={`text-sm font-normal ${tour.isDark ? "text-on-primary-container/70" : "text-on-surface-variant"}`}>{tour.details}</span>}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-6 mb-6 text-sm font-bold uppercase tracking-wider">
                  <li className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[20px] ${tour.isDark ? "text-primary-fixed-dim" : "text-secondary"}`}>schedule</span> 
                    {tour.duration}
                  </li>
                </ul>
                <p className={`text-body-md mb-8 leading-relaxed ${tour.isDark ? "text-on-primary-container/90" : "text-on-surface-variant"}`}>
                  {tour.desc}
                </p>
              </div>

              <a 
                href={getWhatsAppLink(tour.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-6 py-4 rounded-full text-label-md uppercase tracking-wider flex justify-center items-center gap-3 transition-all duration-300 ${
                  tour.isDark 
                    ? "bg-primary-fixed-dim text-on-primary-fixed hover:bg-white hover:text-primary"
                    : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span> 
                WhatsApp to Book
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

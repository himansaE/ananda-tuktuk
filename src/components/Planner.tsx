"use client";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export function Planner() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [pickup, setPickup] = useState("Dambulla");

  const toggleDest = (d: string) => {
    if (destinations.includes(d)) {
      setDestinations(destinations.filter((x) => x !== d));
    } else {
      setDestinations([...destinations, d]);
    }
  };

  const getWhatsAppLink = () => {
    const destString = destinations.length > 0 ? destinations.join(", ") : "a custom tour";
    const msg = `Hello Ananda! I would like to book a tuk-tuk tour.\n\nPickup: ${pickup}\nDestinations: ${destString}\n\nPlease let me know the availability and price.`;
    return `https://wa.me/94770000000?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-40 px-6 md:px-12 bg-primary text-on-primary relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <h2 className="text-[12vw] md:text-[8rem] font-display font-black tracking-tighter leading-[0.85] uppercase">
            Plan the<br />Route
          </h2>
          <p className="text-[10px] md:text-xs text-on-primary/60 font-mono tracking-[0.2em] uppercase max-w-xs leading-relaxed">
            Select your stops and send the itinerary directly to Ananda&apos;s WhatsApp. No upfront payment required.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_400px] gap-20">
          <div className="space-y-20">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-fixed-dim mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-secondary-fixed-dim" /> Destinations
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Sigiriya Rock", "Pidurangala Sunrise", "Dambulla Cave Temple", "Minneriya Safari", "Kaudulla Safari", "Village Lake Tour", "Ibbankatuwa Tombs"].map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDest(d)}
                    className={`px-6 py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 border ${
                      destinations.includes(d)
                        ? "bg-secondary border-secondary text-white"
                        : "bg-transparent border-on-primary/20 text-on-primary/60 hover:border-on-primary hover:text-on-primary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-fixed-dim mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-secondary-fixed-dim" /> Pickup Location
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Embul Ambe", "Dambulla", "Sigiriya", "Kandalama", "Other (Custom)"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPickup(p)}
                    className={`px-6 py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-500 border ${
                      pickup === p
                        ? "bg-on-primary border-on-primary text-primary"
                        : "bg-transparent border-on-primary/20 text-on-primary/60 hover:border-on-primary hover:text-on-primary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-12 md:pt-0 md:border-t-0 md:border-l border-on-primary/10 pl-0 md:pl-20 flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono text-on-primary/40 mb-12">Trip Summary</h3>
              
              <div className="space-y-12">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-secondary-fixed-dim mb-3">Pickup</div>
                  <div className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none">{pickup}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-secondary-fixed-dim mb-3">Stops</div>
                  <div className="text-base md:text-lg font-bold uppercase tracking-tight leading-relaxed text-on-primary/80">
                    {destinations.length > 0 ? destinations.join(", ") : "None selected"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-[0.2em] px-8 py-6 flex items-center justify-center gap-4 hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

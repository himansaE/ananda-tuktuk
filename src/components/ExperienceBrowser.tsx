"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLink as Link } from "./SectionLink";
import { IconArrowUpRight, IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { categories, featuredStopIds, stops, type Category, type Stop } from "@/lib/content";
import { useRide } from "./RideProvider";
import { useSheet } from "./useSheet";
import { MotionSection } from "./MotionSection";

export function ExperienceBrowser({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState<Category>("all");
  const [active, setActive] = useState<Stop>(stops[0]);
  const [hasOpened, setHasOpened] = useState(false);
  const { selected, toggleStop } = useRide();
  const { ref: dialogRef, open: openSheet, close: closeSheet } = useSheet();
  const available = full ? stops : stops.filter((stop) => featuredStopIds.includes(stop.id));
  const visible = available.filter((stop) => category === "all" || stop.category === category);
  function filter(id: Category) {
    if (id === category) return;
    setCategory(id);
  }
  return <MotionSection cinema={full} id="explore" className="experience-section section-space" label="Places and experiences to explore" motionKey={category}>
    <div className="container-page">
      <div className="section-heading heading-with-link" data-reveal="heading"><div><h2 className="type-display">{full ? <>Choose your <em>stops.</em></> : <>More than <em>the sights.</em></>}</h2><p>{full ? "Tap a photo for details. Add any stops you like." : "Food, crafts, shops or a little time to relax. Add what you like."}</p></div>{!full && <Link href="/tours#explore" className="text-link">All places<IconArrowUpRight size={17} aria-hidden="true" /></Link>}</div>
      {full && <div className="category-filters" role="group" aria-label="Filter places by interest">{categories.map((item) => <button key={item.id} className="filter-chip" aria-pressed={category === item.id} onClick={() => filter(item.id)}>{item.label}</button>)}</div>}
      <div className="experience-grid">
        {visible.map((stop) => {
          const added = selected.includes(stop.id);
          return <article key={stop.id} className="experience-card" data-selected={added} data-reveal={stop.id}>
            <button className="experience-open" aria-haspopup="dialog" onClick={(event) => { setActive(stop); setHasOpened(true); openSheet(event.detail !== 0); }}>
              <span className="experience-photo" aria-hidden="true"><Image src={stop.image} alt={stop.alt} fill sizes="(max-width: 359px) 92vw, (max-width: 999px) 44vw, 30vw" quality={65} className="cover-image" /><span className="photo-open-icon"><IconArrowUpRight size={18} /></span></span>
              <span className="experience-text"><span className="experience-title">{stop.title}</span><span className="experience-summary">{stop.summary}</span></span>
            </button>
            <button className="add-stop" aria-pressed={added} onClick={() => toggleStop(stop.id)}><span className="add-stop-icon">{added ? <IconCheck size={17} aria-hidden="true" /> : <IconPlus size={17} aria-hidden="true" />}</span>{added ? "Added to my ride" : "Add this stop"}<span className="sr-only">: {stop.title}</span></button>
          </article>;
        })}
      </div>
      <div className="explore-bottom"><p>Shopping stops are optional.</p><Link href="/contact#plan" className="text-link">{selected.length ? `Plan with my ${selected.length} ${selected.length === 1 ? "stop" : "stops"}` : "Plan a ride"}<IconArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <p className="sr-only" role="status" aria-live="polite">{selected.length} {selected.length === 1 ? "stop" : "stops"} in your ride.</p>
    </div>
    <dialog ref={dialogRef} className="sheet detail-sheet" aria-labelledby="stop-title" onCancel={(event) => { event.preventDefault(); closeSheet(false); }} onClick={(event) => { if (event.target === event.currentTarget) closeSheet(); }}>
      <div className="sheet-panel detail-panel">
        <button className="icon-button sheet-close" aria-label="Close place details" onClick={(event) => closeSheet(event.detail !== 0)} autoFocus><IconX size={22} aria-hidden="true" /></button>
        <div className="detail-photo">{hasOpened && <Image src={active.image} alt={active.alt} fill sizes="(max-width: 700px) 100vw, 640px" quality={65} loading="eager" className="cover-image" />}</div>
        <div className="detail-copy"><h2 id="stop-title" className="type-title">{active.title}</h2><p>{active.description}</p><p className="detail-note">{active.note}</p>{active.photoNote && <p className="photo-note">{active.photoNote}</p>}</div>
        <div className="detail-actions"><button className={selected.includes(active.id) ? "btn-outline" : "btn-brand"} aria-pressed={selected.includes(active.id)} onClick={() => toggleStop(active.id)}>{selected.includes(active.id) ? <IconCheck size={18} aria-hidden="true" /> : <IconPlus size={18} aria-hidden="true" />}{selected.includes(active.id) ? "Remove this stop" : "Add this stop"}</button><button className="text-link" onClick={(event) => closeSheet(event.detail !== 0)}>Keep exploring</button></div>
      </div>
    </dialog>
  </MotionSection>;
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLink as Link } from "./SectionLink";
import { IconArrowUpRight, IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { categories, featuredStopIds, stops, type Category, type Stop } from "@/lib/content";
import { useRide } from "./RideProvider";
import { useSheet } from "./useSheet";
import { MotionSection } from "./MotionSection";
import { PlacePhotoGallery } from "./PlacePhotoGallery";

export function ExperienceBrowser({ full = false }: { full?: boolean }) {
  const [category, setCategory] = useState<Category>("all");
  const [active, setActive] = useState<Stop>(stops[0]);
  const [hasOpened, setHasOpened] = useState(false);
  const [galleryVisit, setGalleryVisit] = useState(0);
  const { selected, toggleStop } = useRide();
  const { ref: dialogRef, open: openSheet, close: closeSheet } = useSheet();
  const available = full ? stops : stops.filter((stop) => featuredStopIds.includes(stop.id));
  const visible = available.filter((stop) => category === "all" || stop.category === category);
  function filter(id: Category) {
    if (id === category) return;
    setCategory(id);
  }
  return <MotionSection cinema id="explore" className="experience-section section-space" label="Places and experiences to explore" motionKey={category}>
    <div className="container-page">
      <div className="section-heading heading-with-link" data-reveal="heading"><div><h2 className="type-display">{full ? <>Choose your <em>stops.</em></> : <>More than <em>the sights.</em></>}</h2><p>{full ? "Tap a photo for details. Add any stops you like." : "Choose the stops you like. I only charge for the ride; meals, tickets, shopping and treatments are paid separately by you."}</p></div>{!full && <Link href="/tours#explore" className="text-link">All places<IconArrowUpRight size={17} aria-hidden="true" /></Link>}</div>
      {full && <div className="category-filters" role="group" aria-label="Filter places by interest" data-reveal="filters">{categories.map((item) => <button key={item.id} className="filter-chip" aria-pressed={category === item.id} onClick={() => filter(item.id)}>{item.label}</button>)}</div>}
      <div className="experience-grid">
        {visible.map((stop) => {
          const added = selected.includes(stop.id);
          return <article key={stop.id} className="experience-card" data-selected={added} data-reveal={stop.id}>
            <div className="experience-media"><button className="experience-open" aria-haspopup="dialog" onClick={(event) => { setActive(stop); setHasOpened(true); setGalleryVisit(value => value + 1); openSheet(event.detail !== 0); dialogRef.current?.querySelector(".sheet-panel")?.scrollTo({ top: 0, behavior: "instant" }); }}>
              <span className="experience-photo" aria-hidden="true"><Image src={stop.image} alt={stop.alt} fill sizes="(max-width: 359px) 92vw, (max-width: 999px) 44vw, 30vw" quality={65} className="cover-image" /><span className="photo-open-icon"><IconArrowUpRight size={18} /></span></span>
              <span className="sr-only">{stop.title}</span>
            </button>
            <button className="add-stop" aria-label={`${added ? "Added to my ride" : "Add this stop"} : ${stop.title}`} aria-pressed={added} onClick={() => toggleStop(stop.id)}><span className="add-stop-icon"><IconPlus className="stop-plus" size={17} aria-hidden="true" /><IconCheck className="stop-check" size={17} aria-hidden="true" /></span><span>{added ? "Added" : "Add stop"}</span></button></div>
            <div className="experience-text"><h3 className="experience-title">{stop.title}</h3><p className="experience-summary">{stop.summary}</p></div>
          </article>;
        })}
      </div>
      <div className="explore-bottom" data-reveal="continue"><p>Shopping stops are optional.</p><Link href={selected.length ? "/contact#plan" : "/tours#explore"} className="text-link">{selected.length ? `Plan with my ${selected.length} ${selected.length === 1 ? "stop" : "stops"}` : "Plan a ride"}<IconArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <p className="sr-only" role="status" aria-live="polite">{selected.length} {selected.length === 1 ? "stop" : "stops"} in your ride.</p>
    </div>
    <dialog ref={dialogRef} className="sheet detail-sheet" aria-labelledby="stop-title" onCancel={(event) => { event.preventDefault(); closeSheet(false); }} onClick={(event) => { if (event.target === event.currentTarget) closeSheet(); }}>
      <div className="sheet-panel detail-panel">
        <div className="detail-header"><button className="icon-button sheet-close" aria-label="Close place details" onClick={(event) => closeSheet(event.detail !== 0)} autoFocus><IconX size={22} aria-hidden="true" /></button></div>
        {hasOpened && <PlacePhotoGallery key={galleryVisit} title={active.title} photos={[{ src: active.image, alt: active.alt }, ...(active.photos ?? [])]} />}
        <div className="detail-copy"><h2 id="stop-title" className="type-title">{active.title}</h2><p>{active.description}</p><p className="detail-note">{active.note}</p>{active.photoNote && <p className="photo-note">{active.photoNote}</p>}</div>
        <div className="detail-actions"><button className={selected.includes(active.id) ? "btn-outline" : "btn-brand"} aria-pressed={selected.includes(active.id)} onClick={() => toggleStop(active.id)}>{selected.includes(active.id) ? <IconCheck size={18} aria-hidden="true" /> : <IconPlus size={18} aria-hidden="true" />}{selected.includes(active.id) ? "Remove this stop" : "Add this stop"}</button><button className="text-link" onClick={(event) => closeSheet(event.detail !== 0)}>Keep exploring</button></div>
      </div>
    </dialog>
  </MotionSection>;
}

"use client";

import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { StopPhoto } from "@/lib/content";

/** Native touch scrolling keeps horizontal swipes and vertical drawer scrolling independent. */
export function PlacePhotoGallery({ photos, title }: { photos: StopPhoto[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const positions = useRef<number[]>([]);
  const frame = useRef(0);
  const requested = useRef<number | null>(null);
  const drag = useRef<{ id: number; x: number; scroll: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const multiple = photos.length > 1;

  function currentPhoto() {
    const node = track.current;
    if (!node) return 0;
    return positions.current.reduce((nearest, position, index, all) =>
      Math.abs(position - node.scrollLeft) < Math.abs(all[nearest] - node.scrollLeft) ? index : nearest, 0);
  }

  function goTo(index: number, animate = true) {
    const node = track.current;
    if (!node) return;
    const next = Math.max(0, Math.min(photos.length - 1, index));
    requested.current = next;
    const instant = !animate || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (node.parentElement) node.parentElement.dataset.instant = String(instant);
    node.scrollTo({ left: positions.current[next] ?? 0, behavior: instant ? "instant" : "smooth" });
    if (instant) { requested.current = null; setActive(next); }
  }

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const measure = () => {
      const slides = [...node.children] as HTMLElement[];
      const origin = slides[0]?.offsetLeft ?? 0;
      const maximum = node.scrollWidth - node.clientWidth;
      positions.current = slides.map(slide => Math.min(maximum, slide.offsetLeft - origin));
    };
    const settle = () => { requested.current = null; };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    node.addEventListener("scrollend", settle);
    measure();
    return () => { observer.disconnect(); node.removeEventListener("scrollend", settle); cancelAnimationFrame(frame.current); };
  }, []);

  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setActive(currentPhoto()));
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.parentElement) event.currentTarget.parentElement.dataset.instant = "false";
    // Touch keeps the browser's momentum, axis detection and pinch-to-zoom.
    if (event.pointerType === "touch" || event.button !== 0 || !multiple || drag.current) return;
    requested.current = null;
    drag.current = { id: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = event.clientX - gesture.x;
    if (Math.abs(distance) > 4) {
      gesture.moved = true;
      event.currentTarget.dataset.dragging = "true";
    }
    if (gesture.moved) event.currentTarget.scrollLeft = gesture.scroll - distance;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (gesture.moved) goTo(currentPhoto(), event.type !== "pointercancel");
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Arrow keys work from either the photo area or its navigation controls.
    const index = requested.current ?? active;
    const next = event.key === "ArrowRight" ? index + 1 : event.key === "ArrowLeft" ? index - 1 : event.key === "Home" ? 0 : event.key === "End" ? photos.length - 1 : null;
    if (next === null || !multiple) return;
    event.preventDefault();
    goTo(next, false);
  }

  return <div className="place-gallery" data-single={!multiple} role="region" aria-roledescription="carousel" aria-label={`${title} photos`} onKeyDown={onKeyDown}>
    <div ref={track} className="place-gallery-track" tabIndex={multiple ? 0 : undefined} aria-label="Photos. Swipe or use left and right arrow keys."
      onScroll={onScroll} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
      {photos.map((photo, index) => <div key={photo.src} className="place-gallery-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`}>
        <div className="detail-photo"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 600px" quality={65} loading={index === 0 ? "eager" : "lazy"} draggable={false} className="cover-image" /></div>
      </div>)}
    </div>
    {multiple && <div className="place-gallery-controls">
      <div className="place-gallery-meta"><span className="place-gallery-count" aria-hidden="true">{active + 1} / {photos.length}</span><span className="place-gallery-hint">Swipe for more</span></div>
      <div className="place-gallery-dots" role="group" aria-label="Choose a photo">{photos.map((photo, index) => <button key={photo.src} type="button" aria-label={`View photo ${index + 1} of ${photos.length}`} aria-current={active === index ? "true" : undefined} onClick={event => goTo(index, event.detail !== 0)}><span /></button>)}</div>
      <div className="place-gallery-arrows"><button type="button" className="icon-button" aria-label="Previous photo" disabled={active === 0} onClick={event => goTo((requested.current ?? active) - 1, event.detail !== 0)}><IconChevronLeft size={19} aria-hidden="true" /></button><button type="button" className="icon-button" aria-label="Next photo" disabled={active === photos.length - 1} onClick={event => goTo((requested.current ?? active) + 1, event.detail !== 0)}><IconChevronRight size={19} aria-hidden="true" /></button></div>
    </div>}
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Photo {active + 1} of {photos.length}</p>
  </div>;
}

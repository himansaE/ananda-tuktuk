"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLink } from "./SectionLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconArrowUpRight } from "@tabler/icons-react";

const places = [
  { name: "Sigiriya", title: ["Discover the ancient", "rock of Sigiriya."], description: "Take your time at the rock. I can wait, then bring you back or on to your next stop.", image: "/images/sigiriya-view.webp", position: "center 42%" },
  { name: "Dambulla", title: ["Step inside", "Dambulla’s caves."], description: "See the cave temples at your own pace. Add lunch or another stop along the way.", image: "/images/dambulla-cave.webp", position: "center 42%" },
  { name: "Minneriya", title: ["See Sri Lanka’s", "wild side."], description: "Arrange a ride to your safari meeting point. The jeep and park tickets are separate.", image: "/images/safari.webp", position: "center 38%" },
] as const;

type ConnectionNavigator = Navigator & { connection?: EventTarget & { saveData?: boolean } };
function motionDisabled() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || Boolean((navigator as ConnectionNavigator).connection?.saveData);
}
function subscribeMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as ConnectionNavigator).connection;
  media.addEventListener("change", listener);
  connection?.addEventListener?.("change", listener);
  return () => { media.removeEventListener("change", listener); connection?.removeEventListener?.("change", listener); };
}
function subscribeVisibility(listener: () => void) {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

export function DestinationShowcase() {
  const container = useRef<HTMLElement>(null);
  const previous = useRef<number | null>(null);
  const instant = useRef(false);
  const captionInstant = useRef(false);
  const previousCaption = useRef(0);
  const entrance = useRef<gsap.core.Timeline | null>(null);
  const drifts = useRef<gsap.core.Tween[]>([]);
  const driftingPlace = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [caption, setCaption] = useState(0);
  const [nearby, setNearby] = useState(false);
  const [inView, setInView] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduce = useSyncExternalStore(subscribeMotion, motionDisabled, () => false);
  const visible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => true);
  const playing = inView && visible && !focused && !hovered && !reduce;
  const { contextSafe } = useGSAP({ scope: container });
  const select = (next: number, keyboard: boolean) => contextSafe(() => {
    instant.current = keyboard;
    captionInstant.current = keyboard;
    if (keyboard) {
      entrance.current?.progress(1);
      const text = container.current?.querySelectorAll(".showcase-title, .showcase-desc");
      if (text) { gsap.killTweensOf(text); gsap.set(text, { clearProps: "transform,opacity" }); }
      setCaption(next);
    }
    setActive(next);
  })();

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (motionDisabled()) return;
      entrance.current = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity" }, scrollTrigger: { trigger: container.current, start: "top 82%", once: true } })
        .fromTo(".showcase-cards", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0)
        .fromTo(".showcase-title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.14)
        .fromTo(".showcase-desc", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.24)
        .fromTo(".showcase-actions", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.32);
      return () => { entrance.current = null; };
    });
    return () => media.revert();
  }, { scope: container });

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const proximity = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNearby(true); proximity.disconnect(); }
    }, { rootMargin: "400px 0px" });
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    proximity.observe(node);
    visibility.observe(node);
    return () => { proximity.disconnect(); visibility.disconnect(); };
  }, []);

  useGSAP(() => {
    const root = container.current;
    if (!root) return;
    const from = previous.current;
    const short = motionDisabled() || instant.current;
    const slides = [...root.querySelectorAll<HTMLElement>(".showcase-slide")];
    const cards = [...root.querySelectorAll<HTMLElement>(".showcase-card-photo")];
    slides.forEach((slide, index) => {
      if (from === null) gsap.set(slide, { opacity: index === active ? 1 : 0 });
      else gsap.to(slide, { opacity: index === active ? 1 : 0, duration: short ? 0 : 0.8, ease: "power2.inOut", overwrite: true });
    });
    cards.forEach((card, index) => {
      const values = (selected: boolean) => ({ scale: motionDisabled() ? 1 : selected ? 1.14 : 0.88, y: motionDisabled() ? 0 : selected ? -6 : 0, opacity: selected ? 1 : 0.6 });
      if (from === null) gsap.set(card, values(index === active));
      else gsap.to(card, { ...values(index === active), duration: short ? 0 : 0.25, ease: "power3.out", overwrite: true });
    });
    if (short) {
      const text = root.querySelectorAll(".showcase-title, .showcase-desc");
      gsap.killTweensOf(text);
      gsap.set(text, { clearProps: "transform,opacity" });
      captionInstant.current = true;
      setCaption(active);
    } else if (from !== null && from !== active) {
      const text = root.querySelectorAll(".showcase-title, .showcase-desc");
      gsap.killTweensOf(text);
      if (active === caption) gsap.to(text, { y: 0, opacity: 1, duration: 0.25, ease: "power3.out", clearProps: "transform,opacity" });
      else gsap.to(text, { y: -6, opacity: 0, duration: 0.16, ease: "power2.out", onComplete: () => setCaption(active) });
    }
    previous.current = active;
    instant.current = false;
  }, { scope: container, dependencies: [active, reduce] });

  useGSAP(() => {
    if (caption === previousCaption.current && !reduce) return;
    if (motionDisabled() || captionInstant.current) gsap.set(".showcase-title, .showcase-desc", { clearProps: "transform,opacity" });
    else gsap.fromTo(".showcase-title, .showcase-desc", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power3.out", overwrite: true, clearProps: "transform,opacity" });
    previousCaption.current = caption;
    captionInstant.current = false;
  }, { scope: container, dependencies: [caption, reduce] });

  useGSAP(() => {
    drifts.current = [];
    driftingPlace.current = null;
    if (!nearby || motionDisabled()) return;
    container.current?.querySelectorAll(".showcase-drift").forEach(photo => {
      drifts.current.push(gsap.fromTo(photo, { scale: 1.05 }, { scale: 1.12, duration: 12, ease: "none", paused: true }));
    });
    return () => { drifts.current = []; };
  }, { scope: container, dependencies: [reduce, nearby], revertOnUpdate: true });

  useEffect(() => {
    drifts.current.forEach(tween => tween.pause());
    if (driftingPlace.current !== active) {
      drifts.current[active]?.restart().pause();
      driftingPlace.current = active;
    }
    if (playing) drifts.current[active]?.play();
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % places.length), 5000);
    return () => window.clearTimeout(timer);
  }, [playing, active, nearby]);

  return <section ref={container} className="destination-showcase" aria-label="Destinations with Ananda" aria-roledescription="carousel"
    onFocusCapture={event => { setFocused(true); if (event.target.matches(":focus-visible")) entrance.current?.progress(1); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onPointerEnter={() => { if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setHovered(true); }} onPointerLeave={() => setHovered(false)}>
    <div className="showcase-background" aria-hidden="true">
      {places.map((place, index) => <div key={place.name} className="showcase-slide"><div className="showcase-drift">{(index === 0 || nearby) && <Image src={place.image} alt="" fill sizes="100vw" quality={65} className="cover-image" style={{ objectPosition: place.position }} />}</div></div>)}
    </div>
    <div className="showcase-wash" aria-hidden="true" />
    <div className="showcase-content">
      <div className="showcase-cards" data-reveal="destinations">{places.map((place, index) => <button key={place.name} type="button" className="showcase-card" aria-label={`View ${place.name}`} aria-pressed={active === index} onClick={event => select(index, event.detail === 0)}><span className="showcase-card-photo"><Image src={place.image} alt="" fill sizes="130px" quality={65} className="cover-image" /><span className="showcase-card-label">{place.name}</span></span></button>)}</div>
      <div className="showcase-text" aria-live="off">
        <h2 className="showcase-title" data-reveal="title">{places[caption].title[0]}<br />{places[caption].title[1]}</h2>
        <p className="showcase-desc" data-reveal="description">{places[caption].description}</p>
      </div>
      <div className="showcase-actions" data-reveal="actions"><Link href="/tours" className="btn-brand">Explore places<IconArrowUpRight size={18} aria-hidden="true" /></Link><SectionLink href="/contact#plan" className="btn-outline">Plan a ride<IconArrowUpRight size={18} aria-hidden="true" /></SectionLink></div>
    </div>
  </section>;
}

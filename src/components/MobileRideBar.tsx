"use client";

import { useEffect, useRef } from "react";
import { SectionLink as Link } from "./SectionLink";
import { usePathname } from "next/navigation";
import { useRide } from "./RideProvider";
import { IconArrowUpRight, IconRoute } from "@tabler/icons-react";
import { AnimatedCount } from "./AnimatedCount";

export function MobileRideBar() {
  const { selected } = useRide();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let plannerVisible = false;
    let exploreReached = pathname !== "/";
    let keyboardVisible = false;
    const sync = () => {
      bar.dataset.plannerVisible = String(plannerVisible);
      bar.dataset.exploreReached = String(exploreReached);
      bar.dataset.keyboard = String(keyboardVisible);
      const hidden = plannerVisible || !exploreReached || keyboardVisible;
      bar.inert = hidden;
      bar.setAttribute("aria-hidden", String(hidden));
    };
    const planner = document.getElementById("plan");
    const observer = new IntersectionObserver(([entry]) => {
      plannerVisible = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    if (planner) observer.observe(planner);
    const explore = pathname === "/" ? document.getElementById("explore") : null;
    let frame = 0;
    const checkExplore = () => {
      frame = 0;
      if (!explore) return;
      const reached = explore.getBoundingClientRect().top < innerHeight;
      if (reached !== exploreReached) { exploreReached = reached; sync(); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(checkExplore); };
    const resizeObserver = new ResizeObserver(schedule);
    if (explore) {
      exploreReached = explore.getBoundingClientRect().top < innerHeight;
      // A direct jump can skip the entire section. IntersectionObserver alone
      // cannot distinguish "above" from "below" when both are offscreen.
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      resizeObserver.observe(document.body);
    }
    const viewport = window.visualViewport;
    const onResize = () => {
      keyboardVisible = Boolean(viewport && window.innerHeight - viewport.height > 150);
      sync();
    };
    onResize();
    viewport?.addEventListener("resize", onResize);
    return () => { observer.disconnect(); resizeObserver.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); viewport?.removeEventListener("resize", onResize); };
  }, [pathname]);
  return <div ref={ref} className="mobile-ridebar" data-planner-visible="false" data-explore-reached={pathname !== "/"} inert={pathname === "/"}><span><IconRoute size={18} aria-hidden="true" /><strong><span className="sr-only">{selected.length ? `${selected.length} ${selected.length === 1 ? "stop" : "stops"} picked` : "Pick your stops"}</span><span aria-hidden="true" className="ridebar-selection" hidden={!selected.length}><AnimatedCount value={selected.length} /> {selected.length === 1 ? "stop" : "stops"} picked</span><span aria-hidden="true" hidden={selected.length > 0}>Pick your stops</span></strong></span><Link className="btn-brand" href={selected.length ? (pathname === "/contact" || pathname === "/tours" ? "#plan" : "/contact#plan") : (pathname === "/tours" ? "#explore" : "/tours#explore")}>{selected.length ? "Plan my ride" : "Plan a ride"}<IconArrowUpRight size={17} aria-hidden="true" /></Link></div>;
}

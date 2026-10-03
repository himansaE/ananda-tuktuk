"use client";

import { useEffect, useRef } from "react";
import { SectionLink as Link } from "./SectionLink";
import { usePathname } from "next/navigation";
import { useRide } from "./RideProvider";
import { IconArrowUpRight, IconRoute } from "@tabler/icons-react";

export function MobileRideBar() {
  const { selected } = useRide();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    bar.dataset.plannerVisible = "false";
    const planner = document.getElementById("plan");
    const observer = new IntersectionObserver(([entry]) => {
      bar.dataset.plannerVisible = String(entry.isIntersecting);
    }, { threshold: 0 });
    if (planner) observer.observe(planner);
    const viewport = window.visualViewport;
    const onResize = () => {
      bar.dataset.keyboard = String(Boolean(viewport && window.innerHeight - viewport.height > 150));
    };
    onResize();
    viewport?.addEventListener("resize", onResize);
    return () => { observer.disconnect(); viewport?.removeEventListener("resize", onResize); };
  }, [pathname]);
  return <div ref={ref} className="mobile-ridebar" data-planner-visible="false"><span><IconRoute size={18} aria-hidden="true" /><strong>{selected.length ? `${selected.length} ${selected.length === 1 ? "stop" : "stops"} picked` : "Pick your stops"}</strong></span><Link className="btn-brand" href={pathname === "/contact" || pathname === "/tours" ? "#plan" : "/contact#plan"}>{selected.length ? "Plan my ride" : "Plan a ride"}<IconArrowUpRight size={17} aria-hidden="true" /></Link></div>;
}

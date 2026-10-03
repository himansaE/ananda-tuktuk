"use client";

import { useRef, type ReactNode } from "react";
import { useScrollMotion } from "./useScrollMotion";
import { useCinemaMotion } from "./useCinemaMotion";

export function MotionSection({ children, className = "", id, label, labelledBy, motionKey, cinema = false }: {
  children: ReactNode; className?: string; id?: string; label?: string; labelledBy?: string; motionKey?: string; cinema?: boolean;
}) {
  const scope = useRef<HTMLElement>(null);
  useScrollMotion(scope, motionKey, !cinema);
  useCinemaMotion(scope, cinema, motionKey);
  return <section ref={scope} id={id} className={`${className}${cinema ? " cinema-ui" : ""}`} aria-label={label} aria-labelledby={labelledBy}>{children}</section>;
}

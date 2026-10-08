"use client";

import { useRef, type ReactNode } from "react";
import { useCinemaMotion } from "./useCinemaMotion";

export function MotionSection({ children, className = "", id, label, labelledBy, motionKey, cinema = true, intro = false, as: Tag = "section" }: {
  children: ReactNode; className?: string; id?: string; label?: string; labelledBy?: string; motionKey?: string; cinema?: boolean; intro?: boolean; as?: "section" | "footer";
}) {
  const scope = useRef<HTMLElement>(null);
  useCinemaMotion(scope, cinema, motionKey, intro);
  return <Tag ref={scope} id={id} className={`${className}${cinema ? " cinema-ui" : ""}`} aria-label={label} aria-labelledby={labelledBy}>{children}</Tag>;
}

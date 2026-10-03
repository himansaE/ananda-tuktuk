"use client";

import { useEffect, useRef } from "react";

// Native dialogs handle the focus boundary, background inertness and focus return.
export function useSheet() {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    ref.current?.close();
  }, []);
  function open(animate = true) {
    const dialog = ref.current;
    if (!dialog) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    dialog.dataset.state = "open";
    dialog.dataset.instant = String(!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!dialog.open) dialog.showModal();
  }
  function close(animate = true) {
    const dialog = ref.current;
    if (!dialog?.open) return;
    if (timer.current) clearTimeout(timer.current);
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close(); timer.current = null; return;
    }
    dialog.dataset.state = "closing";
    timer.current = setTimeout(() => { dialog.close(); timer.current = null; }, 200);
  }
  return { ref, open, close };
}

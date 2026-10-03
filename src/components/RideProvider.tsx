"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { stopIds } from "@/lib/content";
import { emptyRideDraft, sanitizeRideDraft, sanitizeStopIds, type RideDraft } from "@/lib/ride";

const STORAGE_KEY = "ananda:stops:v1";
const DRAFT_KEY = "ananda:draft:v1";
const empty = { selected: [] as string[], draft: emptyRideDraft };
let current = empty;
let loaded = false;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      current = {
        selected: sanitizeStopIds(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"), stopIds),
        draft: sanitizeRideDraft(JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "null")),
      };
    } catch { current = empty; }
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function update(ids: string[]) {
  current = { ...current, selected: sanitizeStopIds(ids, stopIds) };
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current.selected)); } catch { /* A ride still works with storage disabled. */ }
  listeners.forEach((listener) => listener());
}

function updateDraft(fields: Partial<RideDraft>) {
  current = { ...current, draft: sanitizeRideDraft({ ...current.draft, ...fields }) };
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(current.draft)); } catch { /* Keep the draft in memory when storage is disabled. */ }
  listeners.forEach((listener) => listener());
}

type RideSelection = {
  selected: string[];
  draft: RideDraft;
  updateDraft: (fields: Partial<RideDraft>) => void;
  toggleStop: (id: string) => void;
  addStops: (ids: string[]) => void;
  clearStops: () => void;
};

const RideContext = createContext<RideSelection | null>(null);

export function RideProvider({ children }: { children: ReactNode }) {
  const { selected, draft } = useSyncExternalStore(subscribe, getSnapshot, () => empty);
  return (
    <RideContext.Provider value={{
      selected,
      draft,
      updateDraft,
      toggleStop: (id) => update(current.selected.includes(id) ? current.selected.filter((stop) => stop !== id) : [...current.selected, id]),
      addStops: (ids) => update([...current.selected, ...ids]),
      clearStops: () => update([]),
    }}>
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const context = useContext(RideContext);
  if (!context) throw new Error("useRide must be used within RideProvider");
  return context;
}

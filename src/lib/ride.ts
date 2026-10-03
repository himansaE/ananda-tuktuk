export type RideRequest = {
  pickup?: string;
  date?: string;
  time?: string;
  guests?: string;
  rideType?: string;
  stops: string[];
  returnToHotel: boolean;
  notes?: string;
};

export const rideTypes = ["A short ride", "A few stops", "Help me choose"] as const;
export type RideDraft = {
  rideType: (typeof rideTypes)[number];
  pickup: string;
  date: string;
  time: string;
  guests: string;
  returnToHotel: boolean;
  notes: string;
};
export const emptyRideDraft: RideDraft = {
  rideType: "Help me choose", pickup: "", date: "", time: "", guests: "", returnToHotel: true, notes: "",
};

export function sanitizeRideDraft(value: unknown): RideDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) return emptyRideDraft;
  const saved = value as Record<string, unknown>;
  const text = (key: string, max: number) => typeof saved[key] === "string" ? saved[key].slice(0, max) : "";
  const date = text("date", 10);
  const time = text("time", 5);
  const rideType = rideTypes.find((type) => type === saved.rideType) ?? emptyRideDraft.rideType;
  return {
    rideType,
    pickup: text("pickup", 180),
    date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "",
    time: /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) ? time : "",
    guests: ["1", "2", "3", "4 or more"].includes(text("guests", 20)) ? text("guests", 20) : "",
    returnToHotel: typeof saved.returnToHotel === "boolean" ? saved.returnToHotel : true,
    notes: text("notes", 500),
  };
}

export function buildRideMessage(request: RideRequest): string {
  const lines = ["Hi Ananda! I'd like to arrange a tuk-tuk ride."];
  if (request.rideType) lines.push(`Ride: ${request.rideType}`);
  if (request.pickup?.trim()) lines.push(`Pickup: ${request.pickup.trim()}`);
  if (request.date) lines.push(`Date: ${request.date}`);
  if (request.time) lines.push(`Preferred time: ${request.time}`);
  if (request.guests) lines.push(`Guests: ${request.guests}`);
  lines.push("");
  if (request.stops.length) {
    lines.push("I'd like to visit:", ...request.stops.map((stop) => `• ${stop}`));
  } else {
    lines.push("I'd love your suggestions for places to visit.");
  }
  lines.push(
    "",
    request.returnToHotel
      ? "Please bring me back to my hotel after the ride."
      : "I'd like a one-way ride. Let's agree on the drop-off point.",
  );
  if (request.notes?.trim()) lines.push("", `A little more: ${request.notes.trim()}`);
  lines.push("", `Could you confirm availability and the price, including pickup and any waiting${request.returnToHotel ? ", plus the return trip" : ""}? Thank you!`);
  return lines.join("\n");
}

export function normalizePhone(number: string): string | null {
  if (!/^[+\d\s().-]+$/.test(number)) return null;
  const digits = number.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  if (digits === "94770000000" || /0{7,}$/.test(digits)) return null;
  return digits;
}

export function createWhatsAppLink(number: string, message: string): string | null {
  const phone = normalizePhone(number);
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null;
}

export function sanitizeStopIds(value: unknown, validIds: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const valid = new Set(validIds);
  return [...new Set(value.filter((id): id is string => typeof id === "string" && valid.has(id)))];
}

export function sriLankaDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

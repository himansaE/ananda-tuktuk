import assert from "node:assert/strict";
import test from "node:test";

const ride = await import("../src/lib/ride.ts").catch((error) => {
  if (error.code === "ERR_MODULE_NOT_FOUND") return {};
  throw error;
});

test("the trip request retains a guest's stops, pickup, timing and return preference", () => {
  const message = ride.buildRideMessage?.({
    pickup: "Hôtel & Spa, Dambulla",
    date: "2026-10-12",
    time: "09:30",
    guests: "2",
    rideType: "A few stops",
    stops: ["Dambulla Cave Temple", "Woodwork & crafts", "Sri Lankan lunch"],
    returnToHotel: true,
    notes: "A quiet lunch, please. Vegetarian food would be lovely!",
  });
  assert.equal(typeof message, "string");
  for (const detail of ["Hôtel & Spa, Dambulla", "2026-10-12", "09:30", "Guests: 2", "Woodwork & crafts", "back to my hotel", "Vegetarian"]) {
    assert.ok(message.includes(detail), `Missing ${detail}`);
  }
});

test("an enquiry without selected stops asks for suggestions", () => {
  const message = ride.buildRideMessage?.({ stops: [], returnToHotel: false });
  assert.equal(typeof message, "string");
  assert.match(message, /suggestions/i);
  assert.match(message, /one-way/i);
  assert.doesNotMatch(message, /return trip/);
  assert.doesNotMatch(message, /undefined|null/);
});

test("the WhatsApp draft preserves Unicode, ampersands, punctuation and line breaks", () => {
  const message = "Hi Ananda!\nHôtel & Spa + lunch?\nස්තුතියි";
  const link = ride.createWhatsAppLink?.("+94 77 123 4567", message);
  assert.equal(typeof link, "string");
  const parsed = new URL(link);
  assert.equal(parsed.origin, "https://wa.me");
  assert.equal(parsed.pathname, "/94771234567");
  assert.equal(parsed.searchParams.get("text"), message);
});

test("missing, malformed and the old placeholder phone numbers cannot open a chat", () => {
  for (const number of ["", " ", "94770000000", "+94 77 000 0000", "javascript:94771234567", "123", "00000000000"]) {
    assert.equal(ride.createWhatsAppLink?.(number, "Hello"), null, number);
  }
});

test("saved stop IDs are deduplicated and restricted to known choices", () => {
  const valid = ["sigiriya", "lunch", "spa"];
  assert.deepEqual(ride.sanitizeStopIds?.(["sigiriya", "bad", "lunch", "sigiriya", 42], valid), ["sigiriya", "lunch"]);
  assert.deepEqual(ride.sanitizeStopIds?.({ stops: ["spa"] }, valid), []);
});

test("trip dates use Sri Lanka's day rather than the browser's timezone", () => {
  assert.equal(ride.sriLankaDate?.(new Date("2026-09-30T20:00:00Z")), "2026-10-01");
});

test("a saved enquiry retains valid fields and safely discards malformed data", () => {
  const draft = {
    rideType: "A few stops", pickup: "Hôtel & Spa", date: "2099-10-12",
    time: "09:30", guests: "2", returnToHotel: false, notes: "ස්තුතියි!",
  };
  assert.deepEqual(ride.sanitizeRideDraft?.(draft), draft);
  assert.deepEqual(ride.sanitizeRideDraft?.(null), ride.emptyRideDraft);
  const malformed = ride.sanitizeRideDraft?.({ pickup: 42, date: "tomorrow", time: "25:99", guests: "99", rideType: "unknown", returnToHotel: "no", notes: "a".repeat(501) });
  assert.equal(malformed.pickup, "");
  assert.equal(malformed.date, "");
  assert.equal(malformed.time, "");
  assert.equal(malformed.guests, "");
  assert.equal(malformed.rideType, "Help me choose");
  assert.equal(malformed.returnToHotel, true);
  assert.equal(malformed.notes.length, 500);
});

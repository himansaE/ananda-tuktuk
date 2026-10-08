"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SectionLink as Link } from "./SectionLink";
import { IconCheck as Check, IconBrandWhatsapp as MessageCircle, IconPhone as Phone, IconX as X, IconMapPin, IconClock, IconArrowBackUp } from "@tabler/icons-react";
import { stops } from "@/lib/content";
import { buildRideMessage, createWhatsAppLink, rideTypes, sriLankaDate, type RideDraft } from "@/lib/ride";
import { contactPhone, contactPhoneLabel, whatsappPhone } from "@/lib/site-config";
import { useRide } from "./RideProvider";
import { MotionSection } from "./MotionSection";

export function Planner({ initialRide }: { initialRide?: RideDraft["rideType"] }) {
  const { selected, draft: details, updateDraft, toggleStop, clearStops } = useRide();
  useEffect(() => {
    if (initialRide) updateDraft({ rideType: initialRide });
  }, [initialRide, updateDraft]);
  const [status, setStatus] = useState("");
  const chosen = selected.map((id) => stops.find((stop) => stop.id === id)).filter((stop) => stop !== undefined);
  const message = buildRideMessage({ ...details, stops: chosen.map((stop) => stop.title) });
  const whatsapp = createWhatsAppLink(whatsappPhone ?? "", message);

  function change<Field extends keyof RideDraft>(field: Field, value: RideDraft[Field]) {
    updateDraft({ [field]: value });
    setStatus("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (whatsapp) {
      window.open(whatsapp, "_blank", "noopener,noreferrer");
      setStatus("Your request is ready in WhatsApp. Send it in the chat and I'll reply to you.");
    } else setStatus("WhatsApp is unavailable right now. Please call me to arrange your ride.");
  }

  return <MotionSection cinema id="plan" className="planner-section section-space" labelledBy="planner-title"><div className="container-page planner-layout">
    <div className="planner-intro"><div className="planner-welcome" data-reveal="welcome"><h2 id="planner-title" className="type-display">Your <em>ride.</em></h2><p>Pick your stops, or ask me for ideas.</p></div><div className="planner-practical" data-reveal="practical"><ul className="planner-assurance"><li><IconMapPin size={18} aria-hidden="true" />I can pick you up.</li><li><IconClock size={18} aria-hidden="true" />I can wait at your stops.</li><li><IconArrowBackUp size={18} aria-hidden="true" />I can bring you back.</li></ul><p className="planner-cost-note">I&apos;ll confirm the route, price and availability with you. Tickets, food, shopping and treatments are extra unless we agree otherwise.</p></div></div>
    <form className="planner-form" onSubmit={submit} data-reveal="form">
      <fieldset className="ride-type-field"><legend>What kind of ride?</legend><div className="ride-type-options">{rideTypes.map((type) => <label className="ride-type-choice" key={type}><input type="radio" name="ride-type" value={type} checked={details.rideType === type} onChange={() => change("rideType", type)} /><span>{type}</span></label>)}</div></fieldset>
      <div className="selected-stops"><div className="field-heading"><h3>Your stops</h3>{selected.length > 0 && <button type="button" className="quiet-button" onClick={clearStops}>Clear stops</button>}</div>{chosen.length ? <ul>{chosen.map((stop) => <li key={stop.id}><span>{stop.title}</span><button type="button" className="icon-button" aria-label={`Remove ${stop.title} from your ride`} onClick={() => toggleStop(stop.id)}><X size={15} aria-hidden="true" /></button></li>)}</ul> : <p>We can choose together.</p>}<Link href="/tours#explore" className="text-link">{chosen.length ? "Add another stop" : "Browse the places"}</Link></div>
      <label className="form-field"><span>Your hotel or pickup area <small>(optional)</small></span><input name="pickup" autoComplete="street-address" placeholder="Hotel name, area, or meeting spot" maxLength={180} value={details.pickup} onChange={(event) => change("pickup", event.target.value)} /></label>
      <div className="form-row"><label className="form-field"><span>Date <small>(optional)</small></span><input type="date" name="date" min={sriLankaDate()} value={details.date} onChange={(event) => change("date", event.target.value)} /></label><label className="form-field"><span>Time <small>(optional)</small></span><input type="time" name="time" value={details.time} onChange={(event) => change("time", event.target.value)} /></label></div>
      <label className="form-field"><span>How many people? <small>(optional)</small></span><select name="guests" value={details.guests} onChange={(event) => change("guests", event.target.value)}><option value="">Choose if you know</option><option value="1">1 person</option><option value="2">2 people</option><option value="3">3 people</option><option value="4 or more">4 or more people</option></select><small>Bringing luggage or a group? Let me know so I can confirm a suitable ride.</small></label>
      <label className="return-check"><input type="checkbox" name="return" checked={details.returnToHotel} onChange={(event) => change("returnToHotel", event.target.checked)} /><span className="check-box" aria-hidden="true"><Check size={15} /></span><span>Bring me back to my hotel<small>Untick for a one-way ride.</small></span></label>
      <label className="form-field"><span>Anything else? <small>(optional)</small></span><textarea name="notes" rows={3} placeholder="A restaurant you like, how long you have, or a question…" maxLength={500} value={details.notes} onChange={(event) => change("notes", event.target.value)} /></label>
      <button className="btn-brand planner-submit" type="submit"><MessageCircle size={19} aria-hidden="true" />Send request on WhatsApp</button>
      <p className="submit-note">Your ride details open in my WhatsApp chat. Send the message and I&apos;ll confirm the plan with you.</p>
      {contactPhone && <a href={`tel:+${contactPhone}`} className="text-link call-alternative"><Phone size={17} aria-hidden="true" />Prefer a call? {contactPhoneLabel}</a>}
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  </div></MotionSection>;
}

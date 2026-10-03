import { createWhatsAppLink, normalizePhone } from "./ride";
import { CALL_NUMBER, WHATSAPP_NUMBER } from "./contact";

export const whatsappPhone = normalizePhone(WHATSAPP_NUMBER);
export const contactPhone = normalizePhone(CALL_NUMBER);
export const contactPhoneLabel = contactPhone ? `+${contactPhone}` : null;
export const enquiryLink = createWhatsAppLink(WHATSAPP_NUMBER, "Hi Ananda! I'd like to arrange a tuk-tuk ride. Can we talk about the places I'd like to visit?");

// Set only after the owner's final site address is confirmed.
export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}

import type { Metadata } from "next";
import { Planner } from "@/components/Planner";
import { Faq } from "@/components/Faq";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Arrange a Ride",
  description: "Arrange a tuk-tuk ride with me, Ananda. Share your stops, hotel and timing on WhatsApp. I'll confirm the route, waiting, return and price with you.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ ride?: string | string[] }> }) {
  const { ride } = await searchParams;
  const initialRide = ride === "short" ? "A short ride" : ride === "outing" ? "A few stops" : undefined;
  return <main id="main-content"><MotionSection cinema className="cinema-contact cinema-ui" label="Arrange your ride"><div className="container-page"><p className="eyebrow">Tell me what you have in mind</p><h1>Let&apos;s plan <em>a ride.</em></h1><p className="cinema-contact-intro">Share your pickup and stops. I’ll reply on WhatsApp to confirm the plan and price.</p></div></MotionSection><Planner key={initialRide} initialRide={initialRide} /><Faq /></main>;
}

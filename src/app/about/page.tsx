import type { Metadata } from "next";
import { CinematicHero } from "@/components/CinematicHero";
import { MeetAnanda } from "@/components/MeetAnanda";
import { RideJourney } from "@/components/RideJourney";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
import { BookingCTA } from "@/components/BookingCTA";

export const metadata: Metadata = {
  title: "About me",
  description: "I'm Ananda, your local tuk-tuk driver around Dambulla and Sigiriya. I'll pick you up, wait at your stops and bring you back to your hotel.",
};

export default function AboutPage() {
  return <main id="main-content"><CinematicHero eyebrow="Your tuk-tuk driver" title="I'm Ananda." emphasis="Let's explore." subtitle="I drive around Dambulla and Sigiriya. I can pick you up, wait at your stops and bring you back." backgroundImage="/images/story-red.webp" action="Plan a ride" href="/contact#plan" /><MeetAnanda full /><RideJourney /><HowItWorks /><Faq /><BookingCTA /></main>;
}

import type { Metadata } from "next";
import { CinematicHero } from "@/components/CinematicHero";
import { ExperienceBrowser } from "@/components/ExperienceBrowser";
import { OutingIdeas } from "@/components/OutingIdeas";
import { Planner } from "@/components/Planner";

export const metadata: Metadata = {
  title: "Places to Explore",
  description: "Come exploring with me, Ananda. Choose Sigiriya, Dambulla, local food, woodwork, herbs, herbal massage centres and scenic stops for your tuk-tuk ride.",
};

export default function ToursPage() {
  return <main id="main-content"><CinematicHero eyebrow="Places around Dambulla & Sigiriya" title="Your day." emphasis="Your stops." subtitle="Choose sights, food, crafts, shops or a herbal massage. We'll work out the route together." backgroundImage="/images/heritage.webp" alt="Colourful traditional Sri Lankan masks" action="Choose stops" href="#explore" /><ExperienceBrowser full /><OutingIdeas /><Planner /></main>;
}

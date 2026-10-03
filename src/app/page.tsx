import { Hero } from "@/components/Hero";
import { HomeRideStory } from "@/components/HomeRideStory";
import { DestinationShowcase } from "@/components/DestinationShowcase";
import { ExperienceBrowser } from "@/components/ExperienceBrowser";
import { Faq } from "@/components/Faq";

export default function Home() {
  return <main id="main-content"><Hero /><DestinationShowcase /><ExperienceBrowser /><HomeRideStory /><Faq compact /></main>;
}

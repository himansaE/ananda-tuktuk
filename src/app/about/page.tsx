import type { Metadata } from "next";
import { LocalNotebook, NotebookEnding } from "@/components/LocalNotebook";
import { HomeRideStory } from "@/components/HomeRideStory";

export const metadata: Metadata = {
  title: "About me",
  description: "I'm Ananda, your local tuk-tuk driver around Dambulla and Sigiriya. I'll pick you up, wait at your stops and bring you back to your hotel.",
};

export default function AboutPage() {
  return <main id="main-content"><LocalNotebook /><HomeRideStory about /><NotebookEnding /></main>;
}

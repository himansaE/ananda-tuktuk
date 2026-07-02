import { NavBar } from "@/components/NavBar";
import { Story } from "@/components/Story";
import { Advantage } from "@/components/Advantage";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="w-full bg-background text-on-background min-h-screen">
      <NavBar />
      <div className="pt-20">
        <Story />
        <Advantage />
        <Faq />
      </div>
      <Footer />
    </main>
  );
}

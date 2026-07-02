import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Ride } from "@/components/Ride";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-background text-on-background min-h-screen">
      <NavBar />
      <Hero />
      <Ride />
      <Gallery />
      <Footer />
    </main>
  );
}

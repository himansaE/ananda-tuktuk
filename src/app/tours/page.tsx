import { NavBar } from "@/components/NavBar";
import { Tours } from "@/components/Tours";
import { Planner } from "@/components/Planner";
import { Footer } from "@/components/Footer";

export default function ToursPage() {
  return (
    <main className="w-full bg-background text-on-background min-h-screen">
      <NavBar />
      <div className="pt-20">
        <Tours />
        <Planner />
      </div>
      <Footer />
    </main>
  );
}

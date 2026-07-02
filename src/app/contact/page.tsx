import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="w-full bg-background text-on-background min-h-screen">
      <NavBar />
      <Contact />
      <Footer />
    </main>
  );
}

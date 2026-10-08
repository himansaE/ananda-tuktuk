import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { RideProvider } from "@/components/RideProvider";
import { NavBar } from "@/components/NavBar";
import { MobileRideBar } from "@/components/MobileRideBar";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-config";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-roman.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/fraunces-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces", display: "swap", fallback: ["Georgia", "serif"],
});
const inter = localFont({
  src: "./fonts/inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap",
});

const siteUrl = getSiteUrl();
const description = "I'm Ananda, your local tuk-tuk driver around Dambulla and Sigiriya. Choose sights, food, crafts and herbal massage centres. I'll pick you up, wait and bring you back.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Ananda's Tuk-Tuk Rides | Dambulla & Sigiriya", template: "%s | Ananda's Tuk-Tuk" },
  description,
  openGraph: {
    type: "website", locale: "en_GB", siteName: "Ananda's Tuk-Tuk",
    title: "A friendly ride. A little more of Sri Lanka.", description,
    ...(siteUrl ? { url: siteUrl, images: [{ url: "/images/hero-red.webp", width: 1024, height: 1024, alt: "A red tuk-tuk with Sigiriya Rock in the distance" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: "Ananda's Tuk-Tuk — Sri Lanka", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${inter.variable}`}><body>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <RideProvider><LenisProvider><NavBar />{children}<Footer /><MobileRideBar /></LenisProvider></RideProvider>
  </body></html>;
}

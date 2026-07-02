import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, Work_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const work = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Ananda's Tuk Ride | Sri Lanka",
  description: "Crafted by a Local, Driven by Heart. Experience the true essence of Sri Lanka's cultural triangle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" rel="stylesheet" />
      </head>
      <body className={`${jakarta.variable} ${syne.variable} ${work.variable} font-sans bg-background text-on-background`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

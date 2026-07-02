"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-primary-container/80 backdrop-blur-md border-0 transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-16 h-20">
        <Link className="text-headline-lg font-extrabold text-primary dark:text-primary-fixed-dim tracking-tight" href="/">
          Ananda&apos;s Tuk Ride
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link 
            className={`text-label-md uppercase tracking-wider ${
              isActive("/tours") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
            }`} 
            href="/tours"
          >
            Trips
          </Link>
          <Link 
            className={`text-label-md uppercase tracking-wider ${
              isActive("/about") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
            }`} 
            href="/about"
          >
            About Ananda
          </Link>
          <Link 
            className={`text-label-md uppercase tracking-wider ${
              isActive("/contact") 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors"
            }`} 
            href="/contact"
          >
            Contact
          </Link>
        </div>

        <Link 
          className="hidden md:block bg-primary-container text-on-primary-container px-8 py-3.5 rounded-full text-label-md uppercase tracking-wider hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 text-center" 
          href="/contact"
        >
          Book Adventure
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary flex items-center">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface dark:bg-primary-container border-t border-surface-variant/30 py-6 px-6 flex flex-col gap-6 text-label-md uppercase tracking-wider transition-all duration-300">
          <Link onClick={() => setIsOpen(false)} className={`text-primary dark:text-primary-fixed-dim ${isActive("/tours") ? "underline" : ""}`} href="/tours">Trips</Link>
          <Link onClick={() => setIsOpen(false)} className={`text-on-surface-variant dark:text-surface-variant ${isActive("/about") ? "underline" : ""}`} href="/about">About Ananda</Link>
          <Link onClick={() => setIsOpen(false)} className={`text-on-surface-variant dark:text-surface-variant ${isActive("/contact") ? "underline" : ""}`} href="/contact">Contact</Link>
          <Link onClick={() => setIsOpen(false)} className="bg-primary-container text-on-primary-container px-6 py-4 rounded-full text-center" href="/contact">
            Book Adventure
          </Link>
        </div>
      )}
    </nav>
  );
}

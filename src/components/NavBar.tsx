"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { enquiryLink } from "@/lib/site-config";
import { usePathname } from "next/navigation";
import { IconArrowUpRight, IconBrandWhatsapp, IconMenu2, IconX } from "@tabler/icons-react";
import { useSheet } from "./useSheet";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/tours" },
  { label: "About me", href: "/about" },

];

export function Brand({ linked = true }: { linked?: boolean }) {
  const mark = <><span className="brand-mark"><Image src="/images/ananda-logo-covered.png" width={36} height={27} alt="" /></span><span className="brand-name">Ananda&apos;s<span>tuk-tuk rides · Sri Lanka</span></span></>;
  return linked ? <Link className="brand" href="/" aria-label="Ananda's tuk-tuk — Home">{mark}</Link> : <span className="brand" role="img" aria-label="Ananda's tuk-tuk">{mark}</span>;
}

export function NavBar() {
  const pathname = usePathname();
  const { ref, open, close } = useSheet();
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)");
    const onChange = () => { if (wide.matches) ref.current?.close(); };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [ref]);
  return <>
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <ul className="desktop-nav">
          {links.slice(0, 3).map((link) => <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link></li>)}
        </ul>
        <a className="btn-brand nav-cta" href={enquiryLink ?? undefined} target="_blank" rel="noopener noreferrer">WhatsApp me<IconBrandWhatsapp size={17} aria-hidden="true" /></a>
        <button className="icon-button menu-trigger" onClick={(event) => open(event.detail !== 0)} aria-haspopup="dialog" aria-controls="site-menu" aria-label="Open menu"><IconMenu2 size={23} aria-hidden="true" /></button>
      </nav>
    </header>
    <dialog ref={ref} id="site-menu" className="sheet menu-sheet" aria-labelledby="menu-title" onCancel={(event) => { event.preventDefault(); close(false); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="sheet-panel menu-panel">
        <div className="sheet-top"><span id="menu-title" className="eyebrow">Where shall we go?</span><button className="icon-button" aria-label="Close menu" onClick={(event) => close(event.detail !== 0)} autoFocus><IconX size={22} aria-hidden="true" /></button></div>
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {links.map((link, index) => <Link style={{ "--link-index": index } as React.CSSProperties} key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => close(false)}>{link.label}<IconArrowUpRight size={22} aria-hidden="true" /></Link>)}
          <a style={{ "--link-index": 3 } as React.CSSProperties} href={enquiryLink ?? undefined} target="_blank" rel="noopener noreferrer" onClick={() => close(false)}>WhatsApp me<IconBrandWhatsapp size={22} aria-hidden="true" /></a>
        </nav>
      </div>
    </dialog>
  </>;
}

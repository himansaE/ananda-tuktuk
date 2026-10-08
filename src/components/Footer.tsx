import Link from "next/link";
import { IconArrowUpRight, IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";
import { contactPhone, enquiryLink, whatsappPhone } from "@/lib/site-config";
import { SectionLink } from "./SectionLink";
import { MotionSection } from "./MotionSection";

function phoneLabel(phone: string) {
  return phone.startsWith("94") && phone.length === 11
    ? `+94 ${phone.slice(2, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
    : `+${phone}`;
}

export function Footer() {
  return <MotionSection as="footer" cinema className="site-footer">
    <div className="container-page">
      <div className="footer-main">
        <div className="footer-intro" data-reveal="intro">
          <Link href="/" className="footer-brand">Ananda&apos;s<br /><em>tuk-tuk.</em></Link>
          <p>I&apos;m your local driver around<br />Dambulla &amp; Sigiriya.</p>
          <SectionLink href="/tours#explore" className="btn-brand footer-cta">Plan a ride<IconArrowUpRight size={18} aria-hidden="true" /></SectionLink>
        </div>
        <nav className="footer-links" aria-labelledby="footer-explore-title" data-reveal="links">
          <h2 id="footer-explore-title" className="footer-heading">Explore</h2>
          <Link href="/">Home</Link>
          <Link href="/tours">Places &amp; stops</Link>
          <Link href="/about">About me</Link>
          <Link href="/contact">Arrange a ride</Link>
        </nav>
        <div className="footer-contact" data-reveal="contact">
          <h2 className="footer-heading">Talk to me</h2>
          {enquiryLink && whatsappPhone && <a href={enquiryLink} target="_blank" rel="noopener noreferrer" className="footer-contact-link"><IconBrandWhatsapp size={20} aria-hidden="true" /><span><span className="footer-contact-label">WhatsApp me</span><span className="footer-contact-number">{phoneLabel(whatsappPhone)}</span></span></a>}
          {contactPhone && <a href={`tel:+${contactPhone}`} className="footer-contact-link"><IconPhone size={20} aria-hidden="true" /><span><span className="footer-contact-label">Call me</span><span className="footer-contact-number">{phoneLabel(contactPhone)}</span></span></a>}
        </div>
      </div>
      <div className="footer-bottom" data-reveal="bottom"><p>© {new Date().getFullYear()} Ananda&apos;s Tuk-Tuk</p><p>Hotel pickup · Waiting · Ride back</p></div>
    </div>
  </MotionSection>;
}

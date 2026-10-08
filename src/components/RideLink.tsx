import { SectionLink as Link } from "./SectionLink";
import { IconArrowUpRight, IconBrandWhatsapp } from "@tabler/icons-react";
import { enquiryLink } from "@/lib/site-config";

export function RideLink({ className = "btn-brand", children, direct = false }: {
  className?: string; children?: React.ReactNode; direct?: boolean;
}) {
  if (direct && enquiryLink) return (
    <a href={enquiryLink} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? "WhatsApp me"}<IconBrandWhatsapp size={18} aria-hidden="true" />
    </a>
  );
  return <Link href="/tours#explore" className={className}>{children ?? "Plan a ride"}<IconArrowUpRight size={18} aria-hidden="true" /></Link>;
}

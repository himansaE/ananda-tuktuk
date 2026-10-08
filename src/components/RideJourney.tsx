import { SectionLink as Link } from "./SectionLink";
import { IconArrowRight } from "@tabler/icons-react";
import { MotionSection } from "./MotionSection";

export function RideJourney() {
  return <MotionSection cinema id="ride-options" className="ride-options section-space" label="Choose your kind of ride">
    <div className="container-page">
      <div className="section-heading" data-reveal="heading"><h2 className="type-display">A ride or <em>a day out.</em></h2></div>
      <div className="ride-options-grid">
        <Link href="/tours#explore" className="ride-option" data-reveal="short"><div><h3>A short ride</h3><p>Your hotel, a restaurant or an attraction. Tell me where you&apos;d like to go.</p></div><IconArrowRight size={22} className="option-arrow" aria-hidden="true" /></Link>
        <Link href="/tours#explore" className="ride-option" data-reveal="outing"><div><h3>A few stops</h3><p>Combine sights, food, shops or a herbal massage. We&apos;ll plan the route together.</p></div><IconArrowRight size={22} className="option-arrow" aria-hidden="true" /></Link>
      </div>
    </div>
  </MotionSection>;
}

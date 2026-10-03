import { RideLink } from "./RideLink";
import { MotionSection } from "./MotionSection";

export function BookingCTA() {
  return <MotionSection cinema className="booking-section" label="Arrange your ride"><div className="container-page booking-content"><div data-reveal="heading"><h2 className="type-display">Let&apos;s plan<br /><em>your ride.</em></h2><p>Share your stops and pickup. We&apos;ll agree on the route and price.</p></div><div className="booking-actions" data-reveal="action"><RideLink direct /></div></div></MotionSection>;
}


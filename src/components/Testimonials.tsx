import { guestReviews } from "@/lib/guest-content";
import { MotionSection } from "./MotionSection";

export function Testimonials() {
  if (!guestReviews.length) return null;
  return <MotionSection cinema className="notebook-reviews section-space" labelledBy="reviews-title">
    <div className="container-page">
      <div className="notebook-section-heading" data-reveal="heading">
        <h2 className="type-display" id="reviews-title">A few words<br /><em>from the ride.</em></h2>
        {guestReviews.some(review => review.sample) && <p className="notebook-draft-note">Fictional reviews for design preview.</p>}
      </div>
      <div className="notebook-review-grid">{guestReviews.map(review => <figure key={review.id} className="notebook-review" data-reveal="quote">
        <blockquote><p>“{review.quote}”</p></blockquote>
        <figcaption>{review.attribution}</figcaption>
      </figure>)}</div>
    </div>
  </MotionSection>;
}

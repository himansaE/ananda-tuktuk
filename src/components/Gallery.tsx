import Image from "next/image";
import { guestPhotos } from "@/lib/guest-content";
import { MotionSection } from "./MotionSection";

export function Gallery() {
  if (!guestPhotos.length) return null;
  return <MotionSection cinema id="moments" className="notebook-gallery section-space" labelledBy="gallery-title">
    <div className="container-page">
      <div className="notebook-section-heading" data-reveal="heading">
        <h2 className="type-display" id="gallery-title">Good company.<br /><em>Lovely memories.</em></h2>
        <div><p>A few moments from our days out.</p></div>
      </div>
      <div className="notebook-guest-grid">
        {guestPhotos.map((photo) => <div className="notebook-guest-item" key={photo.id} data-reveal="photo">
          <figure className="notebook-print">
            <div className="notebook-guest-image">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 699px) 90vw, (max-width: 999px) 29vw, 26vw" quality={75} />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        </div>)}
      </div>
    </div>
  </MotionSection>;
}

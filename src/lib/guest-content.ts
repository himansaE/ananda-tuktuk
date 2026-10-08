/** Guest photos supplied by Ananda. Review quotes below remain design samples. */
export type GuestPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const guestPhotos: GuestPhoto[] = [
  { id: "guest-photo-1", src: "/images/guests/ride-1.webp", width: 720, height: 1280, alt: "A smiling young guest seated in the red tuk-tuk", caption: "A little adventure." },
  { id: "guest-photo-2", src: "/images/guests/ride-2.webp", width: 1280, height: 720, alt: "Ananda taking a selfie with two guests outdoors", caption: "Good company." },
  { id: "guest-photo-3", src: "/images/guests/ride-3.webp", width: 720, height: 1280, alt: "Ananda and two guests taking a photo beneath the trees", caption: "New friends." },
  { id: "guest-photo-4", src: "/images/guests/ride-4.webp", width: 1280, height: 960, alt: "Two guests smiling beside the red tuk-tuk", caption: "Ready to explore." },
  { id: "guest-photo-5", src: "/images/guests/ride-5.webp", width: 1280, height: 960, alt: "Ananda and two guests smiling beneath a brick archway", caption: "Memories along the way." },
];

export type GuestReview = { id: string; quote: string; attribution: string; sample: boolean };
export const guestReviews: GuestReview[] = [
  { id: "review-1", quote: "We spent the morning at Sigiriya and stopped for lunch afterwards. Ananda waited while we explored, so we could take our time. A lovely, relaxed day.", attribution: "Elin & Stellan", sample: true },
  { id: "review-2", quote: "We arranged our pickup on WhatsApp and visited the Dambulla temples. It was nice to have the ride back sorted before we set off. Thank you, Ananda!", attribution: "Maëlle", sample: true },
  { id: "review-3", quote: "We wanted a quieter day and chose a village outing. We had time to look around and stop for something to eat. The tuk-tuk ride was part of the fun.", attribution: "Ivo & Saskia", sample: true },
];

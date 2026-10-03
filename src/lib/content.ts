export const categories = [
  { id: "all", label: "Everything" },
  { id: "sights", label: "Sights" },
  { id: "food", label: "Food" },
  { id: "crafts", label: "Crafts & shops" },
  { id: "relax", label: "Herbs & spas" },
  { id: "nature", label: "Nature" },
] as const;

export type Category = (typeof categories)[number]["id"];
export type Stop = {
  id: string;
  title: string;
  category: Exclude<Category, "all">;
  label: string;
  image: string;
  alt: string;
  summary: string;
  description: string;
  note: string;
  photoNote?: string;
};

export const stops: Stop[] = [
  {
    id: "sigiriya", title: "Sigiriya Rock", category: "sights", label: "A little adventure",
    image: "/images/hero-red.webp", alt: "A red tuk-tuk with Sigiriya Rock in the distance",
    summary: "Visit Sigiriya and enjoy the views.",
    description: "I can take you to Sigiriya, wait while you explore, then take you to lunch or bring you back to your hotel.",
    note: "Entry tickets are separate. Tell me how much time you'd like at the rock.",
  },
  {
    id: "lunch", title: "Sri Lankan food", category: "food", label: "Something delicious",
    image: "/images/lunch.webp", alt: "A plate of Sri Lankan rice and curry with colourful vegetables",
    summary: "Rice, curry and local restaurants.",
    description: "Ask me for places to eat along your route, or choose your own restaurant. Let me know any food preferences when we plan the ride.",
    note: "Food and drinks are paid separately. The restaurant is your choice.",
    photoNote: "Example photo. I'll help you choose a restaurant.",
  },
  {
    id: "crafts", title: "Woodwork & crafts", category: "crafts", label: "Made by hand",
    image: "/images/crafts.webp", alt: "Hands carefully carving a piece of wood with a chisel",
    summary: "Woodcarving and handmade crafts.",
    description: "Visit a craft or woodcarving shop. Browse handmade pieces and, where available, see the work behind them.",
    note: "Visits depend on opening times. Looking around doesn't mean you have to buy anything.",
    photoNote: "Example photo. Workshops may differ.",
  },
  {
    id: "spa", title: "A spa stop", category: "relax", label: "Time to unwind",
    image: "/images/spa.webp", alt: "A rolled towel, scented oil and candles set out for a relaxing spa visit",
    summary: "A spa visit, with a ride back.",
    description: "Choose a spa or ask me about nearby options. I can take you there, then wait or return at an agreed time.",
    note: "Treatments and spa bookings are separate. Check the treatment, price and availability with the spa.",
    photoNote: "Example photo. Choose your spa before the ride.",
  },
  {
    id: "heritage", title: "Heritage & antique shops", category: "crafts", label: "A piece of Sri Lanka",
    image: "/images/heritage.webp", alt: "A display of colourful traditional Sri Lankan wooden masks",
    summary: "Masks, antiques and local keepsakes.",
    description: "Tell me what you'd like to find. I can suggest heritage, souvenir or antique shops along your route.",
    note: "Shopping stops are always optional. Ask the shop about an item's age, origin and any travel restrictions before buying.",
    photoNote: "Example photo. Shops and items may differ.",
  },
  {
    id: "herbs", title: "Herbs & spices", category: "relax", label: "Follow your curiosity",
    image: "/images/herbs.webp", alt: "Small bowls of leafy herbs and colourful spices",
    summary: "Browse local herbs and spices.",
    description: "Add a herbal shop to your outing. Browse local herbs, spices and herbal products, and ask the shop about anything that interests you.",
    note: "Buying is optional. Shop products and any paid activities are separate from your ride.",
    photoNote: "Example photo. Products may differ.",
  },
  {
    id: "dambulla", title: "Dambulla Cave Temple", category: "sights", label: "A moment of wonder",
    image: "/images/dambulla-cave.webp", alt: "Visitors beside the white temple buildings beneath Dambulla's rock face",
    summary: "Visit the caves at your own pace.",
    description: "I can wait while you explore the cave temple. Afterwards, I'll take you to another stop or back to your hotel.",
    note: "Entry tickets are separate. Check the temple's current dress and entry requirements before visiting.",
  },
  {
    id: "pidurangala", title: "Pidurangala views", category: "sights", label: "For the view",
    image: "/images/sigiriya-view.webp", alt: "Sigiriya Rock rising above the green Sri Lankan countryside",
    summary: "Arrange a ride for your climb.",
    description: "Plan your pickup, time at Pidurangala and return ride with me. I can add a breakfast or lunch stop if you like.",
    note: "Entry is separate. Ask about the route and conditions before choosing a climb.",
    photoNote: "A view of Sigiriya, the landmark seen from the surrounding area.",
  },
  {
    id: "lake", title: "Lakes & village roads", category: "nature", label: "Take the scenic way",
    image: "/images/lake.webp", alt: "A calm Sri Lankan lake surrounded by trees",
    summary: "Lakeside views and quieter roads.",
    description: "Ask me for a scenic route or a lakeside stop that fits the time you have.",
    note: "The route and stopping places are agreed with you. Any paid local activities are separate.",
  },
  {
    id: "safari", title: "A safari connection", category: "nature", label: "Into the outdoors",
    image: "/images/safari.webp", alt: "Elephants in the Sri Lankan countryside",
    summary: "A ride to your safari meeting point.",
    description: "Tell me your safari meeting point and booking time. I can arrange your tuk-tuk ride there and back.",
    note: "The tuk-tuk ride is separate from a safari. A safari jeep, park tickets and bookings must be arranged and priced separately.",
  },
];

export const stopIds = stops.map((stop) => stop.id);
export const featuredStopIds = ["lunch", "crafts", "spa", "heritage", "herbs", "lake"];

export const outings = [
  {
    title: "Temples & lunch.", mood: "A little exploring", image: "/images/dambulla-cave.webp",
    alt: "The white temple buildings beneath Dambulla's rock face", stops: ["dambulla", "lunch"],
    description: "Visit the caves, then stop for lunch.",
  },
  {
    title: "Crafts, shops & herbs.", mood: "For curious people", image: "/images/heritage.webp",
    alt: "Colourful Sri Lankan masks on display", stops: ["crafts", "heritage", "herbs"],
    description: "Browse woodcarving, keepsakes and herbs.",
  },
  {
    title: "Lake, spa & lunch.", mood: "No need to rush", image: "/images/lake.webp",
    alt: "Trees reflected in a quiet lake", stops: ["lake", "spa", "lunch"],
    description: "Enjoy a scenic ride and a relaxing afternoon.",
  },
];

export const faqs = [
  { question: "Can you pick me up at my hotel?", answer: "Yes. Send me your hotel or pickup location. I'll confirm where and when to meet you." },
  { question: "Can you wait while I visit a place?", answer: "Yes. I can wait at attractions and other stops. I'll agree on the waiting time and price with you before the ride." },
  { question: "Can you bring me back to my hotel?", answer: "Yes. Arrange your return when you plan the ride. For a one-way ride, agree on the drop-off point." },
  { question: "Can I visit more than one place?", answer: "Of course. Pick a few places you like, or ask me for ideas. I'll help you work out a route that fits your time." },
  { question: "How much is the ride?", answer: "It depends on your route, stops, waiting and return trip. Ask for a quote and agree on the details before you go." },
  { question: "Are tickets, meals and spa treatments included?", answer: "They are paid separately unless your agreed quote clearly says otherwise. Check prices and availability with the attraction, restaurant, shop or spa." },
  { question: "Do I have to visit shops or buy anything?", answer: "No. Shops are optional stops, and buying is always your choice. You can ask for a ride with no shopping stops at all." },
  { question: "What if I haven't decided where to go?", answer: "Tell me how much time you have and what you enjoy. I'll help you choose the stops." },
  { question: "Can I bring my family or luggage?", answer: "Tell me how many people are coming and what luggage you have. I'll confirm whether the ride is suitable." },
];

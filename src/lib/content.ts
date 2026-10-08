export const categories = [
  { id: "all", label: "Everything" },
  { id: "sights", label: "Sights" },
  { id: "food", label: "Food" },
  { id: "crafts", label: "Crafts & shops" },
  { id: "relax", label: "Herbs & massage" },
  { id: "nature", label: "Nature" },
] as const;

export type Category = (typeof categories)[number]["id"];
export type StopPhoto = { src: string; alt: string };
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
  photos?: StopPhoto[];
};

export const stops: Stop[] = [
  {
    id: "sigiriya", title: "Sigiriya Rock", category: "sights", label: "A little adventure",
    image: "/images/details/sigiriya-gardens.webp", alt: "Sigiriya Rock above the gardens and central pathway",
    photos: [
      { src: "/images/details/sigiriya-summit.webp", alt: "An aerial view of the ruins and pools on Sigiriya's summit" },
      { src: "/images/details/sigiriya-lion-paws.webp", alt: "The stone lion paws and stairway leading up Sigiriya Rock" },
      { src: "/images/details/sigiriya-frescoes.webp", alt: "Ancient painted frescoes on Sigiriya's rock wall" },
    ],
    summary: "Visit Sigiriya and enjoy the views.",
    description: "I can take you to Sigiriya, wait while you explore, then take you to lunch or bring you back to your hotel.",
    note: "Entry tickets are separate. Tell me how much time you'd like at the rock.",
  },
  {
    id: "lunch", title: "Sri Lankan food", category: "food", label: "Something delicious",
    image: "/images/details/food-lamprais.webp", alt: "Rice and curries served on a banana leaf",
    photos: [{ src: "/images/details/food-kottu.jpg", alt: "A plate of kottu with fresh vegetables" }, { src: "/images/details/food-rice-curry.jpg", alt: "Sri Lankan rice and curries served in clay bowls" }],
    summary: "Rice, curry and local restaurants.",
    description: "Try rice and curry, kottu or a local favourite. I can suggest a place to eat along your route.",
    note: "Tell me if you prefer mild, spicy or vegetarian food.",
  },
  {
    id: "crafts", title: "Woodwork & crafts", category: "crafts", label: "Made by hand",
    image: "/images/details/woodcraft-painting.jpg", alt: "A visitor painting a wooden elephant in a craft workshop",
    photos: [{ src: "/images/details/woodcraft-carving.webp", alt: "A craftsperson chiselling an intricate floral carving" }, { src: "/images/details/woodcraft-elephant.webp", alt: "A craftsperson shaping a wooden elephant with a chisel" }],
    summary: "Woodcarving and handmade crafts.",
    description: "Visit a workshop. Browse handmade pieces and, where available, see the work behind them.",
    note: "Visits depend on opening times.",
  },
  {
    id: "spa", title: "Herbal massage centre", category: "relax", label: "Time to unwind",
    image: "/images/details/massage-feet.jpg", alt: "A foot massage with oil and herbal preparations",
    photos: [
      { src: "/images/details/massage-oil.jpg", alt: "An oil treatment poured gently onto the forehead" },
      { src: "/images/details/massage-head.jpg", alt: "A relaxing head massage" },
      { src: "/images/details/massage-herbal-compress.jpg", alt: "A herbal compress used during a back massage" },
    ],
    summary: "A herbal massage, with a ride back.",
    description: "Choose a herbal massage centre or ask me about nearby options. I can take you there, then wait or return at an agreed time.",
    note: "Treatments and bookings are separate. Check the treatment, price and availability with the herbal massage centre.",
  },
  {
    id: "herbs", title: "Herbs & spices", category: "relax", label: "Follow your curiosity",
    image: "/images/details/herbs-garden-group.jpg", alt: "Visitors learning about herbs and spices in a tropical garden",
    photos: [
      { src: "/images/details/herbs-vanilla.webp", alt: "A guide showing vanilla plants growing on a garden trellis" },
      { src: "/images/details/herbs-spices.jpg", alt: "Cinnamon, nutmeg, mace and pepper from a spice garden" },
      { src: "/images/details/herbs-garden-visit.jpg", alt: "A guide introducing garden plants to visitors" },
    ],
    summary: "Browse local herbs and spices.",
    description: "Add a herbal shop to your outing. Browse local herbs, spices and herbal products, and ask the shop about anything that interests you.",
    note: "Buying is optional. Shop products and any paid activities are separate from your ride.",
  },
  {
    id: "dambulla", title: "Dambulla Cave Temple", category: "sights", label: "A moment of wonder",
    image: "/images/details/dambulla-entrance.jpg", alt: "The white entrance to Dambulla Cave Temple beneath the rock face",
    photos: [
      { src: "/images/details/dambulla-painted-cave.jpg", alt: "Painted ceilings and Buddha statues inside Dambulla Cave Temple" },
      { src: "/images/details/dambulla-statues.jpg", alt: "Buddha statues around a stupa beneath a richly painted cave ceiling" },
      { src: "/images/details/dambulla-lotus.jpg", alt: "A lotus pond beside the white cave temple buildings" },
    ],
    summary: "Visit the caves at your own pace.",
    description: "I can wait while you explore the cave temple. Afterwards, I'll take you to another stop or back to your hotel.",
    note: "When visiting the temple, please keep your shoulders and knees covered and kindly remove your shoes and hat before entering. Bring water for the climb. Entry tickets are separate.",
  },
  {
    id: "pidurangala", title: "Pidurangala views", category: "sights", label: "For the view",
    image: "/images/details/pidurangala-summit.webp", alt: "A visitor enjoying countryside and lake views from Pidurangala's summit",
    photos: [
      { src: "/images/details/pidurangala-sigiriya.webp", alt: "A couple at Pidurangala with Sigiriya Rock rising through the mist behind them" },
      { src: "/images/details/pidurangala-panorama.webp", alt: "Panoramic views of lakes and green countryside from Pidurangala" },
    ],
    summary: "Arrange a ride for your climb.",
    description: "Plan your pickup, time at Pidurangala and return ride with me. I can add a breakfast or lunch stop if you like.",
    note: "Entry is separate. Ask about the route and conditions before choosing a climb.",
  },
  {
    id: "lake", title: "Village safari", category: "nature", label: "A taste of village life",
    image: "/images/details/village-boat.jpg", alt: "Visitors enjoying a boat ride on a village lake",
    photos: [
      { src: "/images/details/village-cart.jpg", alt: "Visitors riding a traditional bullock cart along a village path" },
      { src: "/images/details/village-road.jpg", alt: "A bullock cart and its driver on a tree-lined village road" },
      { src: "/images/details/village-lake.jpg", alt: "Visitors paddling across a lake surrounded by greenery" },
    ],
    summary: "Village life, boat rides and bullock carts.",
    description: "Explore a village, enjoy a boat ride or try a traditional bullock cart ride. Tell me what you'd like to do. I can take you to the village safari, wait and bring you back.",
    note: "We'll confirm the activities and availability before you go. Village safari activities are separate from my tuk-tuk ride.",
  },
  {
    id: "golden-temple", title: "Dambulla Golden Temple", category: "sights", label: "A golden landmark",
    image: "/images/details/golden-temple-entrance.webp", alt: "The Golden Buddha above the ornate entrance to Dambulla Golden Temple",
    photos: [
      { src: "/images/details/golden-temple-stupa.webp", alt: "A golden stupa surrounded by Buddhist flags in the temple grounds" },
      { src: "/images/details/golden-temple-buddha.webp", alt: "A close view of the seated Golden Buddha beneath a cloudy sky" },
    ],
    summary: "See the Golden Buddha and temple grounds.",
    description: "Visit the Golden Buddha and explore the temple grounds at your own pace. I can pick you up, wait while you visit and bring you back, or take you to your next stop.",
    note: "When visiting the temple, please keep your shoulders and knees covered and kindly remove your shoes and hat before entering. You can pair this stop with Dambulla Cave Temple.",
  },
];

export const stopIds = stops.map((stop) => stop.id);
export const featuredStopIds = ["lunch", "crafts", "spa", "herbs", "lake"];

export const outings = [
  {
    title: "Sigiriya & lunch.", mood: "A little adventure", image: "/images/details/sigiriya-gardens.webp",
    alt: "Sigiriya Rock above its gardens", stops: ["sigiriya", "lunch"],
    description: "Explore the rock at your own pace, then stop for lunch. I'll wait and bring you back.",
  },
  {
    title: "Pidurangala & breakfast.", mood: "An early start", image: "/images/details/pidurangala-summit.webp",
    alt: "Views across the countryside from Pidurangala", stops: ["pidurangala", "lunch"],
    description: "Plan an early pickup for the climb, then enjoy breakfast. We'll confirm the timing together.",
  },
  {
    title: "Dambulla temples.", mood: "Time to explore", image: "/images/details/dambulla-entrance.jpg",
    alt: "The white entrance to Dambulla Cave Temple beneath the rock face", stops: ["dambulla", "golden-temple"],
    description: "Visit the cave temple and Golden Buddha, with time to enjoy both. I'll wait and take you back.",
  },
  {
    title: "Village safari.", mood: "A taste of village life", image: "/images/details/village-boat.jpg",
    alt: "Visitors enjoying a boat ride on a village lake", stops: ["lake"],
    description: "Enjoy a village outing with the activities you choose. We'll check what's included, including lunch.",
  },
  {
    title: "Workshops & herbs.", mood: "For curious people", image: "/images/details/woodcraft-painting.jpg",
    alt: "A visitor painting a wooden elephant in a workshop", stops: ["crafts", "herbs"],
    description: "Explore a workshop, then browse herbs and spices.",
  },
];

export const faqs = [
  { question: "Can you pick me up at my hotel?", answer: "Yes. Send me your hotel or pickup location. I'll confirm where and when to meet you." },
  { question: "Can you wait while I visit a place?", answer: "Yes. I can wait at attractions and other stops. I'll agree on the waiting time and price with you before the ride." },
  { question: "Can you bring me back to my hotel?", answer: "Yes. Arrange your return when you plan the ride. For a one-way ride, agree on the drop-off point." },
  { question: "Can I visit more than one place?", answer: "Of course. Pick a few places you like, or ask me for ideas. I'll help you work out a route that fits your time." },
  { question: "How much is the ride?", answer: "It depends on your route, stops, waiting and return trip. Ask for a quote and agree on the details before you go." },
  { question: "Are tickets, meals and herbal massages included?", answer: "I only charge for the ride. Tickets, meals, shopping, herbal massages and any other activities are paid separately by you." },
  { question: "Do I have to visit shops or buy anything?", answer: "No. Shops are optional stops, and buying is always your choice. You can ask for a ride with no shopping stops at all." },
  { question: "What if I haven't decided where to go?", answer: "Tell me how much time you have and what you enjoy. I'll help you choose the stops." },
  { question: "Can I bring my family or luggage?", answer: "Tell me how many people are coming and what luggage you have. I'll confirm whether the ride is suitable." },
];

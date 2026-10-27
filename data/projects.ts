/* =====================================================================
   CLIENT WORK — one entry per client site, in the order shown.
   ---------------------------------------------------------------------
   Colours come from each client's own design file, so every case frame
   wears that client's brand, not this site's. `stage` is the frame
   background and `ink` the text on it; `npm run contrast` fails if the
   pair drops below 4.5:1.
   Screenshots live in public/work/<slug>-desk.webp and -mob.webp.
   ===================================================================== */

export type Swatch = { name: string; hex: string };

export type Project = {
  slug: string;
  client: string;
  /** What the client does, in a few words. */
  kind: string;
  /** One sentence: what the site does for them. */
  summary: string;
  /** Live address, or "" when the site isn't public yet. */
  url: string;
  year: string;
  stage: string;
  ink: string;
  accent: string;
  palette: Swatch[];
  /** The one object the design is built around. */
  signature: string;
  brief: string;
  built: string[];
  decisions: string[];
  stack: string[];
  /** Extra page shot, if any (public/work/<slug>-<extra>-desk.webp). */
  extra?: { file: string; caption: string };
};

export const projects: Project[] = [
  {
    slug: "theo-olayanju",
    client: "Theo Olayanju",
    kind: "Wedding, corporate and TV host",
    summary: "A booking site for a Lagos host that sends every enquiry straight to his WhatsApp.",
    url: "https://www.theoolayanju.com",
    year: "2026",
    stage: "#1A0A10",
    ink: "#F4ECE2",
    accent: "#D6B06B",
    palette: [
      { name: "Wine", hex: "#1A0A10" },
      { name: "Velvet", hex: "#2E0D19" },
      { name: "Brass", hex: "#D6B06B" },
      { name: "Tail-light", hex: "#FF5A4B" },
      { name: "Pearl", hex: "#F6EFE6" },
    ],
    signature: "His fedora. It sits on the H in his name, tips when you hover the logo and seals the booking ticket.",
    brief:
      "Theo hosts weddings, corporate events and TV, and runs a YouTube show, Car-eoke with Theo. He wanted a site that looked as bold and elegant as he does on stage, and that turned visitors into bookings without a back-and-forth.",
    built: [
      "Four pages: home, rate card, Car-eoke video gallery and a booking page",
      "A booking form with a live \"ticket\" that fills in as you type, then sends the details to Theo's WhatsApp",
      "A rate card that reads from one editable file, so Theo can change his prices without a developer",
      "A Car-eoke gallery of his YouTube episodes with silent hover previews",
      "Search-ready from day one: canonical tags, sitemap and social previews built from one address",
    ],
    decisions: [
      "Oxblood velvet instead of the black-and-gold every \"luxury host\" site wears",
      "Brass is the only colour you can click; tail-light red lives only inside the Car-eoke section",
      "Bodoni Moda for his name, the typeface of fashion mastheads and black-tie invitations",
      "Every page is static, so it loads fast on mobile data and costs nothing to host",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Vercel"],
    extra: { file: "rates", caption: "The rate card, edited from a single file" },
  },
  {
    slug: "the-corporate-emcee",
    client: "The Corporate Emcee",
    kind: "Master of Ceremonies, Lagos",
    summary: "A site for a corporate MC that builds the quote with the client and hands it over on WhatsApp.",
    url: "https://thecorporatemcee.com",
    year: "2026",
    stage: "#412D63",
    ink: "#F3EEF8",
    accent: "#D8B25C",
    palette: [
      { name: "Brand purple", hex: "#412D63" },
      { name: "Night aubergine", hex: "#110B1A" },
      { name: "Stage gold", hex: "#D8B25C" },
      { name: "Lilac paper", hex: "#F5F2F8" },
      { name: "Lavender", hex: "#B79AE8" },
    ],
    signature: "His fila above a tuxedo and bow tie. The loader, page transitions, logo and footer are all built from it.",
    brief:
      "Tosin has hosted 1,500+ events for brands like Coca-Cola, KPMG and USAID. His buyers are corporate event planners, so the site had to look like someone who already runs on time, and make booking him easy from a phone.",
    built: [
      "Home, rates and booking pages, written for event planners first",
      "An estimate builder: pick a package and extras, see the total in ₦, send the quote to WhatsApp",
      "A booking form that writes the WhatsApp or email message for the visitor, with a live invitation preview",
      "His fila-and-tuxedo mark split into parts and animated as the page loader and transitions",
      "Scripts that redraw the printable rate-card PDF and the link-preview image from the same data",
      "Everything editable from a data folder: prices, FAQ, client names, photos, videos",
    ],
    decisions: [
      "Purple leads and gold is an accent you earn, because the black-and-gold party template reads wedding-first",
      "A house-lights toggle flips the reading sections between lilac paper and aubergine; the stage stays dark",
      "Built at 360px first for planners on mid-range Android phones",
      "Body text stays at 17px on phones; nothing shrinks to fit",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Playwright (PDF + OG)", "Vercel"],
    extra: { file: "rates", caption: "Rates with the estimate builder" },
  },
  {
    slug: "kinta-and-co",
    client: "Kinta & Co.",
    kind: "Streetwear label",
    summary: "An interactive 3D clothing rack: hover a garment to swivel it, tap to open the product.",
    url: "",
    year: "2026",
    stage: "#E8E8E0",
    ink: "#171914",
    accent: "#B8FF2C",
    palette: [
      { name: "Studio wall", hex: "#E8E8E0" },
      { name: "Ink", hex: "#171914" },
      { name: "Lime strip", hex: "#B8FF2C" },
      { name: "Chrome", hex: "#73756C" },
    ],
    signature: "The rack itself: a chrome rail with wooden hangers holding ten colourways of five designs.",
    brief:
      "Kinta & Co. sells through Instagram. They wanted a showroom that felt like walking into the store, then a simple way for customers to put together an order and send it to them.",
    built: [
      "A full-screen 3D rack with ten garments that swivel forward and push their neighbours apart on hover",
      "Product pages with front/back views, drag-to-turn, colour tags and size and quantity selection",
      "A bag that saves on the device and prepares an enquiry to send to Kinta on Instagram",
      "Light models on phones, detailed meshes and 2K textures loaded only on desktop close-ups",
      "Full keyboard control (Tab, Enter, arrow keys, Escape) and reduced-motion support",
    ],
    decisions: [
      "A plain studio wall and black type so the garments carry all the colour",
      "Lime appears once, as the announcement strip, the way a shop puts up one sign",
      "Prices show \"on request\" until real prices are supplied; nothing pretends to check out",
    ],
    stack: ["Next.js 15", "React Three Fiber", "Three.js", "GSAP", "Zustand", "TypeScript"],
  },
  {
    slug: "drip-bunny",
    client: "Drip Bunny",
    kind: "Pour-painting craft kit",
    summary: "A storefront with a 3D marble-paint playground where you pour your own colourway.",
    url: "",
    year: "2026",
    stage: "#462132",
    ink: "#FFFAF1",
    accent: "#F34370",
    palette: [
      { name: "Plum", hex: "#462132" },
      { name: "Cream", hex: "#FFFAF1" },
      { name: "Pink", hex: "#F34370" },
      { name: "Blue", hex: "#168FE8" },
      { name: "Green", hex: "#23A46A" },
    ],
    signature: "The bunny, built from shapes and covered in procedural marble that changes with the colourway you pick.",
    brief:
      "Drip Bunny sells a kit for pour-painting a bunny figure in four colourways. The site needed to show what the finished piece could look like, and let people play before they buy.",
    built: [
      "Ten sections: hero, colourways, Marble Lab, scroll story, collection, kit breakdown, gallery, uses, FAQ, call to action",
      "Marble Lab: choose a base and three colours, watch the paint pour, remix, rotate",
      "A bag with per-colourway quantities, subtotal and saved state",
      "3D only mounts when it's on screen and pauses when it isn't, with an illustrated fallback",
      "Unit tests (Vitest) and browser tests (Playwright)",
    ],
    decisions: [
      "Picking a colourway re-colours the hero, the backdrop and the controls together",
      "Rounded Fredoka headings to match the toy-like packaging",
      "Accessible dialogs and menus: focus is trapped, Escape closes, focus returns",
    ],
    stack: ["Next.js 16", "React Three Fiber", "Tailwind 4", "GSAP", "Framer Motion", "Zustand", "Playwright"],
  },
  {
    slug: "uchechukwu-onuoma",
    client: "Uchechukwu Onuoma",
    kind: "Customer success professional",
    summary: "A personal portfolio with a working study planner built in, for a data science student.",
    url: "https://uchechukwu-onuoma.vercel.app",
    year: "2026",
    stage: "#641F36",
    ink: "#F5F0EB",
    accent: "#F7A93B",
    palette: [
      { name: "Burgundy", hex: "#641F36" },
      { name: "Ivory", hex: "#F5F0EB" },
      { name: "Marigold", hex: "#F7A93B" },
      { name: "Rose", hex: "#D6336C" },
      { name: "Teal", hex: "#2A9D8F" },
    ],
    signature: "The planner: a real tool she uses every day, sitting inside her portfolio.",
    brief:
      "Uche is a healthcare-management graduate in Customer Success, studying Data Science. She needed a portfolio for recruiters that also met her university web-technologies project rubric.",
    built: [
      "Home, about, projects, planner and contact pages",
      "Five customer-success case studies linked out to her Notion write-ups",
      "A working academic planner: daily checklist, timetable, calendar, notes, reminders and progress",
      "Planner data saved on the device and validated with Zod every time it's read back",
      "Tested end to end at desktop and 360px, including automated accessibility checks (axe)",
    ],
    decisions: [
      "Burgundy and ivory for a warm, professional tone; marigold, rose and teal for the planner's categories",
      "Skills shown as a learning journey, with no made-up percentages",
      "The contact form says honestly that it's a demo, with an email fallback",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Zod", "Vitest", "Playwright + axe"],
    extra: { file: "planner", caption: "The study planner" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

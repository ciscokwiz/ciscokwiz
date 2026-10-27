/* =====================================================================
   PRODUCTS — things built as products rather than client sites.
   `status` is shown as a small label; keep it honest.
   ===================================================================== */

export type Product = {
  name: string;
  status: string;
  summary: string;
  role: string;
  stack: string[];
  url?: string;
};

export const products: Product[] = [
  {
    name: "Namestack",
    status: "Maintainer",
    summary:
      "A domain portfolio manager for resellers: track domain health, renewals and resale value, then buy and sell through an on-chain escrow on Stellar.",
    role: "Maintain the monorepo: Next.js dashboard, Cloudflare Worker backend and the Soroban SDK package.",
    stack: ["Next.js", "Cloudflare Workers", "Soroban", "Turborepo"],
    url: "https://github.com/namestackpro/namestack",
  },
  {
    name: "AthScale",
    status: "Hackathon build",
    summary:
      "An AI CFO for small businesses on top of BMONI's wallets and payouts. It watches spending, explains it in plain words, and turns approved decisions into real payments.",
    role: "Go API with Postgres migrations and webhook handling, Next.js dashboard, and a Flutter signing app.",
    stack: ["Go", "PostgreSQL", "Next.js", "Flutter", "Docker"],
  },
  {
    name: "SARV",
    status: "Building now",
    summary:
      "One inbox for social-media vendors and SMEs: DMs, orders and customer service from every platform, with AI help, instead of juggling apps.",
    role: "Product and frontend.",
    stack: ["React", "TypeScript", "AI"],
  },
  {
    name: "Ticketcentral",
    status: "Shipped",
    summary: "Buy event tickets securely with crypto or card. Discover events, manage bookings and pay without friction.",
    role: "Frontend, from design to deployment.",
    stack: ["React", "TypeScript", "Tailwind"],
    url: "https://ticketcentral.cv",
  },
  {
    name: "Infra Manager",
    status: "Open source",
    summary:
      "Watches cloud servers and GPUs for idle time and shuts down expensive instances automatically. Web dashboard plus a CLI.",
    role: "Built it end to end.",
    stack: ["Go", "AWS EC2", "CloudWatch"],
    url: "https://github.com/ciscokwiz/Infra-manager",
  },
];

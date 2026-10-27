# Portfolio site: editing and deploying

The portfolio (Next.js 16) lives in this repo next to the GitHub profile `README.md`. The design system is in [`DESIGN.md`](./DESIGN.md).

## Change the content

| What | File |
|---|---|
| WhatsApp number, email, LinkedIn, domain, "currently building" | `data/site.ts` |
| Client case studies (text, colours, live links) | `data/projects.ts` |
| Products (Namestack, AthScale, SARV…) | `data/products.ts` |
| Open-source repos | `data/opensource.ts` |
| Journey, process steps, "What you get" | `data/journey.ts` |
| Screenshots | `public/work/<slug>-desk.webp` (1440×900) and `-mob.webp` (390×844) |
| Link-preview image | `public/og.png` (1200×630) |

Set `contact.whatsapp` in `data/site.ts` (digits only, e.g. `2348012345678`) and every "Start your website" button opens a WhatsApp chat with a message already written. Without it, they fall back to email, then LinkedIn.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck + client colour contrast + production build
```

## Deploy on Vercel

1. https://vercel.com/new → import `ciscokwiz/ciscokwiz`.
2. Framework: Next.js (detected). Root directory: `./`. No environment variables.
3. Deploy. Every push to the production branch redeploys.
4. Domain: Project → Settings → Domains → add `kosiso.cv` (or whichever domain you use), then set the same address as `url` in `data/site.ts`.

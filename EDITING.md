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

The glow that follows the mouse across the background grid is set by `glow` in `data/site.ts` (`"blue"` or `"brass"`). Add `?glow=brass` or `?glow=blue` to the address to preview the other one before changing it.

Light and dark mode: visitors switch with the sun/moon button in the nav, and their choice is remembered on their device. Dark is the default. Colours for both live at the top of `app/globals.css` (`:root` for dark, `:root[data-theme="light"]` for light).

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
4. Custom domain (optional): Project → Settings → Domains, then set the same address as `url` in `data/site.ts`. Until then the site uses its Vercel address automatically.

# Kosiso Ikezogwo — Style Reference
> A graphite studio wall with other people's brand swatches pinned to it, lit by one brass lamp.

**Theme:** dark (graphite, never black). One theme, on purpose: simpler, and it lets client colours glow.
**Lineage:** Fintech-minimal restraint for Kosiso's own frame, because a business owner hiring a developer is making a trust decision, and quiet confidence reads as competence. Each case-study frame then carries its client's *own* lineage (entertainment for Theo and The Corporate Emcee, streetwear for Kinta & Co., playful retail for Drip Bunny), so the work does the showing off.

**The message, everywhere:** *I build your brand exactly the way you see it, and I make it stand out online.* Every headline, section and button is written to prove one half of that sentence.

Graphite greys and brushed brass came from Kosiso: darker but not too dark, lots of grey, brass as the single accent, elegant and simple, fun but not bubbly. Brass is the colour of the action and nothing else, so the eye always knows where to go. The signature object is the **swatch chip**, a small squared paint-card holding a client's brand colour, lifted from the style guides Kosiso writes for every client. It proves the claim without saying it: no two clients share a palette.

Rejected: a neon-on-black developer portfolio (reads engineer-to-engineer, not to a business owner); black-and-gold foil (the "luxury" cliché, and too shouty); rounded pastel cards (bubbly).

## Intake
| Variable | Value | Note |
|---|---|---|
| Sector | Freelance web design and development | |
| Audience | 1) Business owners and personal brands referred by past clients; 2) technical collaborators in the Stellar ecosystem | Buyers first |
| Personality | **Premium** + **Warm** | Fun but not too fun |
| Tier | Premium execution, mid-market pricing | |
| Device mix | Mobile majority (link shared on WhatsApp/Instagram) | Built 360px first |
| Register | Plain, warm English; jargon only in Open Source | |
| Geography | Nigeria-based; clients in Lagos; open source is global | |
| Must-avoid | Bright colour, bubbly shapes, neon dev template, skill bars, fake testimonials, inflated numbers | From Kosiso |
| References | Kosiso's own client sites and their DESIGN.md files | |

## Color Palette
| Name | Hex | Role |
|---|---|---|
| Graphite | `#1E1F22` | Page canvas |
| Slate | `#26282B` | Cards, case captions |
| Raised | `#2E3034` | Swatch backs, hover |
| Line | `#3A3C41` | Hairlines and borders |
| Line strong | `#4A4C52` | Secondary-button borders, phone frames |
| Ivory | `#EDEAE3` | Headlines (13.7:1 on Graphite) |
| Body | `#C2BFB7` | Body text (9.0:1) |
| Muted | `#A6A39B` | Captions, meta (6.5:1 on Graphite, 5.3:1 on Raised) |
| Brass | `#C9A45C` | The only accent: buttons, links, focus, labels, the one italic phrase per headline (7.0:1) |
| Brass light | `#D8B878` | Brass hover only |

Client palettes are data, not tokens. Each project in `data/projects.ts` declares its own `stage` and `ink`, used only inside its own case frame; `npm run contrast` fails the check if a pair drops below 4.5:1.

## Typography
- **Instrument Serif** (400 + italic): h1, h2, case titles, big numerals. Elegant, slightly condensed, never bold. The italic, in brass, carries the one emphasised phrase in a headline.
- **Schibsted Grotesk Variable**: body, UI, labels, h3.
- Two families, self-hosted via Fontsource, `font-display: swap`.

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero H1 (serif) | clamp(2.75rem, 8vw, 6rem) | 400 | 0.98 | -0.02em |
| H2 (serif) | clamp(2.125rem, 5vw, 3.75rem) | 400 | 1.02 | -0.015em |
| H3 (sans) | clamp(1.25rem, 2.2vw, 1.5rem) | 600 | 1.25 | -0.015em |
| Lead | clamp(1.125rem, 1.8vw, 1.3125rem) | 400 | 1.55 | 0 |
| Body | 17px | 400 | 1.6 | 0 |
| Small | 15px | 500 | 1.45 | 0 |
| Label | 13px | 600 | 1.3 | 0.01em, sentence case |

## Spacing & Shape
- Base 4px. Scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section padding `clamp(72px, 11vw, 136px)`; gutters 16px at 360px, 32px from 768px; max width 1200px.
- Radius: `--r-btn` 4px (buttons, chips) · `--r-shot` 8px (screenshots, swatches) · `--r-frame` 14px (case frames, cards). Squared on purpose: not bubbly.
- Elevation: none. Depth comes from the three greys and 1px lines.

## Components
- **Swatch chip** (signature): 4px radius, Slate bg, 1px Line border, 16px square swatch then the hex or client name, 12px 500, tabular numerals.
- **Section label**: 28px brass hairline then a 13px 600 brass label. Opens every section.
- **Primary button**: Brass bg, Graphite text, 4px radius, 14px/22px padding, 15px 600. Hover Brass light.
- **Secondary button**: transparent, 1px Line strong border, Ivory text; hover border Ivory.
- **Nav**: Graphite at 90% with blur, 68px, bottom line. Wordmark "kosiso." in Instrument Serif with a brass full stop. "Start your website" primary button. Below 760px a squared "Menu" button opens a sheet with serif links.
- **Case frame**: 14px radius, client `stage` bg and `ink` text; serif client name, kind, one-line summary; desktop screenshot with the mobile screenshot overlapping from 900px; Slate caption panel with "What I built", "What makes it stand out", the client's palette chips, and links.
- **Step**: brass serif numeral (a real sequence), 1px brass top rule, sans h3, two-line text.
- **Repo row**: name, one sentence, language; hairlines between rows; whole row is the link.

## Do / Don't
- Do use brass only for actions, labels and the one italic phrase in a headline.
- Do let client colours appear only inside that client's frame or case page header.
- Do show real screenshots of shipped work, captured from the code.
- Do keep numbers countable from the repos.
- Don't add a second accent colour, gradients or glows.
- Don't round anything past 14px, and never use pill buttons.
- Don't use skill bars, star ratings or invented testimonials.
- Don't animate beyond one fade per case frame; respect reduced motion.

## Imagery
Real screenshots of the five client sites at 1440×900 and 390×844, compressed WebP (11–49KB each). No stock photography, no illustrations, no device renders.

## Layout
1. **Hero**: brass label, serif H1 "Your brand, built *exactly* as you see it.", lead, two buttons, a row of client-name swatch chips; two real phone screenshots beside it (below it on phones). Then three counted facts.
2. **Selected work**: "Five brands. Five looks. *None of them a template.*" One case frame per client.
3. **How it works**: "You see your brand *before* I write a line of code." Four steps, then "What you get".
4. **Products**: card grid.
5. **Open source**: "The engineering *underneath.*" Repo rows.
6. **About**: intro, what I'm building now, one off-the-clock line, journey timeline.
7. **Contact**: "Tell me how you see your brand. *I'll make it stand out.*"
Case page: client-coloured header with screenshot, the brief, what I built, the signature and full palette, design decisions, stack, gallery, call to action, next brand.

## Local-Market Layer
- **Currency & numerals:** no prices on the portfolio; ₦ appears where client features handle Naira.
- **Contact & trust channels:** WhatsApp first (click-to-chat with a pre-written message), then email, then LinkedIn, set in `data/site.ts`. The primary button picks the first one that's filled in. It's in the nav, hero, process, every case page and contact.
- **Trust signals:** live links to real client sites, public GitHub repos, honest status labels ("Building now", "Hackathon build"), "Live preview on request" where a site isn't public.
- **Connectivity reality:** fully static pages, two fonts, WebP screenshots with explicit sizes and lazy loading below the fold.
- **Language register:** plain, warm English.

## Agent Prompt Guide
**Quick color reference:** text-primary `#EDEAE3` · text-body `#C2BFB7` · text-muted `#A6A39B` · bg-canvas `#1E1F22` · bg-card `#26282B` · border `#3A3C41` · accent/primary-action `#C9A45C`.
- "Primary button: #C9A45C bg, #1E1F22 text, 4px radius, 14px 22px padding, 15px 600 Schibsted Grotesk; hover #D8B878."
- "Section label: inline-flex, 12px gap, a 28×1px #C9A45C line, then 13px 600 #C9A45C text, sentence case."
- "Case frame: 14px radius, 1px #3A3C41 border, top area background = project.stage and color = project.ink, caption panel #26282B."

## Critic loop

**Pass 1** (after Kosiso's direction: darker greys, brass, elegant, not bubbly)
| Axis | Score | Reason |
|---|---|---|
| Distinctiveness | 4 | The swatch chip comes from Kosiso's actual process; graphite + brushed brass with a light serif avoids both neon-dev and black-gold-foil |
| Market authenticity | 4 | WhatsApp-first contact, phone-first layout, real Lagos client work; no flag colours or textile motifs |
| Accessibility readiness | 3 | Own palette passes (lowest 5.3:1), but dark client swatches nearly vanish on graphite and client stage/ink pairs vary |
| Technical feasibility | 5 | Static pages, two fonts, small WebP files |
| Brief fit | 4 | Message repeated in every headline; open-source jargon kept in its own section |

**Revision:** swatch dots get a light inner border so dark brand colours still read; hero chips carry client names, not bare hex codes; client stage/ink pairs are checked by `npm run contrast` in the build check.

**Pass 2:** Accessibility readiness 4. All axes ≥4.

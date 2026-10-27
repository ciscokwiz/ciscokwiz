# Kosiso Ikezogwo — Style Reference
> A graphite studio wall with other people's brand swatches pinned to it, lit by one brass lamp.

**Theme:** dark (lifted graphite, never black). One theme, on purpose: simpler, and it lets client colours glow.
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
| Graphite | `#2B2D31` | Page canvas: lifted, never black |
| Slate | `#33363B` | Cards, steps, case captions, contact panel |
| Raised | `#3C3F45` | Chips, swatch backs |
| Code | `#232528` | Code window and browser chrome only |
| Line | `#43464D` | Hairlines and borders |
| Line strong | `#565961` | Secondary-button borders, window outlines |
| Grid | `rgba(241,239,234,.045)` | The 48px blueprint grid behind the hero |
| Ivory | `#F1EFEA` | Headlines (12.0:1 on Graphite) |
| Body | `#CCC9C2` | Body text (8.3:1) |
| Muted | `#AEABA4` | Captions, labels (6.0:1 on Graphite, 4.6:1 on Raised) |
| Brass | `#D1AD66` | The only accent: buttons, links, focus, label indices, one highlighted phrase per headline (6.5:1) |
| Brass light | `#DDBE80` | Brass hover only |
| Check green | `#8FBF8A` | The ✓ glyph in the hero and terminal only |

Client palettes are data, not tokens. Each project in `data/projects.ts` declares its own `stage` and `ink`, used only inside its own case frame; `npm run contrast` fails the check if a pair drops below 4.5:1.

## Typography
Built with the `init-typo` method: roles, not a font collection; a ratio, not hand-picked sizes.

- **Space Grotesk Variable** (primary, 400/500/600): headlines, body, buttons. A grotesk with engineering DNA (it grew out of Space Mono), so it reads as tech without being a monospace wall. Clear `1 l I` and `0 O`.
- **JetBrains Mono Variable** (monospace, 400/500): section labels, nav links, numbers, stack lists, repo names, the code window and browser address bars. Ligatures off.
- Self-hosted Latin woff2 via Fontsource: ~22KB + ~40KB. `font-display: swap`, plus an Arial fallback with metric overrides so text doesn't jump when the font lands.

Base 16px, major third (1.25), fluid between 320px and 1280px:

| Token | Size | Weight | Line-height | Tracking | Used for |
|---|---|---|---|---|---|
| `--step-display` | 39 → 76px `clamp(2.4375rem, 1.667rem + 3.854vw, 4.75rem)` | 600 | 1.04 | -0.035em | Hero H1, case page H1 |
| `--step-h2` | 31 → 49px `clamp(1.9375rem, 1.5625rem + 1.875vw, 3.0625rem)` | 600 | 1.12 | -0.03em | Section titles, client names |
| `--step-h3` | 20 → 25px `clamp(1.25rem, 1.146rem + 0.521vw, 1.5625rem)` | 600 | 1.3 | -0.015em | Cards, steps |
| `--step-1` | 20px | 600 | 1.3 | -0.015em | Timeline titles |
| `--step-lead` | 18 → 20px | 400 | 1.55 | 0 | Lead paragraphs |
| `--step-0` | 16px, fixed | 400 | 1.65 | 0 | Body (never shrinks on phones) |
| `--step--1` | 13px mono | 500 | 1.4 | +0.06–0.08em, uppercase | Labels, nav, kinds |
| code | 13px mono | 400 | 1.75 | 0 | Code window, terminal |

Headings use `text-wrap: balance`. Semantic level and visual size are independent: the "What you get" H2 is styled smaller on purpose. Body links are underlined, not colour-only. English only.

## Spacing & Shape
- Base 4px. Scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section padding `clamp(72px, 11vw, 136px)`; gutters 16px at 360px, 32px from 768px; max width 1200px.
- Radius: `--r-btn` 6px (buttons) · `--r-shot` 8px (screenshots, swatches) · `--r-frame` 12px (case frames, cards, code window). Tight on purpose: not bubbly.
- Elevation: none. Depth comes from the three greys and 1px lines.

## Components
- **Swatch chip** (signature): 4px radius, Slate bg, 1px Line border, 16px square swatch then the hex or client name, 12px 500, tabular numerals.
- **Section label**: 13px uppercase mono, a brass two-digit index then the name in Muted (`01 SELECTED WORK`). Opens every section.
- **Primary button**: Brass bg, Graphite text, 4px radius, 14px/22px padding, 15px 600. Hover Brass light.
- **Secondary button**: transparent, 1px Line strong border, Ivory text; hover border Ivory.
- **Nav**: Graphite at 88% with blur, 68px, bottom line. Wordmark `<kosiso/>` in JetBrains Mono 600 with brass brackets and a blinking brass block cursor (static under reduced motion). Links in 13px uppercase mono. "Start your website" primary button. Below 760px a "MENU" button opens a sheet.
- **Code window** (hero graphic): Code bg, 12px radius, window dots and a `your-brand.ts` tab; numbered lines of a brand written as a config object (strings in brass, keywords muted); a terminal footer running `npm run build` with ✓ lines and "→ live at yourbusiness.com". Decorative, `aria-hidden`, with a figure label for screen readers.
- **Browser frame**: every client screenshot sits in a Code-coloured window bar with dots and the real address in mono.
- **Case frame**: 12px radius, client `stage` bg and `ink` text; client name at H2 size, kind in uppercase mono, one-line summary; desktop screenshot in a browser frame with the mobile screenshot overlapping from 900px; Slate caption panel with "What I built", "What makes it stand out", the client's palette chips, and links.
- **Step**: Slate card, `step_01` in brass mono (a real sequence), h3, two-line text.
- **Repo row**: name, one sentence, language; hairlines between rows; whole row is the link.

## Motion & 3D
Three.js, loaded lazily (`next/dynamic`, `ssr: false`) so it never blocks the first paint. Everything pauses when the tab is hidden, and under `prefers-reduced-motion` the scene renders once and stays still.

- **Living grid (site-wide background):** a full-screen shader draws the 48px blueprint grid. Around the pointer: a soft lens enlarges the cells by up to ~16% within ~170px, the lines brighten and take the glow colour, and a glow (radius ~300px) sits behind them. The glow eases after the cursor rather than snapping to it. With a mouse it stays under the cursor; on touch it follows the finger briefly, then drifts on its own. Two faint colour clouds (blue `#6F8FD6` top right, brass bottom left) drift slowly so the page isn't flat grey. The grid scrolls at 35% of page speed for depth.
- **Glow colour:** light blue `#8FB2F5` (default) or brass, set by `glow` in `data/site.ts`; `?glow=brass` or `?glow=blue` previews the other. Blue is the default because brass already means "you can click this"; a brass glow competes with the buttons and warms the page toward brown.
- **Brand cube (hero):** 27 rounded blocks, graphite with brass wire edges and six solid brass blocks. They fly in and assemble on load (staggered, ~1.3s each), the cube tilts toward the pointer, bobs gently, and every few seconds turns one layer like a Rubik's cube. As the hero scrolls away the blocks spread apart and fade. It sits behind the frosted code window (`rgba(35,37,40,.84)` + 12px blur), so it's crisp around the edges and softened behind the code. Brass text on the glass stays ≥5:1.
- **Scroll:** sections, cards, steps, repo rows and timeline items fade up as they enter (staggered 70ms, capped at 6); the hero copy, code window and terminal lines play in order on load; client screenshots rise into their frames (desktop 36px, phone 90px); the hero visual moves at a slightly different speed; the fact numbers count up; a 2px brass progress line runs along the bottom of the nav.
- **Hover:** cards and steps lift 3px.

## Do / Don't
- Do use brass only for actions, labels and the one italic phrase in a headline.
- Do let client colours appear only inside that client's frame or case page header.
- Do show real screenshots of shipped work, captured from the code.
- Do keep numbers countable from the repos.
- Don't add a second accent colour, gradients or glows.
- Don't round anything past 14px, and never use pill buttons.
- Don't use skill bars, star ratings or invented testimonials.
- Don't add motion outside the system above; every effect must respect reduced motion and pause off-screen.

## Imagery
Real screenshots of the five client sites at 1440×900 and 390×844, compressed WebP (11–49KB each), shown in browser frames. Tech graphics are built in HTML/CSS, not images: the blueprint grid, the code window, the terminal. No stock photography, no illustrations, no device renders.

## Layout
1. **Hero**: on a faint 48px blueprint grid: mono label, H1 "Your brand, built **exactly** as you see it." (exactly in brass), lead, two buttons, three ✓ promises in mono; the code window beside it (below it on phones). No client screenshots on the first screen: it is about the visitor’s brand. Then a three-cell facts bar in mono (`05` client brands, `00` templates, `07` open-source projects).
2. **Selected work**: "Five brands. Five looks. *Zero templates.*" One case frame per client.
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
**Quick color reference:** text-primary `#F1EFEA` · text-body `#CCC9C2` · text-muted `#AEABA4` · bg-canvas `#2B2D31` · bg-card `#33363B` · border `#43464D` · accent/primary-action `#D1AD66`.
- "Primary button: #D1AD66 bg, #1F2124 text, 6px radius, 14px 22px padding, 16px 600 Space Grotesk; hover #DDBE80."
- "Section label: JetBrains Mono 13px 500 uppercase, 0.08em tracking, #AEABA4, with the index in #D1AD66."
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

**Pass 3** (after Kosiso's review: the font felt bland, he is a tech person, the palette needed a lighter tone, and other people's sites on the first screen were confusing)
| Axis | Score | Reason |
|---|---|---|
| Distinctiveness | 4 | Space Grotesk + JetBrains Mono, a blueprint grid and a code window that writes the visitor's brand as config: an engineer's studio, still elegant |
| Market authenticity | 4 | Unchanged: WhatsApp-first, phone-first, real Lagos client work |
| Accessibility readiness | 4 | Lifted palette re-checked; lowest text pair Muted on Raised 4.6:1 |
| Technical feasibility | 5 | Graphics are HTML/CSS; fonts ~62KB total |
| Brief fit | 5 | First screen speaks only to the visitor's brand; client work starts one scroll down |


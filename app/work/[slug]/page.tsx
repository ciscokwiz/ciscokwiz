import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Browser } from "@/components/Browser";
import { caseVars } from "@/components/CaseFrame";
import { ContactButton } from "@/components/ContactButton";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.client} case study`,
    description: `${p.summary} Designed and built by Kosiso Ikezogwo.`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [{ url: `/work/${p.slug}-desk.webp`, width: 1440, height: 900 }] },
  };
}

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];

  return (
    <article style={caseVars(p)}>
      <header className="cs-hero">
        <div className="wrap">
          <Link className="cs-back" href="/#work">
            All work
          </Link>
          <span className="case-kind">
            {p.kind}, {p.year}
          </span>
          <h1>{p.client}</h1>
          <p className="lead">{p.summary}</p>
          <div className="btn-row">
            {p.url && (
              <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
                Visit the live site
              </a>
            )}
          </div>
          <div className="cs-shot">
            <Browser
              src={`/work/${p.slug}-desk.webp`}
              url={p.url}
              alt={`The home page of ${p.client}'s website`}
              sizes="(min-width: 1260px) 1200px, 94vw"
              priority
            />
          </div>
        </div>
      </header>

      <div className="section">
        <div className="wrap cs-body">
          <div className="cs-cols">
            <section className="cs-block" aria-labelledby="brief">
              <span className="label"><b>01</b> The brief</span>
              <h2 id="brief">What they wanted</h2>
              <p className="lead">{p.brief}</p>
            </section>
            <section className="cs-block" aria-labelledby="built">
              <span className="label"><b>02</b> The build</span>
              <h2 id="built">What I built</h2>
              <ul>
                {p.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="cs-signature" aria-labelledby="signature">
            <span className="label" id="signature">
              <b>03</b> What makes it stand out
            </span>
            <blockquote>{p.signature}</blockquote>
            <div className="swatches" aria-label={`${p.client} brand palette`}>
              {p.palette.map((s) => (
                <div className="swatch" key={s.hex}>
                  <div className="swatch-fill" style={{ background: s.hex }} />
                  <div className="swatch-text">
                    <strong>{s.name}</strong>
                    <span>{s.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="cs-cols">
            <section className="cs-block" aria-labelledby="decisions">
              <span className="label"><b>04</b> Design decisions</span>
              <h2 id="decisions">Why it looks like this</h2>
              <ul>
                {p.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
            <section className="cs-block" aria-labelledby="stack">
              <span className="label"><b>05</b> Under the hood</span>
              <h2 id="stack">Built with</h2>
              <p>{p.stack.join(", ")}</p>
            </section>
          </div>

          <section className="cs-gallery" aria-label="Screenshots">
            {p.extra ? (
              <figure>
                <div className="framed">
                  <Image
                    src={`/work/${p.slug}-${p.extra.file}-desk.webp`}
                    alt={`${p.extra.caption}, on desktop`}
                    width={1440}
                    height={900}
                    sizes="(min-width: 900px) 840px, 94vw"
                  />
                </div>
                <figcaption>{p.extra.caption}</figcaption>
              </figure>
            ) : (
              <figure>
                <div className="framed">
                  <Image
                    src={`/work/${p.slug}-desk.webp`}
                    alt={`${p.client}'s website on desktop`}
                    width={1440}
                    height={900}
                    sizes="(min-width: 900px) 840px, 94vw"
                  />
                </div>
                <figcaption>On desktop</figcaption>
              </figure>
            )}
            <figure>
              <div className="framed">
                <Image
                  src={`/work/${p.slug}-mob.webp`}
                  alt={`${p.client}'s website on a phone`}
                  width={390}
                  height={844}
                  sizes="(min-width: 900px) 340px, 94vw"
                />
              </div>
              <figcaption>On a phone, where most visitors arrive</figcaption>
            </figure>
          </section>

          <div className="cs-block">
            <h2>Want your brand to stand out like this?</h2>
            <div className="btn-row">
              <ContactButton label="Start your website" />
            </div>
          </div>

          <nav className="next-case" aria-label="Next case study">
            <span className="muted">Next brand</span>
            <Link href={`/work/${next.slug}`}>{next.client}</Link>
          </nav>
        </div>
      </div>
    </article>
  );
}

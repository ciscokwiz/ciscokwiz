import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { Chip } from "./Chip";

export function caseVars(p: Project) {
  return { "--stage": p.stage, "--case-ink": p.ink, "--case-accent": p.accent } as CSSProperties;
}

export function CaseFrame({ project: p, priority = false }: { project: Project; priority?: boolean }) {
  const href = `/work/${p.slug}`;
  return (
    <article className="case reveal" style={caseVars(p)} aria-labelledby={`case-${p.slug}`}>
      <div className="case-stage">
        <div className="case-top">
          <div className="case-top-row">
            <h3 id={`case-${p.slug}`}>{p.client}</h3>
            <span className="case-kind">{p.kind}</span>
          </div>
          <p className="case-summary">{p.summary}</p>
        </div>
        <div className="case-shots">
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <div className="shot">
              <Image
                src={`/work/${p.slug}-desk.webp`}
                alt=""
                width={1440}
                height={900}
                sizes="(min-width: 1200px) 900px, 92vw"
                priority={priority}
              />
            </div>
          </Link>
          <div className="shot-mob" aria-hidden="true">
            <Image src={`/work/${p.slug}-mob.webp`} alt="" width={390} height={844} sizes="210px" />
          </div>
        </div>
      </div>
      <div className="case-caption">
        <div>
          <p className="case-sub">What I built</p>
          <ul>
            {p.built.slice(0, 3).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="case-side">
          <div>
            <p className="case-sub">What makes it stand out</p>
            <p className="case-signature">{p.signature}</p>
          </div>
          <div className="chip-row" aria-label={`${p.client} brand colours`}>
            {p.palette.slice(0, 4).map((s) => (
              <Chip key={s.hex} swatch={s} />
            ))}
          </div>
          <div className="case-links">
            <Link className="btn btn-secondary" href={href}>
              Read the case study<span className="visually-hidden">: {p.client}</span>
            </Link>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                Visit the live site<span className="visually-hidden">: {p.client}</span>
              </a>
            ) : (
              <span className="note">Live preview on request</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

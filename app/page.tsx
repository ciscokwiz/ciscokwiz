import Image from "next/image";
import Link from "next/link";
import { CaseFrame } from "@/components/CaseFrame";
import { ContactButton } from "@/components/ContactButton";
import { journey, process, promises } from "@/data/journey";
import { repos } from "@/data/opensource";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const builtRepos = repos.filter((r) => r.group === "built");

export default function Home() {
  const [first, second] = projects;

  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="label">{site.name}, web designer and developer</span>
              <h1 id="hero-title">
                Your brand, built <em>exactly</em> as you see it.
              </h1>
              <p className="lead">
                I design and build websites that make businesses stand out online. Every site starts from your
                story, your colours and your customers. Never from a template.
              </p>
              <div className="btn-row">
                <ContactButton label="Start your website" />
                <Link className="btn btn-secondary" href="/#work">
                  See the brands I&rsquo;ve built
                </Link>
              </div>
              <div className="hero-palettes">
                <p>Every client gets their own palette. No two sites look alike.</p>
                <div className="chip-row">
                  {projects.map((p) => (
                    <span className="chip" key={p.slug}>
                      <span className="chip-dot" style={{ background: p.palette[0].hex }} aria-hidden="true" />
                      {p.client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-phones">
              {[first, second].map((p, i) => (
                <figure className="phone" key={p.slug}>
                  <div className="phone-screen">
                    <Image
                      src={`/work/${p.slug}-mob.webp`}
                      alt={`${p.client}'s website on a phone`}
                      width={390}
                      height={844}
                      sizes="(min-width: 1024px) 240px, 45vw"
                      priority={i === 0}
                    />
                  </div>
                  <figcaption>{p.client}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="facts">
            <div className="fact">
              <strong>{projects.length}</strong>
              <span>client brands launched</span>
            </div>
            <div className="fact">
              <strong>0</strong>
              <span>templates used</span>
            </div>
            <div className="fact">
              <strong>1</strong>
              <span>tap to an enquiry in your WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Work ------------------------------------------------------------ */}
      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Selected work</span>
            <h2 id="work-title">
              Five brands. Five looks. <em>None of them a template.</em>
            </h2>
            <p className="lead">
              Each client got their own colours, their own type and one signature detail people remember. Each frame
              below is painted in that client&rsquo;s brand, not mine.
            </p>
          </div>
          <div className="cases">
            {projects.map((p, i) => (
              <CaseFrame key={p.slug} project={p} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Process --------------------------------------------------------- */}
      <section className="section" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-head">
            <span className="label">How it works</span>
            <h2 id="process-title">
              You see your brand <em>before</em> I write a line of code.
            </h2>
            <p className="lead">
              The look is agreed with you first, so the site that goes live is the one you pictured. Then it&rsquo;s
              built to be found, to load fast on mobile data and to turn visitors into enquiries.
            </p>
          </div>
          <ol className="steps">
            {process.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="promises">
            <div className="cs-block">
              <h2>What you get</h2>
              <p className="muted">Every project, whatever the size.</p>
            </div>
            <ul>
              {promises.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products -------------------------------------------------------- */}
      <section className="section" id="products" aria-labelledby="products-title">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Products</span>
            <h2 id="products-title">Beyond client sites.</h2>
            <p className="lead">
              Products I&rsquo;ve built or maintain, from domain trading to small-business finance.
            </p>
          </div>
          <div className="grid-cards">
            {products.map((p) => (
              <article className="card" key={p.name}>
                <div className="card-head">
                  <h3>{p.url ? <a className="card-link" href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}</h3>
                  <span className="status">{p.status}</span>
                </div>
                <p>{p.summary}</p>
                <p className="role">{p.role}</p>
                <p className="stack">{p.stack.join(", ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open source ----------------------------------------------------- */}
      <section className="section" id="open-source" aria-labelledby="os-title">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Open source</span>
            <h2 id="os-title">
              The engineering <em>underneath.</em>
            </h2>
            <p className="lead">
              {builtRepos.length} open-source projects on Stellar: payment and authorization tooling in Go and Rust,
              written for other developers to build on. The same care goes into every client site.
            </p>
          </div>
          <ul className="repos">
            {repos.map((r) => (
              <li className="repo" key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  <span className="repo-name">{r.name}</span>
                  <span>{r.summary}</span>
                  <span className="repo-lang">{r.lang}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About ----------------------------------------------------------- */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div className="about-intro">
            <span className="label">About</span>
            <h2 id="about-title">
              Hi, I&rsquo;m Kosiso. I build <em>brands</em> online.
            </h2>
            <p className="lead">
              I&rsquo;m a self-taught frontend engineer who spent time on the business side, so I build every site
              around one question: how does this get you noticed and booked?
            </p>
            <p>Right now I&rsquo;m building {site.currently}.</p>
            <p className="offclock">
              Off the clock: I&rsquo;ve watched somewhere between 55 and 60% of Netflix&rsquo;s catalogue, and I hate
              onions but won&rsquo;t eat food that doesn&rsquo;t taste like them.
            </p>
          </div>
          <ol className="timeline" aria-label="My journey">
            {journey.map((j) => (
              <li key={j.title}>
                <span className="when">{j.when}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact --------------------------------------------------------- */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <span className="label">Let&rsquo;s talk</span>
          <h2 id="contact-title" style={{ marginTop: "16px" }}>
            Tell me how you see your brand. <em>I&rsquo;ll make it stand out.</em>
          </h2>
          <p className="lead">
            Send a message with what your business does and who you want to reach. I&rsquo;ll reply with how I&rsquo;d
            approach it.
          </p>
          <div className="btn-row">
            <ContactButton label="Start your website" />
            {site.contact.email ? (
              <a
                className="btn btn-secondary"
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Website project")}`}
              >
                Email me
              </a>
            ) : (
              <a className="btn btn-secondary" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            )}
          </div>
          <div className="contact-alt">
            {site.contact.email && <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>}
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer">
              github.com/ciscokwiz
            </a>
            <span className="muted">Discord: {site.social.discord}</span>
          </div>
        </div>
      </section>
    </>
  );
}

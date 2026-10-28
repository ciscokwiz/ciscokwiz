import Link from "next/link";
import { CaseFrame } from "@/components/CaseFrame";
import { CodeWindow } from "@/components/CodeWindow";
import { ContactButton } from "@/components/ContactButton";
import { journey, process, promises } from "@/data/journey";
import { repos } from "@/data/opensource";
import { products } from "@/data/products";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const builtRepos = repos.filter((r) => r.group === "built");

export default function Home() {
  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="label">
                <b>{site.name}</b> Web designer &amp; developer
              </span>
              <h1 id="hero-title">
                Your brand, built <em>exactly</em> as you see it.
              </h1>
              <p className="lead">
                I design and build websites that make businesses stand out online. Every site starts from your story,
                your colours and your customers. Never from a template.
              </p>
              <div className="btn-row">
                <ContactButton label="Start your website" />
                <Link className="btn btn-secondary" href="/#work">
                  See my work
                </Link>
              </div>
              <div className="hero-meta">
                <span>Designed for your brand</span>
                <span>Built for phones first</span>
                <span>Enquiries to your WhatsApp</span>
              </div>
            </div>
            <div className="hero-visual" data-parallax="-0.06">
              <CodeWindow />
            </div>
          </div>

          <div className="facts">
            <div className="fact">
              <strong data-count={projects.length}>{String(projects.length).padStart(2, "0")}</strong>
              <span>client brands launched</span>
            </div>
            <div className="fact">
              <strong>00</strong>
              <span>templates used</span>
            </div>
            <div className="fact">
              <strong data-count={builtRepos.length}>{String(builtRepos.length).padStart(2, "0")}</strong>
              <span>open-source projects shipped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Work ------------------------------------------------------------ */}
      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="label">
              <b>01</b> Selected work
            </span>
            <h2 id="work-title">
              Five brands. Five looks. <em>Zero templates.</em>
            </h2>
            <p className="lead">
              Each client got their own colours, their own type and one signature detail people remember. Every frame
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
          <div className="section-head" data-reveal>
            <span className="label">
              <b>02</b> How it works
            </span>
            <h2 id="process-title">
              You see your brand <em>before</em> I write a line of code.
            </h2>
            <p className="lead">
              The look is agreed with you first, so the site that goes live is the one you pictured. Then it&rsquo;s
              built to be found, to load fast on mobile data and to turn visitors into enquiries.
            </p>
          </div>
          <ol className="steps" data-reveal-stagger>
            {process.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-num">step_{String(i + 1).padStart(2, "0")}</span>
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
            <ul data-reveal-stagger>
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
          <div className="section-head" data-reveal>
            <span className="label">
              <b>03</b> Products
            </span>
            <h2 id="products-title">Beyond client sites.</h2>
            <p className="lead">Products I&rsquo;ve built or maintain, from domain trading to small-business finance.</p>
          </div>
          <div className="grid-cards" data-reveal-stagger>
            {products.map((p) => (
              <article className="card" key={p.name}>
                <div className="card-head">
                  <h3>
                    {p.url ? (
                      <a className="card-link" href={p.url} target="_blank" rel="noopener noreferrer">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <span className="status">{p.status}</span>
                </div>
                <p>{p.summary}</p>
                <p className="role">{p.role}</p>
                <p className="stack">{p.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open source ----------------------------------------------------- */}
      <section className="section" id="open-source" aria-labelledby="os-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="label">
              <b>04</b> Open source
            </span>
            <h2 id="os-title">
              The engineering <em>underneath.</em>
            </h2>
            <p className="lead">
              {builtRepos.length} open-source projects on Stellar: payment and authorization tooling in Go and Rust,
              written for other developers to build on. The same care goes into every client site.
            </p>
          </div>
          <ul className="repos" data-reveal-stagger>
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
          <div className="about-intro" data-reveal>
            <span className="label">
              <b>05</b> About
            </span>
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
          <ol className="timeline" aria-label="My journey" data-reveal-stagger>
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
      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <div className="contact-panel" data-reveal>
            <span className="label">
              <b>06</b> Let&rsquo;s talk
            </span>
            <h2 id="contact-title">
              Tell me how you see your brand. <em>I&rsquo;ll make it stand out.</em>
            </h2>
            <p className="lead">
              Send a message with what your business does and who you want to reach. I&rsquo;ll reply with how
              I&rsquo;d approach it.
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
        </div>
      </section>
    </>
  );
}

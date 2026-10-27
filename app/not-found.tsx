import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap section-head">
        <span className="label">404</span>
        <h1>
          This page didn&rsquo;t make the <em>final design.</em>
        </h1>
        <p className="lead">The page you&rsquo;re looking for doesn&rsquo;t exist. The work does, though.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/#work">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}

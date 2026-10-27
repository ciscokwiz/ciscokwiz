import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}. Designed and built by me, like everything here.
        </p>
        <p className="footer-links">
          <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>Discord: {site.social.discord}</span>
        </p>
      </div>
    </footer>
  );
}

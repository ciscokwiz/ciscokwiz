"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ContactButton } from "./ContactButton";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <span className="scroll-progress" aria-hidden="true" />
      <div className="wrap nav-inner">
        <Link href="/" className="wordmark" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
          <span className="wordmark-bracket" aria-hidden="true">&lt;</span>
          {site.wordmark}
          <span className="wordmark-bracket" aria-hidden="true">/&gt;</span>
          <span className="wordmark-cursor" aria-hidden="true" />
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <span className="nav-cta">
            <ContactButton label="Start your website" />
          </span>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="sheet-menu">
          <div className="wrap">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ContactButton label="Start your website" />
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Scroll effects, all opt-in through data attributes:
   data-reveal            fades and lifts in when it enters the viewport
   data-reveal-stagger    same for each child, one after another
   data-parallax="0.12"   drifts at a different speed from the page
   data-rise              rises into place as its frame scrolls to the centre
   data-count             counts up from zero the first time it's seen
   Plus the brass progress line under the nav. Nothing moves with reduced motion.

   Safety rules, because this runs in the shared layout and pages swap
   underneath it without a reload:
   - it re-runs on every route change, and a MutationObserver picks up any
     content that arrives later;
   - an element is only hidden once it has been "armed" here (CSS keys off
     data-armed), so anything this script misses stays visible;
   - anything already on screen or above it when armed is shown at once, so
     coming back to a page mid-scroll never lands on an empty section. */

export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("fx");

    const counted = new WeakSet<Element>();
    const count = (el: HTMLElement) => {
      if (counted.has(el)) return;
      counted.add(el);
      const end = Number(el.dataset.count);
      const pad = el.textContent?.length ?? 2;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1100, 1);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3)))).padStart(pad, "0");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const show = (el: HTMLElement) => {
      el.classList.add("is-in");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
      if (el.dataset.count !== undefined) count(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          show(e.target as HTMLElement);
          waiting.delete(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    let parallax: HTMLElement[] = [];
    const waiting = new Set<HTMLElement>(); // armed, not yet shown
    let risers: HTMLElement[] = [];

    const arm = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const c = child as HTMLElement;
          if (c.dataset.reveal === undefined) c.dataset.reveal = "";
          c.style.setProperty("--i", String(i));
        });
      });
      const vh = window.innerHeight;
      // Every element not yet shown is (re)checked on each pass, including ones
      // armed by a previous run: a route change can disconnect the observer
      // that was watching them, and they must never be left stranded.
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-count]").forEach((el) => {
        if (el.classList.contains("is-in") || counted.has(el)) return;
        if (el.getBoundingClientRect().top < vh * 0.94) {
          show(el); // already in view (or scrolled past): no hiding, no waiting
        } else {
          if (el.dataset.reveal !== undefined) {
            el.dataset.armed = "";
            waiting.add(el);
          }
          io.observe(el);
        }
      });
      parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      risers = Array.from(document.querySelectorAll<HTMLElement>("[data-rise]"));
      onScroll();
    };

    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Backstop: anything on screen that is still waiting gets shown now,
      // whatever happened to its observer.
      for (const el of waiting) {
        if (!el.isConnected) waiting.delete(el);
        else if (el.getBoundingClientRect().top < vh) {
          show(el);
          waiting.delete(el);
        }
      }
      for (const el of parallax) {
        const parent = el.parentElement;
        if (!parent || !el.isConnected) continue;
        const r = parent.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
      for (const el of risers) {
        const parent = el.parentElement;
        if (!parent || !el.isConnected) continue;
        const r = parent.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const p = Math.min(Math.max((vh - r.top) / (vh * 0.9), 0), 1);
        el.style.transform = `translate3d(0, ${((1 - p) * Number(el.dataset.rise || 70)).toFixed(1)}px, 0)`;
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
    };
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    // New content (a page swap finishing, streamed sections) gets armed too.
    let pending = 0;
    const mo = new MutationObserver((records) => {
      const added = records.some((r) => Array.from(r.addedNodes).some((n) => n.nodeType === Node.ELEMENT_NODE));
      if (added && !pending) pending = requestAnimationFrame(() => ((pending = 0), arm()));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    arm();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}

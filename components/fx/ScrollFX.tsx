"use client";

import { useEffect } from "react";

/* Scroll effects, all opt-in through data attributes:
   data-reveal            fades and lifts in when it enters the viewport
   data-reveal-stagger    same for each child, one after another
   data-parallax="0.12"   drifts at a different speed from the page
   data-rise              rises into place as its frame scrolls to the centre
   data-count             counts up from zero the first time it's seen
   Plus the brass progress line under the nav. Nothing moves with reduced motion. */

export function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("fx");

    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).dataset.reveal = "";
        (child as HTMLElement).style.setProperty("--i", String(i));
      });
    });

    const counted = new WeakSet<Element>();
    const count = (el: HTMLElement) => {
      if (counted.has(el)) return;
      counted.add(el);
      const end = Number(el.dataset.count);
      const pad = el.textContent?.length ?? 2;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1100, 1);
        const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = String(v).padStart(pad, "0");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
          if (el.dataset.count !== undefined) count(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal], [data-count]").forEach((el) => io.observe(el));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const risers = Array.from(document.querySelectorAll<HTMLElement>("[data-rise]"));
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
      for (const el of risers) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const p = Math.min(Math.max((vh - r.top) / (vh * 0.9), 0), 1);
        el.style.transform = `translate3d(0, ${((1 - p) * Number(el.dataset.rise || 70)).toFixed(1)}px, 0)`;
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("fx");
    };
  }, []);

  return null;
}

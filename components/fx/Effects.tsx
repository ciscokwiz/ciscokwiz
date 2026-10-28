"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import type { GlowName } from "./GridCanvas";

const GridCanvas = dynamic(() => import("./GridCanvas"), { ssr: false });
const BrandCubeLazy = dynamic(() => import("./BrandCube"), { ssr: false });

const GLOW_HEX = { brass: "#d1ad66", blue: "#8fb2f5" } as const;

/** The glow colour: data/site.ts decides; `?glow=blue` or `?glow=brass`
    overrides it for a side-by-side look. */
function useGlow(): GlowName {
  const [glow, setGlow] = useState<GlowName>(site.glow);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("glow");
    if (q === "blue" || q === "brass") setGlow(q);
  }, []);
  return glow;
}

export function Background() {
  return <GridCanvas glow={useGlow()} />;
}

/** Desktop only: on phones the hero stays clean and nothing extra renders. */
export function BrandCube() {
  const glow = useGlow();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide ? <BrandCubeLazy glow={GLOW_HEX[glow]} /> : null;
}

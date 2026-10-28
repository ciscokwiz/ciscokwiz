"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import type { GlowName } from "./GridCanvas";

const GridCanvas = dynamic(() => import("./GridCanvas"), { ssr: false });

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

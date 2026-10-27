import type { Swatch } from "@/data/projects";

/** A named colour from a client's palette, shown like a paint card. */
export function Chip({ swatch }: { swatch: Swatch }) {
  return (
    <span className="chip" title={swatch.name}>
      <span className="chip-dot" style={{ background: swatch.hex }} aria-hidden="true" />
      {swatch.hex}
      <span className="visually-hidden"> ({swatch.name})</span>
    </span>
  );
}

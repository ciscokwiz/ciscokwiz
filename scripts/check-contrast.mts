/* Fails the build check if any case frame's text colour is unreadable on its
   background. Client colours are data, so they're checked here rather than
   trusted by eye. Run with `npm run contrast`. */
import { projects } from "../data/projects.ts";
import { contrast } from "../lib/contrast.ts";

let failed = false;
for (const p of projects) {
  const ratio = contrast(p.ink, p.stage);
  const ok = ratio >= 4.5;
  if (!ok) failed = true;
  console.log(`${ok ? "ok  " : "FAIL"} ${p.slug.padEnd(22)} ${p.ink} on ${p.stage}  ${ratio.toFixed(2)}:1`);
}
if (failed) {
  console.error("\nA case frame's ink/stage pair is below 4.5:1. Fix it in data/projects.ts.");
  process.exit(1);
}

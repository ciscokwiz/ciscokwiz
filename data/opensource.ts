/* =====================================================================
   OPEN SOURCE — Stellar / Soroban repositories.
   `group` decides which list a repo appears in.
   ===================================================================== */

export type Repo = {
  name: string;
  url: string;
  lang: string;
  summary: string;
  group: "built" | "contributed";
};

export const repos: Repo[] = [
  {
    name: "soroauth-go",
    url: "https://github.com/soroauth/soroauth-go",
    lang: "Go",
    summary: "Builds, signs and inspects Soroban authorization entries in Go, for all three credential types the Go SDK leaves you to write yourself.",
    group: "built",
  },
  {
    name: "soroauth-explain",
    url: "https://github.com/soroauth/soroauth-explain",
    lang: "Go",
    summary: "Reads an authorization entry and says, in plain sentences, what it lets someone do. When it can't tell, it says so instead of guessing.",
    group: "built",
  },
  {
    name: "sorocharge-core",
    url: "https://github.com/sorocharge/sorocharge-core",
    lang: "Rust",
    summary: "One signing engine for paying per request on Stellar, with the x402 and MPP charge protocols built on top.",
    group: "built",
  },
  {
    name: "sorocharge-php",
    url: "https://github.com/sorocharge/sorocharge-php",
    lang: "PHP / Rust",
    summary: "A native PHP extension over sorocharge-core, so PHP apps can take Stellar payments without a Node.js sidecar.",
    group: "built",
  },
  {
    name: "soroindex",
    url: "https://github.com/Soroban-CII/soroindex",
    lang: "Go",
    summary: "A public index of Soroban contracts by the standards they declare and the interfaces they actually match, tracked across upgrades.",
    group: "built",
  },
  {
    name: "stellar-p30-check",
    url: "https://github.com/Protocol-30/stellar-p30-check",
    lang: "Go",
    summary: "An offline scanner that flags Protocol 30 upgrade risks in Go and TypeScript codebases. Released with binaries for Linux, macOS and Windows.",
    group: "built",
  },
  {
    name: "tallybook",
    url: "https://github.com/Tallybook-Org/tallybook",
    lang: "Go / Rust",
    summary: "Settlement bookkeeping for APIs paid per request by AI agents, with Soroban contracts live on testnet.",
    group: "built",
  },
  {
    name: "Stellar ecosystem backends",
    url: "https://github.com/ciscokwiz?tab=repositories",
    lang: "TypeScript / Rust",
    summary: "Backend and contract fixes across Fluxora, Callora, Veritasor, ChronoPay, Remitwise, QuickLendX and other open-source Stellar projects.",
    group: "contributed",
  },
];

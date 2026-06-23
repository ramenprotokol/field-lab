import type { StatusTone } from "./theme";

/** Single source of truth for identity, links, and the section map. */
export const site = {
  name: "RAMEN PROTOKOL",
  unit: "FIELD LAB",
  tagline: "AI-assisted software delivery, tested in public.",
  description:
    "A public engineering field laboratory: experiments, evaluations, validation frameworks, and the evidence trail behind every claim.",
  build: "2026.06.21",
  station: "STN-001",
  // Generic station coordinates from the design — not a real location.
  coords: "37.7749N · 122.4194W",
  github: "https://github.com/ramenprotokol",
  responseWindow: "RESPONSE WINDOW 48H · UTC",
} as const;

export type Section = {
  code: string;
  /** Route segment; "" is the home index. */
  slug: string;
  href: string;
  label: string;
  status: StatusTone;
};

/**
 * Navigation map. `href` is the real route — the design's client-side page
 * switch becomes proper Next routes so every section is linkable and crawlable.
 */
export const sections: Section[] = [
  { code: "00", slug: "", href: "/", label: "Home", status: "ok" },
  { code: "01", slug: "signal-deck", href: "/signal-deck/", label: "Signal Deck", status: "ok" },
  { code: "02", slug: "delivery-os", href: "/delivery-os/", label: "Delivery OS", status: "ok" },
  { code: "03", slug: "hallucination-lab", href: "/hallucination-lab/", label: "Hallucination Lab", status: "run" },
  { code: "04", slug: "validation-playbooks", href: "/validation-playbooks/", label: "Validation Playbooks", status: "ok" },
  { code: "05", slug: "build-logs", href: "/build-logs/", label: "Build Logs", status: "ok" },
  { code: "06", slug: "proof-wall", href: "/proof-wall/", label: "Proof Wall", status: "ok" },
  { code: "07", slug: "writing", href: "/writing/", label: "Writing", status: "ok" },
  { code: "08", slug: "contact", href: "/contact/", label: "Contact", status: "ok" },
];

/** Look up a section's display metadata by route slug. */
export function sectionBySlug(slug: string): Section {
  return sections.find((s) => s.slug === slug) ?? sections[0];
}

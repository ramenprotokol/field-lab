/**
 * Status colours used for inline SVG dots, bars, and badges where a Tailwind
 * class can't reach (dynamic glows, gradients). Mirrors the design's T() map.
 */
export const C = {
  accent: "#3fb950",
  accentGlow: "#3fb95099",
  amber: "#e3a23c",
  amberGlow: "#e3a23c99",
  red: "#e05a5a",
} as const;

export type StatusTone = "ok" | "run" | "warn" | "down";

export const toneColor: Record<StatusTone, string> = {
  ok: C.accent,
  run: C.amber,
  warn: C.amber,
  down: C.red,
};

export const toneGlow: Record<StatusTone, string> = {
  ok: C.accentGlow,
  run: C.amberGlow,
  warn: C.amberGlow,
  down: "#e05a5a99",
};

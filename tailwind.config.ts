import type { Config } from "tailwindcss";

/**
 * Design tokens lifted verbatim from the approved "Field Lab" mission-control
 * design. Colour names map to their role, not their hex, so the palette can be
 * read at the call site (bg-panel, text-accent, border-line).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0b0c", // page base
        panel: "#0d1012", // card surface
        "panel-2": "#0c0f10", // recessed header surface
        "panel-3": "#101315", // raised gradient top
        grid: "#0e1113", // background grid lines
        line: "#1b2023", // primary hairline
        "line-2": "#23282b", // card border
        "line-3": "#14181a", // inner divider
        accent: "#3fb950", // signal green
        "accent-deep": "#1f5e2c", // green border
        "accent-ink": "#06210d", // text on green
        amber: "#e3a23c",
        "amber-deep": "#6b4e16",
        red: "#e05a5a",
        "red-deep": "#5e2222",
        heading: "#f3f6f6", // brightest — h1 / display headings
        fg: "#e7eaeb", // primary text
        "fg-2": "#cdd2d4", // secondary text
        label: "#7e868a", // panel/section labels (≈5.1:1)
        track: "#16191c", // meter/progress track
        muted: "#9aa1a5", // body muted — 7.5:1 on ink
        dim: "#868d91", // labels — 5.85:1 (AA for small text); was #646b6f
        "dim-2": "#767d81", // faint labels — 4.71:1 (AA for small text); was #4d5458
        "dim-3": "#3a4044", // faintest — decorative/incidental only (coords, © line)
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        deck: "1180px",
        page: "1100px",
        feed: "920px",
        prose: "880px",
      },
      keyframes: {
        blink: {
          "0%,72%": { opacity: "1" },
          "73%,100%": { opacity: "0.25" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        blink: "blink 2.4s infinite",
        sweep: "sweep 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

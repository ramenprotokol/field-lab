import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Eyebrow text, e.g. "01 · SIGNAL DECK". */
  eyebrow: string;
  /** Eyebrow accent colour (green by default, amber for the active lab run). */
  eyebrowColor?: string;
  title: string;
  intro: string;
  /** Optional trailing node in the eyebrow row (e.g. a DemoBadge). */
  aside?: ReactNode;
};

/** The standard page header used by every interior section. */
export default function SectionHeader({
  eyebrow,
  eyebrowColor = "#3fb950",
  title,
  intro,
  aside,
}: SectionHeaderProps) {
  return (
    <header className="mb-7">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <p className="eyebrow m-0" style={{ color: eyebrowColor }}>
          {eyebrow}
        </p>
        {aside}
      </div>
      <h1 className="m-0 mb-3 font-display text-[clamp(26px,3.6vw,38px)] font-bold leading-[1.05] tracking-[-0.01em] text-heading">
        {title}
      </h1>
      <p className="m-0 max-w-[660px] text-[15.5px] text-muted">{intro}</p>
    </header>
  );
}

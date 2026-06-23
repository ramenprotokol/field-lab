type DemoBadgeProps = {
  /** Short label, e.g. "DEMO DATA" or "SAMPLE FEED". */
  label: string;
  /** Optional clarifying note shown after the chip. */
  note?: string;
};

/**
 * Honesty marker. Sits beside any illustrative dataset so synthetic numbers are
 * never mistaken for live telemetry — the brand's core rule, made visible.
 */
export default function DemoBadge({ label, note }: DemoBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span className="mono inline-flex items-center gap-1.5 rounded border border-amber-deep/80 bg-amber/10 px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.1em] text-amber">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
        {label}
      </span>
      {note ? <span className="mono text-[10px] text-dim-2">{note}</span> : null}
    </span>
  );
}

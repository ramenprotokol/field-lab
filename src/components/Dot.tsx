import { toneColor, toneGlow, type StatusTone } from "@/lib/theme";

type DotProps = {
  /** Explicit colour, or derive from a status tone. */
  color?: string;
  glow?: string;
  tone?: StatusTone;
  size?: number;
  className?: string;
};

/** The glowing status pip used throughout the mission-control UI. */
export default function Dot({ color, glow, tone, size = 7, className = "" }: DotProps) {
  const c = color ?? (tone ? toneColor[tone] : toneColor.ok);
  const g = glow ?? (tone ? toneGlow[tone] : `${c}99`);
  return (
    <span
      aria-hidden="true"
      className={`inline-block flex-none rounded-full ${className}`}
      style={{ width: size, height: size, background: c, boxShadow: `0 0 7px ${g}` }}
    />
  );
}

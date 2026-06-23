import Link from "next/link";

export const metadata = {
  title: "Signal Lost",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-page flex-col items-start px-6 py-24">
      <div className="mono mb-4 text-[11px] tracking-[0.16em] text-amber">ERR · 404 · SIGNAL LOST</div>
      <h1 className="m-0 mb-4 font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.05] tracking-[-0.01em] text-heading">
        No station at these coordinates
      </h1>
      <p className="m-0 mb-8 max-w-[520px] text-[15.5px] text-muted">
        The route you followed isn&apos;t on the board. Head back to mission control and pick a
        section from the deck.
      </p>
      <Link
        href="/"
        className="mono inline-flex items-center gap-2 rounded-[5px] bg-accent px-[18px] py-3 text-[12.5px] font-medium tracking-[0.06em] text-accent-ink transition-opacity hover:opacity-90"
      >
        ← RETURN TO HOME
      </Link>
    </div>
  );
}

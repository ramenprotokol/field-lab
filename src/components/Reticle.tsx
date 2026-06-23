/** The target-reticle logo mark: a green ring with a glowing core. */
export default function Reticle({ size = 30 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex flex-none items-center justify-center rounded border border-[#2e3438] bg-[#0d1012]"
      style={{ width: size, height: size }}
    >
      <div className="rounded-full border-2 border-accent" style={{ width: 11, height: 11 }} />
      <div className="absolute h-[3px] w-[3px] rounded-full bg-accent" style={{ boxShadow: "0 0 6px #3fb950" }} />
    </div>
  );
}

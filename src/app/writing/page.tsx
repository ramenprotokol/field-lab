import type { Metadata } from "next";
import DemoBadge from "@/components/DemoBadge";
import SectionHeader from "@/components/SectionHeader";
import { DEMO, writing } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Long-form essays on building systems with AI — grounded in the lab, written as runbooks you can follow.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-prose px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="07 · WRITING"
        title="Long-form, on building systems with AI"
        intro="Fewer, denser essays. Each one is grounded in the lab — methods that earned their place across real delivery cycles."
        aside={<DemoBadge label={DEMO.sample} note="planned titles" />}
      />

      <div className="flex flex-col">
        {writing.map((w) => (
          <article
            key={w.title}
            className="flex items-baseline gap-5 border-b border-line py-5"
          >
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="mono rounded border border-accent-deep px-[7px] py-0.5 text-[9.5px] tracking-[0.1em] text-accent">
                  {w.kicker}
                </span>
                <span className="mono text-[10.5px] text-dim-2">
                  {w.date} · {w.read}
                </span>
                <span className="mono rounded border border-line-2 px-[7px] py-0.5 text-[9px] tracking-[0.08em] text-dim">
                  PLANNED
                </span>
              </div>
              <h2 className="m-0 mb-2 font-display text-[21px] font-semibold leading-[1.3] text-fg">
                {w.title}
              </h2>
              <p className="m-0 text-[14.5px] leading-[1.55] text-muted">{w.sum}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mono mt-7 text-[11px] tracking-[0.04em] text-dim-2">
        Essays publish here as they are finished. Until then, the working notes live in the{" "}
        <a href="/build-logs/" className="text-accent underline-offset-2 hover:underline">
          Build Logs
        </a>
        .
      </p>
    </div>
  );
}

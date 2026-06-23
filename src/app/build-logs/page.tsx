import type { Metadata } from "next";
import DemoBadge from "@/components/DemoBadge";
import SectionHeader from "@/components/SectionHeader";
import { DEMO, logs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Build Logs",
  description:
    "The public engineering journal: dated field reports on what broke, what changed, and what the change actually bought.",
};

export default function BuildLogsPage() {
  return (
    <div className="mx-auto max-w-feed px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="05 · BUILD LOGS"
        title="The public engineering journal"
        intro="Dated field reports from the bench. What broke, what was changed, and what the change actually bought — written while it was still fresh."
        aside={<DemoBadge label={DEMO.feed} note="representative entries" />}
      />

      <div className="flex flex-col">
        {logs.map((l, i) => (
          <article key={l.code} className="grid grid-cols-[18px_1fr] gap-[18px]">
            <div className="flex flex-col items-center">
              <span className="mt-1 h-[11px] w-[11px] flex-none rounded-full border-2 border-accent bg-ink" />
              {i < logs.length - 1 ? <span className="my-1.5 w-px flex-1 bg-line-2" /> : null}
            </div>
            <div className="pb-7">
              <div className="mb-2.5 flex flex-wrap items-center gap-3">
                <span className="mono text-[11px] text-accent">{l.code}</span>
                <span className="mono text-[11px] text-dim-2">{l.date}</span>
                <span className="mono text-[10px] text-dim">{l.tags}</span>
              </div>
              <h2 className="m-0 mb-2 font-display text-[19px] font-semibold leading-[1.3] text-fg">
                {l.title}
              </h2>
              <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{l.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

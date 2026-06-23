import type { Metadata } from "next";
import Dot from "@/components/Dot";
import DemoBadge from "@/components/DemoBadge";
import SectionHeader from "@/components/SectionHeader";
import { DEMO, signals, severityColor } from "@/lib/data";

export const metadata: Metadata = {
  title: "Signal Deck",
  description:
    "A curated feed of experiments, findings, lessons, and incidents from active AI-assisted delivery.",
};

export default function SignalDeckPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="01 · SIGNAL DECK"
        title="Technical intelligence, logged as it happens"
        intro="A curated feed of experiments, findings, lessons, and incidents from active delivery. Each entry is a field observation — dated, classified, and traceable to a build."
        aside={<DemoBadge label={DEMO.feed} note="representative entries" />}
      />

      <div className="flex flex-col gap-3">
        {signals.map((e) => (
          <article
            key={e.code}
            className="grid grid-cols-[96px_1fr] overflow-hidden rounded-[5px] border border-line-2 bg-panel min-[560px]:grid-cols-[128px_1fr]"
          >
            <div className="flex flex-col gap-2.5 border-r border-line bg-panel-2 px-3.5 py-4">
              <span className="inline-flex items-center gap-1.5">
                <Dot size={7} color={severityColor(e.sev)} />
                <span className="mono text-[9.5px] tracking-[0.04em]" style={{ color: severityColor(e.sev) }}>
                  {e.sev}
                </span>
              </span>
              <span className="mono text-[11px] text-fg-2">{e.code}</span>
              <span className="mono mt-auto text-[10px] text-dim-2">{e.date}</span>
            </div>
            <div className="px-[18px] py-[17px]">
              <h2 className="m-0 mb-2 font-display text-[16.5px] font-semibold leading-[1.35] text-fg">
                {e.title}
              </h2>
              <p className="m-0 text-[13.5px] leading-[1.55] text-muted">{e.sum}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

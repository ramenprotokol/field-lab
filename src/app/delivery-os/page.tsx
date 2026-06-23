import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { stages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Delivery OS",
  description:
    "The AI-assisted delivery lifecycle as a system: seven gated stages, nothing advances without passing its gate.",
};

export default function DeliveryOsPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="02 · DELIVERY OS"
        title="The AI-assisted delivery lifecycle, as a system"
        intro="Seven gated stages. Nothing advances without passing its gate — that is the entire point. Intent becomes a testable spec; a build becomes evidence; evidence becomes a release."
      />

      <ol className="m-0 flex list-none flex-col p-0">
        {stages.map((st, i) => (
          <li key={st.n} className="grid grid-cols-[48px_1fr] min-[560px]:grid-cols-[64px_1fr]">
            <div className="flex flex-col items-center">
              <div className="mono flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#2e3438] bg-panel text-[13px] text-accent">
                {st.n}
              </div>
              {i < stages.length - 1 ? <div className="min-h-[18px] w-px flex-1 bg-line-2" /> : null}
            </div>
            <div className="pb-[22px] pl-3.5">
              <div className="panel p-5">
                <div className="mb-2.5 flex flex-wrap items-baseline gap-3">
                  <h2 className="m-0 font-display text-[19px] font-semibold text-fg">{st.name}</h2>
                  <span className="text-[14px] text-muted">{st.purpose}</span>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="min-w-[200px]">
                    <div className="mono mb-1.5 text-[9.5px] tracking-[0.1em] text-dim-2">OUTPUT</div>
                    <div className="text-[13px] text-fg-2">{st.out}</div>
                  </div>
                  <div className="min-w-[200px]">
                    <div className="mono mb-1.5 text-[9.5px] tracking-[0.1em] text-dim-2">GATE</div>
                    <div className="inline-flex items-center gap-2 text-[13px] text-amber">
                      <span className="h-1.5 w-1.5 rounded-[1px] bg-amber shadow-[0_0_6px_#e3a23c]" />
                      {st.gate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

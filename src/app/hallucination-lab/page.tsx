import type { Metadata } from "next";
import DemoBadge from "@/components/DemoBadge";
import SectionHeader from "@/components/SectionHeader";
import {
  DEMO,
  labFindings,
  labModels,
  findingColorFor,
  verdictStyle,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Hallucination Lab",
  description:
    "Where AI claims meet evidence: hallucinations measured, reproduced under fixed seeds, and tracked across model versions.",
};

export default function HallucinationLabPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="03 · HALLUCINATION LAB · EVAL RUN ACTIVE"
        eyebrowColor="#e3a23c"
        title="Where AI claims meet evidence"
        intro="Hallucinations are measured, not assumed. Every finding is reproduced under a fixed seed, scored, and tracked across model versions until it is mitigated or accepted as a known limit."
        aside={<DemoBadge label={DEMO.data} note="anonymised, synthetic scores" />}
      />

      {/* Scoreboard */}
      <div className="mb-6 overflow-hidden rounded-md border border-line-2 bg-panel">
        <div className="flex items-center justify-between border-b border-line bg-panel-2 px-[18px] py-3.5">
          <span className="mono text-[10.5px] tracking-[0.16em] text-label">
            MODEL SCOREBOARD · GROUNDED QA SUITE
          </span>
          <span className="mono text-[10px] text-dim-2">seed pinned · sample</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">
              Sample model scoreboard: grounded accuracy, hallucination rate, calibration, and
              verdict. Values are illustrative.
            </caption>
            <thead>
              <tr className="mono text-[10px] tracking-[0.08em] text-dim-2">
                <th scope="col" className="px-[18px] py-2.5 text-left font-normal">MODEL</th>
                <th scope="col" className="px-[18px] py-2.5 text-right font-normal">GROUNDED ACC</th>
                <th scope="col" className="px-[18px] py-2.5 text-right font-normal">HALLUC RATE</th>
                <th scope="col" className="px-[18px] py-2.5 text-right font-normal">CALIBRATION</th>
                <th scope="col" className="px-[18px] py-2.5 text-right font-normal">VERDICT</th>
              </tr>
            </thead>
            <tbody>
              {labModels.map((r) => {
                const v = verdictStyle(r.verdict);
                return (
                  <tr key={r.m} className="border-t border-line-3">
                    <td className="mono px-[18px] py-3.5 text-[13px] text-fg">{r.m}</td>
                    <td className="mono px-[18px] py-3.5 text-right text-[13px] text-fg-2">{r.acc}</td>
                    <td className="mono px-[18px] py-3.5 text-right text-[13px]" style={{ color: v.color }}>
                      {r.hall}
                    </td>
                    <td className="mono px-[18px] py-3.5 text-right text-[13px] text-muted">{r.cal}</td>
                    <td className="px-[18px] py-3.5 text-right">
                      <span
                        className="mono rounded px-[7px] py-[3px] text-[9.5px] tracking-[0.06em]"
                        style={{ color: v.color, border: `1px solid ${v.border}` }}
                      >
                        {r.verdict}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Findings */}
      <div className="mono mb-3.5 text-[10.5px] tracking-[0.14em] text-label">LOGGED FINDINGS</div>
      <div className="grid grid-cols-1 gap-3.5 min-[900px]:grid-cols-3">
        {labFindings.map((f) => {
          const color = findingColorFor(f.status);
          return (
            <div key={f.id} className="panel flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <span className="mono text-[11px] text-label">{f.id}</span>
                <span
                  className="mono rounded border border-line-2 px-1.5 py-0.5 text-[9px] tracking-[0.06em]"
                  style={{ color }}
                >
                  {f.status}
                </span>
              </div>
              <h3 className="m-0 font-display text-[15px] font-semibold leading-[1.35] text-fg">
                {f.title}
              </h3>
              <div>
                <div className="mb-1.5 flex justify-between">
                  <span className="mono text-[9.5px] text-dim-2">BASELINE RATE</span>
                  <span className="mono text-[11px]" style={{ color }}>
                    {f.rate}
                  </span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-[3px] bg-track">
                  <div className="h-full" style={{ width: f.baseW, background: color }} />
                </div>
              </div>
              <p className="m-0 text-[12.5px] leading-[1.5] text-muted">{f.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

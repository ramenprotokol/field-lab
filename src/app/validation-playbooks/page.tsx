import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { playbooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Validation Playbooks",
  description:
    "Repeatable validation procedures — each a numbered checklist with a clear trigger and a defined output.",
};

export default function ValidationPlaybooksPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="04 · VALIDATION PLAYBOOKS"
        title="Repeatable procedures, like a flight checklist"
        intro="Each playbook is a numbered procedure with a clear trigger and a defined output. Run them the same way every time — that is what makes the result trustworthy."
      />

      <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1240px]:grid-cols-3">
        {playbooks.map((p) => (
          <article key={p.code} className="flex flex-col gap-3.5 rounded-md border border-line-2 bg-panel p-[18px]">
            <div className="flex items-center justify-between">
              <span className="mono text-[12px] text-accent">{p.code}</span>
              <span className="mono rounded border border-line-2 px-[7px] py-0.5 text-[9px] tracking-[0.06em] text-dim">
                {p.owner}
              </span>
            </div>
            <h2 className="m-0 font-display text-[17px] font-semibold leading-[1.3] text-fg">
              {p.title}
            </h2>
            <div className="mono text-[11.5px] leading-[1.7] tracking-[0.01em] text-fg-2">
              {p.steps}
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-line-3 pt-3">
              <span className="mono text-[9px] tracking-[0.1em] text-dim-2">TRIGGER</span>
              <span className="text-[12.5px] text-muted">{p.use}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

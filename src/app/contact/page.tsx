import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { channels } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public, async channels only — every link is open and traceable.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-prose px-6 pb-16 pt-9">
      <SectionHeader
        eyebrow="08 · CONTACT"
        title="Public channels only"
        intro="No phone, no address, no DMs to chase. Everything here is public and traceable — the way the rest of the lab works."
      />

      <div className="grid grid-cols-1 gap-3.5 min-[700px]:grid-cols-2">
        {channels.map((c) => {
          const inner = (
            <>
              <div
                className="mono border-l border-accent-deep text-[9.5px] tracking-[0.12em] text-accent"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {c.k}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mono mb-1.5 break-all text-[14px] text-fg">{c.label}</div>
                <div className="text-[13px] text-muted">{c.sub}</div>
              </div>
              <span className="mono flex-none rounded border border-line-2 px-[11px] py-[7px] text-[10px] tracking-[0.08em] text-fg-2 transition-colors group-hover:border-accent-deep group-hover:text-accent">
                {c.cta}
              </span>
            </>
          );
          const cls =
            "group flex items-center gap-4 rounded-md border border-line-2 bg-panel p-[18px] transition-colors hover:border-[#2e3438]";
          return c.external ? (
            <a key={c.k} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={c.k} href={c.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="mono mt-6 flex items-center gap-2.5 text-[11px] text-dim-2">
        <span className="h-[7px] w-[7px] animate-blink rounded-full bg-accent shadow-[0_0_7px_#3fb95099]" />
        STATION OPEN · {site.responseWindow}
      </div>
    </div>
  );
}

import Link from "next/link";
import Dot from "@/components/Dot";
import DemoBadge from "@/components/DemoBadge";
import ProjectCard from "@/components/ProjectCard";
import Clock from "@/components/Clock";
import { site } from "@/lib/site";
import { toneColor } from "@/lib/theme";
import {
  DEMO,
  labBars,
  metrics,
  projects,
  signals,
  severityColor,
  stages,
  stationStatus,
} from "@/lib/data";

/* ------------------------------- Panels --------------------------- */

function PanelHeader({
  code,
  title,
  href,
  codeColor = toneColor.ok,
}: {
  code: string;
  title: string;
  href: string;
  codeColor?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
      <div className="flex items-center gap-[9px]">
        <span className="mono text-[10px]" style={{ color: codeColor }}>
          {code}
        </span>
        <h2 className="m-0 font-display text-[13.5px] font-semibold text-fg">{title}</h2>
      </div>
      <Link
        href={href}
        className="mono text-[10px] tracking-[0.06em] text-dim transition-colors hover:text-accent"
      >
        OPEN →
      </Link>
    </div>
  );
}

export default function HomePage() {
  const stationsUp = stationStatus.filter((s) => s.tone !== "down").length;

  return (
    <>
      {/* --------------------------- Hero --------------------------- */}
      <section className="relative overflow-hidden border-b border-line px-8 pb-11 pt-[54px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 360px at 18% -10%, rgba(63,185,80,0.07), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-deck grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[1.35fr_0.95fr]">
          <div>
            <div className="mono mb-6 inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-[5px] text-[11px] tracking-[0.16em] text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_6px_#e3a23c]" />
              MISSION BRIEFING · {site.station}
            </div>
            <h1 className="m-0 mb-5 font-display text-[clamp(34px,5vw,58px)] font-bold leading-[1.02] tracking-[-0.02em] text-heading">
              AI-assisted software delivery,
              <br />
              <span className="text-accent">tested in public.</span>
            </h1>
            <p className="m-0 mb-7 max-w-[560px] text-[17px] leading-[1.6] text-muted">
              A working field laboratory for shipping real systems with AI — and proving they work.
              Experiments, evaluations, validation frameworks, and the evidence trail behind every
              claim.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/proof-wall/"
                className="mono inline-flex items-center gap-[9px] rounded-[5px] bg-accent px-[18px] py-3 text-[12.5px] font-medium tracking-[0.06em] text-accent-ink transition-opacity hover:opacity-90"
              >
                VIEW PROOF WALL <span className="text-[14px]">→</span>
              </Link>
              <Link
                href="/delivery-os/"
                className="mono inline-flex items-center gap-[9px] rounded-[5px] border border-[#2e3438] bg-[#0f1315] px-[18px] py-3 text-[12.5px] font-medium tracking-[0.06em] text-fg-2 transition-colors hover:border-accent-deep"
              >
                OPEN DELIVERY OS
              </Link>
            </div>
          </div>

          {/* Station status panel */}
          <div className="overflow-hidden rounded-[5px] border border-line-2 bg-gradient-to-b from-panel-3 to-panel">
            <div className="flex items-center justify-between gap-2 border-b border-line bg-panel px-3.5 py-[11px]">
              <span className="mono text-[10.5px] tracking-[0.18em] text-label">
                STATION STATUS
              </span>
              <div className="flex items-center gap-2">
                <DemoBadge label="DEMO" />
                <span className="mono text-[10px] text-accent">{stationsUp}/{stationStatus.length} UP</span>
              </div>
            </div>
            <div className="flex flex-col">
              {stationStatus.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 border-b border-line-3 px-3.5 py-3"
                >
                  <Dot tone={s.tone} />
                  <span className="flex-1 text-[13px] text-fg-2">{s.name}</span>
                  <span className="mono text-[10.5px] tracking-[0.06em]" style={{ color: toneColor[s.tone] }}>
                    {s.state}
                  </span>
                </div>
              ))}
              <div className="mono bg-[#0c0f10] px-3.5 py-[11px] text-[10px] tracking-[0.05em] text-dim-2">
                LAST SYNC <Clock className="text-dim-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------ Metrics strip --------------------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-deck">
          <div className="flex items-center gap-3 px-[18px] pt-4">
            <span className="mono text-[9.5px] tracking-[0.18em] text-label">TELEMETRY</span>
            <DemoBadge label={DEMO.data} note="illustrative dashboard values, not live counts" />
          </div>
          <div className="grid grid-cols-2 min-[900px]:grid-cols-6">
            {metrics.map((m) => (
              <div key={m.k} className="border-b border-r border-line-3 px-[18px] py-5">
                <div className="mono mb-2.5 text-[9.5px] tracking-[0.12em] text-dim-2">{m.k}</div>
                <div className="font-display text-[28px] font-semibold leading-none text-fg">
                  {m.v}
                </div>
                <div className="mono mt-[7px] text-[10px] text-accent">{m.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ Dashboard grid -------------------- */}
      <section className="mx-auto grid max-w-deck grid-cols-1 gap-[18px] px-5 pb-2 pt-7 min-[900px]:grid-cols-3">
        {/* Signal Deck */}
        <div className="panel flex flex-col overflow-hidden">
          <PanelHeader code="01" title="SIGNAL DECK" href="/signal-deck/" />
          <div className="flex-1">
            {signals.slice(0, 3).map((e) => (
              <div key={e.code} className="border-b border-line-3 px-4 py-3.5">
                <div className="mb-1.5 flex items-center gap-2">
                  <Dot size={6} color={severityColor(e.sev)} />
                  <span className="mono text-[9.5px] tracking-[0.08em] text-label">{e.code}</span>
                  <span className="mono text-[9.5px]" style={{ color: severityColor(e.sev) }}>
                    {e.sev}
                  </span>
                </div>
                <div className="text-[13px] leading-[1.4] text-fg-2">{e.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery OS */}
        <div className="panel flex flex-col overflow-hidden">
          <PanelHeader code="02" title="DELIVERY OS" href="/delivery-os/" />
          <div className="flex flex-1 flex-col gap-2.5 px-4 py-4">
            {stages.map((st) => (
              <div key={st.n} className="flex items-center gap-[11px]">
                <span className="mono w-[18px] flex-none text-[10px] text-accent">{st.n}</span>
                <span className="h-[7px] w-[7px] flex-none rounded-full border border-accent bg-panel" />
                <span className="flex-1 text-[13px] text-fg-2">{st.name}</span>
              </div>
            ))}
            <div className="mono mt-1 text-[10px] tracking-[0.04em] text-dim-2">
              7-STAGE GATED LIFECYCLE
            </div>
          </div>
        </div>

        {/* Hallucination Lab */}
        <div className="panel flex flex-col overflow-hidden">
          <PanelHeader code="03" title="HALLUCINATION LAB" href="/hallucination-lab/" codeColor={toneColor.run} />
          <div className="flex flex-1 flex-col gap-3.5 px-4 py-4">
            <DemoBadge label={DEMO.data} />
            {labBars.map((b) => (
              <div key={b.m}>
                <div className="mb-1.5 flex justify-between">
                  <span className="text-[12px] text-muted">{b.m}</span>
                  <span className="mono text-[11px]" style={{ color: toneColor[b.tone] }}>
                    {b.hall}
                  </span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-[3px] bg-track">
                  <div className="h-full" style={{ width: b.w, background: toneColor[b.tone] }} />
                </div>
              </div>
            ))}
            <div className="mono text-[10px] tracking-[0.04em] text-dim-2">
              HALLUCINATION RATE · LOWER IS BETTER
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- Featured proof ---------------------- */}
      <section className="mx-auto max-w-deck px-5 pb-10 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-baseline gap-[11px]">
            <span className="mono text-[11px] text-accent">06</span>
            <h2 className="m-0 font-display text-[18px] font-semibold text-fg">
              Proof Wall — featured evidence
            </h2>
          </div>
          <Link
            href="/proof-wall/"
            className="mono rounded border border-line-2 bg-[#0f1315] px-3 py-2 text-[11px] tracking-[0.06em] text-muted transition-colors hover:text-accent"
          >
            ALL REPOS →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.name} project={p} variant="compact" />
          ))}
        </div>
      </section>
    </>
  );
}

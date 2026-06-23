import type { Project, ProjectStatus } from "@/lib/data";
import Dot from "./Dot";

const statusStyle: Record<ProjectStatus, { color: string; border: string }> = {
  ACTIVE: { color: "#3fb950", border: "#1f5e2c" },
  PLANNED: { color: "#868d91", border: "#2e3438" },
};

function StatusTag({ status }: { status: ProjectStatus }) {
  const s = statusStyle[status];
  return (
    <span
      className="mono rounded px-1.5 py-0.5 text-[9px] tracking-[0.08em]"
      style={{ color: s.color, border: `1px solid ${s.border}` }}
    >
      {status}
    </span>
  );
}

/** A labelled field block: "PROBLEM", "APPROACH", etc. */
function Field({ label, children, italic = false }: { label: string; children: React.ReactNode; italic?: boolean }) {
  return (
    <div>
      <div className="mono mb-1 text-[9px] tracking-[0.1em] text-dim-2">{label}</div>
      <p className={`m-0 text-[13px] leading-[1.5] text-muted ${italic ? "italic" : ""}`}>{children}</p>
    </div>
  );
}

/**
 * Reusable repository case file. `compact` renders the dashboard preview
 * (name + status + tag + problem); `full` renders the complete Proof Wall card.
 */
export default function ProjectCard({
  project,
  variant = "full",
}: {
  project: Project;
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="panel flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="mono text-[13px] text-fg">{project.name}</span>
          <StatusTag status={project.status} />
        </div>
        <div className="mono text-[9px] tracking-[0.1em] text-dim">{project.tag}</div>
        <p className="m-0 text-[12.5px] leading-[1.5] text-muted">{project.summary}</p>
      </div>
    );
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-line-2 bg-panel">
      <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-3.5">
        <span className="mono text-[13.5px] text-fg">{project.name}</span>
        <StatusTag status={project.status} />
      </div>
      <div className="flex flex-1 flex-col gap-3.5 p-4">
        <span className="mono text-[9px] tracking-[0.1em] text-dim">{project.tag}</span>
        <Field label="PROBLEM">{project.problem}</Field>
        <Field label="APPROACH">{project.approach}</Field>

        <div className="flex items-start gap-2 rounded border border-[#1c2620] bg-accent/[0.04] px-3 py-3">
          <Dot size={6} className="mt-1.5" />
          <div>
            <div className="mono mb-1 text-[9px] tracking-[0.1em] text-accent">VALIDATION</div>
            <p className="m-0 text-[12.5px] leading-[1.45] text-fg-2">{project.validation}</p>
          </div>
        </div>

        <Field label="FINDINGS">{project.findings}</Field>

        <Field label="LESSON" italic>
          {project.lessons}
        </Field>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line-3 pt-2.5">
          <span className="mono text-[10.5px] text-dim">{project.stack}</span>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono rounded border border-line-2 px-2.5 py-1 text-[10px] tracking-[0.06em] text-fg-2 transition-colors hover:border-accent-deep hover:text-accent"
            >
              GITHUB →
            </a>
          ) : (
            <span className="mono text-[10px] tracking-[0.06em] text-dim-2">REPO PENDING</span>
          )}
        </div>
      </div>
    </article>
  );
}

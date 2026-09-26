"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { languageApps, projects, projectFilters, type Project, type ProjectTag } from "@/lib/data";

type Filter = ProjectTag | "ALL";

type Group = { key: string; label?: string; note?: string; match: (p: Project) => boolean };

/**
 * The wall keeps data order but breaks into labelled groups, so a long list
 * stays scannable: shipped repos, the ten-language series, then concept repos.
 */
const groups: Group[] = [
  { key: "shipped", match: (p) => p.real && !languageApps.includes(p) },
  {
    key: "languages",
    label: "TEN LANGUAGES, TEN SMALL APPS",
    note: "one small browser app per language",
    match: (p) => languageApps.includes(p),
  },
  { key: "concept", label: "CONCEPT REPOS", note: "planned · no results yet", match: (p) => !p.real },
];

export default function ProofWall() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const visible = filter === "ALL" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <>
      <div role="group" aria-label="Filter repositories by category" className="mb-5 flex flex-wrap gap-2">
        {projectFilters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`mono rounded px-3 py-[7px] text-[10.5px] tracking-[0.06em] transition-colors ${
                active
                  ? "border border-[#23332a] bg-accent/10 text-accent"
                  : "border border-line-2 bg-[#0f1315] text-muted hover:text-fg-2"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {groups
        .map((g) => ({ ...g, items: visible.filter(g.match) }))
        .filter((g) => g.items.length > 0)
        .map((g, i) => (
          <section key={g.key} aria-label={g.label ?? "Shipped repositories"} className={i > 0 ? "mt-10" : undefined}>
            {g.label ? (
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-5">
                <h2 className="mono m-0 text-[10.5px] font-normal tracking-[0.16em] text-label">{g.label}</h2>
                {g.note ? <span className="mono text-[10px] text-dim-2">{g.note}</span> : null}
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1240px]:grid-cols-3">
              {g.items.map((p) => (
                <ProjectCard key={p.name} project={p} variant="full" />
              ))}
            </div>
          </section>
        ))}

      {visible.length === 0 ? (
        <p className="mono mt-6 text-[12px] text-dim-2">No repositories in this category yet.</p>
      ) : null}
    </>
  );
}

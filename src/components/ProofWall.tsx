"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects, projectFilters, type ProjectTag } from "@/lib/data";

type Filter = ProjectTag | "ALL";

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

      <div className="grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1240px]:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.name} project={p} variant="full" />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mono mt-6 text-[12px] text-dim-2">No repositories in this category yet.</p>
      ) : null}
    </>
  );
}

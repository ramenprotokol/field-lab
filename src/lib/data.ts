import { C, type StatusTone } from "./theme";
import { site } from "./site";

/* ------------------------------------------------------------------ *
 * Honesty markers.
 *
 * The brand rule is simple: never present fabricated operational numbers as
 * real. Datasets below that are illustrative carry a `demo` label, surfaced in
 * the UI by <DemoBadge>. The two shipped repositories are real and carry
 * verifiable links instead.
 * ------------------------------------------------------------------ */
export const DEMO = {
  data: "DEMO DATA",
  feed: "SAMPLE FEED",
  sample: "SAMPLE",
} as const;

/* ------------------------------- Home ----------------------------- */

export type Metric = { k: string; v: string; d: string };
// `metrics` is defined further down so PUBLIC_REPOS can be derived from the real
// project count (see `projects`) instead of a hand-maintained literal.

export type Station = { name: string; state: string; tone: StatusTone };

export const stationStatus: Station[] = [
  { name: "Signal Deck", state: "STREAMING", tone: "ok" },
  { name: "Delivery OS", state: "NOMINAL", tone: "ok" },
  { name: "Hallucination Lab", state: "EVAL RUN", tone: "run" },
  { name: "Validation Gate", state: "ARMED", tone: "ok" },
];

/* ---------------------------- Signal Deck ------------------------- */

export type Severity = "FIELD NOTE" | "EVAL" | "LESSON" | "INCIDENT";

export type Signal = {
  code: string;
  sev: Severity;
  date: string;
  title: string;
  sum: string;
};

const sevColor: Record<Severity, string> = {
  "FIELD NOTE": C.accent,
  EVAL: C.amber,
  LESSON: C.accent,
  INCIDENT: C.red,
};

export function severityColor(s: Severity): string {
  return sevColor[s];
}

/** Illustrative field feed — representative entries, labelled SAMPLE. */
export const signals: Signal[] = [
  {
    code: "SIG-0147",
    sev: "FIELD NOTE",
    date: "2026-06-19",
    title: "Spec-first prompting cut rework across repeated build cycles",
    sum: "Writing an executable acceptance spec before any generation consistently reduced downstream correction passes versus ad-hoc prompting.",
  },
  {
    code: "SIG-0146",
    sev: "EVAL",
    date: "2026-06-17",
    title: "Long-context retrieval degrades silently past ~80% window fill",
    sum: "Models stopped citing mid-context evidence without signalling uncertainty. Caught by adversarial needle placement in the eval harness.",
  },
  {
    code: "SIG-0145",
    sev: "LESSON",
    date: "2026-06-14",
    title: "Agent loops need a hard validation gate, not a confidence threshold",
    sum: "Self-reported confidence was uncorrelated with correctness on refactor tasks. A deterministic test gate caught what scoring missed.",
  },
  {
    code: "SIG-0144",
    sev: "INCIDENT",
    date: "2026-06-11",
    title: "Tool-call schema drift broke integrations in staging",
    sum: "A model update changed argument-ordering preference. Pinned contract tests flagged it before it reached release.",
  },
  {
    code: "SIG-0143",
    sev: "FIELD NOTE",
    date: "2026-06-08",
    title: "Smaller, gated increments beat large autonomous runs",
    sum: "Mean rework per change dropped when build increments were bounded to a single testable unit.",
  },
];

/* ---------------------------- Delivery OS ------------------------- */

export type Stage = {
  n: string;
  name: string;
  purpose: string;
  out: string;
  gate: string;
};

export const stages: Stage[] = [
  { n: "01", name: "Idea", purpose: "Frame the problem as a falsifiable hypothesis.", out: "Problem statement · success criteria", gate: "Worth building? Measurable?" },
  { n: "02", name: "Requirements", purpose: "Convert intent into executable acceptance criteria.", out: "Acceptance spec · constraints", gate: "Can a test prove this is done?" },
  { n: "03", name: "Design", purpose: "Map the system before generating any code.", out: "Architecture · interfaces · contracts", gate: "Are boundaries explicit?" },
  { n: "04", name: "Build", purpose: "AI-assisted implementation against the spec.", out: "Working increments · PRs", gate: "Does each increment pass smoke tests?" },
  { n: "05", name: "Validation", purpose: "Adversarial checks, eval harness, contract tests.", out: "Eval report · coverage · failure log", gate: "Does evidence support the claim?" },
  { n: "06", name: "Release", purpose: "Ship behind gates with rollback rehearsed.", out: "Tagged release · runbook", gate: "Is rollback rehearsed?" },
  { n: "07", name: "Learn", purpose: "Capture deltas into playbooks and the signal deck.", out: "Field note · playbook update", gate: "What changes next cycle?" },
];

/* ------------------------- Hallucination Lab ---------------------- */

export type LabBar = { m: string; hall: string; w: string; tone: StatusTone };

export const labBars: LabBar[] = [
  { m: "Model A", hall: "2.1%", w: "11%", tone: "ok" },
  { m: "Model B", hall: "4.8%", w: "26%", tone: "ok" },
  { m: "Model C", hall: "9.4%", w: "51%", tone: "warn" },
  { m: "Baseline", hall: "18.4%", w: "100%", tone: "down" },
];

export type Verdict = "PASS" | "WATCH" | "FAIL";

export type LabModel = {
  m: string;
  acc: string;
  hall: string;
  cal: string;
  verdict: Verdict;
};

const verdictTone: Record<Verdict, { color: string; border: string }> = {
  PASS: { color: C.accent, border: "#1f5e2c" },
  WATCH: { color: C.amber, border: "#6b4e16" },
  FAIL: { color: C.red, border: "#5e2222" },
};

export function verdictStyle(v: Verdict) {
  return verdictTone[v];
}

/** Illustrative scoreboard — anonymised, synthetic numbers, labelled DEMO. */
export const labModels: LabModel[] = [
  { m: "Model A", acc: "94.1%", hall: "2.1%", cal: "0.88", verdict: "PASS" },
  { m: "Model B", acc: "91.7%", hall: "4.8%", cal: "0.81", verdict: "PASS" },
  { m: "Model C", acc: "87.3%", hall: "9.4%", cal: "0.69", verdict: "WATCH" },
  { m: "Baseline", acc: "78.0%", hall: "18.4%", cal: "0.51", verdict: "FAIL" },
];

export type FindingStatus = "MITIGATED" | "MONITORING" | "OPEN";

export type LabFinding = {
  id: string;
  title: string;
  rate: string;
  baseW: string;
  status: FindingStatus;
  note: string;
};

const findingColor: Record<FindingStatus, string> = {
  MITIGATED: C.accent,
  MONITORING: C.amber,
  OPEN: C.red,
};

export function findingColorFor(s: FindingStatus): string {
  return findingColor[s];
}

/** Illustrative findings ledger — labelled SAMPLE in the UI. */
export const labFindings: LabFinding[] = [
  { id: "HL-031", title: "Fabricated API methods on unfamiliar SDKs", rate: "18.4%", baseW: "100%", status: "MITIGATED", note: "Grounding with retrieved type stubs dropped fabrication sharply. Verified across several SDKs." },
  { id: "HL-030", title: "Confident wrong dates in document summarization", rate: "7.9%", baseW: "43%", status: "OPEN", note: "No reliable internal signal; mitigated only by source-pinning every claim to a span." },
  { id: "HL-029", title: "Silent unit-conversion errors in numeric reasoning", rate: "11.2%", baseW: "61%", status: "MONITORING", note: "Tool-use offload reduces but does not eliminate. Tracking across model versions." },
  { id: "HL-028", title: "Invented citations in literature synthesis", rate: "5.3%", baseW: "29%", status: "MITIGATED", note: "Retrieval-or-refuse policy plus a citation-existence check at the gate." },
];

/* ----------------------------- Proof Wall ------------------------- */

export type ProjectStatus = "ACTIVE" | "PLANNED";
export type ProjectTag = "AI EVALUATION" | "SYSTEM" | "TOOLING" | "RELIABILITY";

/**
 * Reusable project record. Real shipped repos set `real: true` and a `github`
 * link; concept repos are `status: "PLANNED"` and carry no fabricated metrics.
 */
export type Project = {
  name: string;
  tag: ProjectTag;
  status: ProjectStatus;
  real: boolean;
  summary: string;
  problem: string;
  approach: string; // methodology
  validation: string; // validation approach / evidence
  findings: string;
  lessons: string;
  stack: string;
  github: string | null;
};

export const projects: Project[] = [
  {
    name: "hallucination-hunter",
    tag: "AI EVALUATION",
    status: "ACTIVE",
    real: true,
    summary:
      "A runnable LLM hallucination (groundedness) detector: an `hh` CLI plus Python API, pluggable detectors and model backends.",
    problem:
      "No simple, runnable way to measure whether an LLM answer is actually grounded in its sources, or just plausible.",
    approach:
      "Pluggable detectors and model backends scored against a labelled dataset, exposed through a CLI and a Python API.",
    validation:
      "160-example labelled dataset · 136 tests · green CI · reproducible runs. v0.1.0, MIT.",
    findings:
      "Groundedness works as a release gate, not a vibe check — borderline answers surface before they ship.",
    lessons: "Measure groundedness as a gate. Confidence is not evidence.",
    stack: "Python · pytest",
    github: `${site.github}/hallucination-hunter`,
  },
  {
    name: "ai-delivery-engineering",
    tag: "SYSTEM",
    status: "ACTIVE",
    real: true,
    summary:
      "A methodology repo — docs, templates, checklists, and worked examples — for shipping software reliably with AI-assisted workflows.",
    problem:
      "AI-assisted builds drift from intent without a spine: no gates, no acceptance criteria, no evidence trail.",
    approach:
      "A stage-gated lifecycle driven by executable acceptance specs, with reusable templates and checklists per stage.",
    validation:
      "Built with parallel AI agents, then put through an independent max-effort audit (graded B+); findings fixed and re-verified. markdownlint + link-check CI.",
    findings:
      "Auto-reviewers will confidently 'fix' things that are already correct — adversarial review plus a human pass caught it.",
    lessons: "Spec-first beats prompt-first, measurably. Let a skeptic try to break it.",
    stack: "Markdown · CI",
    github: `${site.github}/ai-delivery-engineering`,
  },
  {
    name: "delivery-gate",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "A CLI that gives a hard GO/NO-GO on a release: it enforces a release-readiness checklist with machine auto-checks plus a human-attested `release.yaml` manifest.",
    problem:
      "A release checklist in a doc is easy to skip under pressure — and a machine can only verify half of it; the rest is human judgment no script can prove.",
    approach:
      "Pluggable checks behind one interface: four AUTO checks (changelog, CI status, pinned deps, clean tagged release point) plus attestations a human signs in `release.yaml`. Exit-code driven so CI can actually block a release.",
    validation:
      "48 tests · green CI · ruff-clean · v0.1.0, MIT. It gates its own releases. An adversarial pass fixed three crash-on-malformed-manifest bugs.",
    findings:
      "Every result is labeled AUTO (machine-proven) or ATTESTED (human-claimed), and the tool never upgrades one to the other — it stays honest about what it cannot verify.",
    lessons: "Enforce the checklist, don't just publish it. Label what's proven vs. trusted.",
    stack: "Python · pytest · ruff",
    github: `${site.github}/delivery-gate`,
  },
  // Concept repos — clearly PLANNED, no fabricated operational metrics.
  {
    name: "spec-lint",
    tag: "TOOLING",
    status: "PLANNED",
    real: false,
    summary: "A linter that flags untestable acceptance criteria before any code is generated.",
    problem: "Acceptance specs rot and drift into ambiguity, which is a leading indicator of rework.",
    approach: "Static checks over acceptance specs that reject criteria a test could not prove.",
    validation: "Planned: a fixture suite of ambiguous vs. testable specs, scored against expert labels.",
    findings: "Concept stage — no results to report yet.",
    lessons: "Ambiguity caught early is rework avoided later.",
    stack: "TypeScript",
    github: null,
  },
  {
    name: "context-probe",
    tag: "AI EVALUATION",
    status: "PLANNED",
    real: false,
    summary: "A needle-in-haystack probe that maps where long-context recall fails silently.",
    problem: "Long-context recall degrades near the window limit without the model signalling lower confidence.",
    approach: "Place adversarial needles across window-fill levels and chart the degradation curve.",
    validation: "Planned: a reproducible sweep across fill ratios with a documented failure curve.",
    findings: "Concept stage — no results to report yet.",
    lessons: "Silent failure is the dangerous failure.",
    stack: "Python",
    github: null,
  },
  {
    name: "contract-tests",
    tag: "TOOLING",
    status: "PLANNED",
    real: false,
    summary: "Pinned contract tests that catch tool-call schema drift across model updates.",
    problem: "Tool-call schemas shift between model versions and break integrations quietly.",
    approach: "Pin the expected contract for each integration and alert on any drift.",
    validation: "Planned: contract fixtures run in CI on every integration.",
    findings: "Concept stage — no results to report yet.",
    lessons: "Pin the contract, not the prompt.",
    stack: "TypeScript",
    github: null,
  },
  {
    name: "rollback-rehearsal",
    tag: "RELIABILITY",
    status: "PLANNED",
    real: false,
    summary: "Automated rollback drills so recovery is rehearsed, not theoretical.",
    problem: "Rollbacks are assumed to work until the first time they are actually needed.",
    approach: "Scheduled rollback drills in staging that measure and record recovery time.",
    validation: "Planned: timed drills with a recorded mean recovery target.",
    findings: "Concept stage — no results to report yet.",
    lessons: "An untested rollback is not a rollback.",
    stack: "Go",
    github: null,
  },
];

export const projectFilters: (ProjectTag | "ALL")[] = [
  "ALL",
  "AI EVALUATION",
  "SYSTEM",
  "TOOLING",
  "RELIABILITY",
];

/** The one genuinely real, claimable figure on the dashboard. */
export const liveRepoCount = projects.filter((p) => p.real).length;

/**
 * Dashboard telemetry. Every value is illustrative and labelled DEMO in the UI,
 * except PUBLIC_REPOS, which is derived from the real shipped repos so it can
 * never drift from reality.
 */
export const metrics: Metric[] = [
  { k: "EXPERIMENTS_LOGGED", v: "147", d: "illustrative" },
  { k: "EVALS_EXECUTED", v: "2,318", d: "illustrative" },
  { k: "PUBLIC_REPOS", v: String(liveRepoCount), d: "live · real" },
  { k: "HALLUCINATIONS_CAUGHT", v: "412", d: "illustrative" },
  { k: "MEAN_TIME_TO_VALID", v: "4.2h", d: "illustrative" },
  { k: "DELIVERY_CYCLES", v: "38", d: "illustrative" },
];

/* -------------------------- Validation Playbooks ------------------ */

export type Playbook = {
  code: string;
  title: string;
  steps: string;
  use: string;
  owner: string;
};

export const playbooks: Playbook[] = [
  { code: "PB-01", title: "Executable Acceptance Spec", steps: "Frame → Constrain → Make testable → Sign off", use: "Before any generation.", owner: "Requirements" },
  { code: "PB-02", title: "Adversarial Eval Harness", steps: "Seed → Needle → Gate → Report", use: "Every model or prompt change.", owner: "Validation" },
  { code: "PB-03", title: "Tool Contract Pinning", steps: "Define → Pin → Test → Alert on drift", use: "Every external integration.", owner: "Build" },
  { code: "PB-04", title: "Rollback Rehearsal", steps: "Trigger → Drill → Time → Document", use: "Before every release.", owner: "Release" },
  { code: "PB-05", title: "Source-Pinned Summarization", steps: "Retrieve → Cite span → Verify → Refuse-or-answer", use: "Any factual synthesis task.", owner: "Validation" },
  { code: "PB-06", title: "Increment Bounding", steps: "Scope → Bound to one testable unit → Smoke → Merge", use: "Every build increment.", owner: "Build" },
];

/* ----------------------------- Build Logs ------------------------- */

export type BuildLog = {
  code: string;
  date: string;
  title: string;
  tags: string;
  body: string;
};

/** Illustrative engineering journal — representative entries, labelled SAMPLE. */
export const logs: BuildLog[] = [
  { code: "LOG-0089", date: "2026-06-20", title: "Hardened the eval harness against fixture rot", tags: "eval-harness · validation", body: "Versioned every fixture and added a reproducible seed. Two cases that looked flaky were actually a real silent-failure bug in retrieval — fixed, then added a regression probe so it can never return quietly." },
  { code: "LOG-0088", date: "2026-06-18", title: "Added a hard stage gate between Build and Validation", tags: "delivery-os", body: "Builds were sliding toward release without an evidence pass. The new gate blocks on a missing eval report. More friction up front; far less rework downstream. Net cycle time went down, not up." },
  { code: "LOG-0087", date: "2026-06-15", title: "spec-lint caught an untestable acceptance criterion", tags: "spec-lint", body: "“Should feel fast” failed the lint. Rewriting it as a p95 latency budget surfaced a missing database index before a single line of code was generated." },
  { code: "LOG-0086", date: "2026-06-13", title: "Mapped the long-context degradation curve", tags: "context-probe · eval", body: "Ran the needle probe across window-fill levels. Recall holds until ~80% fill, then drops without the model signalling lower confidence. Documented the curve and added a fill-ratio guard." },
  { code: "LOG-0085", date: "2026-06-09", title: "Pinned tool contracts after a silent schema drift", tags: "contract-tests", body: "A model update reordered preferred arguments and broke integrations in staging. Pinned contract tests now run on every integration and alert on drift before release." },
];

/* ------------------------------ Writing --------------------------- */

export type Essay = {
  kicker: string;
  title: string;
  read: string;
  date: string;
  sum: string;
};

/** Illustrative essay index — planned long-form, labelled SAMPLE. */
export const writing: Essay[] = [
  { kicker: "METHOD", title: "Why I write acceptance specs before I prompt", read: "8 min", date: "2026-06-12", sum: "The single highest-leverage habit in AI-assisted delivery — with the rework data behind it." },
  { kicker: "EVALUATION", title: "Hallucinations are a validation problem, not a model problem", read: "11 min", date: "2026-05-29", sum: "Stop waiting for the model to stop lying. Build the gate that catches it and measure what it catches." },
  { kicker: "SYSTEMS", title: "A field manual for shipping AI-assisted systems in public", read: "14 min", date: "2026-05-10", sum: "The full lifecycle, the gates, and the evidence trail — written as a runbook you can actually follow." },
  { kicker: "PRACTICE", title: "Confidence is not calibration: reading model self-reports", read: "9 min", date: "2026-04-22", sum: "What self-reported confidence does and does not tell you, with the correlation data." },
];

/* ------------------------------ Contact --------------------------- */

export type Channel = {
  k: string;
  label: string;
  sub: string;
  cta: string;
  href: string;
  external: boolean;
};

/** Public, async channels only — every link below is real. */
export const channels: Channel[] = [
  { k: "SOURCE", label: "github.com/ramenprotokol", sub: "Every public repository, in the open.", cta: "OPEN", href: site.github, external: true },
  { k: "DISCUSS", label: "GitHub Discussions", sub: "Questions and threads on the repos.", cta: "OPEN", href: `${site.github}/ai-delivery-engineering/discussions`, external: true },
  { k: "SIGNAL", label: "Build Logs", sub: "Dated field reports from the bench.", cta: "READ", href: "/build-logs/", external: false },
  { k: "WRITING", label: "Long-form essays", sub: "Denser notes on building with AI.", cta: "READ", href: "/writing/", external: false },
];

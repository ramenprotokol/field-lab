import { C, type StatusTone } from "./theme";
import { site } from "./site";

/* ------------------------------------------------------------------ *
 * Honesty markers.
 *
 * The brand rule is simple: never present fabricated operational numbers as
 * real. Datasets below that are illustrative carry a `demo` label, surfaced in
 * the UI by <DemoBadge>. The shipped repositories are real and carry
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
 * Repos with a public deployment also set `live`, shown as a LIVE link.
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
  live?: string; // public deployment, if there is one
};

/**
 * Ten languages, ten small apps: one small browser app per language. Kept as its
 * own list so the Proof Wall can show the series as a group; every entry is
 * also part of `projects` below.
 */
export const languageApps: Project[] = [
  {
    name: "overprint",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "Turns any photo into a two-ink risograph-style print in the browser. All the image processing is Rust compiled to a ~36 KiB WebAssembly module; the photo never leaves the device.",
    problem:
      "A convincing riso look needs real plate separation, dithering and mis-registration — and 'WASM is faster' is usually asserted, not measured.",
    approach:
      "Rust does the work in integer maths: a least-squares split into two ink plates, Floyd–Steinberg, Atkinson or blue-noise dithering, seeded grain, a whole-dot registration shift, and multiplied overprinting. A line-for-line JavaScript port races it on the visitor's own machine.",
    validation:
      "35 Rust tests · 40 JS tests, including 1,000+ byte-for-byte comparisons of the JS port against the WASM build and a headless-Chrome run. Native Rust, wasm32 and JS hit the same golden fingerprints. MIT.",
    findings:
      "Modern JS engines are good at typed-array loops, so the speed margin is real but modest and varies by device; the page measures it live instead of quoting a number. The stronger case for Rust is bit-exact determinism.",
    lessons: "Measure the speed claim on the user's machine, or don't make it.",
    stack: "Rust · WebAssembly · JavaScript",
    github: `${site.github}/overprint`,
    live: "https://overprint-1iy.pages.dev",
  },
  {
    name: "sky-report",
    tag: "SYSTEM",
    status: "ACTIVE",
    real: true,
    summary:
      "Type an airport code and see the real current sky, ray-marched in a GLSL fragment shader from that airport's live METAR weather report.",
    problem:
      "A METAR (BKN025 27015KT 9999) describes the sky precisely, but to most people it reads like line noise.",
    approach:
      "A WebGL2 shader integrates atmospheric scattering and ray-marches each reported cloud layer as a volume; visibility becomes haze, wind moves the clouds, and the sun sits where it was at observation time. TypeScript parses the report and sets every shader input. On the live site a Cloudflare Pages Function proxies aviationweather.gov with a five-minute cache; bundled recorded reports are only a fallback, labelled RECORDED SAMPLE.",
    validation:
      "196 unit tests · 23 smoke tests, 10 of them in headless Chrome and 4 against a local Wrangler Pages server. The parser is cross-checked against the Aviation Weather Center's own decoder on 400 real reports; sun elevation matches astropy to 0.03° on 12 cases; cloud cover seen from below is within 0.9 points of the reported amount across 18 reports. MIT.",
    findings:
      "Coverage was only honest after calibration: seen from below, a thick layer covers more sky than any one slice of it. Cloud shapes are still procedural — a METAR gives amount and base, nothing else — and the page says which parts are data and which are style. On the deployed site the shared cache was seen working (a MISS, then a HIT); CPU time per request is still unmeasured.",
    lessons: "Separate the data from the style on screen, then measure the data.",
    stack: "GLSL · TypeScript · Cloudflare Pages Functions",
    github: `${site.github}/sky-report`,
    live: "https://sky-report-9t3.pages.dev",
  },
  {
    name: "small-print",
    tag: "AI EVALUATION",
    status: "ACTIVE",
    real: true,
    summary:
      "Paste any Terms of Service and get a free clause-by-clause map of who each clause favours: 53 hand-written rules in Python run in your browser, with no AI, and the text never leaves the device.",
    problem:
      "A summary of legal text sounds confident and gives you nothing to check it against — and a reader that needs a paid model can't be free for every visitor.",
    approach:
      "Pyodide (CPython compiled to WebAssembly) runs the project's own Python in a Web Worker: a clause segmenter, then 53 rules built from 136 bounded regular expressions, with negation and near-miss checks. Every matched quote goes through the verifier written for model output — an exact substring inside the clause it labels — and drops are counted on the page. A Claude reader exists in the repo but isn't deployed.",
    validation:
      "297 pytest · 33 Node tests, including headless Chrome with the strict CSP enforced (no upload during a reading) and the built bundle returning exactly what CPython returns. On 24 spot-check sentences written after the rules: 12 labelled as expected, 12 unlabelled, 0 wrong. MIT; Pyodide and CPython notices ship with the site.",
    findings:
      "When a rule fires its label is usually right, but on unseen text it stays silent on about half the clauses that matter, and the page says so. The verifier proves a quote is in the text, not that the label is right. The first reading downloads a 13.6 MB Python runtime, stated before it starts.",
    lessons: "Check every quote mechanically, whoever wrote the reading, and say what the rules can miss.",
    stack: "Python · Pyodide · WebAssembly · Web Workers",
    github: `${site.github}/small-print`,
    live: "https://small-print.pages.dev",
  },
  {
    name: "silt",
    tag: "SYSTEM",
    status: "ACTIVE",
    real: true,
    summary:
      "Paint a mountain and watch 10,000 years of rain carve river valleys and build small deltas. The whole erosion model runs in a 32 KiB Zig WebAssembly module.",
    problem:
      "Erosion toys often look plausible while quietly creating or losing water and rock, and their rivers are traced from noisy water depth.",
    approach:
      "A virtual-pipe hydraulic-erosion model (Mei et al., 2007) with conservative sediment transport that books every source and sink, in Zig with @Vector SIMD and no allocation per step. Rivers come from a separate drainage survey — Priority-Flood pit filling, D8 routing, flow accumulation — that the physics never reads.",
    validation:
      "29 Zig tests · 28 Node tests, plus headless Chrome. Water and material books balance every step (a deliberate 0.1% leak fails both tests); the SIMD build matches scalar bit for bit; delta growth tracks river discharge at r = 0.80 on the 512² grid. MIT.",
    findings:
      "The deltas are modest (15–20 cells of new coast) and the delta test is fragile: r = 0.54 at 256², 0.39 on another survey, and nearby parameters swung it from about −0.5 to 0.8. The README says so.",
    lessons: "Book every source and sink — a conservation test catches what a screenshot won't.",
    stack: "Zig · WebAssembly · WebGL2",
    github: `${site.github}/silt`,
    live: "https://silt-62k.pages.dev",
  },
  {
    name: "tide-table",
    tag: "RELIABILITY",
    status: "ACTIVE",
    real: true,
    summary:
      "Paste a cron expression and see the next year of firings as an almanac across time zones, with a red seam wherever daylight saving skips a job, runs it twice, or shifts it.",
    problem:
      "Cron implementations disagree about clock changes, and a job that is skipped, or runs twice, on the night the clocks change is easy to miss in review.",
    approach:
      "The engine is robfig/cron v3.0.1, the library Kubernetes uses to parse CronJob schedules, compiled with Go to WebAssembly, so the page shows that library's real behaviour rather than a re-implementation. For every day it compares the library's firings with a plain wall-clock reading and names each difference.",
    validation:
      "34 Go tests · 41 JS tests. An equivalence test checks the fast walk against the plain library walk in all 598 tz zones: 9.15 million firings, 0 mismatches. The full exhaustive sweep has not finished, so this is sampling plus careful reasoning, not a formal proof. MIT.",
    findings:
      "The tests found a quirk in Go itself: with the slim tz data built into WebAssembly, Time.ZoneBounds reports the period around 31 December of a leap year as ending before the time asked about. The engine corrects for it and a test pins it.",
    lessons: "Model the library production actually runs, then test the model against it.",
    stack: "Go · WebAssembly · JavaScript",
    github: `${site.github}/tide-table`,
    live: "https://tide-table.pages.dev",
  },
  {
    name: "paren",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "A stepper for a small teaching subset of Clojure: paste an expression and watch it evaluate one substitution at a time, with the environment beside it.",
    problem:
      "A REPL shows only the final value, so evaluation order, scope and closures stay invisible.",
    approach:
      "All ClojureScript: the real Clojure reader turns text into data, a small-step evaluator reduces one redex at a time in Clojure's order, and persistent data structures keep every state, so stepping back is just indexing. Anything outside the subset is refused by name before a step runs.",
    validation:
      "55 ClojureScript tests with 819 assertions, including golden caption sequences for every example and 71 hostile inputs that must end in a clear status · 11 Node and headless-Chrome tests. MIT, with EPL-1.0 and Apache-2.0 notices for the compiled bundle.",
    findings:
      "It is a subset, not Clojure: no macros, lazy sequences, destructuring or loop/recur, and map and filter are eager. About 65% of the 70 KiB gzipped bundle is cljs.core. Tested in Chrome only.",
    lessons: "Refuse what you don't support, by name, instead of half-supporting it.",
    stack: "ClojureScript · shadow-cljs",
    github: `${site.github}/paren`,
    live: "https://paren-23l.pages.dev",
  },
  {
    name: "single-track",
    tag: "SYSTEM",
    status: "ACTIVE",
    real: true,
    summary:
      "A timetable puzzle drawn as a Marey diagram: run trains on a single-track line without a collision, across thirteen hand-designed plates.",
    problem:
      "A puzzle's par is only fair if it is the true minimum — and a search that finds a good timetable doesn't prove there is no better one.",
    approach:
      "The rules, schedule and conflict detection are pure Elm functions of one immutable value, so undo and redo are two stacks. Exhaustive custom types (HeadOn | RearEnd | Crowded) kept the rules consistent while they changed. A Node mirror of the rules searches for each plate's par and proves it.",
    validation:
      "159 elm-test · 41 Node and headless-Chrome tests. Par is proven optimal for plates I–VIII: all 15,312,644 timetables with less waiting were tried and none solves its plate. The mirror agrees with the Elm rules on 741 timetables. MIT.",
    findings:
      "Plates IX–XIII have far too many timetables to try (plate IX alone about 6 × 10¹⁰), so their par is labelled heuristic and the stamp says so if you beat it. The proof runs on the mirror, not on the Elm code itself.",
    lessons: "Prove what you can; label the rest as a heuristic.",
    stack: "Elm · SVG",
    github: `${site.github}/single-track`,
    live: "https://single-track.pages.dev",
  },
  {
    name: "sideband",
    tag: "SYSTEM",
    status: "ACTIVE",
    real: true,
    summary:
      "A six-operator FM synth written in freestanding C, compiled to WebAssembly and run in the browser's audio thread. Every sound is a shareable link.",
    problem:
      "Browser audio code must be deterministic, never allocate, and stay safe for the listener's ears, even when fed an extreme patch or a hostile link.",
    approach:
      "C11 with no libc, libm or heap: 8 voices × 6 operators, 8 algorithms, per-sample smoothing of every edit, then a compressor, a −3 dBFS peak limiter and a −1 dBFS hard ceiling. zig cc builds a 14.8 KB module with no imports that runs inside an AudioWorklet; JavaScript only draws the panel.",
    validation:
      "844 C checks, run under UndefinedBehaviorSanitizer and at -O2, including a 600-patch fuzz · 38 JS tests, including 22,000 hostile links. The native and WASM builds produce bit-identical samples. MIT.",
    findings:
      "The voices were tuned by measuring rendered spectra and levels, not by ear; no human has listened yet. There is no oversampling, so BELL still aliases on very high notes. Tested in headless Chrome only, with the audio muted.",
    lessons: "Put the safety limits in the engine, then attack them with hostile input.",
    stack: "C · WebAssembly · AudioWorklet",
    github: `${site.github}/sideband`,
    live: "https://sideband-3ds.pages.dev",
  },
  {
    name: "knot",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "Draw a closed rope in 3D; the app works out which knot you tied and shows the maths, from crossings to the Alexander polynomial.",
    problem:
      "A tangle can't be judged by eye: the same knot shows different crossings from different angles, and an eleven-crossing mess can be the unknot.",
    approach:
      "Pure TypeScript finds the crossings, builds the PD code and Alexander matrix, and takes the determinant by fraction-free Bareiss elimination over BigInt polynomials, so no floating point touches a coefficient. Relaxation provably never passes the rope through itself. three.js only draws.",
    validation:
      "62 unit tests · 18 end-to-end tests. Every table polynomial is recomputed from Knot Atlas PD codes. 0 bad flips in 4,800+ fuzzed crossing flips. MIT.",
    findings:
      "The verdict says 'consistent with', never 'is': the Alexander polynomial can't tell a knot from its mirror image, and larger knots can share a small one's polynomial. Relaxing doesn't always untangle — the polynomial is what shows the eleven-crossing plate is the unknot.",
    lessons: "Compute the exact part exactly, and word the verdict no stronger than the maths.",
    stack: "TypeScript · three.js · WebGL2",
    github: `${site.github}/knot`,
    live: "https://knot-e6b.pages.dev",
  },
  {
    name: "stroke-order",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "Write a kanji with a finger or mouse; ink lands as a brush stroke and the page checks your stroke order and direction, stroke by stroke, across the 80 first-grade kanji.",
    problem:
      "Stroke-order practice needs specific feedback — which stroke comes first, which way it runs — not a right-or-wrong at the end.",
    approach:
      "A Kotlin Multiplatform core with no browser APIs compares each stroke with KanjiVG's reference on position, shape (discrete Fréchet distance) and heading, forwards and backwards; a sealed-class state machine turns that into a verdict and a plain sentence. Kotlin/JS compiles it for the web; the same tests run again on the JVM.",
    validation:
      "155 tests: 75 JVM, 57 JS, 7 data, 16 headless Chrome. A whole-set sweep catches 320/320 skipped-ahead strokes and 367/367 reversed ones, and 1,279/1,280 skips with sloppy writing. MIT code; KanjiVG data under CC BY-SA 3.0.",
    findings:
      "Every accuracy figure comes from simulated strokes; accuracy on real learners' handwriting is unmeasured. Some first strokes are genuinely ambiguous, because nothing is written yet to align to.",
    lessons: "Say where the numbers came from — synthetic strokes are not real handwriting.",
    stack: "Kotlin/JS · Kotlin Multiplatform",
    github: `${site.github}/stroke-order`,
    live: "https://stroke-order-7cn.pages.dev",
  },
];

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
  {
    name: "control-room",
    tag: "TOOLING",
    status: "ACTIVE",
    real: true,
    summary:
      "A five-minute training drill and a real-repository workflow that directs AI coding agents through a visible Scout → Builder → Verifier chain, gated by human approval at every consequential step.",
    problem:
      "AI coding agents are usually given a vague instruction and broad write access, so a bad change can reach the working tree before anyone checks the evidence behind it.",
    approach:
      "Trial Mode rehearses the workflow with no account or repo. Real Mode runs three separate Codex SDK agent roles — a read-only Scout, a Builder confined to an isolated Git worktree, and a read-only Verifier — and requires explicit human approval before evidence, patch, or apply proceeds.",
    validation:
      "22 tests · green CI · MIT. Submitted to OpenAI Build Week 2026, Education track.",
    findings:
      "Splitting investigation, construction, and verification across roles that can't approve their own handoff catches what a single unsupervised agent would have shipped.",
    lessons: "Give the human every consequential gate, not just the final one — isolation without an approval boundary isn't supervision.",
    stack: "React · TypeScript · Cloudflare Workers · Codex SDK",
    github: `${site.github}/openai-build-week-2026`,
  },
  ...languageApps,
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

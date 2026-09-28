// Supply-chain checks on the GitHub Actions workflows. Plain regular
// expressions over the YAML: no parser dependency.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const DIR = fileURLToPath(new URL("../.github/workflows/", import.meta.url));
const workflows = readdirSync(DIR)
  .filter((f) => /\.ya?ml$/.test(f))
  .map((f) => ({ file: f, text: readFileSync(`${DIR}${f}`, "utf8") }));

/** The jobs of a workflow as { name, text }, split at the two-space keys under `jobs:`. */
function jobs(text) {
  const body = text.split(/^jobs:\n/m)[1]?.split(/^(?=[^\s#])/m)[0] ?? "";
  return body
    .split(/^(?= {2}[\w-]+:)/m)
    .filter((chunk) => /^ {2}[\w-]+:/.test(chunk))
    .map((chunk) => ({ name: chunk.match(/^ {2}([\w-]+):/)[1], text: chunk }));
}

const SECRET = /\$\{\{[^}]*\bsecrets\b|secrets:\s*inherit/;

function deployJobs() {
  const deploy = workflows.find((w) => w.file === "deploy.yml");
  assert.ok(deploy, "deploy.yml is missing");
  const all = jobs(deploy.text);
  const build = all.find((j) => j.name === "build");
  const ship = all.find((j) => j.name === "deploy");
  assert.ok(build, "deploy.yml has no build job");
  assert.ok(ship, "deploy.yml has no deploy job");
  return { deploy, all, build, ship };
}

test("there are workflows to check", () => {
  assert.ok(workflows.length >= 2);
});

test("every action is pinned to a full commit SHA, with the version in a comment", () => {
  for (const { file, text } of workflows) {
    const uses = [...text.matchAll(/^\s*-?\s*uses:\s*(\S+)(.*)$/gm)];
    assert.ok(uses.length > 0, `${file} uses no actions`);
    for (const [line, ref, rest] of uses) {
      assert.match(ref, /^[\w.-]+\/[\w.-]+@[0-9a-f]{40}$/, `${file}: not SHA-pinned: ${line.trim()}`);
      assert.match(rest, /#\s*v\d/, `${file}: missing version comment: ${line.trim()}`);
    }
  }
});

test("no workflow uses a trigger that hands secrets to pull requests", () => {
  for (const { file, text } of workflows) {
    assert.doesNotMatch(text, /pull_request_target|workflow_run|issue_comment/, file);
  }
});

test("every workflow declares least-privilege permissions and drops the checkout token", () => {
  for (const { file, text } of workflows) {
    assert.match(text, /^permissions:\n(\s+[\w-]+: (read|write|none)\n)+/m, `${file}: no top-level permissions block`);
    assert.doesNotMatch(text, /write-all|permissions:\s*write/, file);
    const checkouts = text.match(/uses: actions\/checkout@/g) ?? [];
    const dropped = text.match(/persist-credentials: false/g) ?? [];
    assert.equal(dropped.length, checkouts.length, `${file}: every checkout needs persist-credentials: false`);
  }
});

test("the deploy workflow only runs on pushes to main or by hand", () => {
  const deploy = workflows.find((w) => w.file === "deploy.yml");
  assert.ok(deploy);
  const on = deploy.text.match(/^on:\n([\s\S]*?)\n\S/m)?.[1] ?? "";
  assert.match(on, /push:\n\s+branches: \[main\]/);
  assert.doesNotMatch(on, /pull_request/);
});

test("no workflow grants a write scope", () => {
  for (const { file, text } of workflows) {
    assert.doesNotMatch(text, /^\s+[\w-]+: write\s*$/m, file);
  }
});

test("secrets reach only the deploy job of the deploy workflow", () => {
  for (const { file, text } of workflows) {
    assert.doesNotMatch(text.split(/^jobs:\n/m)[0], SECRET, `${file}: secrets outside a job`);
    for (const job of jobs(text)) {
      if (file === "deploy.yml" && job.name === "deploy") continue;
      assert.doesNotMatch(job.text, SECRET, `${file}: job ${job.name} can see a secret`);
    }
  }
  assert.match(deployJobs().ship.text, SECRET, "the deploy job should be the one holding the token");
});

test("the build job is read-only and hands the site over as an artifact", () => {
  const { build } = deployJobs();
  const perms = build.text.match(/^ {4}permissions:\n((?: {6}[\w-]+: \w+\n)+)/m)?.[1];
  assert.ok(perms, "the build job needs its own permissions block");
  for (const [, scope, level] of perms.matchAll(/([\w-]+): (\w+)/g)) {
    assert.match(level, /^(read|none)$/, `build job: ${scope}: ${level}`);
  }
  assert.match(build.text, /uses: actions\/upload-artifact@/);
});

test("the job holding the token runs no project code: no checkout, install, build or cache", () => {
  const { ship } = deployJobs();
  assert.match(ship.text, /^ {4}needs: build$/m);
  assert.match(ship.text, /^ {4}permissions: \{\}$/m, "the deploy job needs no GitHub token scopes");
  assert.match(ship.text, /uses: actions\/download-artifact@/);
  assert.doesNotMatch(ship.text, /run-id:|github-token:/, "download only this run's artifact");
  assert.doesNotMatch(ship.text, /^\s*-?\s*run:/m, "the deploy job must have no run: steps");
  assert.doesNotMatch(ship.text, /actions\/checkout@/, "the deploy job must not check out the repo");
  assert.doesNotMatch(ship.text, /^\s+(cache|preCommands|postCommands|packageManager):/m);
  assert.deepEqual(
    [...ship.text.matchAll(/^\s+command:(.*)$/gm)].map(([, c]) => c.trim().split(" ").slice(0, 3).join(" ")),
    ["pages deploy ./out"],
  );
  assert.match(ship.text, /^\s+wranglerVersion: "\d+\.\d+\.\d+"$/m, "pin the wrangler version the action installs");
});

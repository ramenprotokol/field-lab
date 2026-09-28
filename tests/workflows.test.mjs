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

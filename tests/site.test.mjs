// Checks the static export in out/ (run `npm run build` first). No dependencies:
// node:test plus a few regular expressions over the rendered HTML.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));

function page(route) {
  const file = `${OUT}${route}index.html`;
  assert.ok(existsSync(file), `${file} is missing: run \`npm run build\` first`);
  return readFileSync(file, "utf8");
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attrs, text]) => ({
    attrs: Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v])),
    text: text.replace(/<[^>]+>/g, "").trim(),
  }));
}

/** Proof Wall case files, in page order: name, status and links. */
function cards() {
  return page("proof-wall/")
    .split("<article")
    .slice(1)
    .map((chunk) => {
      const html = chunk.slice(0, chunk.indexOf("</article>"));
      const links = anchors(html);
      return {
        name: html.match(/<span class="mono text-\[13\.5px\] text-fg">([^<]+)<\/span>/)?.[1],
        status: html.match(/>(ACTIVE|PLANNED)</)?.[1],
        live: links.filter((a) => a.text.startsWith("LIVE")),
        github: links.filter((a) => a.text.startsWith("GITHUB")),
      };
    });
}

// Every deployment the wall links to. Keep in step with `live` in src/lib/data.ts.
const LIVE = {
  overprint: "https://overprint-1iy.pages.dev",
  "sky-report": "https://sky-report-9t3.pages.dev",
  "small-print": "https://small-print.pages.dev",
  silt: "https://silt-62k.pages.dev",
  "tide-table": "https://tide-table.pages.dev",
  paren: "https://paren-23l.pages.dev",
  "single-track": "https://single-track.pages.dev",
  sideband: "https://sideband-3ds.pages.dev",
  knot: "https://knot-e6b.pages.dev",
  "stroke-order": "https://stroke-order-7cn.pages.dev",
};

test("the Proof Wall renders every case file with a name and a status", () => {
  const all = cards();
  assert.ok(all.length > 0);
  for (const c of all) {
    assert.ok(c.name, "a card has no name");
    assert.ok(c.status, `${c.name} has no status`);
  }
});

test("LIVE links go to exactly the known deployments", () => {
  const found = Object.fromEntries(
    cards()
      .filter((c) => c.live.length > 0)
      .map((c) => {
        assert.equal(c.live.length, 1, `${c.name} has more than one LIVE link`);
        return [c.name, c.live[0].attrs.href];
      }),
  );
  assert.deepEqual(found, LIVE);
});

test("outbound card links are https, open in a new tab and carry an accessible name", () => {
  for (const c of cards()) {
    for (const a of [...c.live, ...c.github]) {
      assert.match(a.attrs.href, /^https:\/\//, `${c.name}: ${a.attrs.href}`);
      assert.equal(a.attrs.target, "_blank");
      assert.match(a.attrs.rel ?? "", /\bnoopener\b/);
      assert.match(a.attrs["aria-label"] ?? "", new RegExp(`^(Live app|GitHub source): ${c.name} `));
    }
    if (c.status === "PLANNED") assert.equal(c.live.length + c.github.length, 0, `${c.name} is planned but links out`);
  }
});

test("no case file still says a deployed app is undeployed or in demo mode", () => {
  const text = page("proof-wall/").replace(/<[^>]+>/g, " ");
  assert.doesNotMatch(text, /demo mode/i);
  assert.doesNotMatch(text, /\bnot deployed\b|until it is deployed/i);
});

test("sky-report and small-print cards describe what their live sites do now", () => {
  const text = page("proof-wall/").replace(/<[^>]+>/g, " ");
  assert.ok(text.includes("a Cloudflare Pages Function proxies aviationweather.gov"));
  assert.ok(text.includes("a reading is free and the text never leaves the device"));
  assert.ok(text.includes("no AI"));
});

test("PUBLIC_REPOS on the home page equals the shipped repos on the Proof Wall", () => {
  const shown = Number(page("").match(/PUBLIC_REPOS<\/div><div[^>]*>(\d+)<\/div>/)?.[1]);
  const shipped = cards().filter((c) => c.status === "ACTIVE");
  assert.equal(shown, shipped.length);
  assert.equal(shipped.filter((c) => c.github.length === 1).length, shipped.length, "every shipped repo links its source");
});

#!/usr/bin/env node
// Writes a README.md into every skill folder from its SKILL.md, so GitHub shows a summary on the folder page.
// The summary comes from the frontmatter description (the text before "Use for", then the quoted asks), the H1,
// and the adwarp.dev links in Connected mode. Run with --check to fail when a README is missing or stale.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skillsDir = join(root, "skills");
const check = process.argv.includes("--check");
const skills = readdirSync(skillsDir).filter((n) => statSync(join(skillsDir, n)).isDirectory()).sort();

function readme(name) {
  const text = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8");
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/)[1];
  const description = (fm.match(/^description:\s*(.*)$/m) ?? [, ""])[1].replace(/^["']|["']$/g, "");
  const at = description.indexOf("Use for");
  const lead = (at === -1 ? description : description.slice(0, at)).trim();
  const asks = at === -1 ? [] : [...description.slice(at).matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const title = (text.match(/^# (.+)$/m) ?? [, name])[1].trim();

  const connected = (text.split("\n### Connected mode\n")[1] ?? "").split("\n## ")[0];
  const pages = [...new Set([...connected.matchAll(/https:\/\/adwarp\.dev\/[a-z0-9/-]*[a-z0-9]/g)].map((m) => m[0]))]
    .filter((url) => !url.endsWith("/docs/install"));

  const lines = [`# ${title}`, "", lead, ""];
  if (asks.length) lines.push("## Ask it", "", ...asks.map((a) => `- "${a}"`), "");
  lines.push(
    "## Install",
    "",
    "```bash",
    "npx skills add adwarp-dev/paid-ads-skills",
    "```",
    "",
    "Or copy this folder into `~/.claude/skills/` or your agent's skills folder.",
    "",
    "## How it runs",
    "",
    "From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).",
    "",
  );
  if (pages.length) lines.push(`More on adwarp.dev: ${pages.map((u) => `[${u.replace("https://", "")}](${u})`).join(", ")}.`, "");
  lines.push(
    "## Read the skill",
    "",
    `The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/${name}](https://adwarp.dev/docs/skills/${name}).`,
    "",
    `Part of [paid-ads-skills](../../README.md), ${skills.length} skills for LinkedIn Ads and Google Ads.`,
    "",
  );
  return lines.join("\n");
}

const stale = [];
for (const name of skills) {
  const file = join(skillsDir, name, "README.md");
  const want = readme(name);
  const have = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (have === want) continue;
  if (check) stale.push(`skills/${name}/README.md`);
  else writeFileSync(file, want);
}

if (check && stale.length) {
  console.error(`Out of date, run node scripts/build-readmes.mjs:\n- ${stale.join("\n- ")}`);
  process.exit(1);
}
console.log(check ? `${skills.length} skill READMEs are current.` : `Wrote READMEs for ${skills.length} skills.`);

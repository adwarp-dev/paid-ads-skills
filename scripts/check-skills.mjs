#!/usr/bin/env node
// Checks every skill folder against CONTRIBUTING.md: frontmatter, required sections, plugin and README listings,
// and the house rule against em dashes in any Markdown file. Exits 1 with a list of problems, 0 when clean.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skillsDir = join(root, "skills");
const problems = [];
const fail = (msg) => problems.push(msg);

const REQUIRED_SECTIONS = [
  "## When to use it",
  "## What you need",
  "### Export mode",
  "### Connected mode",
  "## Method",
  "## Judgment floors and caveats",
  "## Output",
  "## Safety",
  "## Sources",
];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z_-]+):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return fields;
}

const skills = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((n) => statSync(join(skillsDir, n)).isDirectory())
  : [];

for (const name of skills) {
  const file = join(skillsDir, name, "SKILL.md");
  if (!existsSync(file)) {
    fail(`skills/${name}: missing SKILL.md`);
    continue;
  }
  const text = readFileSync(file, "utf8");
  const fm = frontmatter(text);
  if (!fm) {
    fail(`skills/${name}/SKILL.md: missing frontmatter`);
    continue;
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(`skills/${name}: folder name must be lowercase with hyphens, 64 characters or fewer`);
  if (fm.name !== name) fail(`skills/${name}/SKILL.md: name "${fm.name}" must match the folder`);
  if (!fm.description) fail(`skills/${name}/SKILL.md: missing description`);
  else if (fm.description.length > 1024) fail(`skills/${name}/SKILL.md: description is ${fm.description.length} characters, the limit is 1,024`);
  else if (!fm.description.includes("Use for")) fail(`skills/${name}/SKILL.md: description should list asks after "Use for"`);

  let at = -1;
  for (const section of REQUIRED_SECTIONS) {
    const i = text.indexOf(`\n${section}\n`);
    if (i === -1) fail(`skills/${name}/SKILL.md: missing section "${section}"`);
    else if (i < at) fail(`skills/${name}/SKILL.md: section "${section}" is out of order`);
    else at = i;
  }
  if (!text.includes("https://adwarp.dev")) fail(`skills/${name}/SKILL.md: Connected mode should link to the matching adwarp.dev page`);
  const lines = text.split("\n").length;
  if (lines > 600) fail(`skills/${name}/SKILL.md: ${lines} lines, move long playbooks into references/`);
}

// Every skill is listed in the plugin manifest and the README, and every listing points at a real folder.
const manifest = JSON.parse(readFileSync(join(root, ".claude-plugin", "marketplace.json"), "utf8"));
const listed = new Set(manifest.plugins.flatMap((p) => p.skills ?? []).map((s) => s.replace("./skills/", "")));
const readme = readFileSync(join(root, "README.md"), "utf8");
for (const name of skills) {
  if (!listed.has(name)) fail(`.claude-plugin/marketplace.json: skills/${name} is not listed`);
  if (!readme.includes(`(skills/${name})`)) fail(`README.md: skills/${name} is not in the skill tables`);
}
// Listed but not built yet is a warning, so skills can land in separate pull requests.
const missing = [...listed].filter((name) => !skills.includes(name));
if (missing.length) console.warn(`Listed but not in skills/ yet: ${missing.join(", ")}`);

// No em dashes in any Markdown file.
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules") continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".md")) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (line.includes("—")) fail(`${relative(root, p)}:${i + 1}: em dash`);
      });
    }
  }
}
walk(root);

if (problems.length) {
  console.error(`${problems.length} problem${problems.length === 1 ? "" : "s"}:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`${skills.length} skill${skills.length === 1 ? "" : "s"} checked, no problems.`);

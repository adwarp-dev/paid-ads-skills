# Contributing

Thanks for improving these skills. The bar is a skill a working performance marketer would trust with a real account: specific, sourced, honest about its limits, and ending in actions.

## What every skill needs

1 folder under `skills/`, named in lowercase with hyphens, holding a `SKILL.md` and, when it helps, a `references/` folder. A skill must work when its folder is copied on its own, so it can't point at files outside its folder.

`SKILL.md` starts with frontmatter:

```yaml
---
name: linkedin-ads-audit
description: What it does in 1 or 2 sentences. Works from an export or live through Adwarp. Use for "audit my LinkedIn ads", "is my account set up right".
---
```

- `name` matches the folder, 64 characters or fewer.
- `description` says what the skill does, then lists the phrases people use to ask for it after "Use for". 1,024 characters or fewer.

Then these sections, in this order:

1. `# Title`, then 1 or 2 sentences on the job the skill does.
2. `## When to use it`: the asks it covers, and what it doesn't do (with the skill to use instead, if there is one).
3. `## What you need`: an `### Export mode` subsection naming the exact report to download and the columns used, and a `### Connected mode` subsection naming the Adwarp tools or CLI commands, with a link to the matching adwarp.dev page.
4. `## Method`: numbered steps. Every threshold either cites a source in `## Sources` or is labeled a default the user can change.
5. `## Judgment floors and caveats`: when the data is too thin to call, and what the data can't tell you.
6. `## Output`: the exact report format, in a code block, ending in ranked actions.
7. `## Safety`: what the skill reads, what it can change, and the confirmation it asks for first.
8. `## Sources`: each public source with its URL and the date it was checked.

## The quality bar

Directories like marketingskills.sh score skills on insight, objectivity, actionability and impact. Write for all 4.

- **Insight.** Put in what practitioners learn the hard way. LinkedIn's API still calls an ad set a "campaign" and a campaign a "campaign group". An audience needs 300 members before it serves. Audience expansion is on by default and left out of the forecasted audience size. When a point comes from experience and no public page backs it, say so.
- **Objectivity.** Cite sources and date them. State caveats. Name other tools fairly. The method never sells Adwarp: Adwarp appears only in Connected mode.
- **Actionability.** Every report ends in actions ranked by impact, each with the exact fix.
- **Impact.** Order checks and findings by the money at stake.

## House rules

- Never put real account data in a skill or example. Example data is made up and says so.
- Plain words. No em dashes. Numbers as digits. Write "default" in lowercase, or reword ("14 by default"): adwarp.dev renders every skill, and its site check rejects the word with a capital D.
- Read-only by default. A change happens only after the user confirms the exact change, and only through a tool that creates drafts or paused entities.
- Keep each `SKILL.md` under about 500 lines. Move long playbooks into `references/`.

## Testing

Run the skill on the made-up data in `examples/` in at least 1 agent (Claude Code, Codex or Cursor) and check the report matches the format in `## Output`. Then run the checks:

```bash
node scripts/check-skills.mjs
node scripts/build-readmes.mjs
```

The second command writes the `README.md` in each skill folder from its `SKILL.md`, so GitHub shows a summary on the folder page. Don't edit those READMEs by hand; CI fails when one is out of date.

## Pull requests

1 skill or 1 closely related group per pull request. Say which agents you tested in and paste a short sample of the output.

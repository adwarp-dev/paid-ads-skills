# Agent instructions

This repo holds agent skills for LinkedIn Ads and Google Ads under `skills/`. Each folder has a `SKILL.md` with a `description` that lists the asks it covers.

When a request matches a skill's description, read that skill's `SKILL.md` and follow it from the top: check which data mode applies, follow the method in order, and write the report in the exact format under `## Output`.

- Prefer Connected mode when the Adwarp MCP tools or the `adwarp` CLI are available. Otherwise use Export mode and ask the user for the CSV the skill names.
- Never change an ad account without showing the exact change and getting the user's confirmation first.
- Data under `examples/` is made up. Use it for trying a skill out, never as a benchmark.

When editing this repo, follow [CONTRIBUTING.md](CONTRIBUTING.md) and run `node scripts/check-skills.mjs` before committing.

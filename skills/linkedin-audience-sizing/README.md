# LinkedIn audience sizing

Size LinkedIn targeting before you spend. Walks a narrowing ladder (job function, seniority, then industry, company size and region, job titles only when needed), records the estimated audience after each step, lands the audience in a range for its goal, widens it when it comes out too small, and checks it against the budget. Read-only. Works from Campaign Manager's forecasted results pane or live through Adwarp.

## Ask it

- "how big should this audience be"
- "size this LinkedIn audience"
- "is my audience too small"
- "audience too narrow"
- "narrow my LinkedIn targeting"
- "how many people will this reach"
- "size an ABM audience"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences), [adwarp.dev/linkedin-ads/abm](https://adwarp.dev/linkedin-ads/abm).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-audience-sizing](https://adwarp.dev/docs/skills/linkedin-audience-sizing).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

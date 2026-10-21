# LinkedIn ads pause rules

Rules-based pausing for LinkedIn ads. You approve the rules once (a click-through rate floor after a minimum of impressions, a cap on pauses per run, protected top ads, the last active ad in each ad set, ads that convert at an acceptable cost), the skill builds a dry-run table, and nothing is paused until you confirm the exact list. Works from a Campaign Manager ad performance export or live through Adwarp, and runs weekly.

## Ask it

- "which LinkedIn ads should I pause"
- "pause my losing ads"
- "set up pause rules"
- "weekly LinkedIn ad cleanup"
- "turn off low CTR ads"
- "kill the worst LinkedIn ads"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-ads-pause-rules](https://adwarp.dev/docs/skills/linkedin-ads-pause-rules).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

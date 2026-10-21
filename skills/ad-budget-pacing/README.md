# Ad budget pacing

Daily monthly-pacing check for LinkedIn Ads and Google Ads. Spend to date plus the last 7 days' daily average times the days left, against a monthly cap, per platform and combined. 1 line when on track; a short alert with the daily budget change when projected spend runs over or under the cap. Built for a daily schedule. Works from CSV exports or live through Adwarp.

## Ask it

- "are we on pace this month"
- "budget pacing"
- "will we overspend"
- "projected month-end spend"
- "are we underspending"
- "daily pacing check"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization), [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting), [adwarp.dev/google-ads/reporting](https://adwarp.dev/google-ads/reporting), [adwarp.dev/how-it-works](https://adwarp.dev/how-it-works).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/ad-budget-pacing](https://adwarp.dev/docs/skills/ad-budget-pacing).

Part of [paid-ads-skills](../../README.md), 12 skills for LinkedIn Ads and Google Ads.

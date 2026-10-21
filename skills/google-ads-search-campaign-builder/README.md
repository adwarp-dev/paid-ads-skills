# Google Ads search campaign builder

Turns a product, landing page, location, language and daily budget into a paused Google Ads Search campaign brief. Covers keyword research, tight themed ad groups, a match type plan, starter negatives, responsive search ads checked against Google's limits, and settings. Outputs a human-readable brief and a JSON brief in Adwarp's launch format. Works from a Keyword Planner export, or live with a server-side dry run before anything is created, paused.

## Ask it

- "build a Google search campaign"
- "set up Google Ads for this product"
- "write a search campaign brief"
- "which keywords should I bid on"
- "launch a Google Ads campaign"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/google-ads/search-campaigns](https://adwarp.dev/google-ads/search-campaigns), [adwarp.dev/google-ads/keyword-research](https://adwarp.dev/google-ads/keyword-research), [adwarp.dev/docs/google-ads-setup](https://adwarp.dev/docs/google-ads-setup).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/google-ads-search-campaign-builder](https://adwarp.dev/docs/skills/google-ads-search-campaign-builder).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

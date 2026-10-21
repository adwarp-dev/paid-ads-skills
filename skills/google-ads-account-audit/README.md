# Google Ads account audit

Read-only Google Ads account audit with 50 checks across conversion tracking, auto-tagging, campaign settings, structure, keywords, search terms, negatives, responsive search ads, assets, Performance Max, AI Max, auto-applied recommendations and change history. Each check has a GAQL query, a pass, warn or fail rule and a source, and the report ends in fixes ranked by spend at risk. Works from Google Ads exports or live through GAQL.

## Ask it

- "audit my Google Ads account"
- "Google Ads health check"
- "is my Google Ads set up right"
- "why is my Google Ads CPA high"
- "review my Google Ads account"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/google-ads](https://adwarp.dev/google-ads), [adwarp.dev/google-ads/reporting](https://adwarp.dev/google-ads/reporting), [adwarp.dev/docs/google-ads-setup](https://adwarp.dev/docs/google-ads-setup).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/google-ads-account-audit](https://adwarp.dev/docs/skills/google-ads-account-audit).

Part of [paid-ads-skills](../../README.md), 12 skills for LinkedIn Ads and Google Ads.

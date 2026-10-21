# LinkedIn Ads audit

Scored LinkedIn Ads account audit with 28 checks across tracking, structure and naming, targeting, delivery settings, bidding and budget, creative, and landing pages and UTMs. Each check has a pass, warn or fail rule, a LinkedIn source or a labeled default, and the exact fix, and the report ends in a fix list ranked by spend at risk. Works from Campaign Manager exports or live through Adwarp.

## Ask it

- "audit my LinkedIn ads"
- "is my LinkedIn ads account set up right"
- "LinkedIn ads health check"
- "review my Campaign Manager setup"
- "I inherited a LinkedIn ads account"
- "where is LinkedIn wasting my money"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization), [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences), [adwarp.dev/linkedin-ads](https://adwarp.dev/linkedin-ads).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-ads-audit](https://adwarp.dev/docs/skills/linkedin-ads-audit).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

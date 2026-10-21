# LinkedIn ABM builder

Turns a target account list into 1:1 account-based LinkedIn ad set plans. Each account gets company targeting plus the buying group's job functions and seniorities sized to a range, 3 ads with distinct angles, a fixed flight, a budget and a landing page, and the final list goes to sales as a coverage CSV. Works from a CSV and Campaign Manager's forecast, or live through Adwarp, which can create everything as drafts after you confirm.

## Ask it

- "build 1:1 ads for these accounts"
- "ABM ads for my target accounts"
- "turn this account list into LinkedIn ad sets"
- "account-based LinkedIn campaign"
- "1:1 ad sets for our tier 1 list"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/abm](https://adwarp.dev/linkedin-ads/abm), [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences), [adwarp.dev/integrations/salesforce](https://adwarp.dev/integrations/salesforce), [adwarp.dev/integrations/hubspot](https://adwarp.dev/integrations/hubspot).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-abm-builder](https://adwarp.dev/docs/skills/linkedin-abm-builder).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

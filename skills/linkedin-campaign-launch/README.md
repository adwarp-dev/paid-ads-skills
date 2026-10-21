# LinkedIn campaign launch

Turns a plain-language ask into a LinkedIn campaign built right the first time. Fills a complete brief, estimates the audience before anything is created, applies safe defaults (Audience Expansion and LinkedIn Audience Network off for precise B2B targeting, the account's own standing exclusions, a conversion attached, the ad format chosen at creation because it can't change later), shows the exact plan for your yes, then creates it as LinkedIn drafts. Export mode produces a build sheet to follow in Campaign Manager.

## Ask it

- "launch a LinkedIn campaign"
- "set up a LinkedIn campaign for this"
- "create LinkedIn ads for our guide"
- "build a retargeting ad set"
- "draft a LinkedIn campaign"
- "turn this brief into LinkedIn ads"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/campaigns](https://adwarp.dev/linkedin-ads/campaigns), [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-campaign-launch](https://adwarp.dev/docs/skills/linkedin-campaign-launch).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

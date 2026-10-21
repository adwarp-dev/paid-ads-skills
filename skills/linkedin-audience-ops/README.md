# LinkedIn audience ops

Keeps LinkedIn matched audiences healthy and fed. Inventories every contact list, company list and retargeting audience and flags the ones stuck building, under 300 members, archived, expired or about to expire, stale, failed or unused, checking exclusion lists first. Cleans and dry-runs list uploads (LinkedIn's template columns only, emails hashed, domains turned into website URLs), and runs a confirmed CRM refresh from Salesforce or HubSpot on a schedule. Works from Campaign Manager's Audiences page and a CSV, or live through Adwarp, which uploads only after a dry run and your yes.

## Ask it

- "audit my matched audiences"
- "audience status"
- "why isn't this audience serving"
- "my audience says < 300 members"
- "upload this list to LinkedIn"
- "clean this contact list"
- "refresh the audience from Salesforce"
- "sync a HubSpot list to LinkedIn"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/audiences](https://adwarp.dev/linkedin-ads/audiences), [adwarp.dev/integrations/salesforce](https://adwarp.dev/integrations/salesforce), [adwarp.dev/integrations/hubspot](https://adwarp.dev/integrations/hubspot).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-audience-ops](https://adwarp.dev/docs/skills/linkedin-audience-ops).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

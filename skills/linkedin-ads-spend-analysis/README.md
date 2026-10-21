# LinkedIn Ads spend analysis

Follow the money in a LinkedIn Ads account. Spend by campaign, ad set and ad, how concentrated it is against results, the spend that returned nothing (1 summed figure with the rule behind it), each ad set's pacing against its own budget, and reallocation moves ranked by money, each with the exact budget or status change. Works from Campaign Manager exports or live through Adwarp.

## Ask it

- "where is my LinkedIn budget going"
- "analyze my LinkedIn spend"
- "what are we wasting money on in LinkedIn"
- "LinkedIn spend breakdown"
- "am I overspending on LinkedIn"
- "where should I move LinkedIn budget"
- "which ad sets aren't spending their budget"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/reporting](https://adwarp.dev/linkedin-ads/reporting), [adwarp.dev/linkedin-ads/optimization](https://adwarp.dev/linkedin-ads/optimization).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-ads-spend-analysis](https://adwarp.dev/docs/skills/linkedin-ads-spend-analysis).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

# LinkedIn Ad Library teardown

Reads a company's ads in LinkedIn's public Ad Library and turns them into a strategy read. Themes, offers and calls to action, formats, launch cadence, run length, copy patterns and the gaps you can use, for 1 company or side by side for 2 or 3. Works from ads collected by hand into a CSV or pasted in, or live through Adwarp.

## Ask it

- "what LinkedIn ads is X running"
- "competitor ad teardown"
- "LinkedIn Ad Library research"
- "compare our competitors' LinkedIn ads"
- "what's working for X on LinkedIn"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/linkedin-ads/ad-library](https://adwarp.dev/linkedin-ads/ad-library).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/linkedin-ad-library-teardown](https://adwarp.dev/docs/skills/linkedin-ad-library-teardown).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

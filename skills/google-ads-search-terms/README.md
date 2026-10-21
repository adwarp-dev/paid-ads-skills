# Google Ads search terms

Finds wasted spend and negative keyword candidates in the Google Ads search terms report. Flags terms that spend without converting, irrelevant intent patterns, and words that waste money across many terms (n-gram analysis), then proposes negatives with a match type and a level (campaign, ad group or shared list), checks them against your keywords, and lists converting terms worth adding as keywords. Outputs a Google Ads Editor upload file. Works from a search terms export or live through GAQL.

## Ask it

- "where is my search budget leaking"
- "find negative keywords"
- "search terms report analysis"
- "wasted spend in Google Ads"
- "which search terms should I exclude"

## Install

```bash
npx skills add adwarp-dev/paid-ads-skills
```

Or copy this folder into `~/.claude/skills/` or your agent's skills folder.

## How it runs

From a CSV export with nothing connected, or live through [Adwarp](https://adwarp.dev), the free, open-source MCP server and CLI for LinkedIn Ads and Google Ads. Adwarp setup: [adwarp.dev/docs/install](https://adwarp.dev/docs/install).

More on adwarp.dev: [adwarp.dev/google-ads/reporting](https://adwarp.dev/google-ads/reporting), [adwarp.dev/google-ads](https://adwarp.dev/google-ads), [adwarp.dev/docs/google-ads-setup](https://adwarp.dev/docs/google-ads-setup).

## Read the skill

The full method, thresholds, sources and report format are in [SKILL.md](SKILL.md). Docs: [adwarp.dev/docs/skills/google-ads-search-terms](https://adwarp.dev/docs/skills/google-ads-search-terms).

Part of [paid-ads-skills](../../README.md), 17 skills for LinkedIn Ads and Google Ads.

# Angle coding

How to tag each ad's hook, offer and format so the angle read in Method step 9 is repeatable, plus the head-to-head rules in full and a small worked example. The categories are a working vocabulary, not a LinkedIn standard; rename them to fit your account, and keep the same names from run to run.

## The 3 tags

**Hook: what the ad leads with.** Read the first line of the introduction text and the headline on the image or video. Pick the 1 that carries the ad.

| Hook | The ad leads with | Example line (made up) |
| --- | --- | --- |
| Pain | A problem the reader has | "Your month-end close takes 10 days" |
| Proof | Evidence: a customer, a number, a quote, a logo wall | "400 data teams surveyed" |
| Outcome | The result after buying, without proof | "Close the books in 3 days" |
| Demo | The product itself: a tour, a screen, a feature | "60-second product tour" |
| Question | A question to the reader | "Still closing in Excel?" |
| Comparison | You against a named or implied alternative | "Versus legacy BI" |
| Offer | The thing they get, first | "Free 2026 analytics benchmark" |
| Educational | Teaching, with no product pitch | "5 metric mistakes" |
| Timely | News, a deadline, an event | "Before your renewal date" |

When 2 hooks compete (a question that states a pain), tag the 1 in the first 5 words.

**Offer: what the ad asks for.** Read the call to action and the destination.

| Offer | The ask |
| --- | --- |
| Demo | Book a demo or a call with sales |
| Trial | Start a free trial or a free plan |
| Guide | Download a report, guide, checklist or template |
| Event | Register for a webinar or event |
| Tool | Use a calculator, assessment or audit |
| Content | Read a post; no ask |
| Switch | A migration or switching offer aimed at a competitor's users |

**Format: how the ad is built.** Take it from the Ad Format column: single image, video, document, carousel, text, conversation, message, and so on.

## Where the tags come from

1. **Ad names**, when the account follows a pattern. A pattern that makes this skill work with no extra step: `<audience> | <hook>: <the specific line> | <offer> | <format>`, for example `Ops | Proof: 31% faster month-end | Demo | Image`.
2. **Copy columns** in the export (headline, introduction text, call to action), when present.
3. **The ads themselves**, when names are opaque: ask the user to paste the copy or a screenshot of each ad, then fill the sheet below.

Without tags, say the report is per ad only and suggest the naming pattern for the next batch.

Tagging sheet, kept next to the report so anyone can recheck it:

```csv
Ad ID,Ad Name,Hook,Offer,Format,Tagged by,Note
771002,Ops | Proof: 31% faster month-end | Demo | Image,Proof,Demo,Single image,name,
```

## Head-to-head rules in full

1. Eligible ad sets: objective Lead generation or Website conversions, 2 or more ads with 1,000 impressions or more, 5 results or more across those ads, and not an ad set problem (0 results across all ads).
2. For 1 dimension at a time (hook, offer, format), list the values present in the ad set. Skip the dimension when every ad shares 1 value.
3. For each value: angle cost per result = its ads' spend / its ads' results; rest cost per result = the other eligible ads' spend / their results.
4. Result for that ad set:
   - Win: angle cost per result at most 0.8 x the rest's. Loss: at least 1.25 x. Tie: between.
   - Angle with 0 results: loss if its spend is at least the rest's cost per result, else unknown.
   - Rest with 0 results: win if the rest's spend is at least the angle's cost per result, else unknown.
5. Across ad sets:
   - Converts: 2 wins or more, 0 losses, 5 results or more in total.
   - Doesn't convert: 2 losses or more, 0 wins.
   - Mixed: at least 1 win and 1 loss. Say where each came from; a split by objective (wins in Lead Gen Form ad sets, losses in website conversion ad sets) is a finding in itself.
   - Not enough evidence: everything else. Name what would settle it, usually running the angle next to another in a second ad set.
6. Paused ads that ran in the window count: they spent money on the angle.
7. View-led ads (more than 50% of their conversions view-through) still count, but say so on any call that rests on them.

The 0.8 and 1.25 lines are defaults and symmetric (1 / 0.8 = 1.25), so an angle can't win and its rival lose by different standards.

## Worked example (made up)

1 Lead generation ad set, 3 ads:

| Ad | Hook | Format | Spend | Leads |
| --- | --- | --- | --- | --- |
| 1 | Offer | Document | 1,300 | 24 |
| 2 | Proof | Single image | 950 | 13 |
| 3 | Pain | Single image | 700 | 4 |

- Hook Offer: $54 per lead against the rest's (950 + 700) / 17 = $97. 0.56 times, a win.
- Hook Proof: $73 against (1,300 + 700) / 28 = $71. 1.03 times, a tie.
- Hook Pain: $175 against 2,250 / 37 = $61. 2.9 times, a loss.
- Format Document: $54 against $97, a win; Single image: $97 against $54, a loss.

1 ad set is 1 vote. An angle becomes Converts or Doesn't convert only when a second ad set agrees.

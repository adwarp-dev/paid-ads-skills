# The arithmetic behind a test read

Plain formulas for the checks in Method steps 2, 7 and 8. Everything here is standard statistics; none of it is a benchmark.

## Rates: two-proportion z-test

Use it for CTR (clicks out of impressions) and conversion rate (conversions out of clicks).

```text
before: x1 successes out of n1      after: x2 successes out of n2
p1 = x1 / n1        p2 = x2 / n2        p = (x1 + x2) / (n1 + n2)
z  = (p2 - p1) / sqrt( p * (1 - p) * (1/n1 + 1/n2) )
```

|z| of 1.96 or more means a difference that large would show up by chance less than 5% of the time (95% confidence, two-sided).

## Rates: 95% interval for the change

```text
SE        = sqrt( p1 * (1 - p1) / n1  +  p2 * (1 - p2) / n2 )
absolute  = (p2 - p1) - 1.96 * SE   to   (p2 - p1) + 1.96 * SE
relative  = absolute / p1            (an approximation, fine for a read)
```

How to use it:

- 0 outside the interval: the move is real (same answer as |z| of 1.96 or more).
- The expected effect outside the interval: the test rules it out. If the test was supposed to lift the rate 20% and the interval tops out at +12%, it didn't work.
- Both 0 and the expected effect inside: inconclusive; the windows are too small to tell.

Worked example, conversion rate: before 120 conversions from 2,400 clicks (5.00%), after 106 from 2,400 (4.42%).

```text
p = 226 / 4,800 = 0.0471
z = (0.0442 - 0.0500) / sqrt(0.0471 * 0.9529 * (2 / 2,400)) = -0.95
SE = sqrt(0.05 * 0.95 / 2,400 + 0.0442 * 0.9558 / 2,400) = 0.0061
absolute interval = -0.0058 +/- 0.0120 = -0.0178 to +0.0062
relative interval = -35.6% to +12.3%
```

The drop alone is not significant (z = -0.95), but the interval excludes +20%, so a test that expected +20% didn't work.

A caveat for CTR: impressions aren't independent trials (1 person sees an ad many times), so the test overstates certainty somewhat. A z just over 1.96 on CTR is weaker evidence than it looks; the placebo check is the backstop.

## Costs: the placebo swing

CPC, CPM and cost per conversion have no simple test. Compare the move with how much the metric moves when nothing changed:

```text
placebo swing = before window / placebo window - 1     (same metric, same entity)
```

The test's change counts only if it is bigger than the placebo swing and at least 10% (default). With 12 or more weeks of history, a sturdier noise level is the median absolute swing across every pair of back-to-back N-day windows.

For cost per conversion, also run the z-test on conversion rate, because:

```text
cost per conversion = CPC / conversion rate
```

Say which side moved. A cost per conversion that fell because CPC fell (a better CTR on LinkedIn, a cheaper auction on Google) is a different finding from one that fell because more clicks converted.

## Net lift against a control

```text
net lift = (test after / test before) / (control after / control before) - 1
```

Example: test cost per conversion -21.8%, control +4.6%: (0.782 / 1.046) - 1 = -25.2%.

## How much volume a test needs

Per window, to detect a relative change d in a rate p, at 95% confidence with an 80% chance of seeing an effect that is really there:

```text
n = 2 * (1.96 + 0.84)^2 * (1 - p) / (p * d^2)  =  15.68 * (1 - p) / (p * d^2)
```

n is impressions for CTR and clicks for conversion rate. These rows show the arithmetic only; none is a benchmark:

| Rate p | Effect d | n per window |
| --- | --- | --- |
| CTR 0.5% | 20% | about 78,000 impressions |
| CTR 0.4% | 30% | about 43,400 impressions |
| Conversion rate 5% | 20% | about 7,450 clicks |
| Conversion rate 3% | 15% | about 22,500 clicks |

If 1 window can't reach n, lengthen the window, test a bolder change (a bigger d), pick a higher-volume metric, or run the test on a larger entity. A result that misses n can still rule an effect out (see the interval rules above); it just can't confirm a small one.

## When floors aren't met

```text
days needed = window days * floor / count so far, rounded up to a multiple of 7
```

Example: 6 conversions in a 14-day after window against a floor of 10: 14 * 10 / 6 = 23.3, so 28-day windows. The before and placebo windows grow to 28 days too, and the read date moves to the change date + 28 + the lag buffer.

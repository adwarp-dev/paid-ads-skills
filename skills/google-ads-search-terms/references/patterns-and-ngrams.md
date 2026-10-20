# Intent patterns, n-grams and the negative match test

## Intent patterns

Match whole words, case-insensitive, after lowercasing and replacing punctuation with spaces. These lists are defaults built for business software and services; remove any word that describes something the business sells, and add the wrong meanings of the business's own words.

| Pattern | Words and phrases | Usual negative | Level |
| --- | --- | --- | --- |
| Jobs | job, jobs, career, careers, hiring, salary, salaries, internship, resume, vacancy, vacancies, apply, remote job | Broad, 1 per word | Shared list |
| Education | course, courses, class, classes, certification, certificate, training, tutorial, degree, exam | Broad | Shared list (keep "training" if you sell it) |
| Free and do it yourself | free, template, templates, excel, spreadsheet, pdf, printable, diy, open source | Broad | Shared list (ask first about "free") |
| Research | definition, meaning, what is, examples, wiki, reddit | Broad, or phrase for "what is" | Shared list |
| Other brands' users | login, log in, sign in, app download, customer service, phone number, support | Broad, or phrase for 2-word items | Campaign (keep your own brand's support terms out of non-brand campaigns only) |
| Competitors | names the user gives | Broad | Campaign or shared list, user's call |
| Wrong meaning | built per business, for example airline, flight, cabin, film for "crew scheduling"; 911, police, truck, trucking for "dispatch software" | Broad | The campaign whose keywords attract it; the shared list once it shows up in 2 or more campaigns |

Rules:

- A pattern match is a candidate at any cost. The intent is wrong even when the spend is small.
- Words with 2 meanings ("training", "free", "support") need the user's answer. List them under "Ask before adding".
- Negatives don't match close variants or plurals, so "truck" doesn't block "trucking" (Google Ads Help, About negative keywords, https://support.google.com/google-ads/answer/2453972). Add each form you see.

## N-gram procedure

1. Normalize each term: lowercase, replace punctuation with spaces, collapse spaces.
2. For each term, list its 1-word, 2-word and 3-word sequences. Count each sequence once per term.
3. Add up per sequence: cost, clicks, conversions, and the number of distinct terms it appears in.
4. Drop sequences made only of stop words (a, an, the, for, to, of, in, on, and, or, with, near, me, best, top, vs).
5. Candidate when (defaults): 0 conversions, cost of at least 1 x target CPA, and 3 or more distinct terms.
6. Prefer the shortest sequence that captures the waste. If "airline" and "airline crew" have the same terms and cost, keep "airline".
7. Test every candidate with the match test below. A sequence inside any of your keywords can never be a negative in that keyword's scope.
8. Also report sequences that convert at a CPA above 2 x target with 5 or more terms (default). Those need bid or ad changes, not negatives.

Why n-grams matter: a word like "jobs" can cost little in each of 30 terms and never cross a per-term threshold, while costing more than any single term in total.

## Negative match test

Use this to decide whether a negative blocks a text (a search term, or a keyword's own text in the conflict check). Words are compared after normalizing as above. Negatives don't match close variants, so compare words exactly.

```text
blocks(negative, text):
  n = words(negative.text); t = words(text)
  BROAD:  every word in n appears somewhere in t, any order
  PHRASE: n appears in t as a contiguous sequence, same order
  EXACT:  n equals t, same words, same order, nothing added
```

Google adds 2 limits: a negative that falls after the 16th word of a long search doesn't block it, and only 3 symbols work in negatives: &, accent marks and * (About negative keywords). Neither changes the outcome for ordinary terms.

Conflict check: for each candidate negative and each enabled positive keyword in its scope, if `blocks(candidate, keyword.text)` is true, the candidate would switch that keyword off for its own text. Drop the candidate and cover the waste with narrower negatives (a phrase that includes the bad word plus context, or exact negatives for the specific terms).

Savings estimate: for each kept negative, sum the cost of the terms in its scope that it blocks. When 2 negatives block the same term, count the term once, under the negative that blocks the most cost.

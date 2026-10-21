# List cleaning in detail

Facts here come from the LinkedIn pages listed in the skill's Sources, checked 2026-10-20. The alias lists, the free mail list and the report layout are defaults you can extend.

## LinkedIn's template headers

Read from LinkedIn's own CSV templates on 2026-10-20. Download a fresh copy from Campaign Manager (Create audience > Matched Audience > Company / Contact, under "Upload a list") before a big upload, in case the format changed.

| List | Headers, in order |
| --- | --- |
| Contact | `email`, `firstname`, `lastname`, `jobtitle`, `employeecompany`, `country`, `googleaid` |
| Company | `companyname`, `companywebsite`, `companyemaildomain`, `linkedincompanypageurl`, `stocksymbol`, `industry`, `city`, `state`, `companycountry`, `zipcode` |

A contact row needs an email, or a first and last name (a mobile advertising ID also works). A company row needs at least 1 of company name, website, email domain, Page URL or stock symbol. Leave the other cells blank.

## Column aliases

Normalize each source header first: lowercase, then remove everything that isn't a letter or digit ("E-mail Address" becomes `emailaddress`). Then map:

| Template header | Source headers that map to it |
| --- | --- |
| `email` | email, emailaddress, workemail, businessemail, primaryemail, mail, useremail |
| `firstname` | firstname, first, givenname, fname |
| `lastname` | lastname, last, surname, familyname, lname |
| `jobtitle` | jobtitle, title, position, role |
| `employeecompany` | company, companyname, account, accountname, organization, employer |
| `country` (contact) or `companycountry` (company) | country, countrycode, mailingcountry, billingcountry, hqcountry |
| `companyname` | companyname, company, account, accountname, organization, name |
| `companywebsite` | website, companywebsite, websiteurl, url, domain, companydomain, homepage |
| `companyemaildomain` | emaildomain, companyemaildomain, or derived from contact emails (below) |
| `linkedincompanypageurl` | linkedin, linkedinurl, linkedincompanyurl, linkedinpage, companylinkedinurl |
| `industry`, `city`, `state`, `zipcode` | the same words, plus billingstate, billingcity, postalcode, zip |

Drop every other column: phone, owner, lead status, stage, amount, notes, created date, IDs. They don't help matching and shouldn't leave your machine.

When a header could map to 2 fields (such as `company` in a contact list), use the list type: in a contact list it's `employeecompany`, in a company list it's `companyname`.

## Cleaning rules

### Contacts

1. Email: trim, lowercase, remove all whitespace inside, require exactly 1 "@" and at least 1 dot after it. Drop rows that fail, unless they have a first and last name.
2. Drop duplicate emails, keeping the first row.
3. Names, title and company: trim and collapse double spaces. Keep the case. LinkedIn's API caps first and last name at 35 characters, title at 100 and company at 50, so trim longer values.
4. Country: LinkedIn's API takes ISO 2-letter codes such as `US`. Convert full names where you can.
5. Keep personal email addresses. LinkedIn matches personal or professional emails.

### Companies

1. Website: lowercase; strip `http://`, `https://` and `www.`; cut at the first `/`, `?` or `#`; remove a port such as `:8080`; require a dot. Write `https://<domain>`.
2. Page URL: accept `linkedin.com/company/<slug>`, `www.linkedin.com/company/<slug>/` or a bare `company/<slug>`, and write `https://www.linkedin.com/company/<slug>`. Flag a slug that is only digits, since LinkedIn asks for the URL that ends in the company name.
3. Email domain from contacts: take the part after "@", lowercased. Skip free mail domains. A starting list (default): gmail.com, googlemail.com, outlook.com, hotmail.com, live.com, msn.com, yahoo.com, icloud.com, me.com, aol.com, proton.me, protonmail.com, gmx.com, mail.com, yandex.com, zoho.com.
4. Dedupe: same Page URL, then same website, then same email domain. Keep the row with the most identifiers.
5. Flag rows with a name and nothing else. They match worst.

## Hashing

LinkedIn's rule: lowercase, remove whitespace, then SHA-256 (hex). Only the `email` column takes hashes. Campaign Manager hashes plaintext emails in your browser before saving, so hash yourself only when plaintext must not leave your machine at all.

```bash
# 1 address, for a spot check
printf '%s' 'ana.ruiz@example.com' | shasum -a 256 | cut -d' ' -f1
```

```python
import hashlib
def hash_email(raw: str) -> str:
    cleaned = "".join(raw.split()).lower()
    return hashlib.sha256(cleaned.encode("utf-8")).hexdigest()
```

Hash after deduping, and never hash a blank cell. A hash of an empty string matches nobody and still counts as a row.

## Dry run report

```text
Upload dry run: <file>
List type: contact | Rows in: <n> | Kept: <n> | Dropped: <n>
  Dropped, no usable email or name: <n>
  Dropped, duplicate email: <n>
Columns kept: email, firstname, lastname, jobtitle, employeecompany, country
Columns dropped: <source headers>
Size checks:
  Rows: <n> (upload needs 300 or more, at most 300,000 or 20 MB)
  Emails: <n> (LinkedIn recommends 10,000 or more to reach 300 matched)
Sample (first 5 kept rows, emails masked as a***@domain):
  | email | firstname | lastname | jobtitle | employeecompany | country |
Upload <n> rows as a contact list named "<name>" to ad account <id>? Reply yes to upload.
```

Mask emails as the first character, `***`, then `@domain`. Never print a full address or a full hash next to a name in a report.

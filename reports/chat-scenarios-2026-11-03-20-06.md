# Chat scenarios — 2026-11-03T20:06:00.227Z
Planned requests: ~7 of a daily budget of 900. A second try adds one. --service: a regeneration adds one more per turn (up to 14). 20 s between requests.

## Broker (model: openai/gpt-oss-120b · reasoning_effort medium)

### S10 — booked then carrier cancels
Green Bay, WI → Columbia, SC · dry-van · 963 mi · $3120 ($3.24/mi)
Broker: Thomas Beckley at Northgate Cargo Solutions (A) · pickup tomorrow
Market: out of Upper Midwest (no regional figure) · reload out of Carolinas $2.18 · national $2.17
Broker's terms: Detention: $65/hr after 2 hours free, at pickup or delivery. TONU: $250 if the load is cancelled after the truck is dispatched. Layover: $225 per day if the truck has to wait overnight. Lumper: paid by the broker against a receipt.

- **D:** `hey this is Aziz with Keystone Line Haul, calling about your Green Bay-Columbia load, still available?`
Run stopped: Provider request failed after 4 request(s); current scenario stopped. 4 — #1 openai/gpt-oss-120b network 33ms → #2 openai/gpt-oss-120b backoff network 10ms → #3 openai/gpt-oss-120b backoff network 6ms → #4 openai/gpt-oss-120b backoff network 5ms · tokens not reported
_Aborted run: completed turns only._
## Checks

No check flagged anything.
A check is a pattern: read the flagged line before calling it a failure.

---
Requests sent: 4

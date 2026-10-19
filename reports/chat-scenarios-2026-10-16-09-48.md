# Chat scenarios — 2026-10-16T09:48:25.737Z
Planned requests: ~7 of a daily budget of 900. A second try adds one. 20 s between requests.

## Grace (model: openai/gpt-oss-120b)

Database: parked in Seattle, WA · now in Seattle, WA · resting · load: none

### G1 — casual hello
No load in the prompt.

- **D:** `Grace hey bro how r u doin?`
- **G:** Copy that.
- **D:** `got a load for u in a min`
- **G:** What's the pickup, miles, and ETA?

### G2 — trade words
No load in the prompt.

- **D:** `Grace whats ur eta, any detention at the shipper?`
- **G:** No load right now, so no ETA. No detention.
- **D:** `Grace where u at`
- **G:** Seattle, bunk on my ten.

### G3 — the New York load (once, not again)
Load in the prompt: Nashville, TN → New York, NY (HYPOTHETICAL — not in the database)

- **D:** `Grace ur on the NYC load`
- **G:** I’m on the NYC run – I asked not to take it, no room to turn and nowhere legal to park.
- **D:** `Grace whats ur fuel at`
- **G:** About 32% left.
- **D:** `Grace got a dallas load next`
- **G:** Where does it pick up, miles and when.

## Checks

No check flagged anything.
Nothing flagged in: G1, G2, G3.
A check is a pattern: read the flagged line before calling it a failure.

---
Requests sent: 7

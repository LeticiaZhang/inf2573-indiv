---
week: 2
audience: students
status: draft
---

# Context engineering — one-pager

**The idea in one line:** what you put in the model's window *is* the design decision.
A prompt steers a chat; **context steers the product.**

## The window has three layers

| Layer | What it is | How long it lasts |
| :-- | :-- | :-- |
| **Project instructions** | your strategy, pinned | **persists in every chat** |
| The conversation | everything said so far | scrolls away |
| Tonight's request | what most people call "the prompt" | one turn |

Most people only ever touch the bottom layer. Your strategy belongs in the top one.

## Set it up once (~5 minutes)

1. Create one **Project** for your team's product (Claude → Projects → New).
2. Paste into the **project instructions**, verbatim from your Strategy Brief:
   - your **positioning statement** (for whom, against what)
   - your **North Star** — "our North Star is called X, which we define as Y" — and its inputs
3. Every chat inside the project now carries your strategy. Done.

*Using Codex or another tool? Same idea, different shelf — look for "custom instructions" or the
system prompt. Ask us if you can't find it.*

## A starting template

```
You are building <product> for <who it's for>, competing with <what it replaces>.
Positioning: <your one-sentence positioning statement>.
Our North Star is <name>, defined as <definition>.
It is a function of: <input A>, <input B>, <input C>.
Always design and write toward these. When a request conflicts with them, say so.
```

## Do / don't

- **Do** keep it under a page — strategy, not essays. If everything is context, nothing is.
- **Do** update it when your strategy changes (it will — that's Week 3).
- **Don't** re-type your strategy into every prompt. If you're doing that, fix the instructions.
- **Don't** paste in feature lists or hedge language — the model amplifies whatever you pin.

**The test:** run your core flow before and after. If the output doesn't sound like *your*
product yet, tune the instructions — not the prompt.

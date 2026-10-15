---
week: 7
audience: students
status: draft
derives_from:
  - syllabus/master-syllabus.md §6 Week 7, §7
  - syllabus/student-syllabus.md Week 7
  - syllabus/assessment.md (Group Project, Participation)
open_questions:
  - "Dev plan: master lists it as part of the Week 7 deliverable; lecture.md and teaching-track-spec say 'no submission — the demo is the deliverable'. This handout says present it + keep it for the dossier. Confirm whether a written copy is also due Oct 22."
---

# Midpoint pitch: what's expected

**Thursday, October 22 · 5:00–8:00 PM · UTSU Student Commons, 230 College Street, 4th floor — Room SU 444 · every team presents.** This is the course's real checkpoint
before Reading Week. You'll **pitch your product** the way you'd pitch it to someone deciding whether
it deserves to exist: what it is, what need it serves, why it's needed, and how you'll know it's
working. Then you'll show it **running**. Tonight is for getting feedback while there's still time to
act on it, so the discussion after each pitch matters as much as the pitch itself.

## How the night runs

| Time | What happens |
| :-- | :-- |
| 5:00–5:15 | Opening: running order drawn, a short word on pitching in-progress work honestly |
| 5:15–6:15 | **Teams 1–3**: 20 minutes each |
| 6:15–6:30 | Break |
| 6:30–7:30 | **Teams 4–6**: 20 minutes each |
| 7:30–7:45 | Whole-room discussion: what we're seeing across all six projects |
| 7:45–8:00 | Teams triage their feedback and draft the Weeks 8–11 plan |

**Each team's 20 minutes: a 10-minute pitch, then 10 minutes of discussion and critique.** The clock
is strict. At 10 minutes the pitch stops, finished or not, so that every team gets its full
discussion time. Be ready to go first.

**Reading:** *none new.* Re-read your Week 4 control-boundary diagram against what you actually
built. **Recommended:** Bainbridge, "Ironies of Automation" (1983).

## The pitch (10 minutes)

Structure it as a product pitch, with six elements in this order:

| ~min | Element | Draw on |
| :-- | :-- | :-- |
| 1 | **1. The product** | Week 2 Product Strategy Brief |
| 2 | **2. The need** | Week 3 opportunity solution tree |
| 1 | **3. The value: why it's needed** | Week 2 positioning |
| 3 | **4. The live demo** | Week 4 system/control map · Week 6 vertical slice |
| 1.5 | **5. How you measure it** | Week 2 North Star · Week 5 spikes + testing round |
| 1.5 | **6. Risk, ask, next** | Week 5 prioritized bets |

The minutes are a guide. All six elements are required.

### 1. The product (~1 min)

**What it is, who it's for, and what it does for them**, said plainly enough that someone who missed
the first six weeks could repeat it back.

- Name a specific person or role, like "first-year grad students reading outside their field." Avoid
  catch-alls like "students" or "everyone."
- Say what the product *does* for that person, not what technology it uses. "It uses an LLM" doesn't
  describe a product.
- Keep it to one or two sentences. If it takes a paragraph, the product isn't clear to you yet, and
  the room will notice.

**Trap:** opening with the tech stack or a feature tour. Features come in the demo.

### 2. The need (~2 min)

**What problem or need the product serves, and your evidence that the need is real.** This is the
foundation of the pitch; everything after it depends on the room believing it.

- Describe the need from your user's side: what they're trying to do, what gets in the way, and what
  it costs them (time, money, errors, stress).
- Bring evidence: what you heard in interviews, saw in observation, or learned from your Week 5
  testing. A real quote or a specific moment beats a general claim.
- Show where the need sits on your opportunity solution tree, and say whether it has shifted since
  Week 3. A need that sharpened or moved is a sign of learning, not a problem.

**Trap:** describing a need you've assumed rather than one you've heard. "People struggle with X"
needs a "we know because…"

### 3. The value: why it's needed (~1 min)

**Why this product, for this need, now.** Element 2 establishes that the problem exists. This one
argues that your product is a better answer than what people do today.

- Name the **current alternative**. That might be a competitor, but it might be a workaround, a
  spreadsheet, asking a friend, or doing nothing. There's always one.
- Say what's better about your product than that alternative, and for whom. That's your positioning
  from the Week 2 Brief. Update it if the build has taught you something.
- Explain why AI earns its place here. What can the product do with AI that it couldn't without?

**Trap:** "it's faster / easier / smarter" with no comparison point. Better than *what*?

### 4. The live demo (~3 min)

**Your Week 6 vertical slice, running, with your system/control map beside it.** One real end-to-end
path through the product, with an actual AI component in it. Screenshots and slides don't count as
the demo.

- Walk through **one path a real user would take**, from start to finish. Don't try to show
  everything.
- Keep the **control map on screen alongside the build**. As you go, point to where a human
  **decides**, where the AI **proposes** and a human approves, and where the AI **executes** with
  oversight and an undo.
- Show what happens **when the AI is wrong or unsure**. What does the user see, and what can they do
  about it?
- Where the build has drifted from your Week 4 map, say so. That drift is useful information.

**Trap:** a flawless-looking demo that hides the human's role. The room wants to see where the
human sits in the loop.

### 5. How you measure it (~1.5 min)

**Your North Star metric, and any other measurements you have so far.** This is where you show how
you'll know whether the product is working.

- State your **North Star**: the one metric that best captures the value users get from the product
  (from your Week 2 Brief). Say *why* it's the right measure, and how it ties back to the need in
  element 2.
- Bring **other measurements you have**: your analytics key event, testing-round feedback-form
  results, spike and pretotype results, anything you've actually counted. Show real numbers, even
  small ones.
- Where you don't have data yet, **show how you'll get it**: what you'll instrument, and what result
  would tell you you're wrong.
- Report results that went against you. They're the most useful thing you can share.

**Trap:** vanity metrics (sign-ups, page views, time on site) presented as success. Ask whether the
number would still go up if the product were failing its users.

### 6. Risk, ask, next (~1.5 min)

**What could sink this, what you need from the room, and what you'll do next.** This element turns
the pitch into a working session.

- **Biggest risk:** the one thing most likely to sink the project or hurt a user, named out loud. It
  might be technical (the model is unreliable), human (users over-trust it), or strategic (the need
  isn't big enough). One risk, stated plainly, beats a list.
- **The seams:** what's hard-coded, faked, stubbed, or still broken. Say it before the room finds it.
- **Your ask:** the one question you most want the room's help with. Better questions get better
  critique, and the discussion starts from here.
- **Next:** your top priorities for Weeks 8–11, in order, and your first commitment after Reading
  Week.

**Trap:** a vague "we need to polish the UI." Name what you're actually worried about.

### Pitch it honestly

A pitch is persuasive, but this one is **not a sales job**. The room will be more convinced by a team
that shows its seams (what's hard-coded, faked, or still broken) than by one that hides them. The
same goes for numbers: a small, honest measurement beats a big vanity one. Reporting that a result
went against you is a strength here, not a weakness.

> **Framing question:** *has your build quietly pushed a hard judgment onto the human at the worst
> moment?* Expect to be asked this about your own product.

## The discussion (10 minutes)

The critique follows the same protocol as every week, with your running build on screen:

- **Intent**: you tell us what you were trying to make happen.
- **Describe**: the room says what it actually sees.
- **Question**: we critique the work, never the person.
- **Next**: you tell us what you'll try.

Expect questions about all of it: whether the need is real, whether the value is clear, whether your
North Star actually measures success, and where the human sits in the loop.

**Assign a note-taker before you present.** The midpoint is a *logged* checkpoint, so capture what the
room said, word for word where you can. Listen rather than defend; you'll triage the feedback afterward.

**When you're not presenting, you're the critics.** Come with questions for the other five teams.

## After the pitches

In the last 15 minutes, **triage your feedback**: for each point, decide whether to act on it, park
it, or reject it, and give a reason. Then **plan the post-break sprint**. Keep the critique log and
the dev plan with your project artifacts. Both go into your final dossier as "checkpoint feedback,
integrated."

## Before Thursday

- [ ] Pitch rehearsed with a timer, **under 10 minutes**
- [ ] Need, value, and North Star each sayable in one sentence
- [ ] Your measurements pulled together, including any that disappoint
- [ ] Slice runs end-to-end **on the machine you'll present from**, on the room's network
- [ ] Control map open in a tab, ready to show alongside the build
- [ ] Decided who drives the build, who talks, and who takes notes
- [ ] Biggest risk and open question written down, so nobody improvises them
- [ ] Top priorities for Weeks 8–11 drafted

## How it counts

The midpoint pitch **doesn't get a grade of its own**. It counts in two places:

- **Group Project (40%)**, scored at the final demo. The pitch beats map directly onto its rubric:
  the need and value are *Framing*, your measurements are *North-star metric* and *Validation*, and
  the control map is *Scope*. The feedback you integrate (or reject, with reasons) after tonight is
  the line of learning that *Build & iteration* rewards.
- **Participation (20%).** *Critique given* and *critique taken* are both assessed, so the time you
  spend critiquing other teams counts too.

Polish isn't on the rubric. An honest pitch backed by evidence will score better over the term than a
slick one that learned nothing.

### Reminder: the Group Project rubric

This is the rubric your project is assessed on at the final demo, reproduced unchanged from the
course assessment document. Use it to prepare tonight: the pitch is a chance to see where you stand
against it halfway through, while there's still time to close the gaps.

| Criterion (weight) | Exemplary | Proficient | Developing | Inadequate |
|---|---|---|---|---|
| **Framing (15%)**: hypothesis + strategic bet | Sharp, non-obvious hypothesis framed as a real bet about desirability / feasibility / agency; clearly *not* a solution hunting for a problem | Clear hypothesis and a defensible bet; framing mostly problem-led | Framing present but tech-led or vague; the "bet" is implicit | Solution in search of a problem; no testable hypothesis |
| **Scope (10%)**: human/AI boundaries + right-sizing | Human vs. AI boundaries drawn deliberately and defended; scope ambitious yet achievable | Boundaries defined; scope reasonable | Boundaries fuzzy; scope too big or too small | No boundary reasoning; scope unworkable |
| **Build & iteration (20%)**: each iteration built on prior learning | Clear through-line: every iteration, pivots included, visibly carries learning from the last | Iterations build on each other; line of learning mostly legible | Some iteration but weakly connected; changes look arbitrary | One build, or pivots with no line of learning |
| **Validation (20%)**: hypothesis tested | Hypothesis genuinely tested through experiments / evals / research; evidence read honestly, including disconfirming results | Tested with credible evidence; reading of it mostly honest | Thin or cherry-picked evidence; testing gestured at | Assertion without evidence |
| **North-star metric (10%)**: a real measure of success | A defensible north-star metric with a working way to measure it, tied to the hypothesis | Metric named and measurable; link to success clear | Metric vague or unmeasured; a vanity metric | No metric; no notion of success |
| **Ethics & governance (15%)**: risk, agency, systemic effects | Serious engagement with risk, human agency, socio-technical and macro-economic effects; governance (transparency, escalation) designed in | Solid risk and agency analysis; governance addressed | Ethics acknowledged but shallow or bolted on | Absent or box-ticking |
| **Design rationale (10%)**: the argument for the design | Every major choice justified against evidence and the human-agency stakes | Choices mostly justified | Rationale asserted, not argued | Choices unexplained |

**Build & iteration and Validation together carry 40%** of the project, more than framing and
polish combined.

At the midpoint, *Validation* and *Ethics & governance* will still be early. Formal evals come in
Week 9 and the risk analysis in Week 10. *Framing*, *Scope*, and *Design rationale* should be clear
by now.

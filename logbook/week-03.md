# INF2573H Logbook

## Week 3 - Discovery, Problem Framing, and Refining Our Scope

### Part 1: Lecture Notes

**Source:** *INF2573H Week 03 Slides*, Majid Behboudi and Mazi Javidiani, September 24, 2026. Page references refer to the lecture PDF.

#### Continuous discovery

Week 3 moves from choosing a product direction to examining it through contact with real people. A North Star represents a hypothesis about value; discovery helps test the paths toward that value. Continuous discovery involves regular customer contact by the team building the product, directed toward an outcome and better decisions. Research continues alongside development because users' situations and the team's understanding can change. (pp. 3-7)

Faster AI-assisted building does not remove the need for discovery. Human judgment is still needed to decide whose needs matter, what is worth making, and what control people gain or lose. An inexpensive build can become a research instrument for testing an idea, rather than proof that the idea is valuable. (pp. 8-10)

#### Strategic bets and the opportunity solution tree

A strategic bet is a deliberate choice made with a plan to learn, test, and revise. Teresa Torres's opportunity solution tree makes the reasoning behind those choices visible through four levels:

1. **Outcome:** the value the team wants to create.
2. **Opportunities:** unmet customer needs, pain points, or desires that could contribute to that outcome.
3. **Solutions:** possible ways to address those opportunities.
4. **Experiments:** tests of the assumptions connecting the solution, need, and outcome.

The North Star anchors the tree while the possible paths beneath it remain open. An opportunity should describe a need that could have multiple solutions. Naming a particular feature too early can hide the underlying need. (pp. 12-15)

#### Interviews should uncover experiences

Opportunities should come from real customer stories. Interviews are more useful when they explore a specific past experience than when they ask someone to predict whether they would use a proposed feature. Following the details of what happened can reveal context, difficulties, and workarounds that a general opinion misses. (pp. 16-17)

Each branch of the tree is a hypothesis: addressing a need might improve the outcome, and a proposed solution might address that need. A useful experiment should be capable of showing that an assumption is wrong. The tree should change as interviews produce new evidence. (pp. 18, 20)

#### Testing whether something is worth building

The lecture introduces Alberto Savoia's distinction between a pretotype and a prototype. A pretotype is a minimal test that gathers behavioural evidence about whether people want an idea; a prototype can explore whether it can be built and whether it works. This distinction helps separate evidence of demand from evidence of technical feasibility. (p. 19)

#### Discovery as reframing

Kees Dorst's account of design connects what is made and how it works to the value it is intended to create. In design, the desired value may be known while both the solution and working principle remain open. Discovery involves reasoning back from that value and exploring different ways to understand the situation. (pp. 21-23)

An opportunity is therefore also a frame: it makes some needs and possible solutions visible. As the team learns, the problem itself can change. Continuous discovery means revisiting that frame, rather than treating initial requirements as permanently settled. (pp. 24-26)

#### Turning interview material into evidence

The studio asks teams to connect interviews, an opportunity solution tree, and changes to the build. Opportunities should be traceable to participants' actual words. AI-assisted synthesis needs checking because it can flatten specific difficulties into generic summaries or suggest unsupported patterns. An interpretation without supporting evidence should remain an assumption. (pp. 27-32)

### Part 2: My Work and Project Reflections

#### Progress this week

This week, our group completed the North Star Metric work that we had left unfinished in Week 2. We also looked at the first draft of our actual product, giving us a more concrete view of the virtual friend space.

These steps moved the project from brainstorming toward a clearer direction and an initial product draft. Completing the metric gives us a reference for future evaluation, although we still need evidence that the experience delivers the intended value.

#### Decision: Limit the current scope to local connection

We decided that friends should connect to the same Wi-Fi network to join a room in the current project scope. Our implementation concern was that supporting long-distance connections could require access to a server and additional setup.

This was a practical scope decision based on our current implementation considerations. It establishes what we intend to support; it does not, by itself, confirm that the connection flow has been fully implemented or tested.

The choice also changes the use context we should investigate. A same-Wi-Fi experience focuses the current version on friends sharing a local network, while friends joining from separate locations fall outside this scope. A useful question for further discovery is what the virtual space adds when friends are already gathered together.

#### Connecting the scope decision to the lecture

The lecture's distinction between a solution and an opportunity is relevant here. Local connection is an implementation choice. The underlying aim remains to support interaction and shared experiences among friends.

Our technical constraint gives us a narrower situation to explore, but it is not evidence that this is the situation users value most. We can treat the local version as a strategic bet: develop a manageable experience, observe how people use it, and reconsider the scope as we learn.

Seeing the first draft also creates a chance to use the product as a research tool. Questions for future testing include whether friends understand how to join, whether the experience prompts interaction among them, and where the flow becomes confusing. These are proposed questions, not findings from completed tests.

#### Participating in another group's interview

I participated in another group's interview about attending events in the city. I found the topic interesting, and the conversation made me curious about the direction of their project.

Being a participant also prompted me to think about how to design a brief interview. Together with the lecture, this experience gives me several principles to carry into our own research:

- **Start with a concrete experience.** A question about the last time someone attended or considered an event can provide a clearer starting point than a broad question about their preferences.
- **Keep the focus manageable.** In a short interview, exploring one experience in detail may reveal more than rushing through many unrelated questions.
- **Leave room for follow-up.** Asking what happened next, what made a decision difficult, or how someone handled a problem can reveal details the initial question did not anticipate.
- **Avoid leading toward a preferred answer.** The aim should be to understand the participant's experience before asking for reactions to a proposed product.
- **Separate accounts from interpretations.** Notes should distinguish what the participant said from what the team thinks it means.

These are reflections I want to apply, rather than claims about specific questions the other group asked or shortcomings in their interview.

#### Questions and next steps

- Check the room-joining flow under the intended same-Wi-Fi conditions.
- Use the completed North Star to guide what we observe in the first draft.
- Prepare a brief, story-based interview about a recent shared activity with friends.
- Investigate what value an on-screen shared experience could add to an in-person gathering.
- Keep technical assumptions, participant evidence, and design interpretations distinct when documenting the next iteration.

**AI-use disclosure:** I used OpenAI's Codex assistant to summarize the Week 3 lecture slides and draft this entry from my account of the week's activities, including developing reflection questions and preparing the Markdown file for GitHub.

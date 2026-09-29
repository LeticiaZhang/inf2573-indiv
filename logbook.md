# INF2573H Logbook

## Week 1 - Studio Launch and Designing Human Agency

### Part 1: Lecture Notes

**Source:** *INF2573H Week 01 Slides*, Majid Behboudi and Mazi Javidiani. Page references refer to the uploaded lecture PDF.

#### Course focus and expectations

The course explores how to design human agency into AI systems. Its central questions concern capability versus control and automation versus agency: what should an AI system do, where should people make decisions, and how can those decisions remain meaningful? The aim is to develop a working service concept supported by experiments, evidence, risk analysis, and a clear design rationale. Learning by building and thinking critically happen together throughout the term. (pp. 4-6, 29)

Assessment consists of the group project (40%), participation (20%), logbook (20%), and mini essays (20%). The slides emphasize documented learning and reasoning, including what did not work and why. Major milestones include mini essays in Weeks 5 and 10, a midpoint demo in Week 7, and a final demo in Week 12. Logbook entries should connect course ideas to decisions and disclose AI use. (pp. 7, 9-10, 41)

#### Design begins with human needs

The story of Epimetheus and Prometheus introduces making as a way for humans to respond to their limitations. The lecture connects this to Elaine Scarry's account of artifacts as responses to bodily needs and Marshall McLuhan's account of technologies as extensions of the body. A chair, coat, or lamp can be understood through the need it addresses. (pp. 13-16)

Donald Norman's door example shows how a mismatch between a person's intention and an object's cues can produce difficulty. An apparent user mistake can reveal a design problem. Design is an ongoing relationship between people, artifacts, and their use, rather than a single act of producing an object. (pp. 17-18)

#### From artifacts to systems

The four orders of design expand the scope from:

1. Communications and artifacts.
2. Services and interactions.
3. Organizations.
4. Social and systemic conditions.

These levels are interconnected. An AI interface belongs to a larger system involving users, behaviour, data, and models. Its use can change the system it operates within, so designers need to consider feedback loops and consequences beyond the immediate screen. (pp. 19-20)

#### What remains a human responsibility?

AI can speed up the production of layouts, copy, code, images, and early prototypes. The lecture identifies three continuing human responsibilities:

- **Framing:** deciding what problem deserves attention.
- **Judgment:** deciding what counts as a better outcome and for whom.
- **Responsibility:** answering for the consequences of a design.

The designer's role extends to the services, organizations, rules, and goals surrounding an artifact. Producing something quickly does not establish that it addresses the right need. (pp. 21-23, 27-29)

#### Meaningful human control

Kim Vicente's Human-tech ladder considers physical, psychological, team, organizational, and political conditions. A system needs to fit its human context across these levels. Donella Meadows' leverage points distinguish relatively shallow changes to parameters from deeper changes to goals and paradigms. (pp. 24-25)

Ashby's requisite variety provides another way to examine control: the person regulating a system needs sufficient understanding and possible responses to handle what the system can do. Simply adding an approval button does not establish meaningful human agency. Designers need to examine what people can understand, change, reject, or stop. (p. 26)

#### Building and working with AI

The studio introduces an iterative loop: describe a specific intention, generate a first version, run it, and steer the next attempt. Sketch 0 is an early, disposable prototype intended to produce learning. GitHub provides a shared record: commits create checkpoints, pushing shares changes, pulling retrieves teammates' work, and branches support experimentation. (pp. 31, 34, 39-40)

The AI-use principles include defining success before starting, treating outputs as drafts, providing useful context, and verifying in proportion to the stakes. AI assistance does not transfer responsibility. The course expects AI use alongside disclosure and independent judgment. (pp. 10, 30)

### Part 2: My Work and Project Reflections

#### What I did this week

This week, I focused on preparing my tools, establishing communication with my group, and understanding the course schedule.

- **Explored the GitHub connection:** I tried connecting my GitHub account to ChatGPT as an initial step toward using AI with my course repository.
- **Introduced myself to my groupmates:** We exchanged social media contact information and introduced ourselves.
- **Organized a group chat:** I created a shared communication space so that we could stay in touch and coordinate future project work.
- **Reviewed the syllabus:** I examined the course requirements and deadlines to plan my work across the term.

#### Connecting the lecture to project preparation

The lecture's discussion of the team level of a system provides a useful way to understand the group chat. Communication is part of the conditions that support a project: we need a way to ask questions, share updates, and arrange future work. Organizing that channel was a concrete contribution to our preparation.

Trying to connect GitHub with ChatGPT also relates to the distinction between AI capability and human control. For future use, a useful question is how to make AI-assisted changes easy to inspect and understand. The repository can record changes, but I still need to judge whether the content accurately represents my work and whether proposed changes serve the project.

Reviewing the syllabus helped me approach the course as a sequence of milestones. As the project develops, I can use those milestones to plan time for experimentation, feedback, and revision.

#### Questions to carry into the project

- What specific human need should our project address?
- Which decisions could AI support, and which should remain with a person?
- What information and options would someone need to meaningfully question or reject an AI suggestion?
- What evidence would show that our design helps users, beyond producing a convincing demo?

These are starting questions for future discussion, rather than settled project decisions. My recorded work this week focused on setup, communication, and planning.

#### Next steps

- Continue checking how the GitHub-ChatGPT connection can support my course workflow.
- Use the group chat to coordinate project discussions and upcoming tasks.
- Refer to the syllabus deadline plan when scheduling individual and group work.
- Record concrete design decisions, experiments, and their outcomes in later entries.

**AI-use disclosure:** I used OpenAI's Codex assistant to summarize the Week 1 lecture slides and draft and organize this entry from my activity notes, with assistance preparing the Markdown file for GitHub.

## Week 2 - Product Strategy and Choosing Our Project Direction

### Part 1: Lecture Notes

**Source:** *INF2573H Week 02 Slides*, Majid Behboudi and Mazi Javidiani, September 17, 2026. Page references refer to the lecture PDF.

#### Vision, strategy, and positioning

Product strategy begins with two questions: what is the product for and who is it for, and how will we know it is working? The lecture distinguishes three related concepts:

- **Vision:** the future the product makes possible and the human need it addresses.
- **Strategy:** the choices that guide how to achieve that future.
- **Positioning:** the context and alternatives through which the intended user understands the product's value.

A product vision describes a changed situation for users, rather than listing features. Its components include the target user, need, product category, benefit, and differentiation. (pp. 4-8)

A customer experience (CX) vision also describes how the experience should feel, its key moments, what people always control, and the principles guiding interactions. In an AI product, this includes preserving human authorship and making AI actions visible and easy to reject or undo. (pp. 9-10)

Strategy requires a diagnosis of the challenge, a choice of users and needs to serve, an advantage, and explicit trade-offs. Positioning starts with what people would otherwise use, then connects distinctive attributes to value, the people who care most, and a suitable category. These choices help a team focus its work. (pp. 11-14)

#### The North Star Metric and its inputs

A North Star Metric should capture the value people receive from a product. The lecture identifies three qualities: it reflects real user value, the team's work can influence it, and it provides an early signal of future business outcomes. Before selecting a number, the team should identify the moments in the user journey when people actually receive value. (pp. 16-18)

The framework connects three levels:

1. **North Star:** the outcome the team wants to see.
2. **Inputs:** a small set of factors the team can influence that are expected to affect that outcome.
3. **Bets:** specific changes or experiments aimed at those inputs.

Teams work on the inputs and observe whether the outcome changes. The relationship between inputs and the North Star is a hypothesis to test, not a guaranteed formula. The lecture's Netflix example illustrates how early behaviour can provide a signal of later retention. (pp. 19-22)

Inputs can be checked by asking whether the team can generate several concrete ways to influence them and whether planned features connect to an input. A candidate North Star should be revised as the team learns or changes strategy. (pp. 23-24)

#### Avoiding vanity metrics

Downloads, sign-ups, page views, or time spent may be easy to count without demonstrating that users benefited. The lecture proposes asking whether a sudden increase in a metric would necessarily mean something good happened. A useful metric needs a defensible connection to the value the product promises. (p. 25)

#### Technology shapes behaviour and agency

The lecture draws on Peter-Paul Verbeek to explain technological mediation: products shape what people perceive and do, as well as performing functions and conveying meaning. A round table can shape conversation, while a speed bump changes behaviour through its physical form. Latour's seatbelt example similarly shows how a value can be built into an artifact. (pp. 27-31)

Design choices therefore have moral consequences. A North Star Metric carries a value into everyday product decisions: optimizing time spent, for example, encourages a different product from optimizing user benefit. The key question is whether people are better off or simply more engaged. Transparency and active participation can help people retain control. (pp. 32-35)

#### Putting strategy into practice

The studio connects the strategy brief to AI-assisted building. Positioning and the North Star need to be included in the context provided to the AI so that they can influence its output. The lecture also introduces a shared-repository routine of pulling, working, committing, and pushing, with clear responsibility for each feature. These are practices introduced in class; completing them is separate from the work recorded below. (pp. 37-49)

### Part 2: My Work and Project Reflections

#### Brainstorming and contributing to the discussion

This week, I brainstormed project ideas with my group members. We exchanged comments, suggestions, and possible future directions for several ideas before deciding to pursue the **virtual friend space**. We also examined the North Star Metric template and discussed what our North Star should be, although we did not finish the template.

The brainstorming notes included two directions under the broader mission of connecting people.

#### Direction 1: Local discovery and activity partners

One direction would help people find places or activities that fit their immediate needs, such as a quiet place with outlets, somewhere affordable to sit, or something to do nearby. Possible filters included time, budget, weather, group size, mood, and interests.

A related community feature would let people post activities and find others to join them. Combining discovery with activity-partner posts could help people form connections through a shared activity.

The notes identified several concerns:

- Safety when arranging offline meetings with strangers.
- A cold-start problem if too few people create or respond to posts.
- Complexity around external activity data, availability, paid events, and third-party services.
- A need to investigate differentiation from existing discovery and social platforms.

These were concerns and research questions raised during ideation, rather than findings from completed user or competitor research.

#### Selected direction: A virtual friend space

We ultimately chose the virtual friend space direction. In the brainstorming notes, this concept focuses on people who already know each other and gives them a shared interactive experience.

Friends could enter a fictional setting together, such as a fantasy world, a survival scenario, or a reality show. They could make choices, vote, and react to one another. AI could act as a Game Master, generating situations and adapting the story to the group's input.

The intended value is the interaction between friends: discovering how others think, creating conversation, and developing shared jokes and memories. The fictional world provides a setting for those interactions. These are concept possibilities, not features that we have already built or validated.

#### Our unfinished North Star discussion

We reviewed the North Star Metric template and shared our thoughts, especially about what our North Star should be. We did not complete the template or finalize a metric.

The lecture offers a useful way to continue this discussion: first describe the value friends should receive, then consider how to observe it. For this concept, the open question is how to tell whether the experience helps friends connect. Session length or the number of generated stories would be easy to count, but neither alone would show that the interaction was meaningful.

Questions I want to carry into our next discussion include:

- What would count as a valuable shared experience for a group of friends?
- How could we learn whether players felt more connected after participating?
- How could we distinguish active interaction among friends from passively consuming an AI-generated story?
- Which inputs could our design influence, and how would we test their relationship to the intended value?

These questions extend the reflection in this entry; they do not represent an agreed team metric.

#### Connection to human agency

The distinction between vision and features helps clarify the concept: the purpose is to support connection among friends, while fictional settings, voting, and AI storytelling are possible ways to support it.

The lecture on mediation also raises a design question for this project. Assigning roles, presenting choices, or asking friends to vote may influence how they see and respond to one another. As we develop the concept, we should consider how players can question an AI-generated role, skip an uncomfortable situation, and influence the story themselves. These remain design questions to explore.

#### Next steps

- Complete the North Star template together, with a clearly defined candidate metric and its assumptions.
- Narrow the initial experience to one setting and a manageable interaction flow.
- Clarify what the AI controls and what players can change, reject, or skip.
- Gather feedback on whether the concept supports the kind of connection we intend.

**AI-use disclosure:** I used OpenAI's Codex assistant to summarize the Week 2 lecture slides and draft this entry from my activity description and brainstorming notes, including organizing follow-up reflection questions and updating the Markdown logbook.

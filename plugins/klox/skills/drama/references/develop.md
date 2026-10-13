# Stage 0 · Series development

Goal: a story engine that keeps producing choices, costs and changes of state, laid out episode by episode so every episode pays something off and hands pressure to the next.

## Start from what the user has

- **Only an idea or genre**: propose two or three directions that differ in mechanism (how the protagonist fights, who opposes them, what it costs), not just in names and jobs. Let the user pick or combine.
- **A novel, synopsis or notes**: list what is fixed (characters, relationships, ending), what is open, and what is unclear. Base every adaptation choice on the given text; never fill gaps from the title alone. Cut to one main line and at most one subplot, merge characters who do the same job, and note each cut or merge with a one-line reason.
- **Direction already settled**: go straight to the episode map.
- **A finished screenplay**: skip this stage.

## Story engine (`Series Arc`)

Write in a few short sections:

- **Promise**: what the audience gets again and again (vindication, longing, revenge, a puzzle).
- **Pressure**: where it comes from and how the protagonist usually answers it.
- **Opposition**: who pushes back, how they adapt, and why the protagonist cannot simply walk away.
- **Escalation**: what changes each round (power, information, relationship, exposure, resources, time). Louder is not escalation.
- **Characters**: for each major character, what they want, what leverage they hold, their limit, their flaw.
- **End condition**: which revelation or change ends the engine.

## Payoff map (`Payoff Map`)

A table of the moments the audience came for, each with its episode:

| ID  | Episode | Type | What happens on screen | Set up in |
| --- | ------- | ---- | ---------------------- | --------- |

- Place the major payoffs first, then fill gaps with minor ones.
- Keep the gaps between payoffs within the profile's payoff gap, and land the first major payoff by the profile's episode. A block can end on a big payoff, but the first major one does not wait for the block's last episode.
- Types follow the genre (for romance: a claim of protection, a jealousy reversal, a public choice; for revenge: humiliation turned around, an exposed lie).
- A recurring object belongs on the asset list only if losing it would break a payoff.

## Episode map (`Episode Map`)

One row per episode:

| Ep  | Enters with | Wants | Blocked by | Turn | Payoff | Exits on (cliffhanger) | Carries forward |
| --- | ----------- | ----- | ---------- | ---- | ------ | ---------------------- | --------------- |

- **Enters with / Carries forward** are facts, not moods: who knows what, who holds what, which injury, which promise. Each episode's "enters with" matches the previous "carries forward".
- **Turn** is one visible action, not its function ("she drinks the cup", not "the stakes rise").
- **Exits on** grows out of this episode's result: someone has decided to act, or a consequence has started. Prefer that to "something mysterious happens".
- Each episode has its own local result before the cliffhanger.

## Episode 1 entry

Compare at least three openings before choosing:

- **Chronological**: the earliest point that works, as a baseline.
- **Payoff-first**: the moment of strongest audience reward that also shows who the protagonist is, what crushes them and what they want.
- **Cold open**: a later peak moved to the front (its last beat, or the second before a reveal), then back to how it started.

For each, write the first frame the viewer sees and the question it makes them ask without reading text or knowing anyone, then what the episode pays off. Choose the one whose first frame is itself the hook. By the end of episode 1 the viewer knows who the protagonist is, what pressure is on them now, and a concrete goal (a sum, a deadline, a person).

Hook types to pick from, by what the episode actually does: action already under way, consequence of a previous choice, words contradicted by evidence, a new power position in a relationship, a decision that must be made now, a fact that reframes the scene.

## Rhythm profile

Propose these numbers in the `Brief` for the user to accept or change. Starting points for AI live-action vertical drama:

| Field              | Meaning                                                                           | Start          |
| ------------------ | --------------------------------------------------------------------------------- | -------------- |
| Episode length     | Target seconds per episode                                                        | from the Brief |
| First hook         | The hook is visible and readable by                                               | 3 s            |
| Beat interval      | Longest gap between emotional beats (a conflict line, an action, new information) | 20–30 s        |
| Opposed reversals  | Reversals involving a concrete opponent, per episode                              | at least 1     |
| End on peak        | Cut at the peak, no cooldown after it                                             | yes            |
| Reprise            | Next episode opens on the previous episode's last beat                            | yes            |
| Voice-over share   | Narration and inner voice as a share of spoken words                              | at most 30%    |
| Average shot       | Mean shot length                                                                  | about 2.5 s    |
| Close shots        | Close-ups, medium close-ups and inserts as a share of shots                       | at least 45%   |
| Payoff gap         | Longest run of episodes without a payoff                                          | 3              |
| First major payoff | Episode by which the first big payoff lands                                       | 1              |

These are defaults to start from, not quality laws. A quiet, slow-burn series can relax beat interval and shot length; say why in the Brief.

## Gate

Show the user, in one message: the storylines cut, the characters merged, the major payoff episodes, the episode 1 entry with its first frame, and the rhythm profile. Do not write episode screenplays until they agree. A wrong skeleton costs one round; a wrong batch of screenplays costs all of them.

# Stage 1 · Episode screenplay

Goal: one text node, `EP01 · Script`, that an actor could perform and a camera could shoot, timed to the target length.

Choose the writing batch size from the requested scope and how much story is settled; review an initial sample before expanding an uncertain direction.

## Inputs

The episode's row in `Episode Map`, the payoffs it claims in `Payoff Map`, the previous episode's last beat, the characters (how each one talks), the locations, and the rhythm profile in `Brief`.

## Format

```
# EP01 · The Missing Key
Target: 75 s · Payoff: P01 · Exits on: "Then who locked it?"

## EP01-SC01 · INT. OFFICE – NIGHT
[ACTION] Character A pulls the locked drawer; it does not open.
CHARACTER A (turning to Character B): You said you had the key.
[ACTION] Character B opens an empty palm.
[SFX] A key rattles behind the closed door.
```

- One line per beat. A beat is either an action (`[ACTION]`, one visible thing happening) or one line of dialogue (`NAME (delivery): line`).
- Other tags: `[VO]` narration or inner voice, `[OS]` spoken off screen, `[SFX]` a sound that matters, `[TEXT]` in-world text the story needs, with its surface (`[TEXT] phone screen: "Payment overdue"`), `[TITLE]` overlay text added in the edit (`[TITLE] 8 HOURS EARLIER`), `[CONT]` a state downstream must keep (Character B holds the key in the right hand from here).
- Put quoted dialogue on its speaker line. Put subtext in the delivery note and visible action in the action line. For a dramatic exchange or emotional turn, establish what each character wants, how they try to obtain it, and which response changes their next choice. Use concise delivery and action notes grounded in the accepted story; leave the specific physical performance to generation.
- Give every line and every sound that matters a stable id when the screenplay is accepted (`L03`, `door-close-01`). Note for each sound what makes it, the material, force and count, whether it is heard on or off screen, and why the story needs it. An off-screen sound (a knock, a phone in another room) is a sound event like any other; list it. A sound that happens again later gets a new id; one action seen from two angles keeps its id. These ids become the scene's sound plan items.

## Timing

Estimate dialogue from its language and intended delivery, using a read-through when available. Allow time for the actual action and meaningful reactions. Adjust what contributes least to the scene when it misses the target duration; keep complete dialogue and causality. The estimate is a plan; the real length comes from the generated clips.

## Must hold (reviewed)

1. **The hook is readable by the profile's first-hook time** without knowing anyone. Carry forward the previous ending where the agreed episode structure calls for it.
2. **The last beat delivers the episode map's exit.**
3. **Every scene changes something**: information, power, relationship, emotion, physical state or risk. A scene that changes nothing is cut or merged.
4. **Opposition acts on screen.** Someone in the episode wants something that blocks the protagonist and does something about it.
5. **Claimed payoffs are performed**: each has a run of visible or audible beats that delivers it.
6. **Turns are actions.** Each turn the audience must feel is carried by something seen or heard, through the visible or audible event itself.
7. **Causality holds.** Read neighbouring beats with "because… so… but…". Where only "and then" fits, a choice, an obstacle or a consequence is missing.
8. **States stay continuous**: positions, held objects, injuries and who is present carry from beat to beat. After changing a beat, re-read the beats before and after it.

## Defaults

Follow these unless the scene has a reason not to; note the reason in a delivery or `[CONT]` line when you depart.

- Make the hook readable in the form that best serves the story; a still detail can be as effective as motion.
- Keep the gap between emotional beats within the profile's beat interval.
- Let dialogue length and pauses follow character voice and dramatic intent. Add action or reactions where they change the exchange.
- Make plot-critical actions visually readable. For precise or unfamiliar interactions, plan supporting references or coverage that make the intended action readable.
- Voice-over within the profile's share, used where the face hides what the head thinks.
- Each character sounds like themselves: cover the names and you can still tell who speaks.
- Information arrives through evidence, action and conflict; dialogue adds intention, subtext or information to the picture.

## Stage review

Before the gate, write findings in the review format from the skill, then fix those that belong here:

- Time it (word count at the speaking rate, or the user's read-through if they did one) and list the timestamps of hook, every emotional beat, the payoff and the cliffhanger.
- Name the opposition in each scene and what it does.
- For each scene, state what changed between its first and last beat, and how the characters’ objectives and responses make that change readable.
- List every place you departed from a default, with the reason.

## Gate

Show the screenplay with its estimated length, the timestamps above and the review findings. Use a human read-through when available; otherwise label speaking times as estimates. Character voice and delivery are verified on the generated video clips. Move on only when the user approves the text.

---
name: drama
description: Make episodic short dramas (vertical microdramas, web series, AI comic dramas) on Klox with a professional pipeline - develop the series and episode map, write each episode as a timed screenplay, plan and storyboard its scenes with frozen keyframes, generate keyframes and clips, and edit the episode, reviewing each stage before the next. Use when the user wants to make, continue, fix or plan a short drama, series, episode, pilot or microdrama on Klox, or adapt a novel or story into episodes. Works together with the Klox canvas skill, which covers the tools.
---

# Klox Drama

This skill is the production method for episodic drama. The Klox canvas skill covers how to operate Klox (tools, assets, budgets, uploads); follow it for every tool call. The Klox asset-design skill covers reusable visual design and reference acceptance at the visual-bible stage. This skill says what to make at each stage, in what order, how to hand it to the next stage, and how to review it.

Skill version 1.4.8. The latest version is always at https://klox.ai/agent/skills/drama/SKILL.md.

## Principles

1. **Story before pixels.** Do not try to fix a story problem with prompts, models or retakes. Find the stage that owns the problem and fix it there.
2. **Downstream never silently changes what upstream confirmed.** The screenplay owns what happens and who says what. The scene plan and storyboard own how it is seen and heard. Prompts translate shots. Each stage makes its own decisions freely; a stage that needs to change a confirmed upstream fact (a line, an event, a state) sends the change back to its owner, then flows it down.
3. **One main dramatic job per shot.** Every shot has one reason to exist and a clear start and end state. The action inside it can be a short chain (a character sets down a cup and offers a hand) with the reactions it needs; split the shot when it starts doing a second job.
4. **Keyframe before clip.** Every shot gets its own accepted start keyframe before any video is generated for it; a shot that continues a take uses the previous clip's last frame instead, reviewed like a keyframe. Never connect a storyboard grid to a video node.
5. **Cheap checks before expensive ones.** Read through the screenplay and cut an animatic from keyframes with timed dialogue cards before spending credits on video. The animatic checks visual flow and planned timing; generated dialogue is checked on the clips.
6. **Keep plot-critical action common.** Video models perform well what they have seen millions of times: walk in, sit down, hand over, turn, grab, embrace. Put fragile details (which hand, finger positions, small objects interacting, micro-expressions) in a dedicated insert, or rewrite the scene so the story does not depend on them.

## Four kinds of rule

Every rule in this skill and its references is one of these. Treat them differently.

| Kind           | What it covers                                                                                                                                                                                                                                                                    | How to use it                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Hard check** | Facts that can be proven from the canvas: a shot's source scene exists, every line is present and verbatim, a clip's duration is within the model's range, a connected asset has references, the edit does not cut a line short, nothing downstream points at an outdated version | Check mechanically and fix before the gate. Never ask the user to accept a failed hard check              |
| **Reviewed**   | Meaning that needs judgement: does the scene change something, does the payoff land, does the reaction follow the cause, is the action performable                                                                                                                                | Review with evidence (see below). Revise when the evidence shows a loss                                   |
| **Default**    | Craft habits that usually help: shot lengths, close-shot share, line length, voice-over amount, the hook arriving in motion, coverage patterns                                                                                                                                    | Follow unless there is a reason; write the reason when you depart. Report as a warning, never block on it |
| **Choice**     | Taste: tone, pacing style, camera preference, how quiet or loud a scene plays                                                                                                                                                                                                     | The user decides. Never treat a choice as a defect                                                        |

Numbers in the rhythm profile are defaults until the user accepts them for the project; after that they are the project's targets and are checked as warnings with reasons, not as hard checks.

## Stages and gates

| #   | Stage                     | Output on the canvas                                              | Before the gate                                                     |
| --- | ------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| 0   | Series development        | Series canvas: `Brief`, `Series Arc`, `Payoff Map`, `Episode Map` | User approves cuts, merges, payoff placement and the rhythm profile |
| 1   | Episode screenplay        | `EP01 · Script`                                                   | Timing estimated; stage review done; user approves the text         |
| 2   | Visual bible              | Assets with references and voices; tone frames                    | Main characters' required references accepted using asset-design    |
| 3   | Scene plan and storyboard | `EP01 · Scene Plan` for key scenes, `EP01 · Shot List`            | Handoff checks pass; stage review done                              |
| 4   | Keyframes and animatic    | One keyframe per shot; `EP01 · Animatic`                          | Keyframes reviewed; user watched the animatic and approved the flow |
| 5   | Clip prompts              | One video node per shot (or per short multi-cut segment)          | Handoff checks pass                                                 |
| 6   | Clip production           | Generated clips                                                   | Budget agreed; each clip reviewed; failures classified              |
| 7   | Edit                      | `EP01 · Cut List`, rough cut via `compose`, finished cut          | Handoff checks pass; user reviewed the cut                          |
| 8   | Review                    | Notes and numbers in `Brief`                                      | Lessons turned into changes for the next episode                    |

Work in this order. Entering in the middle is fine when the earlier outputs already exist (the user brings a finished screenplay, or assets are done); do not invent earlier stages to fill the table. When the user asks to "make episode 1", do stages 1–4, stop at the animatic, then ask before spending on video.

Read the reference for a stage before working on it:

- Stage 0: [develop.md](references/develop.md)
- Stage 1: [script.md](references/script.md)
- Stages 2–4: [storyboard.md](references/storyboard.md)
- Stages 5–6: [clips.md](references/clips.md)
- Stages 7–8: [edit.md](references/edit.md)

## Handoff checks

Run these against `get_workflow` and `get_assets` before each gate that lists them, and quote what you found. Read the canvas JSON with a script when it is large.

- **Script → shot list**: every shot's source names a scene that exists in `EP01 · Script`; every scene is shot or listed as deliberately skipped with a reason; every line, voice-over and key sound in the script is placed exactly once on the sound timeline, verbatim; every action beat happens on screen once, unless a repeat is marked as deliberate.
- **Shot list → keyframes and clips**: every shot has a keyframe and names the clip it is generated in (several shots may share one multi-cut clip); each clip's requested duration is within the model's range, at least the cut lengths of the shots it serves, and long enough for every line generated in it; every consistency fact the shot needs (a character's identity, a look, a location, a state) reaches the generation through a valid input for its route (see clips.md: the keyframe carries subjects on a `firstFrame` route, asset nodes do on a reference route), and every connected asset has references; quoted dialogue in each clip prompt matches the script word for word; the model supports audio generation and audio is enabled when configurable.
- **Clips → edit**: every cut-list row points at a clip with a result and has source in and out points inside that clip's duration; picture cuts may fall inside a line, but the final sound timeline contains every line exactly once, complete and verbatim, with none cut off or repeated by accident; captions match the script word for word.
- **Freshness**: no keyframe, clip or cut uses an output made before its upstream node last changed, and no result is marked outdated by an asset version.

These checks prove the parts fit. They say nothing about whether the episode moves people; that is what reviews and the animatic are for.

## Reviews

Before every gate, review the stage's output yourself, then show the user. User approval does not replace the review. Write each finding as:

> **Where** (scene, shot or node ID) · **Evidence** (the line, frame or timestamp) · **Effect on the viewer** · **Fix** · **Owning stage**

Fix findings that belong to the current stage before the gate. Send findings that belong to an earlier stage back there and tell the user. Merge findings that share one cause. Do not report "different from the example" as a finding; name the confirmed fact that was lost or the harm to the viewer.

## Canvas layout

Use one Klox project per series. Inside it:

- **Series canvas** (create it first, titled `<Series> · Series Bible`) holds the long-lived text nodes: `Brief`, `Series Arc`, `Payoff Map`, `Episode Map`, and later `Voice Bible` if needed. Reference sheets for assets are made here too.
- **One canvas per episode**, created with the series `projectId`, titled `EP01 · <episode title>`. It holds `EP01 · Script`, `EP01 · Scene Plan`, `EP01 · Shot List`, the keyframes, clips, the cut list and the compose node. Group each scene's nodes in a `frame` titled with its scene ID.
- Name nodes by stable IDs so every stage can point at the others: scenes `EP01-SC02`, shots `EP01 S07`, keyframes `EP01 S07 · KF`, clips `EP01 S07 · Clip`, tone frames `TONE · <location> · <lighting state>`.
- Characters, locations and recurring objects are project assets, shared by every episode canvas (see the canvas skill). One asset node per look and state.

## The Brief carries the contract

Besides audience, format and style, the series `Brief` holds:

- **Rhythm profile**: the project's accepted targets (see develop.md).
- **Audio production**: use a video model that generates picture and audio together. Dialogue, voice-over, off-screen speech and scene sound come from generated video clips. Record the model, audio settings and character voice references where supported. Music and captions are added in the edit. Do not create separate synthesized dialogue tracks.
- **Target video model** and its duration range.
- **Production log**: credits and hours per episode, filled in at stage 8.

Episode canvases read the series `Brief`; keep a short `Brief` on each episode canvas only for episode-specific constraints, with a link back.

## When to stop and ask

Ask only at the gates above, at real creative forks (a choice that changes the protagonist, the conflict, the ending or the tone), and before spending credits. Within a stage, work through scenes and shots without pausing for confirmation. At each gate, report in one message: what was made, the review findings and what you fixed, the key decisions, what is still open, and the next step with its credit estimate.

## Diagnosing a weak episode

When the user says an existing episode is not working, do not start rewriting prompts. Pick the scene that matters most and trace it layer by layer: screenplay promise → scene plan and shots → keyframes → clip performance and sound → edit. Find the first layer where the viewer's experience gets weaker, fix it in its owning stage, and redo only what lies downstream of it.

## Changing something already made

Change the earliest stage that owns the problem, then list what downstream is now stale and fix only that:

- A line changed → the shots that carry it, their keyframes if framing changes, their clips.
- A shot split or merged → its keyframes and clips; keep the IDs of untouched shots.
- An asset reference changed → every shot that shows it (the canvas marks results from the older version as outdated).

Tell the user which nodes will be regenerated and the credits before running anything.

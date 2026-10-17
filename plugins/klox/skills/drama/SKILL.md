---
name: drama
description: Make episodic short dramas on Klox - develop the story, block scenes in shared 3D previs, review a rough cut, establish visual keyframes, generate and review clips, and finish the edit. Use for a series, episode, pilot, microdrama or story adaptation; works with the canvas and asset-design skills.
---

# Klox Drama

This skill owns story and production decisions. The canvas skill owns tool operations, uploads, credits and input routing; asset-design owns reusable visual references. Keep the screenplay, scene previs, visual assets and edit plan connected without duplicating their authority.

Skill version 1.4.24. The latest version is always at https://klox.ai/agent/skills/drama/SKILL.md.

## Principles

1. **Story before pixels.** Fix the earliest stage where a story promise is lost, rather than trying to repair it with prompts or retakes.
2. **Each fact has an owner.** The screenplay owns events, lines and continuity facts; assets own identity, looks, reference states, fixed location geometry (set) and base character size (body); shared scene previs owns scene-specific spatial overrides, blocking, action timing and cameras; the shot list and cut list own dramatic purpose, coverage and edit order. Downstream must not silently change confirmed upstream facts.
3. **One main dramatic job per shot.** A shot can contain a short action chain and reactions. Split it when it starts doing another job, not merely to fit a model's duration.
4. **Block and cut before final rendering.** When space, motion or camera matter, use shared scene previs and review its shots in edit order before producing final keyframes and video. Static keyframe animatics remain useful for shots without previs.
5. **An accepted picture is a visual target, not always a strict first frame.** Important shots normally have a reviewed opening keyframe. Its input role depends on the chosen model route. Simple shots may use assets plus previs directly when that route has been verified and the task allows it; record the reason for omitting a keyframe.
6. **Match detail to what the story needs.** Previs fixes essential blocking and action beats; models supply expression and small environmental movement. Precise hand contact and other unsupported interactions need a supported route, a separate insert or redesigned coverage, not a claim that grey stand-ins already prove them.

## Rules and reviews

Distinguish **hard checks** (references exist, supported inputs, legal durations, complete dialogue, valid edit ranges), **reviewed decisions** (causality, readable action, payoff), **defaults** (shot length, coverage) and **choices** (tone, pace, style). Fix failed hard checks; explain departures from defaults; preserve the user's choices. Numbers in the rhythm profile remain targets with reasons for departures, not universal quality laws.

Review before handing a stage to the user. Report findings as:

> **Where** (scene, shot or node) · **Evidence** (line, frame or timestamp) · **Effect on the viewer** · **Fix** · **Owning stage**

Fix current-stage findings, return upstream changes to their owner, and redo only affected downstream work. User approval does not substitute for inspecting the output. Tell the user which checks could not be performed.

## Stages and handoffs

| #   | Stage                                    | Output                                                                                          | Review before handoff                                           |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0   | Series development                       | Brief, Series Arc, Payoff Map, Episode Map                                                      | Story choices and rhythm profile                                |
| 1   | Episode screenplay                       | EP01 · Script                                                                                   | Events, lines, estimated sound and action timing                |
| 2   | Visual bible                             | Accepted asset references, voices, required light states, location sets and bodies              | Identity, state, space, dimensions and references               |
| 3   | Scene previs, shots and rough timing cut | Shared previs per needed scene, Shot List, sound plan, Greybox Cut where exports are accessible | Blocking, coverage, edit order, sound sources and dramatic flow |
| 4   | Visual keyframes                         | Reviewed opening keyframes and needed additional states                                         | Match the planned geometry and accepted assets                  |
| 5   | Clip input and prompt preparation        | Legal model route and inputs per clip                                                           | Handoff checks and credit estimate                              |
| 6   | Clip production                          | Reviewed takes and their sound checks                                                           | Action, motion, appearance, sound and continuity                |
| 7   | Edit                                     | Cut List, compose timeline with ambience and music, finished episode                            | Each sound once, tails kept, film sound check                   |
| 8   | Review                                   | Production log in Brief                                                                         | Lessons for the next episode                                    |

Start at the stage justified by existing material. Asset development and previs may progress together once identity and essential dimensions are settled; do not require all decorative references before testing blocking. For a request to make an episode, review the stage 3 timing cut before final rendering, then stage 4 keyframes before video generation. Reuse approval and credit scope already given; do not ask again for each shot or view.

Read only the needed reference:

- Stage 0: [develop.md](references/develop.md).
- Stage 1: [script.md](references/script.md).
- Stages 2–4: [storyboard.md](references/storyboard.md).
- Stages 5–6: [clips.md](references/clips.md).
- Stages 7–8: [edit.md](references/edit.md).

## Handoff checks

- **Script → scene and shot plan:** every shot names a source scene and dramatic job. Every scene is covered or deliberately omitted with a reason. Every line and key sound is an item of the scene's sound plan with exactly one source generation; picture coverage may overlap in scene time, but the edit shows and plays each event once unless repetition is deliberate.
- **Assets → previs:** every location a previs scene stands in has a set whose key views the user has checked against its references, and every acting character has a body. Missing ones are made first, in asset design.
- **Previs → timing cut:** each previs-backed shot names the node, Shot ID and scene-time window. Actor proportions, state transitions and cameras support the shot's job. Use computed Screen maps to locate issues, then inspect frame sequences through the node's `reviewUrl`; follow the canvas skill's [review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page) for baseline freezing and comparison after repairs. Report the actual frames and sampling step, not a claim of full playback review. Continuous playback or an accessible greybox cut is still needed for dynamic rhythm; static samples and a scene played from a free camera are not an assembled cut. Shots without previs state their route and the visual evidence used instead.
- **Plan → keyframes and clips:** a generation grouping plan maps stable Shot IDs to video nodes, requested durations, planned picture use, input routes, sound ownership and split-on-failure decisions (see [clips.md](references/clips.md#generation-groups-before-video-nodes)). Each clip names its shot(s), requested duration, reference window and planned cut length. Its accepted opening picture matches the intended start, or its verified direct-reference route explains the omission. The pre-generation review checks every row's explicit audio setting against saved node options and sound ownership, including documented capability exceptions and mute plans. Inputs and audio settings satisfy current capabilities; identity, look, location and state reach the model through that route. A clip has at most one image marked opening. Lines appear verbatim in the prompt of their designated sound-source clip, not in every coverage angle.
- **Clips → edit:** every cut references an inspected take with source in/out inside the actual clip, and its sound check passed or its failure is handled. The sound timeline includes each line and key sound exactly once, complete, with correct speaker and its tail intact; captions match the screenplay. Compare motion and end state with the plan before replacing its placeholder.
- **Freshness:** use available asset-outdated flags, current previs export status and recorded source/take IDs. After a relevant upstream change, identify which pictures, clips and cuts need rechecking. Titles and display edits alone do not invalidate pictures. When provenance is not exposed, tell the user the known changes and unverified dependencies instead of claiming a timestamp check proves freshness.

## Canvas and production contract

Use one project per series, a series bible canvas for long-lived story decisions, and one canvas per episode. Group scene nodes by stable scene IDs; name previs nodes EP01-SC02 · Previs, shots EP01 S07, keyframes EP01 S07 · KF, clips EP01 G03 · S07–S09 · Clip (or EP01 S07 · Clip for a single-shot unit) and cuts EP01 · Greybox Cut / Cut List. Keep repeated characters, locations and props in project assets, one asset node per look and state.

The Brief holds the current decisions: audience, format, style, language, rhythm profile, model/input route, audio production, credit scope and autonomy, plus a short production log of what was decided and why. Rewrite it in place when a decision changes instead of appending dated sections; keep a superseded decision only as one line when it still matters. Never restate what `get_workflow` computes (exports, readiness, prices, gate and check status): it is current there and stale in text. `list_workflow_changes` keeps edits for 30 days only, so it is not the place for lasting decisions. Default drama audio: sound-source groups generate their assigned dialogue, breaths, laughs and event sounds, as dry close-mic sound with no ambience, room tone or music. Pure reaction and coverage groups with no assigned sound disable native audio when supported, otherwise their audio is muted in the edit. Scene ambience and music are laid in the edit on their own audio tracks, continuous across the cuts of a scene; captions are added in the edit. Keep one sound plan node per scene. Do not silently add separately synthesized episode dialogue. Previs sound windows and temporary dialogue cards are timing aids, not verified voice or lip sync.

Ask at unresolved creative forks and when the next work exceeds existing approval or credit scope. At a handoff, show the concrete result, findings, remaining uncertainty and next cost. Continue ordinary work within an approved stage without repeated permission requests.

## Autonomous runs

When `get_workflow` shows a `productionRun` in progress, the user has set a budget, stage gate owners and what happens when a check cannot decide. Within the delegated creative scope, perform reviews and continue through stages assigned to `agent`; stop only the dependent work at a `user` gate. A budget alone does not settle an unresolved creative fork or replace an explicit request to review a stage:

- `policy.gates` says who passes each stage (previsShot, keyframe, clip, roughCut, film): `agent` stages you pass yourself with `accept_gate_item` after reviewing the item (frames on the review page, the clip, the cut), sending the fingerprint `get_workflow` shows; `user` stages wait for the user's approval. A node whose upstream has not passed its gate is refused with `gate_pending` (a batch waits on it), so review and accept in order. At a user gate, point the user at `awaitingUser` (what to look at and where) and keep working on everything it does not hold up. An acceptance is evidence, not approval: it lapses when the item changes and never overrides a failed check.
- Plan within `remainingCredits`; never ask to raise the budget. Every attributed task, including sound analysis and paid repairs, counts against it; reserve room for checks. Use `run_nodes` for initial batches and `run_node` with `checkItem` for paid repairs, since `run_nodes` has no per-check field.
- After a take with `shotWindows` is generated, inspect it, run `check_cuts`, and confirm observed shot intervals following the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement). Also run a sound check node on it; after the edit, run one on the film. Read `get_sound_checks` and act on each status: `blocked` → fix it with the decision rules in [clips.md](references/clips.md#when-a-sound-check-fails); `pending` → the take, line or timeline changed, check again; `exception_allowed` → declare it with a reason the user will read, or fix it if that is cheap; `needs_human` → stop work on that check and identify the exact listening decision still required. `pass` and `exception` need no further repair. A missing report is different from an undecided result: read the evidence before rerunning; do not spend on repeated analyses or retakes for a property the analyzer cannot judge.
- Pass the failed check as `checkItem` on every paid repair. Repairs of one check share one limit, whatever the method; once it is used up, move on and list the check.
- Deliver a film as releasable only when its checks are all `pass` or declared exceptions and its `film` gate is released. If that gate belongs to the user, present the concrete final film for approval; do not mark it delivered as approved yourself. If budget, repair limits, blocked checks with no supported remedy, or required human listening prevent completion, deliver the best current cut as unfinished with a failure or listening report. MCP cannot end the production run; the user ends it on the canvas. In either outcome, list every check with its status and evidence, every exception and its reason, and the credits spent. Do not stop midway to ask the user to rescue a failed shot.

## Changes and diagnosis

Trace a weak episode through screenplay → scene plan/previs → timing cut → visual keyframes → generated performance and sound → final edit. Fix the first layer that loses the intended effect.

- A line or event changes: update its timing, coverage and sound source, then affected clips.
- Blocking, actor dimensions or camera changes: update the shared previs, recheck its timing cut and affected keyframes/clip inputs; old generated takes are not automatically refreshed.
- A shot splits or merges: update coverage and cut mappings, retaining unaffected IDs.
- An asset reference changes: inspect affected identity/look/state uses and available outdated flags.
- A selected take changes: update picture and audio source ranges in the cut list; its sound checks go stale, so check it again.

Tell the user which nodes need regeneration and the credits before spending outside the existing scope.

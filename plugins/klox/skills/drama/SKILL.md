---
name: drama
description: Make episodic short dramas on Klox - develop the story, block scenes in shared 3D previs, review a rough cut, generate clips straight from previs and assets (extending continuous shots), review them, and finish the edit. Use for a series, episode, pilot, microdrama or story adaptation; works with the canvas and asset-design skills.
---

# Klox Drama

This skill owns story and production decisions. The canvas skill owns tool operations, uploads, credits and input routing; asset-design owns reusable visual references. Keep the screenplay, scene previs, visual assets and edit plan connected through their owning records.

Skill version 1.4.29. The latest version is always at https://klox.ai/agent/skills/drama/SKILL.md.

## Principles

1. **Story before pixels.** Fix a story or production issue at the earliest stage that owns its cause.
2. **Each fact has an owner.** The screenplay owns events, lines and continuity facts; assets own identity, looks, reference states, fixed location geometry (set) and base character size (body); shared scene previs owns scene-specific spatial overrides, blocking, planned event windows and cameras; the screenplay and shot prompts supply playable objectives, relevant subtext and response relationships, while generation develops their natural physical performance and fine action rhythm; the shot list and cut list own dramatic purpose, coverage and edit order. Preserve confirmed upstream facts and revise them explicitly in their owning stage when needed.
3. **One main dramatic job per shot.** A shot can contain a short action chain and reactions. Split it when the dramatic job changes; choose generation units separately from edit shots.
4. **Block and cut before final rendering.** When space, motion or camera matter, use shared scene previs and review its shots in edit order before generating video. Static sketch animatics remain useful for shots without previs.
5. **Previs and assets drive the clip.** A clip is generated straight from its previs Shot (blocking and camera) and the assets of what it shows (identity, look, location, state, voice) as the default route. In the prompt, briefly reinforce story-critical spatial relationships, action causality and continuous states, with ordinary travel and staging supplied by previs and natural performance and fine rhythm developed by generation. Make a keyframe only for a picture neither can carry (an exact hand contact, text that must read) and record why. Continue one continuous shot across generations through video extension: the later clip continues the earlier one from its last frame.
6. **Match detail to what the story needs.** Previs fixes essential blocking and action beats; shot prompts carry playable intentions, attempts and reciprocal responses; models develop their physical expression and secondary movement. Give emotional decisions, complete speech and physical follow-through usable time in the passage. Precise hand contact and other unsupported interactions need a supported route, a separate insert or redesigned coverage, with their execution verified in the generated output.

## Rules and reviews

Distinguish **hard checks** (references exist, supported inputs, legal durations, complete dialogue, valid edit ranges), **reviewed decisions** (causality, readable action, payoff), **defaults** (shot length, coverage) and **choices** (tone, pace, style). Fix failed hard checks; explain departures from defaults; preserve the user's choices. Numbers in the rhythm profile remain targets with reasons for departures, adapted to the agreed story and style.

Review before handing a stage to the user. Report findings as:

> **Where** (scene, shot or node) · **Evidence** (line, frame or timestamp) · **Effect on the viewer** · **Fix** · **Owning stage**

Fix current-stage findings, return upstream changes to their owner, and redo only affected downstream work. Inspect the actual output and report the completed checks and remaining evidence gaps.

## Stages and handoffs

| #   | Stage                                    | Output                                                                                          | Review before handoff                                           |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0   | Series development                       | Brief, Series Arc, Payoff Map, Episode Map                                                      | Story choices and rhythm profile                                |
| 1   | Episode screenplay                       | EP01 · Script                                                                                   | Events, lines, estimated sound and action timing                |
| 2   | Visual bible                             | Accepted asset references, voices, required light states, location sets and bodies              | Identity, state, space, dimensions and references               |
| 3   | Scene previs, shots and rough timing cut | Shared previs per needed scene, Shot List, sound plan, Greybox Cut where exports are accessible | Blocking, coverage, edit order, sound sources and dramatic flow |
| 4   | Clip input and prompt preparation        | Legal model route, inputs and extension chains per clip                                         | Handoff checks and credit estimate                              |
| 5   | Clip production                          | Reviewed takes, joins and their sound checks                                                    | Action, motion, appearance, sound, joins and continuity         |
| 6   | Edit                                     | Cut List, mixed native scene sound, music and finished episode                                  | Each sound once, tails kept, film sound check                   |
| 7   | Review                                   | Production log in Brief                                                                         | Lessons for the next episode                                    |

Start at the stage justified by existing material. Asset development and previs may progress together once identity and essential dimensions are settled; complete decorative references as the upcoming shots need them. For a request to make an episode, review the stage 3 timing cut before generating video, then the first clip of each continuous shot before its extensions. Reuse approval and credit scope already given and continue the covered work.

Read only the needed reference:

- Stage 0: [develop.md](references/develop.md).
- Stage 1: [script.md](references/script.md).
- Stages 2–3: [storyboard.md](references/storyboard.md).
- Stages 4–5: [clips.md](references/clips.md).
- Stages 6–7: [edit.md](references/edit.md).

## Handoff checks

- **Script → scene and shot plan:** every shot names a source scene and dramatic job. Every scene is covered or deliberately omitted with a reason. Every line and key sound is an item of the scene's sound plan with exactly one source generation; picture coverage may overlap in scene time, but the edit shows and plays each event once unless repetition is deliberate.
- **Assets → previs:** every location a previs scene stands in has a set whose key views the user has checked against its references, and every acting character has a body. Missing ones are made first, in asset design.
- **Previs → timing cut:** each previs-backed shot names the node, Shot ID and scene-time window. Actor proportions, state transitions and cameras support the shot's job. Use computed Screen maps to locate issues, then inspect frame sequences through the node's `reviewUrl`; follow the canvas skill's [review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page) for baseline freezing and comparison after repairs. Report the actual frames and sampling step as sampled visual evidence. Continuous playback or an accessible greybox cut is still needed for dynamic rhythm; review the assembled cut for episode rhythm. Shots without previs state their route and the visual evidence used instead.
- **Plan → clips:** a generation grouping plan maps stable Shot IDs to video nodes, requested durations, planned picture use, input routes, which clip each one extends, sound ownership and split-on-failure decisions (see [clips.md](references/clips.md#generation-groups-before-video-nodes)). Each clip names its shot(s), requested duration, reference window and planned cut length. An extension continues the same continuous shot on the same model, its join falls between two lines, and its duration follows `referenceVideoRoutes[model].extend` (on Wan 3.0 the source plus the new part, with `shotWindows` after the source). A keyframe exists only with a recorded reason. The pre-generation review checks every row's explicit audio setting against saved node options and sound ownership, including documented capability exceptions and mute plans. Inputs and audio settings satisfy current capabilities; identity, look, location and state reach the model through that route. Choose one starting route per clip: an opening picture or a video to extend; an opening picture is a single image. Put each line verbatim in its designated sound-source clip; coverage angles describe the intended listening performance.
- **Clips → edit:** every cut references an inspected take with source in/out inside the actual clip, and its sound check passed or its failure is handled. The sound timeline includes each line and key sound exactly once, complete, with correct speaker and its tail intact; captions match the screenplay. Compare motion and end state with the plan before replacing its placeholder. Check each extension's join where the edit actually cuts: the end of the earlier clip against the start of a Seedance continuation, or against a Wan continuation at `sourceIn` = the source's length; picture, motion and sound must carry straight on. A join that jumps fails that clip's review until it is regenerated.
- **Freshness:** use available asset-outdated flags, current previs export status, `extendSource` (a continuation of a result that has since changed, along the whole chain) and recorded source/take IDs. After a relevant upstream change, identify which pictures, clips and cuts need rechecking. Titles and display edits preserve picture freshness. When provenance is not exposed, tell the user the known changes and unverified dependencies with freshness claims tied to available provenance.

## Canvas and production contract

Use one project per series, a series bible canvas for long-lived story decisions, and one canvas per episode. Group scene nodes by stable scene IDs; name previs nodes EP01-SC02 · Previs, shots EP01 S07, clips EP01 G03 · S07–S09 · Clip (or EP01 S07 · Clip for a single-shot unit; an extension adds `· Ext G02`), any keyframe EP01 S07 · KF and cuts EP01 · Greybox Cut / Cut List. Keep repeated characters, locations and props in project assets, one asset node per look and state.

The Brief holds the current decisions: audience, format, style, language, rhythm profile, model/input route, audio production, credit scope and autonomy, plus a short production log of what was decided and why. Rewrite it in place when a decision changes; keep a superseded decision only as one line when it still matters. Read exports, readiness, prices, gate and check status from `get_workflow` as current computed state. Keep lasting decisions in their owning records; `list_workflow_changes` provides 30 days of edit history. Default drama audio: the video model performs dialogue, breaths, laughs, action effects, ambience and spatial acoustics with the picture. Describe the scene's sound sources, main/background balance, source distance, enclosure and changes through camera or action. Keep each scripted line and key event tied to its designated source take. Post-production joins and mixes accepted native sound, carries lines and tails across cuts, smooths environmental continuity and adds music. Enable native audio when a clip supplies usable scene sound; deliberate picture-only coverage uses an explicit source in the edit. Keep clip-wide sound design in one final prompt block, with specific dialogue and events beside their triggering actions. Keep one sound plan node per scene. Generate episode dialogue in its assigned native video source; use a separately synthesized route when explicitly requested. Use previs sound windows and temporary dialogue cards for timing, and verify voice and lip sync on the generated clips.

Ask at unresolved creative forks and when the next work exceeds existing approval or credit scope. At a handoff, show the concrete result, findings, remaining uncertainty and next cost. Continue ordinary work within an approved stage using the existing authorization.

## Autonomous runs

When `get_workflow` shows a `productionRun` in progress, the user has set a budget, stage gate owners and what happens when a check cannot decide. Within the delegated creative scope, perform reviews and continue through stages assigned to `agent`; stop only the dependent work at a `user` gate. Use the budget alongside the user's creative decisions and explicit stage-review choices:

- `policy.gates` says who passes each stage (previsShot, keyframe, clip, roughCut, film): `agent` stages you pass yourself with `accept_gate_item` after reviewing the item (frames on the review page, the clip, the cut), sending the fingerprint `get_workflow` shows; `user` stages wait for the user's approval. A node whose upstream has not passed its gate is refused with `gate_pending` (a batch waits on it), so review and accept in order. At a user gate, point the user at `awaitingUser` (what to look at and where) and keep working on everything it does not hold up. Agent acceptance records review evidence for the current item; user approval and check results retain their separate authority. Refresh acceptance when the item changes.
- Plan and complete the authorized work within `remainingCredits`, then report any unfinished items. Every attributed task, including sound analysis and paid repairs, counts against it; reserve room for checks. Use `run_nodes` for initial batches and `run_node` with `checkItem` for paid repairs, since `run_nodes` has no per-check field.
- After a take with `shotWindows` is generated, inspect it, run `check_cuts`, and confirm observed shot intervals following the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement). Also run a sound check node on it; after the edit, run one on the film. Read `get_sound_checks` and act on each status: `blocked` → fix it with the decision rules in [clips.md](references/clips.md#when-a-sound-check-fails); `pending` → the take, line or timeline changed, check again; a line the clip report heard but the submitted timeline cuts out fails the film's release (`checks_not_passed`); `exception_allowed` → declare it with a reason the user will read, or fix it if that is cheap; `needs_human` → stop work on that check and identify the exact listening decision still required. `pass` and `exception` need no further repair. A missing report is different from an undecided result: read the evidence and follow the policy or listening route for properties awaiting human judgment.
- Pass the failed check as `checkItem` on every paid repair. Repairs of one check share one limit, whatever the method; once it is used up, move on and list the check.
- Deliver a film as releasable only when its checks are all `pass` or declared exceptions and its `film` gate is released. If that gate belongs to the user, present the concrete final film and let the user record approval. If budget, repair limits, blocked checks with no supported remedy, or required human listening prevent completion, deliver the best current cut as unfinished with a failure or listening report. The user ends the production run on the canvas. In either outcome, list every check with its status and evidence, every exception and its reason, and the credits spent. Handle failed shots through the authorized repair policy and deliver the best current cut with its remaining issues.

## Changes and diagnosis

Trace a weak episode through screenplay → scene plan/previs → timing cut → assets and clip inputs → generated performance and sound → final edit. Fix the first layer that loses the intended effect.

- A line or event changes: update its timing, coverage and sound source, then affected clips.
- Blocking, actor dimensions or camera changes: update the shared previs, recheck its timing cut and affected clip inputs; old generated takes are not automatically refreshed.
- A shot splits or merges: update coverage and cut mappings, retaining unaffected IDs.
- An asset reference changes: inspect affected identity/look/state uses and available outdated flags.
- A selected take changes: update picture and audio source ranges in the cut list; its sound checks go stale, so check it again. Every clip that extends it, directly or down the chain, goes out of date (`extendSource`): regenerate them in order from the first one.

Tell the user which nodes need regeneration and the credits before spending outside the existing scope.

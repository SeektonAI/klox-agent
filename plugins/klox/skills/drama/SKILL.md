---
name: drama
description: Make episodic short dramas on Klox - develop the story, block scenes in shared 3D previs, review a rough cut, establish visual keyframes, generate and review clips, and finish the edit. Use for a series, episode, pilot, microdrama or story adaptation; works with the canvas and asset-design skills.
---

# Klox Drama

This skill owns story and production decisions. The canvas skill owns tool operations, uploads, credits and input routing; asset-design owns reusable visual references. Keep the screenplay, scene previs, visual assets and edit plan connected without duplicating their authority.

Skill version 1.4.12. The latest version is always at https://klox.ai/agent/skills/drama/SKILL.md.

## Principles

1. **Story before pixels.** Fix the earliest stage where a story promise is lost, rather than trying to repair it with prompts or retakes.
2. **Each fact has an owner.** The screenplay owns events, lines and continuity facts; assets own identity, looks and reference states; shared scene previs owns spatial relationships, action timing and cameras; the shot list and cut list own dramatic purpose, coverage and edit order. Downstream must not silently change confirmed upstream facts.
3. **One main dramatic job per shot.** A shot can contain a short action chain and reactions. Split it when it starts doing another job, not merely to fit a model's duration.
4. **Block and cut before final rendering.** When space, motion or camera matter, use shared scene previs and review its shots in edit order before producing final keyframes and video. Static keyframe animatics remain useful for shots without previs.
5. **An accepted picture is a visual target, not always a strict first frame.** Important shots normally have a reviewed opening keyframe. Its input role depends on the chosen model route. Simple shots may use assets plus previs directly when that route has been verified and the task allows it; record the reason for omitting a keyframe.
6. **Match detail to what the story needs.** Previs fixes essential blocking and action beats; models supply expression and small environmental movement. Precise hand contact and other unsupported interactions need a supported route, a separate insert or redesigned coverage, not a claim that grey stand-ins already prove them.

## Rules and reviews

Distinguish **hard checks** (references exist, supported inputs, legal durations, complete dialogue, valid edit ranges), **reviewed decisions** (causality, readable action, payoff), **defaults** (shot length, coverage) and **choices** (tone, pace, style). Fix failed hard checks; explain departures from defaults; preserve the user's choices. Numbers in the rhythm profile remain targets with reasons for departures, not universal quality laws.

Review before handing a stage to the user. Report findings as:

> **Where** (scene, shot or node) · **Evidence** (line, frame or timestamp) · **Effect on the viewer** · **Fix** · **Owning stage**

Fix current-stage findings, return upstream changes to their owner, and redo only affected downstream work. User approval does not substitute for inspecting the output. Mark checks that cannot be performed as unverified.

## Stages and handoffs

| #   | Stage                                    | Output                                                                              | Review before handoff                                           |
| --- | ---------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0   | Series development                       | Brief, Series Arc, Payoff Map, Episode Map                                          | Story choices and rhythm profile                                |
| 1   | Episode screenplay                       | EP01 · Script                                                                       | Events, lines, estimated sound and action timing                |
| 2   | Visual bible                             | Accepted asset references, voices and required light states                         | Identity, state, usable dimensions and references               |
| 3   | Scene previs, shots and rough timing cut | Shared previs per needed scene, Shot List, Greybox Cut where exports are accessible | Blocking, coverage, edit order, sound windows and dramatic flow |
| 4   | Visual keyframes                         | Reviewed opening keyframes and needed additional states                             | Match the planned geometry and accepted assets                  |
| 5   | Clip input and prompt preparation        | Legal model route and inputs per clip                                               | Handoff checks and credit estimate                              |
| 6   | Clip production                          | Reviewed takes                                                                      | Action, motion, appearance, sound and continuity                |
| 7   | Edit                                     | Cut List, compose rough cut, finished episode                                       | Replace planned shots with accepted takes, preserve sound       |
| 8   | Review                                   | Production log in Brief                                                             | Lessons for the next episode                                    |

Start at the stage justified by existing material. Asset development and previs may progress together once identity and essential dimensions are settled; do not require all decorative references before testing blocking. For a request to make an episode, review the stage 3 timing cut before final rendering, then stage 4 keyframes before video generation. Reuse approval and credit scope already given; do not ask again for each shot or view.

Read only the needed reference:

- Stage 0: [develop.md](references/develop.md).
- Stage 1: [script.md](references/script.md).
- Stages 2–4: [storyboard.md](references/storyboard.md).
- Stages 5–6: [clips.md](references/clips.md).
- Stages 7–8: [edit.md](references/edit.md).

## Handoff checks

- **Script → scene and shot plan:** every shot names a source scene and dramatic job. Every scene is covered or deliberately omitted with a reason. Every line and key sound has one planned sound source; picture coverage may overlap in scene time, but the edit shows each event once unless repetition is deliberate.
- **Previs → timing cut:** each previs-backed shot names the node, Shot ID and scene-time window. Actor proportions, state transitions and cameras support the shot's job. Use computed Screen maps when available; inspect actual playback for intervening action, occlusion and reveals. Shots without previs state their route and the visual evidence used instead. A scene played from a free camera is not an assembled cut.
- **Plan → keyframes and clips:** each clip names its shot(s), requested duration, reference window and planned cut length. Its accepted opening picture matches the intended start, or its verified direct-reference route explains the omission. Inputs and audio settings satisfy current capabilities; identity, look, location and state reach the model through that route. A clip has at most one image marked opening. Lines appear verbatim in the prompt of their designated sound-source clip, not in every coverage angle.
- **Clips → edit:** every cut references an inspected take with source in/out inside the actual clip. The sound timeline includes each line exactly once, complete, with correct speaker; captions match the screenplay. Compare motion and end state with the plan before replacing its placeholder.
- **Freshness:** use available asset-outdated flags, current previs export status and recorded source/take IDs. After a relevant upstream change, identify which pictures, clips and cuts need rechecking. Titles and display edits alone do not invalidate pictures. When provenance is not exposed, record known changes and unverified dependencies instead of claiming a timestamp check proves freshness.

## Canvas and production contract

Use one project per series, a series bible canvas for long-lived story decisions, and one canvas per episode. Group scene nodes by stable scene IDs; name previs nodes EP01-SC02 · Previs, shots EP01 S07, keyframes EP01 S07 · KF, clips EP01 S07 · Clip and cuts EP01 · Greybox Cut / Cut List. Keep repeated characters, locations and props in project assets, one asset node per look and state.

The Brief holds audience, format, style, language, rhythm profile, model/input route, audio production, credit scope and production log. Default drama audio is generated with picture: dialogue, voice-over and scene sound come from video clips; music and captions are added in the edit. Do not silently add separately synthesized episode dialogue. Previs sound windows and temporary dialogue cards are timing aids, not verified voice or lip sync.

Ask at unresolved creative forks and when the next work exceeds existing approval or credit scope. At a handoff, show the concrete result, findings, remaining uncertainty and next cost. Continue ordinary work within an approved stage without repeated permission requests.

## Changes and diagnosis

Trace a weak episode through screenplay → scene plan/previs → timing cut → visual keyframes → generated performance and sound → final edit. Fix the first layer that loses the intended effect.

- A line or event changes: update its timing, coverage and sound source, then affected clips.
- Blocking, actor dimensions or camera changes: update the shared previs, recheck its timing cut and affected keyframes/clip inputs; old generated takes are not automatically refreshed.
- A shot splits or merges: update coverage and cut mappings, retaining unaffected IDs.
- An asset reference changes: inspect affected identity/look/state uses and available outdated flags.
- A selected take changes: update picture and audio source ranges in the cut list.

Tell the user which nodes need regeneration and the credits before spending outside the existing scope.

# Stages 5–6 · Clip prompts and production

## Generation groups before video nodes

Keep edit Shot IDs independent of generation units. Before creating video nodes, compare neighbouring shots as possible groups: same scene and light, compatible character and prop states, continuous action or a complete dialogue passage, and tolerable drift in generated cut points. Dialogue is eligible when speaker identity, voice and visible lip sync can be checked throughout. A group may supply several edit shots, each retaining its own dramatic job and source range.

Start by considering 2–4 shots over 6–15 seconds. Use 15–30-second groups only when supported by the current route and the passage is simple, coherent and easy to review. These are starting suggestions, not required lengths or model capability tables; read `get_capabilities` for actual limits. Keep high-risk contact, critical prop details, state reveals, strict lip-sync moments and shots needing independent repair separate when a failed detail would force an expensive group retake. A single-shot generation remains appropriate when that is the cheaper reliable route.

Write an episode generation grouping plan in existing text nodes for the decisions: why shots share a group, the model/input route and where to split on failure. Keep stable Shot IDs independent of node IDs. Store planned local intervals on the video node as `updateNodes[].shotWindows` with full `{previsNodeId, shotId}` references; use the scene sound plan for assigned source nodes and the node options for requested duration and audio settings. Keep keyframes for covered cuts unless a verified direct route justifies their omission. After generation, confirmed intervals and the compose timeline own observed source ranges; do not replace the text plan with another editable copy of task/file IDs, prices or timings.

Target a **first-pass footage ratio** (initial requested video seconds / planned picture seconds) of about 1.3 or less. A higher value triggers review and a recorded reason, not a hard rejection: complete dialogue, sound tails over other pictures and high-risk coverage may justify it. Also report the **actual generation ratio** (requested video seconds across all attempts / final picture seconds). Keep both in the production log with group count, retake rate (groups needing another attempt / groups attempted), actual credits and the causes of excess or retries. During production, mark ratios against the still-planned edit as provisional.

Read each node's `readiness.credits` and the overview's `estimate`; a null price is unknown, not zero, and a price with `creditsEstimated` is a pre-input estimate to confirm once its upstream results exist. Compare first-pass cost plus expected retry and analysis/repair costs. With otherwise equal per-second pricing, fewer requested seconds reduce first-pass cost proportionally; mixed models or settings need the actual estimates. Minimize expected total cost of accepted footage, not node count alone. Generate and review a representative group before expanding a new grouping route within the existing budget. Preserve usable ranges and produce missing coverage separately when continuity and sound allow it.

Never connect a storyboard grid to a video node.

## Scene, reference, generated and edit time

Use the structured fields as the authority: previs owns scene windows, the video node's `shotWindows` owns planned take intervals, valid confirmations own observed shot identity and source intervals, and compose clips own final source ranges and cut length. Read those values when reviewing; do not maintain duplicate timing tables. Record only reasons and unresolved choices in production notes. Distinguish these time bases:

- **Scene window**: previs node, Shot ID and global start/end. Its export starts at local time 0: scene [4, 8] becomes reference [0, 4]. Use the scene timeline for action timing and the sound plan for sound events.
- **Reference duration**: the exported window, within the selected model's input limits. This is distinct from output duration.

- **Cut length**: how long the shot plays in the episode, saved as its compose clip duration.
- **Requested duration**: what the clip node asks the model for. It follows the model's allowed values, covers the combined planned picture use of the shots it serves plus necessary trim handles, and is long enough for every line generated in it, including the part heard over later shots. A 2-second shot on a model whose minimum is 4 seconds requests 4.
- **Source in and out**: where the edit takes the shot from inside the generated clip.

Prefer matching the reference and requested durations when using previs, but inspect the actual generated timing. When the request is longer than the cut, use an explicit same-camera waiting/hold window that fits the model, then trim the result. Do not slow the action or change shared downstream scene events just to fill a model minimum. There is no automatic tail-hold export setting today: use a valid window with a real hold, or a locally prepared reference when accessible. Several shots may use one multi-cut take, each with its own inspected source in/out. The supported maximum is a ceiling, not a target; avoid uniform 4–5-second requests for short coverage when a shorter legal request or a compatible group serves it better.

## Which inputs a clip gets

A shot that has a previs shot uses it as the blocking authority; that is the main route. Use other routes for simple shots, strict starting-frame needs, or requirements the previs/reference route cannot satisfy; document the choice.

- **Single-shot previs route** (for a generation serving one previs Shot):
  1. Connect the previs node to the clip's `video` input with that shot (`connections[].shot`). Klox exports it as a grey stand-in video and sends it as the blocking and camera reference (positions, moves, timing, scale, camera move). The purpose notes already describe what the reference controls; identify which color is which subject and add action intent, expression and sound without specifying a conflicting camera move.
  2. Connect the shot's accepted keyframe as its opening picture, where `get_capabilities` → `referenceVideoRoutes[model].openingFrame` says: `firstFrame` → as `firstFrame`; `image` (the model cannot take a first frame beside reference media) → on the `image` input with `purpose: "opening"`, and Klox requests that the clip opens on it. This is a prompted reference, not a strict first-frame guarantee; verify the output. Do not repeat the purpose rule in the prompt. `null` means no opening-picture input beside video: use a verified direct route or choose another model.
  3. Connect required asset references and voices when that route permits them. An image-reference opening needs those subjects; a strict opening can carry appearance, but voice-reference compatibility is a separate check. Connect a location asset only when its reference does not fight the keyframe's framing.

  Pick a model listed in `referenceVideoRoutes`. Keep the previs shot within the model's reference-video duration range; choose a Shot for this clip's intended scene window. Check total reference duration and all combination limits, not just one file's duration.

- **Grouped previs route** (for a generation serving several previs Shots): use each covered Shot's live blocking/camera reference. Follow the canvas skill's [Shot connection and reference-mapping procedure](https://klox.ai/agent/skills/canvas/references/previs.md#connect-a-shot) for connection parameters, input order, absolute reference numbers and missing-Shot recovery. Write timed sections that join end to start and name the mapped reference each cut follows. For example, when the verified mapping is S03 → video2 and S04 → video3: `(0:00–0:03) S03: follow @[S03 blocking](video:2) for blocking and camera …`, `(0:03–0:05) cut to S04: follow @[S04 blocking](video:3) …`. State that cuts happen in order with characters and states continuous. Reference duration/count limits may constrain a group more than output duration; split it when essential blocking cannot fit. The model may blend references or ignore a cut boundary, so inspect one representative group against each Shot's reference before expanding the route to the episode. Check action, camera, identity, state and sound continuity at every cut, and use actual generated cut points for the edit.
- **First-frame route** (no previs shot; the clip generates no spoken line, or the model takes voice references together with a first frame): connect the keyframe as `firstFrame`. Connect no asset nodes; the keyframe already carries identity, look, location and state, so check those on the keyframe, not on the clip's connections.
- **Reference route** (no previs shot; the clip generates any spoken line on a model that does not take voice references with a first frame, or a multi-cut clip): connect the keyframe on the `image` input with `purpose: "opening"`, plus the asset nodes for the characters whose identity or voice must hold. A clip has one opening frame: in a multi-cut clip only the first cut's keyframe gets `opening`; connect the other cuts' keyframes with no purpose and say in the prompt which cut, and from which second, each one shows ("@image3 is cut 2, from 3 s").
- **Same-take continuation** (one continuous camera view split into generations): extract and review the previous take's actual last frame, use it on the legal opening route, and compare it to the next previs window's start. Repair a mismatch before generating; do not pass two competing motion references without a verified reason. This dependency waits for the previous take.
- **Cut to another camera**: derive the new opening from that camera at the appropriate shared scene time. Do not reuse the previous camera's last frame merely because the action continues across the cut. These coverage shots can be prepared independently.

Stay within the model's limits: duration range, reference counts, prompt length.

Run the canvas skill's pre-generation checks on every clip. Start the action from the reviewed opening state, and write the end state as something the action reaches. Name the speaker of every line.

## Audio production

For groups assigned dialogue or event sounds, use a video model that generates picture and audio together. Check `get_capabilities` for audio generation and reference-audio support before setting up the clip. Enable audio for those sound-source groups; if the chosen model cannot supply the assigned audio, choose a compatible route before production. For pure reaction or picture coverage with no assigned sound, set `generateAudio: false` when supported; otherwise plan to mute its native audio in the edit. Prompting silence is not equivalent to disabling audio. For clips with dialogue, prefer a model that also takes reference audio; without it, each character's voice can drift between clips, so review voice consistency shot by shot.

Before generation, check each grouping-plan row against the saved node options and sound assignments. A missing audio-setting entry, a sound-source group with audio disabled, or an unassigned group with audio enabled when the route supports disabling it fails the production handoff. When the route cannot disable audio, record that capability exception and the explicit edit mute plan. This check is independent of whether shots are grouped.

The prompt carries the clip's dialogue verbatim, with speaker, delivery and timing. Distinguish visible speech, off-screen speech and voice-over; only the visible speaker should lip-sync. Connect accepted character voice references where supported, and keep each character's voice direction consistent across clips. Verify the generated audio for complete wording, correct speaker, voice consistency and synchronization with visible speech.

Each sound-source group generates only the dialogue and event sounds the sound plan assigns to it, dry and close-mic, with no ambience, room tone or music: the edit lays continuous ambience and music under the whole scene, and a clip that brings its own room tone jumps at every cut. A clip that carries over another shot's sound generates nothing of it. Dialogue that continues across a cut plays from its source clip in the edit, so its own take is never re-spoken by another clip.

## Prompt structure

Write the prompt in one language, with dialogue quoted verbatim in the language it is spoken. In this order:

1. **Subjects and reference mapping**: which asset or stand-in color is which character. Opening, layout and tone purposes are already explained by Klox; identify ordinary references and timed later keyframes where needed.
2. **Continuity locks** of every look in the shot, verbatim.
3. **Action**: from the reviewed opening state, the shot's action (one move or a short chain) with its trigger, contact and landing, then the secondary reaction (the listener's face, cloth, hair, dust).
4. **Camera**: with previs, retain its selected camera and temporal intent without writing a second camera path; without previs, describe the shot list's camera and timing. State one continuous shot when cuts are not intended.
5. **Sound**: state the audio assignment; for sound-source groups, use the sound block below. Every line this clip is the source of, with speaker, delivery and timing, quoted once, verbatim from the screenplay; mark visible speech, off-screen speech and voice-over. Each event this clip is the source of, with its trigger, material, force, count and natural decay. Name the sounds that an earlier shot already made and this one must not repeat.
6. **End state**: each covered shot's end state, reached within its planned segment; hold the final group's end state through any requested trim handle.
7. **Text**: "no subtitles, captions or overlaid text". If the opening frame shows in-world text (a phone screen, a sign), add "keep the text on the <surface> unchanged" (see Text below).

For groups generating assigned audio, use the sound block at the start and again at the end (models ignore a single no-music line):

```text
Sound: only the dialogue, breaths and the listed action sounds. Dry, close-mic dialogue, minimal reverberation. No ambience, no room tone, no background music, no score, no transition sounds.
...
End: only the listed dialogue and action sounds; no music.
```

Keep audio enabled on groups supplying assigned dialogue or events; handle unwanted music through the sound-repair procedure. Audio-free coverage instead describes silent performance and uses the audio setting above.

For a multi-cut generation, write timed sections that join end to start and add up to the duration: `(0:00–0:03) Shot 1, insert: …`, and list which reference image is which cut's frame before the sections.

Keep the prompt free of process notes ("this is a test", "keep consistent with the storyboard"), file names and checklists. State the wanted visible result; keep negatives to the few that are needed (no subtitles, no music, no extra people).

## Text

Two kinds, two routes:

- **Overlay text** (captions, titles such as "8 HOURS EARLIER", chat bubbles, system panels) is never generated. It is added in the edit.
- **In-world text** on a surface in the scene is part of the keyframe: write it exactly in the keyframe prompt, keep it short, and check it on the keyframe. In the clip, ask only that it stays unchanged. If the model garbles it, cover it in the edit (replace the screen in post, or cut to an insert made from the keyframe) instead of rerolling.

## Dialogue capacity

Estimate the speaking time of every line at the normal rate and make sure it fits the requested duration with room for the reaction. Models that run out of time drop the rest of the line without any error, and some models rewrite prompts before generating. After every clip, check that each line is spoken completely and verbatim. A line that spans several shots is generated once, in the speaker's clip, and the edit lays that audio under the other shots. The other shots' prompts describe the listener reacting in silence, and never mention the line, even as off-screen speech; otherwise the model speaks it again in a different take.

## Production

1. Show the plan: which nodes, how many seconds, the credit estimate, a credit ceiling, and the retry cap (for example two retries per shot).
2. Generate with `run_nodes` and the agreed `maxCredits`. Start with the hardest scene (usually dialogue with touch, or a transformation) as a test, review it, then the rest.
3. Review the whole generated clip against its plan and the previs reference where available: right start, the shot's action, right end within the cut length, identity and locks held, no captions or music, no extra cuts. For exact previs moments, use the node's `reviewUrl` and the canvas skill's [frame-review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page); dense samples around an event help compare blocking but do not replace watching the generated clip's motion. Every assigned line complete and verbatim, the correct speaker and consistent voice, and visible speech synchronized with the performance. If the previs needs repair, freeze its baseline before changing it, compare after saving, and recheck affected keyframes, clips and production export freshness.
4. When a clip fails, classify the failure before retrying, and fix it where it belongs:

   | Cause       | Signs                                                                                                         | Fix in                                                                            |
   | ----------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
   | Input       | Wrong appearance, weak keyframe, absent or competing asset references                                         | Stage 4 or 2: repair visual inputs                                                |
   | Previs      | Wrong scale, blocking, action timing, occlusion or camera in the reference                                    | Stage 3: change the scene/Shot, recheck the timing cut and affected visual inputs |
   | Prompt      | The prompt contradicts the shot, misses the action or end state, misquotes a line, leaves room for extra cuts | This stage: rewrite against the shot list                                         |
   | Model limit | The model cannot do this (a transformation, precise hand contact, long speech) or ignores a supported input   | This stage: change the model or route; or stage 3                                 |
   | Design      | The action is too complex for one shot, or depends on a fragile detail                                        | Stage 3: simplify, split, move the detail into an insert                          |
   | Story       | The shot works but the moment does not                                                                        | Stage 1                                                                           |
   | Variance    | Inputs and prompt are sound; the result is just unlucky                                                       | Retry once with a new idempotency key                                             |

   Stay within the authorized retry cap; during an active production run, also respect the shared per-check limit. Stop repairing that shot/check at the limit, record the classification, and continue independent work that still fits the scope and budget.

5. For takes with `shotWindows`, run `check_cuts` and confirm inspected source intervals before replacing rough-cut placeholders. Follow the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement); cut timing alone does not identify a shot. Record failure causes and lasting decisions in the production log, deriving spend and attempt metrics from actual tasks.

## When a sound check fails

Run a sound check node on every accepted clip; `get_sound_checks` turns its report into a status per line and event. It hears the words and tags sounds such as music. Music it tags is a failure; music it did not tag is only undecided, since quiet music under dialogue may go untagged. It cannot judge an event's material and count, room tone, or double plays in the film either; undecided checks follow the run's policy. For each check node, set `soundPlanNodeId` explicitly when the canvas has several scene plans. Use `run_node` with that failed check as `checkItem` on every paid repair during an active production run; do not put repairs in `run_nodes`, which cannot attribute them to a check. Use the following remedies only when the evidence identifies an actual defect. An undecided check for an unsupported property is not evidence that regenerating will help: follow its policy, declare only `exception_allowed` items through `declare_check_exception`, or leave the required listening decision unresolved. Repair in this order:

| Problem                                   | Try, in order                                                                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| A line misspoken, cut off or missing      | Regenerate the source clip with more time for the line                                                                     |
| Music or a transition sound in the clip   | Trim the affected range in the edit → regenerate → keep the voice (voice isolation) and add back the events the plan needs |
| An event missing or heard the wrong times | Regenerate the source clip → if the clip has no dialogue, mute that range and add the effect                               |
| A tail clashing with the next line        | Move the next line after the tail                                                                                          |
| Room tone jumps between shots of a scene  | Regenerate the shot that jumps; continuous ambience covers only slight differences                                         |

Voice isolation removes every non-voice sound, the wanted events included. Replace the affected sound in the compose timeline, mute the overlapping original sound, and check the resulting film against that scene's plan. Do not recheck only the unchanged original video and claim it proves the isolated replacement. A transcript cannot establish the correct speaker, voice identity, lip sync, or exact event count; record those as unverified without separate inspection.

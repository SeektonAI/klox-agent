# Stages 4–5 · Clip prompts and production

## Generation groups before video nodes

Keep edit Shot IDs independent of generation units. Before creating video nodes, compare neighbouring shots as possible groups: same scene and light, compatible character and prop states, continuous action or a complete dialogue passage, and tolerable drift in generated cut points. Dialogue is eligible when speaker identity, voice and visible lip sync can be checked throughout. A group may supply several edit shots, each retaining its own dramatic job and source range.

Neighbouring shots of one continuous shot (storyboard.md, Continuous shots) are the strongest candidates: generate them as one group when one generation can hold them, otherwise as a first group plus extensions. Start by considering 2–4 shots over 6–15 seconds. Use 15–30-second groups only when supported by the current route and the passage is simple, coherent and easy to review. These are starting suggestions, not required lengths or model capability tables; read `get_capabilities` for actual limits. Keep high-risk contact, critical prop details, state reveals, strict lip-sync moments and shots needing independent repair separate when a failed detail would force an expensive group retake. A single-shot generation remains appropriate when that is the cheaper reliable route.

Write an episode generation grouping plan in existing text nodes for the decisions: why shots share a group, the model/input route, which group each extension continues and where to split on failure. Keep stable Shot IDs independent of node IDs. Store planned local intervals on the video node as `updateNodes[].shotWindows` with full `{previsNodeId, shotId}` references; use the scene sound plan for assigned source nodes and the node options for requested duration and audio settings. After generation, confirmed intervals and the compose timeline own observed source ranges; do not replace the text plan with another editable copy of task/file IDs, prices or timings.

Target a **first-pass footage ratio** (initial requested video seconds / planned picture seconds) of about 1.3 or less. A higher value triggers review and a recorded reason, not a hard rejection: complete dialogue, sound tails over other pictures and high-risk coverage may justify it. Also report the **actual generation ratio** (requested video seconds across all attempts / final picture seconds). Keep both in the production log with group count, retake rate (groups needing another attempt / groups attempted), actual credits and the causes of excess or retries. During production, mark ratios against the still-planned edit as provisional.

Read each node's `readiness.credits` and the overview's `estimate`; a null price is unknown, not zero, and a price with `creditsEstimated` is a pre-input estimate to confirm once its upstream results exist. Compare first-pass cost plus expected retry and analysis/repair costs. With otherwise equal per-second pricing, fewer requested seconds reduce first-pass cost proportionally; mixed models or settings need the actual estimates. Minimize expected total cost of accepted footage, not node count alone. Generate and review a representative group before expanding a new grouping route within the existing budget. Preserve usable ranges and produce missing coverage separately when continuity and sound allow it.

Never connect a storyboard grid to a video node.

## Scene, reference, generated and edit time

Use the structured fields as the authority: previs owns scene windows, the video node's `shotWindows` owns planned take intervals, valid confirmations own observed shot identity and source intervals, and compose clips own final source ranges and cut length. Read those values when reviewing; do not maintain duplicate timing tables. Record only reasons and unresolved choices in production notes. Distinguish these time bases:

- **Scene window**: previs node, Shot ID and global start/end. Its export starts at local time 0: scene [4, 8] becomes reference [0, 4]. Use the scene timeline for action timing and the sound plan for sound events.
- **Reference duration**: the exported window, within the selected model's input limits. This is distinct from output duration.
- **Planned take intervals**: output-local `shotWindows`, rebased from the selected scene windows and ordered within the take. Wan extensions add the trusted source length; Seedance extensions start at 0. Use the canvas model reference's [extension timing](https://klox.ai/agent/skills/canvas/references/video-models.md#timing-an-extension).

- **Cut length**: how long the shot plays in the episode, saved as its compose clip duration.
- **Requested duration**: what the clip node asks the model for. It follows the model's allowed values, covers the combined planned picture use of the shots it serves plus necessary trim handles, and is long enough for every line generated in it, including the part heard over later shots. A 2-second shot on a model whose minimum is 4 seconds requests 4.
- **Source in and out**: where the edit takes the shot from inside the generated clip.

For an independent clip, prefer matching the reference and requested durations when using previs. For an extension, match the continuation reference to the new part; Wan's repeated source adds output duration without needing extra hold action. Inspect the actual generated timing. When the request is longer than the cut, use an explicit same-camera waiting/hold window that fits the model, then trim the result. Do not slow the action or change shared downstream scene events just to fill a model minimum. There is no automatic tail-hold export setting today: use a valid window with a real hold, or a locally prepared reference when accessible. Several shots may use one multi-cut take, each with its own inspected source in/out. The supported maximum is a ceiling, not a target; avoid uniform 4–5-second requests for short coverage when a shorter legal request or a compatible group serves it better.

## Which inputs a clip gets

A shot that has a previs Shot uses it as the blocking authority. There is no keyframe stage: identity, look, location, state and voice reach the clip through its asset nodes.

This is the models' white-model reference/rendering route with subject and location references. Use the canvas skill's [white-model workflow](https://klox.ai/agent/skills/canvas/references/video-models.md#white-model-reference-and-rendering) before writing prompts: preserve the spatial and motion plan, supply appearance through assets, and inspect limb motion in the exported reference. Add unmodeled performance from the Shot notes without treating those notes as animation evidence.

- **Direct route** (default; the first generation of a continuous shot, a cut to another camera, an insert):
  1. Connect the previs node to the clip's `video` input with its Shot (`connections[].shot`), or with the ordered list of Shots for a group. Klox exports it as a grey stand-in video, sends it as the blocking and camera reference and names each coloured stand-in after the actor's asset, so the prompt neither maps colours nor repeats the blocking beat by beat: it adds performance, expression, light, mood and sound.
  2. Connect the asset nodes of the characters and location, with their state and state images, and any separately needed object references; a reviewed state image can carry an included prop when its accepted design is clear enough for this shot (asset-design, State images). Connect the scene's tone frame on `image` with purpose `tone`. The location's references carry the place; make sure they face the camera direction this Shot uses.
  3. For a grouped generation, follow the canvas skill's [Shot connection and reference-mapping procedure](https://klox.ai/agent/skills/canvas/references/previs.md#connect-a-shot) and write timed sections that join end to start, each naming the reference its cut follows, e.g. with S03 → video1 and S04 → video2: `(0–3 s) S03: follow @[S03 blocking](video:1) …`, `(3–5 s) cut to S04: follow @[S04 blocking](video:2) …`. The model may blend references or ignore a cut, so review a representative group first.

  Pick a model listed in `referenceVideoRoutes`, keep each Shot and all reference videos together within its reference limits, and check every combination limit.

- **Extension** (the later part of one continuous shot that one generation cannot hold):
  1. Connect the earlier clip's video node to this clip's `video` input with purpose `extend`; Klox tells the model to continue it from its last frame and sends the adaptive aspect ratio (the node's ratio does not apply). Optionally connect the previs Shot covering the continuation as its blocking reference, and the same asset nodes.
  2. Use a model whose `get_capabilities` → `referenceVideoRoutes[model].extend` is set, and the same model as the earlier clip for the whole chain. When `outputIncludesSource` is true (Wan 3.0) the output repeats the earlier clip first: request its length plus the new part (within 30 s together with the other reference videos), write `shotWindows` after it, and the edit starts after it; credits cover the repeated seconds too, so make the first part as long as the model holds well. When false (Seedance 2.5) request only the new part.
  3. Place the join between two lines. The prompt describes only what happens next — new action, lines and changes — continuing the earlier clip's emotion and camera; appearance comes from the clip and the assets.
  4. Generate an extension only after its earlier clip is reviewed (in a production run, past its clip gate). When an earlier clip changes, every later one goes out of date (`extendSource`) and is regenerated in order.

- **No previs** (a simple insert or empty shot): connect the assets and describe framing and action in the prompt; a sketch on `image` with purpose `layout` can set the composition.
- **Keyframe route** (optional, only with a recorded reason: an exact hand contact, text that must read): make the keyframe (storyboard.md, Optional keyframes) and connect it where `referenceVideoRoutes[model].openingFrame` says: `firstFrame` → as `firstFrame` (then connect no asset nodes; the keyframe carries them); `image` → on the `image` input with purpose `opening` beside the assets (a prompted start, not a strict first frame). A clip has one opening frame and never both an opening frame and a video to extend.
- **Cut to another camera**: an independent clip on the direct route. Do not extend across a cut or reuse the previous camera's last frame.

Stay within the model's limits: duration range, reference counts, prompt length.

Run the canvas skill's pre-generation checks on every clip. Start the action from the planned start state, and write the end state as something the action reaches. Name the speaker of every line.

## Audio production

For groups assigned dialogue or event sounds, use a video model that generates picture and audio together. Check `get_capabilities` for audio generation and reference-audio support before setting up the clip. Enable audio for those sound-source groups; if the chosen model cannot supply the assigned audio, choose a compatible route before production. For pure reaction or picture coverage with no assigned sound, set `generateAudio: false` when supported; otherwise plan to mute its native audio in the edit. Prompting silence is not equivalent to disabling audio. For clips with dialogue, prefer a model that also takes reference audio; without it, each character's voice can drift between clips, so review voice consistency shot by shot.

Before generation, check each grouping-plan row against the saved node options and sound assignments. A missing audio-setting entry, a sound-source group with audio disabled, or an unassigned group with audio enabled when the route supports disabling it fails the production handoff. When the route cannot disable audio, record that capability exception and the explicit edit mute plan. This check is independent of whether shots are grouped.

The prompt carries the clip's dialogue verbatim, with speaker, delivery and timing. Distinguish visible speech, off-screen speech and voice-over; only the visible speaker should lip-sync. Connect accepted character voice references where supported, and keep each character's voice direction consistent across clips. Verify the generated audio for complete wording, correct speaker, voice consistency and synchronization with visible speech.

Each sound-source group generates only the dialogue and event sounds the sound plan assigns to it, dry and close-mic, with no ambience, room tone or music: the edit lays continuous ambience and music under the whole scene, and a clip that brings its own room tone jumps at every cut. A clip that carries over another shot's sound generates nothing of it. Dialogue that continues across a cut plays from its source clip in the edit, so its own take is never re-spoken by another clip.

## Prompt structure

Write the prompt in one language, with dialogue quoted verbatim in the language it is spoken. In this order:

1. **Subjects and reference mapping**: Klox already lists each subject's references, explains opening, layout, tone and extend inputs, and names each previs stand-in; identify only other ordinary references. With few subjects, connect their assets in the order they first appear.
2. **Shot-specific constraints** not already carried by assets or their state images. Keep identity and look locks in the asset descriptions and use them during review; do not paste them into every clip prompt. For an extension, describe only new action and state changes, preserving the source and connected assets.
3. **Action**: from the planned start state (for an extension, from where the earlier clip ends), the shot's action (one move or a short chain) with its trigger, contact and landing, then the secondary reaction (the listener's face, cloth, hair, dust).
4. **Camera**: with previs, retain its selected camera and temporal intent without writing a second camera path; without previs, describe the shot list's camera and timing. State one continuous shot when cuts are not intended, and "hard cut" between the sections of a multi-cut group.
5. **Sound**: state the audio assignment; for sound-source groups, use the sound block below. Every line this clip is the source of, with speaker, delivery and timing, quoted once, verbatim from the screenplay; mark visible speech, off-screen speech and voice-over. Each event this clip is the source of, with its trigger, material, force, count and natural decay. Name the sounds that an earlier shot already made and this one must not repeat.
6. **End state**: each covered shot's end state, reached within its planned segment; hold the final group's end state through any requested trim handle.
7. **Text**: "no subtitles, captions or overlaid text". If the shot shows in-world text (a phone screen, a sign), add "keep the text on the <surface> unchanged" (see Text below).

For groups generating assigned audio, use the sound block at the start and again at the end (models ignore a single no-music line):

```text
Sound: only the dialogue, breaths and the listed action sounds. Dry, close-mic dialogue, minimal reverberation. No ambience, no room tone, no background music, no score, no transition sounds.
...
End: only the listed dialogue and action sounds; no music.
```

Keep audio enabled on groups supplying assigned dialogue or events; handle unwanted music through the sound-repair procedure. Audio-free coverage instead describes silent performance and uses the audio setting above.

For a multi-cut generation, write contiguous output-local timed sections, preferably in whole seconds: `(0–3 s) Shot 1, insert: …`. Derive precise `shotWindows` by rebasing the selected scene windows into the planned take; do not copy their global scene timestamps. For an extension, follow the canvas model reference's [extension timing](https://klox.ai/agent/skills/canvas/references/video-models.md#timing-an-extension), including Wan's source offset. A clip that generates no line says "No dialogue" even with audio off.

Keep the prompt free of process notes ("this is a test", "keep consistent with the storyboard"), file names and checklists. State the wanted visible result; keep negatives to the few that are needed (no subtitles, no music, no extra people).

## Text

Two kinds, two routes:

- **Overlay text** (captions, titles such as "8 HOURS EARLIER", chat bubbles, system panels) is never generated. It is added in the edit.
- **In-world text** on a surface in the scene: keep it short, write it exactly, and when it must read give the clip a reference image of it (or a keyframe, with that reason). If the model garbles it, cover it in the edit (replace the screen in post, or cut to an insert) instead of rerolling.

## Dialogue capacity

Estimate the speaking time of every line at the normal rate and make sure it fits the requested duration with room for the reaction. Models that run out of time drop the rest of the line without any error, and some models rewrite prompts before generating. After every clip, check that each line is spoken completely and verbatim. A line that spans several shots is generated once, in the speaker's clip, and the edit lays that audio under the other shots. The other shots' prompts describe the listener reacting in silence, and never mention the line, even as off-screen speech; otherwise the model speaks it again in a different take.

## Production

1. Show the plan: which nodes, how many seconds, the credit estimate, a credit ceiling, and the retry cap (for example two retries per shot).
2. Generate with `run_nodes` and the agreed `maxCredits`. Start with the hardest scene (usually dialogue with touch, or a transformation) as a test, review it, then the rest.
3. Review the whole generated clip against its plan and the previs reference where available: right start, the shot's action, right end within the cut length, identity and locks held, no captions or music, no extra cuts; for an extension, the join where the edit cuts (drama SKILL, Clips → edit). For exact previs moments, use the node's `reviewUrl` and the canvas skill's [frame-review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page); dense samples around an event help compare blocking but do not replace watching the generated clip's motion. Every assigned line complete and verbatim, the correct speaker and consistent voice, and visible speech synchronized with the performance. If the previs needs repair, freeze its baseline before changing it, compare after saving, and recheck affected clips and production export freshness.
4. When a clip fails, classify the failure before retrying, and fix it where it belongs:

   | Cause       | Signs                                                                                                         | Fix in                                                                          |
   | ----------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
   | Input       | Wrong appearance, missing location direction, absent or competing asset references                            | Stage 2 or this stage: repair assets or inputs                                  |
   | Previs      | Wrong scale, blocking, action timing, occlusion or camera in the reference                                    | Stage 3: change the scene/Shot, recheck the timing cut and affected clip inputs |
   | Prompt      | The prompt contradicts the shot, misses the action or end state, misquotes a line, leaves room for extra cuts | This stage: rewrite against the shot list                                       |
   | Model limit | The model cannot do this (a transformation, precise hand contact, long speech) or ignores a supported input   | This stage: change the model or route; or stage 3                               |
   | Design      | The action is too complex for one shot, or depends on a fragile detail                                        | Stage 3: simplify, split, move the detail into an insert                        |
   | Story       | The shot works but the moment does not                                                                        | Stage 1                                                                         |
   | Variance    | Inputs and prompt are sound; the result is just unlucky                                                       | Retry once with a new idempotency key                                           |

   Stay within the authorized retry cap; during an active production run, also respect the shared per-check limit. Stop repairing that shot/check at the limit, record the classification, and continue independent work that still fits the scope and budget.

5. For takes with `shotWindows`, run `check_cuts` and confirm inspected source intervals before replacing rough-cut placeholders. Follow the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement); cut timing alone does not identify a shot. Record failure causes and lasting decisions in the production log, deriving spend and attempt metrics from actual tasks.

## When a sound check fails

Run a sound check node on every accepted clip; `get_sound_checks` turns its report into a status per line and event. It hears the words and tags sounds such as music. Music it tags is a failure; music it did not tag is only undecided, since quiet music under dialogue may go untagged. It cannot judge an event's material and count, room tone, or double plays in the film either; undecided checks follow the run's policy. For each check node, set `soundPlanNodeId` explicitly when the canvas has several scene plans. Use `run_node` with that failed check as `checkItem` on every paid repair during an active production run; do not put repairs in `run_nodes`, which cannot attribute them to a check. Use the following remedies only when the evidence identifies an actual defect. An undecided check for an unsupported property is not evidence that regenerating will help: follow its policy, declare only `exception_allowed` items through `declare_check_exception`, or leave the required listening decision unresolved. A clip report checks the source take; the film's release also checks whether that exact timeline plays the reported line interval. A line reported as outside the timeline is an edit problem when the source is correct: reuse its valid clip report, repair the edit, then render and check the revised film. Repair in this order:

| Problem                                                    | Try, in order                                                                                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| A correct source line is missing or cut off in the edit    | Restore its complete source interval on the picture or audio track, check mute and overlaps, then render and check the revised film |
| A line is misspoken, cut off or missing in the source take | Repair the prompt or allow more speaking time, then regenerate the source clip; review and regenerate its extensions in order       |
| Music or a transition sound in the clip                    | Trim the affected range in the edit → regenerate → keep the voice (voice isolation) and add back the events the plan needs          |
| An event missing or heard the wrong times                  | Regenerate the source clip → if the clip has no dialogue, mute that range and add the effect                                        |
| A tail clashing with the next line                         | Move the next line after the tail                                                                                                   |
| Room tone jumps between shots of a scene                   | Regenerate the shot that jumps; continuous ambience covers only slight differences                                                  |

Voice isolation removes every non-voice sound, the wanted events included. Replace the affected sound in the compose timeline, mute the overlapping original sound, and check the resulting film against that scene's plan. Do not recheck only the unchanged original video and claim it proves the isolated replacement. A transcript cannot establish the correct speaker, voice identity, lip sync, or exact event count; record those as unverified without separate inspection.

# Stages 4–5 · Clip prompts and production

## Generation groups before video nodes

Keep edit Shot IDs independent of generation units. Before creating video nodes, compare neighbouring shots as possible groups: same scene and light, compatible character and prop states, continuous action or a complete dialogue passage, and tolerable drift in generated cut points. Dialogue is eligible when speaker identity, voice and visible lip sync can be checked throughout. A group may supply several edit shots, each retaining its own dramatic job and source range.

Neighbouring shots of one continuous shot (storyboard.md, Continuous shots) are the strongest candidates: generate them as one group when one generation can hold them, otherwise as a first group plus extensions. Start by considering 2–4 shots over 6–15 seconds. Use 15–30-second groups only when supported by the current route and the passage is simple, coherent and easy to review. These are starting suggestions, not required lengths or model capability tables; read `get_capabilities` for actual limits. Keep high-risk contact, critical prop details, state reveals, strict lip-sync moments and shots needing independent repair separate when a failed detail would force an expensive group retake. A single-shot generation remains appropriate when that is the cheaper reliable route.

Write an episode generation grouping plan in existing text nodes for the decisions: why shots share a group, the model/input route, which group each extension continues and where to split on failure. Keep stable Shot IDs independent of node IDs. Store planned local intervals on the video node as `updateNodes[].shotWindows` with full `{previsNodeId, shotId}` references; use the scene sound plan for assigned source nodes and the node options for requested duration and audio settings. After generation, confirmed intervals and the compose timeline own observed source ranges; keep decision prose in the text plan and read operational values from their structured fields.

Target a **first-pass footage ratio** (initial requested video seconds / planned picture seconds) of about 1.3 or less. A higher value triggers review and a recorded reason, with allowances for complete dialogue, sound tails over other pictures and high-risk coverage may justify it. Also report the **actual generation ratio** (requested video seconds across all attempts / final picture seconds). Keep both in the production log with group count, retake rate (groups needing another attempt / groups attempted), actual credits and the causes of excess or retries. During production, mark ratios against the still-planned edit as provisional.

Read each node's `readiness.credits` and the overview's `estimate`; a null price is unknown, not zero, and a price with `creditsEstimated` is a pre-input estimate to confirm once its upstream results exist. Compare first-pass cost plus expected retry and analysis/repair costs. With otherwise equal per-second pricing, fewer requested seconds reduce first-pass cost proportionally; mixed models or settings need the actual estimates. Minimize expected total cost of accepted footage, not node count alone. Generate and review a representative group before expanding a new grouping route within the existing budget. Preserve usable ranges and produce missing coverage separately when continuity and sound allow it.

Use an inspected single panel when a shot needs a storyboard layout reference.

## Scene, reference, generated and edit time

Use the structured fields as the authority: previs owns scene windows, the video node's `shotWindows` owns planned take intervals, valid confirmations own observed shot identity and source intervals, and compose clips own final source ranges and cut length. Read those values when reviewing. Record only reasons and unresolved choices in production notes. Distinguish these time bases:

- **Scene window**: previs node, Shot ID and global start/end. Its export starts at local time 0: scene [4, 8] becomes reference [0, 4]. Use the scene timeline for planned key event windows and the sound plan for sound events; natural performance and fine timing remain flexible.
- **Reference duration**: the exported window, within the selected model's input limits. This is distinct from output duration.
- **Planned take intervals**: output-local `shotWindows`, rebased from the selected scene windows and ordered within the take. Wan extensions add the trusted source length; Seedance extensions start at 0. Use the canvas model reference's [extension timing](https://klox.ai/agent/skills/canvas/references/video-models.md#timing-an-extension).

- **Cut length**: how long the shot plays in the episode, saved as its compose clip duration.
- **Requested duration**: what the clip node asks the model for. It follows the model's allowed values, covers the combined planned picture use of the shots it serves plus necessary trim handles, and is long enough for every line generated in it, including the part heard over later shots. A 2-second shot on a model whose minimum is 4 seconds requests 4.
- **Source in and out**: where the edit takes the shot from inside the generated clip.

For an independent clip, prefer matching the reference and requested durations when using previs. For an extension, match the continuation reference to the new part; Wan's repeated source adds output duration without needing extra hold action. Inspect the actual generated timing. When the request is longer than the cut, use an explicit same-camera waiting/hold window that fits the model, then trim the result. Keep the action's natural pace and shared event continuity while providing usable trim handles. Represent any tail hold through a valid scene window or an accessible locally prepared reference. Several shots may use one multi-cut take, each with its own inspected source in/out. Choose the requested duration from usable coverage needs and current model limits, grouping compatible short shots when that improves cost and reliability.

## Which inputs a clip gets

A shot that has a previs Shot uses it as the blocking authority. Identity, look, location, state and voice reach the clip through its asset nodes as the default route.

This is the models' white-model reference/rendering route with subject and location references. Use the canvas skill's [white-model workflow](https://klox.ai/agent/skills/canvas/references/video-models.md#white-model-reference-and-rendering) before writing prompts: preserve the spatial and motion plan, supply appearance through assets, and inspect limb motion in the exported reference. Use Shot notes to specify generated performance, then review the take for its execution.

- **Direct route** (default; the first generation of a continuous shot, a cut to another camera, an insert):
  1. Connect the previs node to the clip's `video` input with its Shot (`connections[].shot`), or with the ordered list of Shots for a group. Klox exports it as a grey stand-in video, sends it as the blocking and camera reference and names each coloured stand-in after the actor's asset, so subject mapping is supplied automatically. Use the prompt to reinforce story-critical spatial relationships, action causality and continuous states, then add performance, expression, light, mood and sound. Ordinary travel and staging follow the previs; use the canvas skill's [spatial and causal writing guidance](https://klox.ai/agent/skills/canvas/references/prompt-writing.md#keep-the-spatial-meaning-and-action-causality-readable).
  2. Connect the asset nodes of the characters and location, with their state and state images, and any separately needed object references; a reviewed state image can carry an included prop when its accepted design is clear enough for this shot (asset-design, State images). Connect the scene's tone frame on `image` with purpose `tone`. The location's references carry the place; make sure they face the camera direction this Shot uses.
  3. For a grouped generation, follow the canvas skill's [Shot connection and reference-mapping procedure](https://klox.ai/agent/skills/canvas/references/previs.md#connect-a-shot) and write timed sections that join end to start, each naming the reference its cut follows, e.g. with S03 → video1 and S04 → video2: `(0–3 s) S03: follow @[S03 blocking](video:1) …`, `(3–5 s) cut to S04: follow @[S04 blocking](video:2) …`. The model may blend references or ignore a cut, so review a representative group first.

  Pick a model listed in `referenceVideoRoutes`, keep each Shot and all reference videos together within its reference limits, and check every combination limit.

- **Extension** (the later part of one continuous shot that one generation cannot hold):
  1. Connect the earlier clip's video node to this clip's `video` input with purpose `extend`; Klox tells the model to continue it from its last frame and sends the adaptive aspect ratio (the node's ratio does not apply). Optionally connect the previs Shot covering the continuation as its blocking reference, and the same asset nodes.
  2. Use a model whose `get_capabilities` → `referenceVideoRoutes[model].extend` is set, and the same model as the earlier clip for the whole chain. When `outputIncludesSource` is true (Wan 3.0) the output repeats the earlier clip first: request its length plus the new part (within the current route's output and reference-duration limits), write `shotWindows` after it, and the edit starts after it; credits cover the repeated seconds too, so make the first part as long as the model holds well. When false (Seedance 2.5) request only the new part.
  3. Place the join between two lines. The prompt describes only what happens next — new action, lines and changes — continuing the earlier clip's emotion and camera; appearance comes from the clip and the assets.
  4. Generate an extension only after its earlier clip is reviewed (in a production run, past its clip gate). When an earlier clip changes, every later one goes out of date (`extendSource`) and is regenerated in order.

- **Prompt/layout route** (a simple insert or empty shot): connect the assets and describe framing and action in the prompt; a sketch on `image` with purpose `layout` can set the composition.
- **Keyframe route** (optional, only with a recorded reason: an exact hand contact, text that must read): make the keyframe (storyboard.md, Optional keyframes) and connect it where `referenceVideoRoutes[model].openingFrame` says: `firstFrame` → as `firstFrame` (the keyframe carries the subjects' appearance); `image` → on the `image` input with purpose `opening` beside the assets (a starting composition requested through the prompt). Choose one starting route: a single opening image or a source video to extend.
- **Cut to another camera**: an independent clip on the direct route. Start the new camera view as an independent generation from its own inputs.

Stay within the model's limits: duration range, reference counts, prompt length.

Run the canvas skill's pre-generation checks on every clip. Start the action from the planned start state, and write the end state as something the action reaches. Name the speaker of every line.

## Audio production

Use a video model that generates picture and scene sound together. Check `get_capabilities` for native audio and reference-audio support, then enable audio for usable dialogue, performance sounds, action effects, ambience and spatial acoustics. Reaction and establishing shots can supply their own scene sound. For intentionally picture-only coverage, choose the carried native source for the edit and set `generateAudio: false` where supported. Record the intended treatment when the route requires editing its audio afterward.

Before generation, compare each group's saved audio setting with its role in the edit. Assigned source dialogue and key events need audio enabled. Coverage with native audio can supply ambient and spatial detail even when it owns no sound-plan item. A deliberate picture-only group names the source that supplies its edit slot. Apply the same review to grouped and single-shot generations.

Write dialogue verbatim with its speaker and intended delivery. Mark on-camera speech, off-screen speech and voice-over; visible speech receives lip sync. A line can continue off screen or across a picture cut while the camera follows the planned composition. Connect accepted voice references where supported and review voice consistency, complete wording and lip sync.

Describe the scene's soundscape: source materials and triggers, foreground/background balance, source distance, room or open-air acoustics, occlusion and motion. Keep dialogue clear against the environment and synchronize key effects to visible actions. Let ordinary breaths, reactions and sound decay follow natural performance. Put particular timing, audibility or silence choices in the relevant shot. Post-production carries each approved source across cuts, balances levels, smooths ambience, repairs defects and adds music.

## Prompt structure

Write the prompt in one language, with dialogue quoted verbatim in the language it is spoken. In this order:

1. **Subjects and reference mapping**: Klox already lists each subject's references, explains opening, layout, tone and extend inputs, and names each previs stand-in; identify only other ordinary references. With few subjects, connect their assets in the order they first appear.
2. **Shot-specific requirements**: briefly reinforce story-critical spatial relationships, prop ownership and continuous states in agreement with the connected references. Use previs for ordinary travel and staging. Keep identity and look locks in the asset descriptions and use them during review as the authority for reusable appearance. For an extension, describe only new action and state changes, preserving the source and connected assets.
3. **Action and performance**: from the planned start state (for an extension, from where the earlier clip ends), describe the action’s trigger and intended result. For a dramatic exchange or emotional turn, carry the screenplay’s objective, delivery subtext and response relationship into the owning shot section; follow the canvas skill’s [performance guidance](https://klox.ai/agent/skills/canvas/references/prompt-writing.md#direct-performance-through-intention-and-response). Give listeners an active relationship to what they hear and let the model realize the intention through natural physical performance.
4. **Camera**: with previs, retain its spatial relationships, selected camera and key event order; let generation develop natural performance and fine timing; without previs, describe the shot list's camera and timing. Follow the canvas skill's [prompt writing principles](https://klox.ai/agent/skills/canvas/references/prompt-writing.md): leave transitions open unless the approved intent requires a specific cut or continuous shot.
5. **Sound**: state the audio assignment; for sound-source groups, use the global sound boundary below. Put every assigned line and event in its owning timed shot section, with speaker, delivery and timing, quoted once, verbatim from the screenplay; mark visible speech, off-screen speech and voice-over. Give events their trigger, material, force, count and natural decay. Keep event descriptions in their owning timed sections and identify any carried sound by its existing source.
6. **End state**: each covered shot's end state, reached naturally in sequence within the requested duration. Planned segment boundaries allow small drift; keep any requested trim handle usable with breathing and small movements with a natural resting performance.
7. **Text**: request a clean cinematic picture; captions and graphic overlays are added in the edit. If the shot shows in-world text (a phone screen, a sign), add "keep the text on the <surface> unchanged" (see Text below).

For groups generating assigned audio, put one global sound block at the end of the prompt. Keep the opening visual; describe each line and event in its timed shot section with the clip-wide assignment stated once:

```text
Global sound: perform the scripted dialogue and key events once, together with natural breaths, action sounds and the scene's ambience. Keep speech clear in the foreground and match sound distance, room response and movement to the scene and camera. Post-production handles joins, level balance, continuity and music.
```

Keep audio enabled on groups supplying native scene sound. Review the generated soundscape and handle confirmed defects through the sound-repair procedure. Intentional picture-only coverage uses its planned edit source.

For a multi-cut generation, use simple numbered headings (`Shot 1:`, `Shot 2:`) followed by contiguous output-local timed sections, preferably in whole seconds: `(0–3 s) Follow …`. Derive precise `shotWindows` by rebasing the selected scene windows into the planned take using output-local time. For an extension, follow the canvas model reference's [extension timing](https://klox.ai/agent/skills/canvas/references/video-models.md#timing-an-extension), including Wan's source offset. For reaction coverage, describe the listening performance and the intended ambient/spatial sound, then set the audio option for its edit role.

Write the prompt as the wanted visible and audible result. Keep process notes, file provenance and review checklists in the reply or their owning records.

## Text

Two kinds, two routes:

- **Overlay text** (captions, titles such as "8 HOURS EARLIER", chat bubbles, system panels) is added in the edit.
- **In-world text** on a surface in the scene: keep it short, write it exactly, and when it must read give the clip a reference image of it (or a keyframe, with that reason). If the model garbles it, cover it in the edit (replace the screen in post, or cut to an insert) through the chosen repair route.

## Dialogue capacity

Estimate the speaking time of every line at the intended delivery pace, then allow room for the listener to perceive, interpret and choose a response and for the resulting physical action. Follow the canvas skill's [emotional timing guidance](https://klox.ai/agent/skills/canvas/references/prompt-writing.md#give-emotional-turns-usable-time) when revising duration or grouping. Keep ordinary movement and secondary gestures open around the required spatial facts and end states. Models that run out of time drop the rest of the line without any error, and some models rewrite prompts before generating. After every clip, check that each line is spoken completely and verbatim. A line that spans several shots is generated once, in the speaker's clip, and the edit lays that audio under the other shots. For the other shots, describe the listener's silent reaction and carry the approved source audio in the edit.

## Production

1. Show the plan: which nodes, how many seconds, the credit estimate, a credit ceiling, and the retry cap (for example two retries per shot).
2. Generate with `run_nodes` and the agreed `maxCredits`. When production risk warrants a pilot, choose a representative high-risk passage, review it, then expand.
3. Review the whole generated clip against its plan and the previs reference where available: right start, the shot's action, right end within the cut length, identity and locks held, readable character objectives, subtext and motivated responses, clean picture, assigned sound and intended cut structure; for an extension, the join where the edit cuts (drama SKILL, Clips → edit). For exact previs moments, use the node's `reviewUrl` and the canvas skill's [frame-review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page); use dense event samples for blocking and continuous generated-clip playback for motion. Every assigned line complete and verbatim, the correct speaker and consistent voice, and visible speech synchronized with the performance. If the previs needs repair, freeze its baseline before changing it, compare after saving, and recheck affected clips and production export freshness.
4. When a clip fails, classify the failure before retrying, and fix it where it belongs:

   | Cause       | Signs                                                                                                       | Fix in                                                                          |
   | ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
   | Input       | Wrong appearance, missing location direction, absent or competing asset references                          | Stage 2 or this stage: repair assets or inputs                                  |
   | Previs      | Wrong scale, blocking, key event order, occlusion or camera in the reference                                | Stage 3: change the scene/Shot, recheck the timing cut and affected clip inputs |
   | Prompt      | The prompt contradicts the shot, misses the action, performance intention or end state, or misquotes a line | This stage: rewrite against the shot list                                       |
   | Model limit | The model cannot do this (a transformation, precise hand contact, long speech) or ignores a supported input | This stage: change the model or route; or stage 3                               |
   | Design      | The action is too complex for one shot, or depends on a fragile detail                                      | Stage 3: simplify, split, move the detail into an insert                        |
   | Story       | The shot works but the moment does not                                                                      | Stage 1                                                                         |
   | Variance    | Inputs and prompt are sound; the result is just unlucky                                                     | Retry once with a new idempotency key                                           |

   Stay within the authorized retry cap; during an active production run, also respect the shared per-check limit. Stop repairing that shot/check at the limit, record the classification, and continue independent work that still fits the scope and budget.

5. For takes with `shotWindows`, run `check_cuts` and confirm inspected source intervals before replacing rough-cut placeholders. Follow the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement); cut timing alone does not identify a shot. Record failure causes and lasting decisions in the production log, deriving spend and attempt metrics from actual tasks.

## When a sound check fails

Run a sound check node on every accepted clip; `get_sound_checks` turns its report into a status per line and event. It hears the words and tags sounds such as music. Music it tags is a failure; music it did not tag is only undecided, since quiet music under dialogue may go untagged. It cannot judge an event's material and count, room tone, or double plays in the film either; undecided checks follow the run's policy. For each check node, set `soundPlanNodeId` explicitly when the canvas has several scene plans. Use `run_node` with that failed check as `checkItem` on every paid repair during an active production run to preserve per-check repair attribution. Use the following remedies only when the evidence identifies an actual defect. An undecided check for an unsupported property is not evidence that regenerating will help: follow its policy, declare only `exception_allowed` items through `declare_check_exception`, or leave the required listening decision unresolved. A clip report checks the source take; the film's release also checks whether that exact timeline plays the reported line interval. A line reported as outside the timeline is an edit problem when the source is correct: reuse its valid clip report, repair the edit, then render and check the revised film. Repair in this order:

| Problem                                                    | Try, in order                                                                                                                                         |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| A correct source line is missing or cut off in the edit    | Restore its complete source interval on the picture or audio track, check mute and overlaps, then render and check the revised film                   |
| A line is misspoken, cut off or missing in the source take | Repair the prompt or allow more speaking time, then regenerate the source clip; review and regenerate its extensions in order                         |
| Music or a transition sound in the clip                    | Trim the affected range in the edit → regenerate → keep the voice (voice isolation) and restore the required events, ambience and spatial character   |
| An event missing or heard the wrong times                  | Regenerate the source clip → if the clip has no dialogue, mute that range and add the effect                                                          |
| A tail clashing with the next line                         | Balance the overlap or adjust the source interval for clear dialogue, preserving the intended dramatic timing                                         |
| Room tone jumps between shots of a scene                   | Smooth the native ambience join with suitable source ranges, level matching and fades; use a sound repair or retake when the mismatch remains audible |

Voice isolation produces a voice-only track. Restore the scene's required effects, ambience and spatial character when using it, replace the affected audio in the compose timeline, mute overlapping originals and check the resulting film against the scene plan. Verify speaker, voice identity, lip sync and exact event count through suitable listening and visual inspection; report those checks as awaiting evidence until inspected.

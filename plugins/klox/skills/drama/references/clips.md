# Stages 5–6 · Clip prompts and production

## One generation per shot by default

Make one video node per shot by default, using its approved scene window and visual inputs. Independent takes let the edit control cuts and let a failed shot be redone alone. Use the input route below; a keyframe is normally reviewed first, with verified direct asset-plus-previs routes as an explicit exception.

Group neighbouring shots into one multi-cut generation only when all of these hold: same scene and light, no dialogue or only off-screen voice, exact cut points do not matter (a montage, a chase), total within the chosen model's duration range (15 seconds and four cuts are useful starting limits, not capability guarantees). Each cut in the group still gets its own keyframe. Expect cut points to drift by half a second or more and later cuts to resemble their keyframes less.

Never connect a storyboard grid to a video node.

## Scene, reference, generated and edit time

Keep these apart in the shot list and cut list. Store them as production notes using existing IDs, not invented API fields:

- **Scene window**: previs node, Shot ID and global start/end. Its export starts at local time 0: scene [4, 8] becomes reference [0, 4]. Record the relevant planned action and sound events.
- **Reference duration**: the exported window, within the selected model's input limits. This is distinct from output duration.

- **Cut length**: how long the shot plays in the episode (from the storyboard).
- **Requested duration**: what the clip node asks the model for. It follows the model's allowed values, at least the cut lengths of the shots it serves, and long enough for every line generated in it, including the part heard over later shots. A 2-second shot on a model whose minimum is 4 seconds requests 4.
- **Source in and out**: where the edit takes the shot from inside the generated clip.

Prefer matching the reference and requested durations when using previs, but inspect the actual generated timing. When the request is longer than the cut, use an explicit same-camera waiting/hold window that fits the model, then trim the result. Do not slow the action or change shared downstream scene events just to fill a model minimum. There is no automatic tail-hold export setting today: use a valid window with a real hold, or a locally prepared reference when accessible. Several shots may use one multi-cut take, each with its own source in/out.

## Which inputs a clip gets

A shot that has a previs shot is generated from it; that is the main route. Use other routes for simple shots, strict starting-frame needs, or requirements the previs/reference route cannot satisfy; document the choice.

- **Previs route** (default for every shot in a scene with a previs node):
  1. Connect the previs node to the clip's `video` input with that shot (`connections[].shot`). Klox exports it as a grey stand-in video and sends it as the blocking and camera reference (positions, moves, timing, scale, camera move). The purpose notes already describe what the reference controls; identify which color is which subject and add action intent, expression and sound without specifying a conflicting camera move.
  2. Connect the shot's accepted keyframe as its opening picture, where `get_capabilities` → `referenceVideoRoutes[model].openingFrame` says: `firstFrame` → as `firstFrame`; `image` (the model cannot take a first frame beside reference media) → on the `image` input with `purpose: "opening"`, and Klox requests that the clip opens on it. This is a prompted reference, not a strict first-frame guarantee; verify the output. Do not repeat the purpose rule in the prompt. `null` means no opening-picture input beside video: use a verified direct route or choose another model.
  3. Connect required asset references and voices when that route permits them. An image-reference opening needs those subjects; a strict opening can carry appearance, but voice-reference compatibility is a separate check. Connect a location asset only when its reference does not fight the keyframe's framing.

  Pick a model listed in `referenceVideoRoutes`. Keep the previs shot within the model's reference-video duration range; choose a Shot for this clip's intended scene window. Check total reference duration and all combination limits, not just one file's duration.

- **First-frame route** (no previs shot; the clip generates no spoken line, or the model takes voice references together with a first frame): connect the keyframe as `firstFrame`. Connect no asset nodes; the keyframe already carries identity, look, location and state, so check those on the keyframe, not on the clip's connections.
- **Reference route** (no previs shot; the clip generates any spoken line on a model that does not take voice references with a first frame, or a multi-cut clip): connect the keyframe on the `image` input with `purpose: "opening"`, plus the asset nodes for the characters whose identity or voice must hold. A clip has one opening frame: in a multi-cut clip only the first cut's keyframe gets `opening`; connect the other cuts' keyframes with no purpose and say in the prompt which cut, and from which second, each one shows ("@image3 is cut 2, from 3 s").
- **Same-take continuation** (one continuous camera view split into generations): extract and review the previous take's actual last frame, use it on the legal opening route, and compare it to the next previs window's start. Repair a mismatch before generating; do not pass two competing motion references without a verified reason. This dependency waits for the previous take.
- **Cut to another camera**: derive the new opening from that camera at the appropriate shared scene time. Do not reuse the previous camera's last frame merely because the action continues across the cut. These coverage shots can be prepared independently.

Stay within the model's limits: duration range, reference counts, prompt length.

Run the canvas skill's pre-generation checks on every clip. Start the action from the reviewed opening state, and write the end state as something the action reaches. Name the speaker of every line.

## Audio production

Use a video model that generates picture and audio together. Check `get_capabilities` for audio generation and reference-audio support before setting up the clip. Enable audio when configurable; if the chosen model cannot generate audio, choose a compatible video model before production. For clips with dialogue, prefer a model that also takes reference audio; without it, each character's voice can drift between clips, so review voice consistency shot by shot.

The prompt carries the clip's dialogue verbatim, with speaker, delivery and timing. Distinguish visible speech, off-screen speech and voice-over; only the visible speaker should lip-sync. Connect accepted character voice references where supported, and keep each character's voice direction consistent across clips. Verify the generated audio for complete wording, correct speaker, voice consistency and synchronization with visible speech.

Dialogue and scene sound come from the video clips. Music and captions are added in the edit. Cross-cut dialogue may use an audio segment extracted from a generated clip; it is not a separately synthesized performance.

## Prompt structure

Write the prompt in one language, with dialogue quoted verbatim in the language it is spoken. In this order:

1. **Subjects and reference mapping**: which asset or stand-in color is which character. Opening, layout and tone purposes are already explained by Klox; identify ordinary references and timed later keyframes where needed.
2. **Continuity locks** of every look in the shot, verbatim.
3. **Action**: from the reviewed opening state, the shot's action (one move or a short chain) with its trigger, contact and landing, then the secondary reaction (the listener's face, cloth, hair, dust).
4. **Camera**: with previs, retain its selected camera and temporal intent without writing a second camera path; without previs, describe the shot list's camera and timing. State one continuous shot when cuts are not intended.
5. **Sound timeline**: room tone and each sound effect with its timing; "no background music". Every assigned line with speaker, delivery and timing, quoted once, verbatim from the screenplay. Mark visible speech, off-screen speech and voice-over explicitly.
6. **End state**: the shot list's end state, reached within the cut length and held to the end of the requested duration.
7. **Text**: "no subtitles, captions or overlaid text". If the opening frame shows in-world text (a phone screen, a sign), add "keep the text on the <surface> unchanged" (see Text below).

For a multi-cut generation, write timed sections that join end to start and add up to the duration: `(0:00–0:03) Shot 1, insert: …`, and list which reference image is which cut's frame before the sections.

Keep the prompt free of process notes ("this is a test", "keep consistent with the storyboard"), file names and checklists. State the wanted visible result; keep negatives to the few that are needed (no subtitles, no music, no extra people).

## Text

Two kinds, two routes:

- **Overlay text** (captions, titles such as "8 HOURS EARLIER", chat bubbles, system panels) is never generated. It is added in the edit.
- **In-world text** on a surface in the scene is part of the keyframe: write it exactly in the keyframe prompt, keep it short, and check it on the keyframe. In the clip, ask only that it stays unchanged. If the model garbles it, cover it in the edit (replace the screen in post, or cut to an insert made from the keyframe) instead of rerolling.

## Dialogue capacity

Estimate the speaking time of every line at the normal rate and make sure it fits the requested duration with room for the reaction. Models that run out of time drop the rest of the line without any error, and some models rewrite prompts before generating. After every clip, check that each line is spoken completely and verbatim. A line that spans several shots is generated once, in the speaker's clip, and the edit lays that audio under the other shots. The other shots' prompts describe the listener reacting in silence with room tone only, and never mention the line, even as off-screen speech; otherwise the model speaks it again in a different take.

## Production

1. Show the plan: which nodes, how many seconds, the credit estimate, a credit ceiling, and the retry cap (for example two retries per shot).
2. Generate with `run_nodes` and the agreed `maxCredits`. Start with the hardest scene (usually dialogue with touch, or a transformation) as a test, review it, then the rest.
3. Review the whole clip against its plan and previs playback where available, including important events between Screen-map samples: right start, the shot's action, right end within the cut length, identity and locks held, no captions or music, no extra cuts. Every assigned line complete and verbatim, the correct speaker and consistent voice, and visible speech synchronized with the performance.
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

   Stay within the retry cap; once it is reached, stop and report the classification instead of rolling again.

5. Record credits spent, attempts per shot and the failure causes for the production log.

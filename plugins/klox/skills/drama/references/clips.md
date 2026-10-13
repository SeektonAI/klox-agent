# Stages 5–6 · Clip prompts and production

## One generation per shot by default

Make one video node per shot, from that shot's accepted keyframe. Cuts then land exactly where the storyboard put them, and a bad shot is redone alone.

Group neighbouring shots into one multi-cut generation only when all of these hold: same scene and light, no dialogue or only off-screen voice, exact cut points do not matter (a montage, a chase), total at most 15 seconds and at most four cuts. Each cut in the group still gets its own keyframe. Expect cut points to drift by half a second or more and later cuts to resemble their keyframes less.

Never connect a storyboard grid to a video node.

## Three different lengths

Keep these apart in the shot list and the cut list:

- **Cut length**: how long the shot plays in the episode (from the storyboard).
- **Requested duration**: what the clip node asks the model for. It is a whole number within the model's range, at least the cut lengths of the shots it serves, and long enough for every line generated in it, including the part heard over later shots. A 2-second shot on a model whose minimum is 4 seconds requests 4.
- **Source in and out**: where the edit takes the shot from inside the generated clip.

When the request is longer than the cut, write the action to finish within the cut length and hold the end state for the rest; the edit trims it. Several shots may point at one multi-cut clip, each with its own in and out.

## Which inputs a clip gets

Choose the route first; each route carries the shot's consistency facts in a different way.

- **First-frame route** (the clip generates no spoken line, or the model takes voice references together with a first frame): connect the keyframe as `firstFrame`. Connect no asset nodes; the keyframe already carries identity, look, location and state, so check those on the keyframe, not on the clip's connections.
- **Reference route** (the clip generates any spoken line, on screen, off screen or voice-over, on a model that does not take voice references with a first frame; or a multi-cut clip): check the model contract in `get_capabilities`. Some models (Wan 3.0, MiniMax H3) do not take reference images or audio together with a first frame. Connect the keyframe (or each cut's keyframe) as an `image` reference, plus the asset nodes for the characters whose identity or voice must hold; say in the prompt which image is the opening frame. Connect a location asset only when its reference does not fight the keyframe's framing.
- **Continuation** (the next shot picks up the same motion): extract the last frame of the previous clip with ffmpeg, upload it, review it like a keyframe, and use it as this shot's opening frame on whichever route above applies; where the model takes reference video, connect the previous clip too for motion and sound continuity. Until the previous clip exists, the next one is not ready.

Stay within the model's limits: duration range, reference counts, prompt length.

Run the canvas skill's pre-generation checks on every clip. Start the action from the accepted keyframe's exact state, and write the end state as something the action reaches. Name the speaker of every line.

## Audio production

Use a video model that generates picture and audio together. Check `get_capabilities` for audio generation and reference-audio support before setting up the clip. Enable audio when configurable; if the chosen model cannot generate audio, choose a compatible video model before production. For clips with dialogue, prefer a model that also takes reference audio; without it, each character's voice can drift between clips, so review voice consistency shot by shot.

The prompt carries the clip's dialogue verbatim, with speaker, delivery and timing. Distinguish visible speech, off-screen speech and voice-over; only the visible speaker should lip-sync. Connect accepted character voice references where supported, and keep each character's voice direction consistent across clips. Verify the generated audio for complete wording, correct speaker, voice consistency and synchronization with visible speech.

Dialogue and scene sound come from the video clips. Music and captions are added in the edit. Cross-cut dialogue may use an audio segment extracted from a generated clip; it is not a separately synthesized performance.

## Prompt structure

Write the prompt in one language, with dialogue quoted verbatim in the language it is spoken. In this order:

1. **Opening frame**: which input is the opening frame, which asset is which character.
2. **Continuity locks** of every look in the shot, verbatim.
3. **Action**: from the keyframe's state, the shot's action (one move or a short chain) with its trigger, contact and landing, then the secondary reaction (the listener's face, cloth, hair, dust).
4. **Camera**: the shot list's camera line, with timing if it moves.
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
3. Review each clip against its shot: right start, the shot's action, right end within the cut length, identity and locks held, no captions or music, no extra cuts. Every assigned line complete and verbatim, the correct speaker and consistent voice, and visible speech synchronized with the performance.
4. When a clip fails, classify the failure before retrying, and fix it where it belongs:

   | Cause       | Signs                                                                                                         | Fix in                                                   |
   | ----------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
   | Input       | Wrong or weak keyframe, an asset without good references, a reference that brings unwanted text or people     | Stage 4 or 2: redo the keyframe or references            |
   | Prompt      | The prompt contradicts the shot, misses the action or end state, misquotes a line, leaves room for extra cuts | This stage: rewrite against the shot list                |
   | Model limit | The model cannot do this (a transformation, precise hand contact, long speech) or ignores a supported input   | This stage: change the model or route; or stage 3        |
   | Design      | The action is too complex for one shot, or depends on a fragile detail                                        | Stage 3: simplify, split, move the detail into an insert |
   | Story       | The shot works but the moment does not                                                                        | Stage 1                                                  |
   | Variance    | Inputs and prompt are sound; the result is just unlucky                                                       | Retry once with a new idempotency key                    |

   Stay within the retry cap; once it is reached, stop and report the classification instead of rolling again.

5. Record credits spent, attempts per shot and the failure causes for the production log.

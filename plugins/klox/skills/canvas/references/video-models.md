# Writing video prompts for Wan 3.0 and Seedance 2.5

Klox already writes the parts every prompt needs: which reference is which subject, what each purposed input (layout, tone, opening, extend) may and may not decide, and which coloured previs stand-in is which character. The shot prompt adds what those inputs cannot carry. This page holds the habits of the two models that take previs references and extend videos; `get_capabilities` remains the source for options and limits.

## White-model reference and rendering

Klox previs uses **white-model reference/rendering with subject and location references**: the exported greybox is a spatial and motion plan, and the asset images supply the finished subjects and place. This is the default route for previs-backed clips. It is submitted through the model's ordinary reference-video input with purpose `layout`; it needs no separate rendering mode or extra keyframe.

### What each input controls

| Input                               | Use it for                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Previs video (`layout`)             | Camera path and framing, shot order and timing, subject positions, facing, relative scale, blocking, and the supported action already animated |
| Character, location and prop assets | Identity, anatomy, costume, materials, architectural appearance and recognisable details; location references should agree with the previs set |
| State images and state text         | The subject's required starting condition, following the asset state rules                                                                     |
| Tone reference and shot prompt      | Finished light, colour, style, expression, performance detail, dialogue and sound                                                              |

The coloured figures identify subjects; their colours are not costume colours. Neutral preview lighting, simplified body and furniture shapes, grey surfaces and viewport helpers are not the intended final look. Preserve the planned geography and scale while taking detailed shape and appearance from the assets. Fix a disagreement between a location reference and its set before generation rather than asking the model to reconcile two different rooms.

### Build the shot prompt

1. Name the intended finished scene and the previs video whose blocking and camera to follow. Klox's server already explains `layout` and binds actor colours to connected subjects from their asset IDs; check those associations and connect the assets. For an external white-model reference without that mapping, name the stand-in-to-subject correspondence explicitly.
2. Preserve the planned movement, spatial relationships, camera and shot structure. For a single shot, say it is continuous; for a group, name each reference in its timed section. Do not invent a second camera path or re-describe every animated step.
3. Add the performance the greybox cannot show: expression, breathing, gaze nuance, cloth response, required dialogue and specific sound. Describe an unmodeled action from its starting state to its visible result, consistent with the scene and its Shot notes. A note is an instruction for generation, not proof that the action was animated or will succeed.
4. Before submitting, inspect the actual exported reference for held or stiff limbs, sliding, wrong facing, failed contact and unwanted guides or labels. Models can imitate these defects. Fix supported motions in previs first; precise unsupported interactions need a reviewed state/contact reference, an optional keyframe with a reason, or different coverage. Prompt detail alone does not repair bad blocking.

Example shot text, after Klox's generated subject and input-purpose notes (replace mentions with this node's actual inputs):

```text
A finished live-action clinic scene. Use @[Clinic blocking](video:1) for the
camera, relative scale, positions and timing. One continuous shot, no added cuts.
Use the connected character and location references for the finished appearance.
Lena hesitates before answering, her jaw tightening as she looks toward the door.
Warm practical light, natural skin and fabric detail.
Lena whispers: "Who's out there?" Lip sync to her line.
```

Apply the production's sound rules to that example. With both `extend` and `layout`, the earlier finished clip owns the join and continuity; the white-model video guides only the new part. Follow [extension timing](#timing-an-extension) for its output offset.

### Model-specific emphasis

- **Wan 3.0:** its white-model example describes a detailed clay scene receiving new surface treatment while keeping existing shapes and illumination. Klox's coarse stand-ins need asset-driven anatomy, faces, clothing and scene detail, so preserve their spatial and temporal plan without copying that example's blanket geometry and light locks. State concrete finished materials or lighting only where the references leave a choice.
- **Seedance 2.5:** the guide distinguishes coarse blocking from detailed rerendering and warns that visible limbs or wings with incomplete animation can remain stiff. Klox's articulated stand-ins need their intended supported action animated and reviewed. Do not request removal of their limbs or claim they are torso-only; repair the reference or change the shot when its motion is inadequate.

## Both models

- **Shape.** One sentence of overview (who, where, what happens, genre or style, any special camera), then timed sections, then the constants that hold throughout (camera habit, environment, sound, mood). Skip any part the inputs already settle.
- **Timestamps.** Use output-local time for timed prompt sections and `shotWindows`; see [Timing an extension](#timing-an-extension) for the repeated-source offset. For an independent clip, sections start at 0 and cover the requested duration without gaps or overlaps: `(0–3 s) … (3–5 s) …`. Prefer whole-second prompt sections of roughly 2–5 seconds, but preserve an exact fractional extension boundary when needed. Do not use timestamps for frequency ("shakes her head three times in one second"). Keep structured `shotWindows` precise; do not copy global scene times into them.
- **With a previs reference**, follow the [white-model workflow](#white-model-reference-and-rendering): let the reference set blocking, timing and camera, and add the finished performance, light and sound.
- **Action and expression.** Summarise ordinary action ("they grapple at close range") and detail only the one or two moves the shot is about. Describe expressions as visible behaviour ("a tight smile, eyes still wet"), not idioms.
- **Camera terms.** Common sizes, angles and moves can be named directly (close-up, low angle, push in, orbit, handheld, one continuous take). Explain a rare term in plain words after it. Give a transition its moment and manner ("at 5 s, a whip pan left into the next shot").
- **Dialogue.** One spoken line per sentence with its speaker: `Lena says: "Who's out there?"`. Mark off-screen speech and voice-over. A clip with no line says `No dialogue`; otherwise the model may invent one.
- **Unwanted music.** When a clip must carry no music, say so at the start and again at the end, naming the kinds (music, background music, score, melody, synth pads); a single "no BGM" is often ignored.
- **Text in the picture.** Keep it short and exact. When it must read, give the clip an image of the text as a reference; spelling it letter by letter in order also helps.
- **Extensions.** Write only what happens after the join: the new action, lines and changes, continuing the earlier clip's emotion and camera. Appearance comes from the extended clip and the assets; do not restate it.

## Timing an extension

The reference video starts at its own local 0. The requested `duration`, prompt section times, `shotWindows` and observed source in/out refer to the generated output. A continuation's previs reference covers only the new part; do not stretch it to the full Wan output duration.

For a 6-second source and a 4-second continuation:

| Model        | Requested `duration` | New action in the prompt and planned `shotWindows` | Default edit range |
| ------------ | -------------------- | -------------------------------------------------- | ------------------ |
| Wan 3.0      | 10 seconds           | 6–10 seconds of the output                         | 6–10 seconds       |
| Seedance 2.5 | 4 seconds            | 0–4 seconds of the output                          | 0–4 seconds        |

For Wan, identify 0–6 seconds as the supplied source to retain, then describe only the new action at 6–10 seconds; do not re-script the source's dialogue or action. If the trusted source length is fractional, use that exact join in the plan and identify it explicitly in the prompt. Within the new part, ordered previs windows are rebased and accumulated from the output's continuation start. Every input and output must still satisfy the current model limits; the table explains time coordinates, not a capability limit.

## Wan 3.0

- **Order.** Overview → reference mentions → sections `(start–end s)` with subject, setting, motion and look → dialogue → sound effects and music → style and mood → a short negative list at the end.
- **One take or cuts.** Open with "single continuous shot" when nothing should cut. Between sections that cut, end the section with "hard cut"; for a section that continues, say it carries on seamlessly from the previous section's last frame.
- **Sound.** Material and weather words (wet boards underfoot, a flag snapping) bring their own sounds; write a specific effect as its own sentence, timed if needed. For music, leave it to the model, specify it, or say "No background music".
- **Negatives.** List only what must not appear (no subtitles, no watermark, no face distortion, no extra fingers, no axis jumps), without repeating anything already stated positively.
- **Lens.** Focal length and depth of field read well ("85 mm, shallow depth of field").
- **Extending.** The output repeats the extended video and then continues it: request the source's length plus the new part. Input and output together stay within the model's limit.

## Seedance 2.5

- **Timestamps** are honoured in whole seconds (Seedance 2.0 only followed shot numbers).
- **Negatives** work reliably only for subtitles and audio ("no subtitles", "no background music, only ambience and action sounds"). Elsewhere describe what should be there.
- **Unwanted subtitles.** Do not repeat a line and then add tone or gesture notes about it; write `Lena (trembling): "Who's out there?"`. A reference video that shows subtitles brings them back.
- **Glowing eyes.** Strong emotion words ("fanatical", "utterly shocked") can make pupils glow. For a scene that must keep natural eyes, say so first and use plain emotion words. Where a glow is intended (a supernatural eye change), confine it to that shot and moment.
- **Swapped characters.** In a multi-character clip a character can take another's reference. Connect subjects in the order they first appear.
- **How many subjects.** One to five subjects hold well; beyond five, prefer single-view references over multi-view sheets.
- **Texture artefacts.** Reference images far larger than the output resolution can print fingerprint-like patterns on grass and foliage.
- **Audio artefacts.** Words about water, waves or echo can add bubbling or ringing to the soundtrack; leave them out unless the scene needs them.
- **Grey-model references.** Follow the [white-model workflow](#white-model-reference-and-rendering), including its check for incomplete limb animation.
- **Extending.** The output is only the continuation: request the new part's length. A source that Seedance 2.5 made itself joins with the least change in look and loudness, so keep a chain on one model.

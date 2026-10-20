# Writing video prompts for Wan 3.0 and Seedance 2.5

Klox already writes the parts every prompt needs: which reference is which subject, what each purposed input (layout, tone, opening, extend) may and may not decide, and which coloured previs stand-in is which character. The shot prompt adds action intent, performance, light and sound. This page holds the habits of the two models that take previs references and extend videos; `get_capabilities` remains the source for options and limits.

For prompt structure, repeated asset mentions, timed shot sections and sound placement, follow [prompt writing principles](prompt-writing.md). Keep transition choices aligned with the approved production intent.

## White-model reference and rendering

Klox previs uses **white-model reference/rendering with subject and location references**: the exported greybox is a spatial and motion plan, and the asset images supply the finished subjects and place. This is the default route for previs-backed clips. It is submitted through the model's ordinary reference-video input with purpose `layout` as the default previs-backed route.

### What each input controls

| Input                               | Use it for                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Previs video (`layout`)             | Spatial relationships, relative scale, travel paths, camera path and framing; key events and their order. Shot windows guide pacing            |
| Character, location and prop assets | Identity, anatomy, costume, materials, architectural appearance and recognisable details; location references should agree with the previs set |
| State images and state text         | The subject's required starting condition, following the asset state rules                                                                     |
| Tone reference and shot prompt      | Finished light, colour, style, expression, performance detail, dialogue and sound                                                              |

The coloured figures identify subjects; their colours identify the corresponding assets. Use the connected assets and tone reference for finished appearance and lighting. Preserve the planned geography and scale while taking detailed shape and appearance from the assets. Fix a disagreement between a location reference and its set before generation so the model receives a consistent room design.

### Build the shot prompt

1. Name the intended finished scene and the previs video whose blocking and camera to follow. Klox's server already explains `layout` and binds actor colours to connected subjects from their asset IDs; check those associations and connect the assets. For an external white-model reference without that mapping, name the stand-in-to-subject correspondence explicitly.
2. Preserve spatial relationships, camera intent, shot order and key events. Let the model develop natural performance and fine action rhythm within the requested duration; planned shot windows may shift slightly for believable action and complete dialogue unless an exact cut or synchronization is explicitly required. Name each reference in its timed section. Leave transition style open unless the production explicitly requires a particular cut or continuous shot. Use the referenced camera intent and describe the key events through cause, action and visible result. Briefly reinforce story-critical spatial relationships, prop ownership and continuous states using the connected references; ordinary travel and staging follow the previs. Apply the [spatial and causal writing guidance](prompt-writing.md#keep-the-spatial-meaning-and-action-causality-readable).
3. Add the performance the greybox cannot show: expression, breathing, gaze nuance, cloth response, required dialogue and specific sound. Describe an unmodeled action from its starting state to its visible result, consistent with the scene and its Shot notes. Use notes to specify the intended generated action and review its execution in the output.
4. Before submitting, inspect the actual exported reference for held or stiff limbs, sliding, wrong facing, failed contact and unwanted guides or labels. Models can imitate these defects. Repair spatially misleading references (wrong path, facing or unreadable key event). For coarse gait, gestures and pauses, request natural performance while preserving the essential spatial plan. When a critical close-up depends on exact contact, a state change or readable detail, identify that requirement and use a reviewed detail/contact reference or different coverage; raise precision only for that feature. Resolve conflicting composition between detail references and previs before submission.

With both `extend` and `layout`, the earlier finished clip owns the join and continuity; the previs guides only the new part. Follow [extension timing](#timing-an-extension) for its output offset.

## Both models

- **Shape.** A short overview, separate `Subjects:` and `Place:`, then a heading and timed reference binding for each shot. Put action, dialogue and event sounds in that shot's section; keep only clip-wide rules at the end. Use asset mentions for every subject reference as described in [prompt writing principles](prompt-writing.md). Skip any part the inputs already settle.
- **Timestamps.** Use output-local time for timed prompt sections and `shotWindows`; see [Timing an extension](#timing-an-extension) for the repeated-source offset. For an independent clip, sections start at 0 and cover the requested duration in contiguous sections: `(0–3 s) … (3–5 s) …`. Use readable planned ranges appropriate to the scene; preserve exact extension boundaries where needed. Treat these sections as planned pacing, not frame-exact performance deadlines; small cut-point drift is acceptable unless an exact cut or synchronization is required. Keep structured `shotWindows` precise using output-local time.
- **With a previs reference**, follow the [white-model workflow](#white-model-reference-and-rendering): let the reference guide space, camera and key events; leave natural performance and fine timing to generation. Use the shot-specific precision requirements only for critical close-ups.
- **Action and expression.** Summarise ordinary action ("they grapple at close range") and detail only the one or two moves the shot is about. Describe expressions as visible behaviour ("a tight smile, eyes still wet"), not idioms.
- **Camera terms.** Common sizes, angles and moves can be named directly (close-up, low angle, push in, orbit, handheld). Explain a rare term in plain words after it. When a specific transition is required, give its moment and manner ("at 5 s, a whip pan left into the next shot"); otherwise leave transition choice open.
- **Dialogue.** One spoken line per sentence with its speaker: `@[Speaker](asset:character-a) says: "Who's out there?"`. Mark off-screen speech and voice-over. Preserve the quoted words. For reaction coverage, describe the listening performance together with its ambience and spatial sound; set the audio option from its intended edit use.
- **Sound design.** Let the model generate dialogue, breaths, action effects, ambience and spatial acoustics. Describe the overall soundscape in one final block, with key events and lines in their timed shot sections. Keep voices intelligible and relate source distance, reverberation, occlusion and motion to the scene. Post-production handles joins, mixing and music; shot-specific sound choices follow the dramatic intent.
- **Text in the picture.** Keep it short and exact. When it must read, give the clip an image of the text as a reference.
- **Extensions.** Write only what happens after the join: the new action, lines and changes, continuing the earlier clip's emotion and camera. Continue the appearance established by the source clip and connected assets.

## Timing an extension

The reference video starts at its own local 0. The requested `duration`, prompt section times, `shotWindows` and observed source in/out refer to the generated output. A continuation's previs reference covers only the new part with duration matched to that new part.

For a 6-second source and a 4-second continuation:

| Model        | Requested `duration` | New action in the prompt and planned `shotWindows` | Default edit range |
| ------------ | -------------------- | -------------------------------------------------- | ------------------ |
| Wan 3.0      | 10 seconds           | 6–10 seconds of the output                         | 6–10 seconds       |
| Seedance 2.5 | 4 seconds            | 0–4 seconds of the output                          | 0–4 seconds        |

For Wan, identify 0–6 seconds as the supplied source to retain, then describe only the new action at 6–10 seconds while preserving the supplied source's dialogue and action. If the trusted source length is fractional, use that exact join in the plan and identify it explicitly in the prompt. Within the new part, ordered previs windows are rebased and accumulated from the output's continuation start. Every input and output must still satisfy the current model limits; use the table to interpret time coordinates and capabilities to validate limits.

## Wan 3.0

- **Order.** Visual overview → subjects and place → shot headings and `(start–end s)` sections, each with its reference, action, dialogue and assigned sounds → clip-wide visual rules → one final global sound block.
- **Transitions.** Leave transition style open by default. If the approved intent requires a hard cut or an unbroken shot, state it at the relevant point. A continuous shot split across generations still follows the extension workflow.
- **Sound.** Material and weather words (wet boards underfoot, a flag snapping) bring their own sounds; write a specific effect as its own sentence, timed if needed. Use the model for scene sound and add music in post-production.
- **Visual requirements.** Describe the intended subjects, anatomy, composition and continuity directly. Use clean picture outputs and add typography in the edit.
- **Lens.** Focal length and depth of field read well ("85 mm, shallow depth of field").
- **Extending.** The output repeats the extended video and then continues it: request the source's length plus the new part. Input and output together stay within the model's limit.

## Seedance 2.5

- **Timing.** Treat prompt timestamps as planned pacing and verify actual cut and event timing in the generated take.
- **Constraints.** Describe the wanted result directly and include only the exclusions required by the production.
- **Dialogue formatting.** Put the speaker and delivery beside the quoted line once. Check references for unwanted captions or overlays before use.
- **Swapped characters.** In a multi-character clip a character can take another's reference. Connect subjects in the order they first appear.
- **Grey-model references.** Follow the [white-model workflow](#white-model-reference-and-rendering), including its check for incomplete limb animation.
- **Extending.** The output is only the continuation: request the new part's length. A source that Seedance 2.5 made itself joins with the least change in look and loudness, so keep a chain on one model.

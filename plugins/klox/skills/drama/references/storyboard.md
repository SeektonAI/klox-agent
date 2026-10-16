# Stages 2–4 · Assets, scene previs, timing cut and visual keyframes

## Stage 2 · Visual bible

Use the asset-design skill for design exploration, accepted anchors, required views and reference review; use the canvas skill for asset storage and tool calls. Identity belongs on the asset, outfits on looks and temporary states on asset nodes. Main characters need references suited to the planned framing, including face close-ups for dialogue; turnarounds are added when the required angles justify them. Use accepted voice clips for speaking characters where supported. Asset development can progress alongside blocking once identities and essential dimensions are established. Finish only the references needed by the upcoming shots. On top of that:

- **Continuity locks.** For each look, write the few visible facts that must never drift as a short phrase you will paste verbatim into every keyframe and clip prompt that shows it ("navy jacket, cream shirt, short straight hair"). Keep the list short: only what the viewer would notice changing.
- **Location design sequence.** New or substantially redesigned locations require generated and confirmed design boards, followed by a generated and confirmed master-view anchor, before deriving camera views or lighting references. Follow asset-design locations; use the accepted anchor as an actual image input. Reuse existing accepted designs when no substantial redesign is requested.
- **Tone frames.** For every location in every lighting state the episode uses, derive one empty wide shot from the accepted location anchor (`TONE · <location> · <lighting state>`) and get it approved. Every keyframe in that location and light connects it to the `image` input with purpose `tone`; Klox then tells the model it sets colour, light and texture only, so the prompt does not repeat it.
- Never use a story frame as an asset reference.
- **State images.** For every plot-relevant state whose side or direction the viewer could catch drifting (an injury, an arrow, a stain, a bandage, a mark), make a state image with the asset-design skill before keyframes and put it on the asset node that feeds the shots showing it.

## Stage 3a · Scene plan (`EP01 · Scene Plan`)

Before breaking a key scene into shots, decide how the whole scene is seen and heard. Key scenes are the hook, a character's first appearance, a reveal, a reversal, the payoff, the cliffhanger, and any scene with complex staging. Ordinary scenes go straight to shots.

For each key scene, write a short paragraph answering:

1. **Turn**: what changes irreversibly, and at which visible moment.
2. **Alignment**: whose side the viewer starts on, and where they end up.
3. **Knowledge**: what the viewer knows before the characters, at the same time, or after; when each piece is revealed.
4. **Space and power**: entrances, distance, who occupies the space, who blocks or yields, where the exits are.
5. **Held moment**: which reaction or silence the scene stays on, and for how long.
6. **Sound**: the leading sound source, where silence is used, and where sound arrives before the picture or carries over a cut.

Then block the scene in a **previs node** (`EP01-SC02 · Previs`, one per scene with two or more subjects or any move that matters, not only key ones; see the canvas skill). It stands in the location's set (`stage.location`), so doors, counters and windows are where the location's references show them; every actor carries its asset id and takes its real size from the character's body, with a distinct color; and the timeline holds what each actor does over the whole scene: where it walks, when it sits, kneels, falls or lies down, where it looks. Its shots are observations of the same action, each with a scene-time window, camera keys and aspect ratio. A setup may be used in several windows; name each Shot by its stable shot-list ID and record its setup separately. The user watches it play on the canvas; this is the cheapest place to fix blocking, scale and camera, before any image is generated. Every previs-backed shot names its setup and Shot ID. Use the canvas skill's previs reference for writing, reading and exporting; unsupported interactions must use another supported route or different coverage. An insert whose action the stand-ins cannot perform still gets its Shot, with its real camera and window and a note naming the action, so the whole-scene playback, which plays only Shots, includes it. Use reach tracks for hand placement and attach every prop a character holds (canvas skill, previs reference).

If two genuinely different approaches exist (play it in one held two-shot, or fragment it into close-ups), compare them in two lines each and pick one; otherwise do not invent alternatives. Then turn the plan into the shots' jobs, sizes, camera, start and end states and sound. Check afterwards that space, camera and sound all carry the same turn, rather than a generic medium shot, reverse, push-in pattern.

## Stage 3b · Storyboard (`EP01 · Shot List`)

### Shots claim beats

Sound and picture are covered differently:

- **Sound** (hard check): every line, voice-over and key sound in the scene sits on the scene's sound timeline exactly once, verbatim, in order. One line may run across several shots (speaker, then listener) and carry over a cut.
- **Action** (hard check): every action beat happens on screen once. Repeating the same action across shots (an impact seen from two angles) is allowed only when marked as deliberate.
- **Picture** (default): shots may add reactions, inserts and establishing frames that no beat names; give each a job.

Every shot names the scene and beats it carries (`EP01-SC02 beats 3–5`, or `EP01-SC02 reaction to beat 4`). A shot never spans two scenes. If a scene is deliberately not shot, write it at the top with the reason.

### Shot length

- Lay out the sound first: every line, voice-over and key sound, with reactions and silent actions. That timeline is the scene's length. Then place cuts on it.
- A line must fit the shots that carry it at the normal speaking rate. Split a long line across speaker and listener shots instead of asking for faster speech.
- The cut length is a storyboard decision; the requested generation duration is set at stage 5 and may be longer (see clips.md). Never shorten a shot's job to fit a model minimum.
- Default: shots of 2–5 seconds averaging the profile's target (about 2.5). An insert can be shorter; a line that must land can run longer. Depart when the scene plan calls for a held shot, and say why.

### Each shot

```
## EP01 S07 · The handoff
Carries: EP01-SC02 beats 6–7 · cut length 3 s
Job: show that Character B now has the key
Size / angle: insert on both hands and the key
Camera: static; the viewer needs to see who takes possession
Start → action → end: Character A holds the key above Character B's open right palm → Character A places and releases it into that palm → Character B closes the right hand around the key
Sound: room tone, the key touching the palm; no dialogue
Shows: Character A and Character B (hands only), key
Keyframe prompt: Close insert of Character A holding one key above Character B's open right palm, before contact. Both hands and the key are fully visible against the office background, neutral indoor light. No captions or extra keys.
```

- **Job**: one reason this shot exists. If two neighbouring shots have the same job, merge them.
- **Camera**: choose per shot and give the reason. Follow a moving subject; pan or pull to reveal something entering; slow push when a line or realisation lands on someone; short sharp push, freeze or flash only for the episode's real peaks; static for watching, waiting, inserts and lines that change nothing. Static needs a reason too. In a previs-backed shot the named move is written as camera keys or a follow (canvas skill, previs reference); one fixed-position key aimed at a fixed point is static; a follow position or actor target can move with a single key.
- **Start → action → end**: one move or a short chain serving the shot's job, including hands and held objects, so nothing teleports between shots. The end state is a believable start for the next shot.
- **Shows**: every character, location and object that must be recognisable in this frame. This list becomes the asset nodes and references.

### Coverage defaults

- Open the episode on a moving subject, then establish where we are, then the key detail.
- Dialogue: one line per shot; cut to the listener when an important line lands; shot / reverse shot on the same side of the axis; start wider with action, settle at medium or medium close, go close only for lines that must land.
- Key actions get their own insert. Reaction shots are free drama: after a heavy line, 2–3 seconds on the listener's face.
- Cut on motion: end one shot mid-action and continue it in the next.
- Vertical framing favours medium, close and insert. Show space through depth (foreground, middle, background), not width. At most three people in a frame; more needs a staging plan.
- Every cut changes size, angle or relationship. Two neighbouring shots with the same size, angle and relationship are one shot.
- Keep screen direction and eyelines consistent through a scene. Every previs-backed shot gets a **Screen map**: copy it from the previs shot's computed `screenMap` in `get_workflow` (who is screen-left, centre and right, which side of each faces the camera, which flank is up, how much of the frame height each fills) rather than reasoning it out. These samples do not prove visibility or contact throughout the shot: inspect playback around important events. If no previs exists or a Screen map is unavailable, record the reason and review the available frame evidence without claiming a computed check. Shot and reverse shot on the same side of the axis keep each subject on the same side of the frame; a cut that swaps them crosses the line and needs a reason and a re-establishing shot.

### Keyframe prompts

An opening keyframe is the reviewed visual target for the shot's start. On a strict first-frame route it is supplied as `firstFrame`; on a previs/reference route it may be a normal reference image with `purpose: "opening"`. The latter requests the start through prompting and still needs output review; it is not a strict frame guarantee.

Run the canvas skill's pre-generation checks on every shot. Give each shot separate **Start state** and **End state** fields; its keyframe prompt and asset nodes take only the start state. Write a visible condition (an injury, a dressing, a stain, a held object) on every shot that shows it, not only in the scene header. For a condition with a side, add to the shot's Screen map which way the subject's head points in the frame, which side of the body faces the camera, and so where the condition appears on screen, or "not visible in this shot". Derive it once from the scene's blocking; when the camera would hide a condition the story needs seen, move the camera, not the wound. Keyframe prompts describe that frame geometry (head toward frame left, the upward flank); the side itself comes from the state image, not from "anatomical left" in the text. A matched END frame is its own image node, made from the inspected START frame.

- Describe only what is visible at that instant: who is where, facing which way, what they hold, their expression, framing, light. Anything that happens later in the shot stays out.
- Name characters with asset mentions (`@[Character A](asset:<id>)`); appearance comes from the references, so describe pose, position and state, not faces or outfits, apart from the continuity lock of every look in the frame, pasted verbatim.
- Use one style sentence for the whole episode and one light sentence per scene, identical in every keyframe.
- For close shots, state the crop precisely (cut at the collarbone, face in the upper third). A location reference tends to widen the frame; if close keyframes keep coming out wide, drop the location asset for that shot and describe the background in words.
- In-world text (a phone screen, a sign) only where the story needs it, short and written exactly; check it on the keyframe. Overlay text (captions, titles, chat bubbles) never goes into a keyframe; it is added in the edit.

### Sound plan

Write the scene's sound plan as a sound plan node (`addNodes` kind `soundPlan`) once its clips exist as video nodes, and keep it current when shots change. Use actual video node IDs for `source` and `continuesOver` (or their local IDs within the same change), not shot labels from the table below. Keep the prose table as a planning view, not a substitute for the structured node. Each line and key sound from the screenplay is one item:

| Item          | Kind  | Critical | Source | Carries over | Content                                   | Tail / stop                       |
| ------------- | ----- | -------- | ------ | ------------ | ----------------------------------------- | --------------------------------- |
| L03           | line  | yes      | S02    | —            | Lena: "Who is out there?"                 | —                                 |
| door-close-01 | event | yes      | S01    | S02          | The heavy door hits the frame once, rings | rings out about 1.5 s; S02 silent |
| phone-ring-01 | event | no       | S18    | S19          | The phone rings in pairs                  | stops when answered               |

- **One source shot per sound.** That clip generates it; the shots it carries over never generate it again, they start after it. A reverse angle of the same action does not repeat the sound.
- **Cut after the sound finishes** when you can. When the cut lands on an impact, the source clip still runs long enough for the tail, and the edit carries the tail over the next shot.
- **Keep a new line out of a carried tail.** Until the pilot episode shows that overlapping a tail with new dialogue sounds right, start the next shot's line after the tail ends: the two clips' sound cannot be separated once mixed.
- **Critical** marks what the film fails without: lines are normally critical; decorative sounds are not.
- Lasting sounds (a ringing phone, footsteps across shots) are one item with a start, the shots they carry over and what stops them.

## Stage 3c · Greybox timing cut

Before final keyframes, put the selected previs observations in edit order. Record each shot's scene window, planned cut length and sound window; coverage windows can overlap, but the cut should not accidentally repeat an event. Distinguish a same-camera continuation from a new-angle cut. A shot without spatial or motion needs may omit previs and use a sketch or existing frame placeholder.

When greybox files are accessible through the actual tools or supplied exports, assemble them locally with ffmpeg and upload the preview as `EP01 · Greybox Cut`; use temporary speaker/line cards or silence marks for timing, not synthesized episode dialogue. Follow the canvas skill's [previs operations](https://klox.ai/agent/skills/canvas/references/previs.md): there is no direct previs-to-compose connection or general MCP download command for those exports today. Never invent an export URL or spend on generated final video just to obtain a greybox preview.

If files cannot be obtained, review the scene's Shot playback in the owner's browser with the cut list and sound windows. Report that the assembled edit is unverified; this is a playback-and-plan review, not a rendered animatic. Resolve access or use that explicitly limited review with the user's existing scope before final production.

Check the hook, event/reaction order, axis, readable scale and reveals, and whether cuts and pauses give the planned sound enough time. Fix timing and coverage here. For projects without previs, a static animatic from sketches or available frames serves this purpose; do not require a new set of expensive final images merely for this review.

## Stage 4 · Visual keyframes

1. Complete and review the asset and light references actually required by the approved shots.
2. For each important shot, connect its own previs Shot to the image node's `image` input for the opening layout, plus the required assets and tone reference. Say which stand-in color is which subject. For a shot without previs, use a sketch or other framing-matched layout guide.
3. An accepted master can establish the scene's look and reveal geography across angles. Do not require a wider image for a setup that has no dramatic need for one. Each new angle uses its own previs layout; an appearance reference must not override it. If cropping a master for a tighter shot, verify both perspective and action state; a crop cannot create a new camera position or a later scene moment.
4. Compare every generated keyframe with its planned start, computed Screen map where available, assets and accepted scene views: dimensions and landmark positions, facing, occlusion, state, light and appearance. Shared 3D geometry is consistent by construction; generated images can still drift and must be inspected.
5. Derive repairs from an accepted source rather than chaining imperfect children. Fix side errors through targeted edits and state images. Keep end-state facts out of start-frame prompts. High-risk shots may need additional reviewed moment/end images; only the opening image uses the opening purpose on a clip.
6. Storyboard grids are optional review boards, never direct clip inputs. For a simple direct asset-plus-previs route, omit a separate keyframe only when that route has been verified and the omission is within the production scope; inspect the generated opening carefully.

## Stage review

Before showing the shot list, run the script → shot list handoff checks from the skill, then review in the skill's finding format:

- For each key scene: does the shot list actually deliver the scene plan's turn, alignment and held moment?
- After each important line or event, is the person it hits shown reacting?
- Does each cut change size, angle, relationship or information?
- List every departure from a default (shot length, coverage pattern) with its reason.
- Does every previs-backed shot name its setup, Shot ID and scene window, and does its Screen map come from that Shot? Are omitted previs routes and unavailable checks explained? List each cut that crosses the axis, with its reason.

After keyframes, review each against its planned scene moment and neighbouring shots: positions, held objects, states and screen direction carry across the cut, and each subject sits where the available Screen map puts it. A keyframe whose blocking is wrong is fixed through its layout guide or master, not by adding more position words to the prompt. Check sides by derivation, not by asking whether something "is on the left": find where the head points and which surface faces the camera, work out where the condition must appear, then compare it with the Screen map and the state image, cropping in when it is small. A keyframe that is right except for a side is repaired with a targeted edit, not rerolled.

## Gate

Review the stage 3 timing cut (or its explicitly limited playback review) before final keyframes. After stage 4, show accepted keyframes and their agreement with that plan. Reuse decisions already approved, report what remains unverified, and give the clip-production credit estimate before starting work outside the current budget.

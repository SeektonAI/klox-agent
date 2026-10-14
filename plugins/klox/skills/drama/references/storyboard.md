# Stages 2–4 · Visual bible, storyboard, keyframes and animatic

## Stage 2 · Visual bible

Use the asset-design skill for design exploration, accepted anchors, required views and reference review; use the canvas skill for asset storage and tool calls. Identity belongs on the asset, outfits on looks and temporary states on asset nodes. Main characters need references suited to the planned framing, including face close-ups for dialogue; turnarounds are added when the required angles justify them. Use accepted voice clips for speaking characters where supported. On top of that:

- **Continuity locks.** For each look, write the few visible facts that must never drift as a short phrase you will paste verbatim into every keyframe and clip prompt that shows it ("navy jacket, cream shirt, short straight hair"). Keep the list short: only what the viewer would notice changing.
- **Tone frames.** For every location in every lighting state the episode uses, generate one empty wide shot (`TONE · <location> · <lighting state>`) and get it approved. Every keyframe in that location and light connects it to the `image` input with purpose `tone`; Klox then tells the model it sets colour, light and texture only, so the prompt does not repeat it.
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

Then draw the scene's **blocking plan** as a short text block at the top of the scene in `EP01 · Scene Plan` (every scene with two or more subjects, not only key ones): the fixed landmarks (door, counter, window), each subject's position and facing at the start and wherever they move, the axis of action, and the camera setups the scene uses (`A`: wide from the window side; `B`/`C`: singles on the same side of the axis). It is for you and the user, never a generation input; this workflow does not rely on the model correctly converting a floor plan into a perspective view. Every shot names its setup.

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
- **Camera**: choose per shot and give the reason. Follow a moving subject; pan or pull to reveal something entering; slow push when a line or realisation lands on someone; short sharp push, freeze or flash only for the episode's real peaks; static for watching, waiting, inserts and lines that change nothing. Static needs a reason too.
- **Start → action → end**: one move or a short chain serving the shot's job, including hands and held objects, so nothing teleports between shots. The end state is a believable start for the next shot.
- **Shows**: every character, location and object that must be recognisable in this frame. This list becomes the asset nodes and references.

### Coverage defaults

- Open the episode on a moving subject, then establish where we are, then the key detail.
- Dialogue: one line per shot; cut to the listener when an important line lands; shot / reverse shot on the same side of the axis; start wider with action, settle at medium or medium close, go close only for lines that must land.
- Key actions get their own insert. Reaction shots are free drama: after a heavy line, 2–3 seconds on the listener's face.
- Cut on motion: end one shot mid-action and continue it in the next.
- Vertical framing favours medium, close and insert. Show space through depth (foreground, middle, background), not width. At most three people in a frame; more needs a staging plan.
- Every cut changes size, angle or relationship. Two neighbouring shots with the same size, angle and relationship are one shot.
- Keep screen direction and eyelines consistent through a scene. Every shot gets a **Screen map** derived from the blocking plan and its setup: who is screen-left, centre and right, which way each faces and looks, who is nearer the camera. Shot and reverse shot on the same side of the axis keep each subject on the same side of the frame; a cut that swaps them crosses the line and needs a reason and a re-establishing shot.

### Keyframe prompts

A keyframe is the **first frame** of the shot, frozen.

Run the canvas skill's pre-generation checks on every shot. Give each shot separate **Start state** and **End state** fields; its keyframe prompt and asset nodes take only the start state. Write a visible condition (an injury, a dressing, a stain, a held object) on every shot that shows it, not only in the scene header. For a condition with a side, add to the shot's Screen map which way the subject's head points in the frame, which side of the body faces the camera, and so where the condition appears on screen, or "not visible in this shot". Derive it once from the scene's blocking; when the camera would hide a condition the story needs seen, move the camera, not the wound. Keyframe prompts describe that frame geometry (head toward frame left, the upward flank); the side itself comes from the state image, not from "anatomical left" in the text. A matched END frame is its own image node, made from the inspected START frame.

- Describe only what is visible at that instant: who is where, facing which way, what they hold, their expression, framing, light. Anything that happens later in the shot stays out.
- Name characters with asset mentions (`@[Character A](asset:<id>)`); appearance comes from the references, so describe pose, position and state, not faces or outfits, apart from the continuity lock of every look in the frame, pasted verbatim.
- Use one style sentence for the whole episode and one light sentence per scene, identical in every keyframe.
- For close shots, state the crop precisely (cut at the collarbone, face in the upper third). A location reference tends to widen the frame; if close keyframes keep coming out wide, drop the location asset for that shot and describe the background in words.
- In-world text (a phone screen, a sign) only where the story needs it, short and written exactly; check it on the keyframe. Overlay text (captions, titles, chat bubbles) never goes into a keyframe; it is added in the edit.

## Stage 4 · Keyframes and animatic

1. Generate the tone frames, review, approve.
2. **Master first, per setup.** For each camera setup, generate its widest shot first (the master) and accept it before any other shot from that setup. A setup whose blocking is hard (several subjects, someone lying down, a crossing) gets a layout guide first: a rough image of who is where (a block or stick-figure sketch, a 3D previs render from Blender, or a quick low-cost generation reviewed only for positions), connected to the master's `image` input with purpose `layout`. In a sketch, give every subject a distinct colour or a written label, and say in the shot prompt which is which ("the red figure is Lena, the blue shape is the wolf"); Klox explains what a layout guide decides, but only the prompt can say who each placeholder is. When a scene's space is complex, block it once in Blender and render every setup's layout guide from that one scene, so the setups share the same geometry by construction.
   Accept a master by checking it against the blocking plan and every master already accepted in the scene: the same landmarks in the places this angle should show them (door, counter, window), each subject's facing, who occludes whom, and the distances between subjects. A reverse setup gets its own master, checked this way; never derive it by mirroring.
3. Generate the other keyframes. A layout guide controls the whole frame of the shot it feeds, framing included, so it must already show this shot's framing. When a shot keeps the master's framing, connect the master as its layout guide. When the size or framing changes (a close-up from a two-shot wide), first make a guide for the new frame: crop the master, or derive the new framing from it by image editing and check that positions and facing survived. Then connect that guide with purpose `layout`. Always derive from the master itself, not from the previous derived shot: small errors compound along a chain. Connect the asset nodes it shows and the scene's tone frame (purpose `tone`). Review each one against its shot: right people, right positions, right state, continuity locks visible, nothing from the end of the shot. Redo weak ones before anything else; a bad keyframe makes a bad clip.
4. Storyboard grids (six to eight panels in one image) are optional and only for reviewing the episode's rhythm quickly. They are never references for clips.
5. **Animatic.** Download the keyframes and lay them on the timeline at the planned shot lengths with timed dialogue cards showing speaker and exact words. Render the visual timing preview locally with ffmpeg and upload it as `EP01 · Animatic`. These cards are preview annotations, not final captions. Estimate speaking windows from the screenplay; this preview does not verify voice, lip sync or actual speaking speed. Verify those on the generated clips.

## Stage review

Before showing the shot list, run the script → shot list handoff checks from the skill, then review in the skill's finding format:

- For each key scene: does the shot list actually deliver the scene plan's turn, alignment and held moment?
- After each important line or event, is the person it hits shown reacting?
- Does each cut change size, angle, relationship or information?
- List every departure from a default (shot length, coverage pattern) with its reason.
- Does every shot name a setup, and does its Screen map follow from the blocking plan? List each cut that crosses the axis, with its reason.

After keyframes, review each against its shot and the neighbouring shots: positions, held objects, states and screen direction carry across the cut, and each subject sits where the Screen map puts it. A keyframe whose blocking is wrong is fixed through its layout guide or master, not by adding more position words to the prompt. Check sides by derivation, not by asking whether something "is on the left": find where the head points and which surface faces the camera, work out where the condition must appear, then compare it with the Screen map and the state image, cropping in when it is small. A keyframe that is right except for a side is repaired with a targeted edit, not rerolled.

## Gate

The user watches the animatic. Ask: is the hook clear by the profile's first-hook time, is it clear where we are, does every beat read, where would you swipe away? Fix the screenplay, scene plan or storyboard there, not later in video. Then move to clips with a credit estimate.

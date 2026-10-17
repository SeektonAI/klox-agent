# Stages 2–3 · Assets, scene previs and timing cut

## Stage 2 · Visual bible

Use the asset-design skill for design exploration, accepted anchors, required views and reference review; use the canvas skill for asset storage and tool calls. Identity belongs on the asset, outfits on looks and temporary states on asset nodes. Main characters need references suited to the planned framing, including face close-ups for dialogue; turnarounds are added when the required angles justify them. Use accepted voice clips for speaking characters where supported. Asset development can progress alongside blocking once identities and essential dimensions are established. Finish only the references needed by the upcoming shots. On top of that:

- **Continuity locks.** Store the few visible facts that must stay fixed in each look's asset description ("navy jacket, cream shirt, short straight hair"). Use them to build references and review clips. Shot prompts add only what the connected assets, state images and other references do not already carry.
- **Location design sequence.** New or substantially redesigned locations require generated and confirmed design boards, followed by a generated and confirmed master-view anchor, before deriving camera views or lighting references. Follow asset-design locations; use the accepted anchor as an actual image input. Reuse existing accepted designs when no substantial redesign is requested.
- **Location coverage.** Clips take the location's look from its asset references, not from a keyframe, so a recurring location needs accepted references facing each main camera direction the episode uses (with their camera where saved), not one master view. Add the missing directions in asset design before the clips that need them.
- **Tone frames.** For every location in every lighting state the episode uses, derive one empty wide shot from the accepted location anchor (`TONE · <location> · <lighting state>`) and get it approved. Every clip in that location and light connects it to the `image` input with purpose `tone`; Klox then tells the model it sets colour, light and texture only, so the prompt does not repeat it.
- Never use a story frame as an asset reference.
- **State images.** For every plot-relevant state whose side or direction the viewer could catch drifting (an injury, an arrow, a stain, a bandage, a mark), make a state image with the asset-design skill before the clips and put it on the asset node that feeds the shots showing it.

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
- The cut length is a storyboard decision; the requested generation duration is set at stage 4 and may be longer (see clips.md). Never shorten a shot's job to fit a model minimum.
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
Route: own clip from the S07 previs Shot; a hand-over is exact contact, so an opening keyframe is justified here
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
- Keep screen direction and eyelines consistent through a scene. For every previs-backed shot, read its computed **Screen map** with a `get_workflow` detail request (`nodeIds`, optionally `shots`). Use its frame positions, facing, side-up and height estimates during review rather than reasoning them out or copying the full map into text. These samples do not prove visibility or contact throughout the shot: inspect targeted frame sequences through its `reviewUrl` around important events, using the canvas skill's review procedure. If no previs exists or a Screen map is unavailable, tell the user why and review the available frame evidence without claiming a computed check. Shot and reverse shot on the same side of the axis keep each subject on the same side of the frame; a cut that swaps them crosses the line and needs a reason and a re-establishing shot.

### Start and end states

Run the canvas skill's pre-generation checks on every shot. Give each shot separate **Start state** and **End state** fields; the clip starts from the start state and its action reaches the end state, and asset nodes take the start state. Write a visible condition (an injury, a dressing, a stain, a held object) on every shot that shows it, not only in the scene header. For a condition with a side, add to the shot's Screen map which way the subject's head points in the frame, which side of the body faces the camera, and so where the condition appears on screen, or "not visible in this shot". Derive it once from the scene's blocking; when the camera would hide a condition the story needs seen, move the camera, not the wound. The side itself comes from the state image, not from "anatomical left" in the text.

- In-world text (a phone screen, a sign) only where the story needs it, short and written exactly; when it must read, it is one of the few reasons for a keyframe or a text reference image. Overlay text (captions, titles, chat bubbles) is added in the edit.
- **Optional keyframes.** Make one only for a picture the previs and assets cannot carry, and record the reason. It describes only what is visible at the shot's start, names characters with asset mentions, uses the episode's style sentence and the scene's light sentence, and states close crops precisely. A matched END frame is its own image node made from the accepted START. Its route into the clip is in [clips.md](clips.md#which-inputs-a-clip-gets).

### Generation grouping handoff

Retain the edit Shot IDs and coverage even when several shots will share a generation. Before creating video nodes, prepare the [generation grouping plan](clips.md#generation-groups-before-video-nodes): continuous action or dialogue passages are candidates; precise contact and state-reveal inserts may remain independent. Grouping changes production units, not the approved story or cut intent. Map each sound item to its generating group, then resolve it to the actual video node for the structured plan.

### Sound plan

Write the scene's sound plan as a sound plan node (`addNodes` kind `soundPlan`) once its clips exist as video nodes, and keep it current when shots change. Use actual video node IDs for `source` and `continuesOver` (or their local IDs within the same change), not shot labels from the table below. Keep the prose table as a planning view, not a substitute for the structured node. Each line and key sound from the screenplay is one item:

| Item          | Kind  | Critical | Source | Carries over | Content                                   | Tail / stop                       |
| ------------- | ----- | -------- | ------ | ------------ | ----------------------------------------- | --------------------------------- |
| L03           | line  | yes      | S02    | —            | Lena: "Who is out there?"                 | —                                 |
| door-close-01 | event | yes      | S01    | S02          | The heavy door hits the frame once, rings | rings out about 1.5 s; S02 silent |
| phone-ring-01 | event | no       | S18    | S19          | The phone rings in pairs                  | stops when answered               |

- **One source generation per sound.** That group generates it once, even across several cuts. Picture coverage uses the same source audio rather than generating another performance. In the structured plan, `continuesOver` lists only other video nodes, never the source node itself; cuts within one group are tracked in the cut list. A reverse angle of the same action does not repeat the sound.
- **Cut after the sound finishes** when you can. When the cut lands on an impact, the source clip still runs long enough for the tail, and the edit carries the tail over the next shot.
- **Keep a new line out of a carried tail.** Until the pilot episode shows that overlapping a tail with new dialogue sounds right, start the next shot's line after the tail ends: the two clips' sound cannot be separated once mixed.
- **Critical** marks what the film fails without: lines are normally critical; decorative sounds are not.
- Lasting sounds (a ringing phone, footsteps across shots) are one item with a start, the shots they carry over and what stops them.

## Stage 3c · Greybox timing cut

Before generating clips, put selected previs observations into a compose timeline in edit order, using each clip's `{previsNodeId, shotId}` reference. Previs owns scene windows, the sound plan owns sound assignments, and the compose timeline owns planned cut length and playback order. Coverage windows can overlap, but the cut should not accidentally repeat an event. Record dramatic reasons for a same-camera continuation or a new-angle cut; do not duplicate the timing table in text. Shots without spatial or motion needs may use sketches or existing frame placeholders.

Connect previs exports directly to a compose node's `video` input and save the intended edit as `composeTimeline`; follow the canvas skill's [greybox-cut procedure](https://klox.ai/agent/skills/canvas/references/previs.md#export-readiness-and-greybox-cuts). Inspect playback of that assembled rough cut before generating clips. Local ffmpeg assembly remains an option for accessible files and temporary speaker/line cards; it is not required to bridge previs and compose. Timing aids are not synthesized episode dialogue. Never invent an export URL.

For visual inspection, open the previs node's `reviewUrl` and use the canvas skill's [frame-review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page). Before repairs, freeze a baseline with `freeze_previs_snapshot`; after saving, compare the affected frames and revisit later shots whose positions, props, cameras or continuity depend on the change. Use camera and top views together for passage or clearance questions, and adjacent-shot end/start frames for continuity. Record the actual frame range and step; unmodeled details remain unverified.

If files cannot be obtained, frame sequences plus the cut list and sound windows support a limited visual-and-plan review. Actual continuous scene playback can add timing evidence, but the review page's stills cannot establish motion between samples or dynamic rhythm. Report which evidence is available and that the assembled edit is unverified; neither this limited review nor separate scene playback is a rendered animatic. Continue within the user's existing scope with those limits explicit. Review images are not registered generation references; required production exports still come from the owner's editor.

Check the hook, event/reaction order, axis, readable scale and reveals, and whether cuts and pauses give the planned sound enough time. Fix timing and coverage here. For projects without previs, a static animatic from sketches or available frames serves this purpose; do not generate final images merely for this review.

## Continuous shots

While cutting, mark which neighbouring shots belong to one **continuous shot**: picture, action and time carry straight on from one to the next, whether or not the camera moves (a continuous follow is one; two moments from the same fixed camera at different times are not). A continuous shot is generated once when one generation can hold it; when it cannot, its later part extends the earlier one at stage 4 instead of starting fresh. Place each such join between two lines of dialogue, never inside one. A cut to another camera is a new, independent clip.

## Stage review

Before showing the shot list, run the script → shot list handoff checks from the skill, then review in the skill's finding format:

- For each key scene: does the shot list actually deliver the scene plan's turn, alignment and held moment?
- After each important line or event, is the person it hits shown reacting?
- Does each cut change size, angle, relationship or information?
- List every departure from a default (shot length, coverage pattern) with its reason.
- Does every previs-backed shot name its setup, Shot ID and scene window, and does its Screen map come from that Shot? Are omitted previs routes and unavailable checks explained? List each cut that crosses the axis, with its reason.

After the first clips, review each against its planned scene moment and neighbouring shots: positions, held objects, states and screen direction carry across the cut, and each subject sits where the available Screen map puts it. A clip whose blocking is wrong is fixed through its previs Shot, not by adding more position words to the prompt. Check sides by derivation, not by asking whether something "is on the left": find where the head points and which surface faces the camera, work out where the condition must appear, then compare it with the Screen map and the state image, cropping in when it is small. A clip that is right except for a side is regenerated with a corrected state image, not with more side words.

## Gate

Review the stage 3 timing cut (or the explicitly limited review with its available visual and playback evidence) before generating clips, with the continuous shots marked. Reuse decisions already approved, report what remains unverified, and give the clip-production credit estimate before starting work outside the current budget.

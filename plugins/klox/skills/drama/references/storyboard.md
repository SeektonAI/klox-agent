# Stages 2–3 · Assets, scene previs and timing cut

## Stage 2 · Visual bible

Use the asset-design skill for design exploration, accepted anchors, required views and reference review; use the canvas skill for asset storage and tool calls. Identity belongs on the asset, outfits on looks and temporary states on asset nodes. Establish each character’s identity as a 3-view sheet containing full-body front, full-body back and a frontal face close-up, then generate each look’s matching sheet from that identity image, preserving the same face and build while applying the specified styling; add separate face crops or further angles only when the planned framing needs more detail. Use accepted voice clips for speaking characters where supported. Asset development can progress alongside blocking once identities and essential dimensions are established. Finish only the references needed by the upcoming shots. On top of that:

- **Continuity locks.** Store the few visible facts that must stay fixed in each look's asset description ("navy jacket, cream shirt, short straight hair"). Use them to build references and review clips. Shot prompts use these references and briefly reinforce spatial relationships, action causality and state continuity where they determine the story's reading.
- **Location design sequence.** New or substantially redesigned locations require generated and confirmed design boards, followed by a generated and confirmed master-view anchor, before deriving camera views or lighting references. Follow asset-design locations; use the accepted anchor as an actual image input. Reuse existing accepted designs when no substantial redesign is requested.
- **Location coverage.** Clips take the location's look from its asset references, not from a keyframe, so a recurring location needs accepted references facing each main camera direction the episode uses (with their camera where saved), not one master view. Add the missing directions in asset design before the clips that need them.
- **Tone frames.** For every location in every lighting state the episode uses, derive one empty wide shot from the accepted location anchor (`TONE · <location> · <lighting state>`) and get it approved. Every clip in that location and light connects it to the `image` input with purpose `tone`; Klox then tells the model it sets colour, light and texture only, so the prompt does not repeat it.
- Use accepted asset-design references to carry identity and reusable looks.
- **State images.** For every plot-relevant state whose side or direction the viewer could catch drifting (an injury, an arrow, a stain, a bandage, a mark), make a state image with the asset-design skill before the clips and put it on the asset node that feeds the shots showing it.

## Stage 3a · Scene plan (`EP01 · Scene Plan`)

Before breaking a key scene into shots, decide how the whole scene is seen and heard. Key scenes are the hook, a character's first appearance, a reveal, a reversal, the payoff, the cliffhanger, and any scene with complex staging. Ordinary scenes go straight to shots.

For each key scene, write a short paragraph answering:

1. **Turn**: what changes irreversibly, and at which visible moment.
2. **Alignment**: whose side the viewer starts on, and where they end up.
3. **Knowledge**: what the viewer knows before the characters, at the same time, or after; when each piece is revealed.
4. **Space and power**: entrances, distance, who occupies the space, who blocks or yields, where the exits are.
5. **Held moment**: which reaction or silence the scene stays on, and for how long.
6. **Sound**: dialogue and performance, key effects, ambient sources, spatial perspective, meaningful silence and sound arriving before the picture or carrying over a cut. Plan their native generation and post-production continuity.

Then block the scene in a **previs node** (`EP01-SC02 · Previs`, one per scene with two or more subjects or any move that matters, not only key ones; see the canvas skill). It stands in the location's set (`stage.location`), so doors, counters and windows are where the location's references show them; every actor carries its asset id and takes its real size from the character's body, with a distinct color; and the timeline holds what each actor does over the whole scene: where it walks, when it sits, kneels, falls or lies down, where it looks. Its shots are observations of the same action, each with a scene-time window, camera keys and aspect ratio. A setup may be used in several windows; name each Shot by its stable shot-list ID and record its setup separately. The user watches it play on the canvas; this is the cheapest place to fix blocking, scale and camera, before any image is generated. Every previs-backed shot names its setup and Shot ID. Use the canvas skill's previs reference for writing, reading and exporting; unsupported interactions must use another supported route or different coverage. An insert whose action the stand-ins cannot perform still gets its Shot, with its real camera and window and a note naming the action, so the whole-scene playback, which plays only Shots, includes it. Use reach and attach tracks when hand placement or prop ownership matters to the shot (canvas skill, previs reference).

If two genuinely different approaches exist (play it in one held two-shot, or fragment it into close-ups), compare them in two lines each and pick one; otherwise proceed with the established approach. Then turn the plan into the shots' jobs, sizes, camera, start and end states and sound. Check afterwards that space, camera and sound all carry the same turn, through the chosen coverage.

## Stage 3b · Storyboard (`EP01 · Shot List`)

### Shots claim beats

Sound and picture are covered differently:

- **Sound** (hard check): every line, voice-over and key sound in the scene sits on the scene's sound timeline exactly once, verbatim, in order. One line may run across several shots (speaker, then listener) and carry over a cut.
- **Action** (hard check): every action beat happens on screen once. Repeating the same action across shots (an impact seen from two angles) is allowed only when marked as deliberate.
- **Picture** (default): shots may add reactions, inserts and establishing frames that no beat names; give each a job.

Every shot names the scene and beats it carries (`EP01-SC02 beats 3–5`, or `EP01-SC02 reaction to beat 4`). Keep each shot within its source scene. If a scene is deliberately not shot, write it at the top with the reason.

### Shot length

- Lay out the sound first: every line, voice-over and key sound, with reactions and silent actions. That timeline is the scene's length. Then place cuts on it.
- A line must fit the shots that carry it at the normal speaking rate. Use speaker and listener coverage to carry a long line at its intended speaking pace.
- The cut length is a storyboard decision; the requested generation duration is set at stage 4 and may be longer (see clips.md). Preserve the shot's full dramatic job when choosing its generation duration.
- Set shot length from the action, dialogue and intended pace. Use the agreed rhythm profile as guidance; complete performances and readable key events take priority over a fixed average.

### Each shot

```
## EP01 S07 · The handoff
Carries: EP01-SC02 beats 6–7 · cut length 3 s
Job: show that Character B now has the key
Size / angle: insert on both hands and the key
Camera: static; the viewer needs to see who takes possession
Start → action → end: Character A holds the key above Character B's open right palm → Character A places and releases it into that palm → Character B closes the right hand around the key
Sound: the key touching the palm; native audio assignment follows the scene sound plan
Shows: Character A and Character B (hands only), key
Route: own clip from the S07 previs Shot; a hand-over is exact contact, so an opening keyframe is justified here
```

- **Job**: one reason this shot exists. If two neighbouring shots have the same job, merge them.
- **Camera**: choose a held frame or motivated move that serves the shot's dramatic job and makes its key information readable. In a previs-backed shot the named move is written as camera keys or a follow (canvas skill, previs reference); one fixed-position key aimed at a fixed point is static; a follow position or actor target can move with a single key.
- **Start → action → end**: one move or a short chain serving the shot's job, including hands and held objects, so nothing teleports between shots. The end state is a believable start for the next shot.
- **Shows**: every character, location and object that must be recognisable in this frame. This list becomes the asset nodes and references.

### Coverage defaults

- Choose an opening that makes the intended hook readable; motion, a held detail or dialogue can each serve it.
- Let a composition carry a complete exchange or action when that preserves its dramatic effect. Cut to a reaction or insert when it adds necessary information or emphasis.
- Choose cut points from performance, information and continuity. Use a cut on motion when it serves that purpose.
- Match framing and subject count to the delivery format and readable staging. Choose shot scale and subject count for readable staging.
- Give each cut a purpose; merge redundant coverage when the moment works better continuously.
- Keep screen direction and eyelines consistent through a scene. For every previs-backed shot, read its computed **Screen map** with a `get_workflow` detail request (`nodeIds`, optionally `shots`). Use its computed frame positions, facing, side-up and height estimates during review. Inspect targeted frame sequences through `reviewUrl` around important events to review visibility and contact, using the canvas skill's review procedure. If no previs exists or a Screen map is unavailable, tell the user why and review the available frame evidence and identify the available evidence. Shot and reverse shot on the same side of the axis keep each subject on the same side of the frame; a cut that swaps them crosses the line and needs a reason and a re-establishing shot.

### Start and end states

Run the canvas skill's pre-generation checks on every shot. Give each shot separate **Start state** and **End state** fields; the clip starts from the start state and its action reaches the end state, and asset nodes take the start state. Write a visible condition (an injury, a dressing, a stain, a held object) on every shot that shows it, not only in the scene header. For a condition with a side, add to the shot's Screen map which way the subject's head points in the frame, which side of the body faces the camera, and so where the condition appears on screen, or "not visible in this shot". Derive it once from the scene's blocking; when the camera would hide a condition the story needs seen, move the camera, not the wound. Use the state image as the visual authority for the side and placement.

- In-world text (a phone screen, a sign) only where the story needs it, short and written exactly; when it must read, it is one of the few reasons for a keyframe or a text reference image. Overlay text (captions, titles, chat bubbles) is added in the edit.
- **Optional keyframes.** Make one only for a picture the previs and assets cannot carry, and record the reason. It describes only what is visible at the shot's start, names characters with asset mentions, uses the episode's style sentence and the scene's light sentence, and states close crops precisely. When the shot needs a precise end-state image, derive it from the accepted start reference. Its route into the clip is in [clips.md](clips.md#which-inputs-a-clip-gets).

### Generation grouping handoff

Retain the edit Shot IDs and coverage even when several shots will share a generation. Before creating video nodes, prepare the [generation grouping plan](clips.md#generation-groups-before-video-nodes): continuous action or dialogue passages are candidates; precise contact and state-reveal inserts may remain independent. Grouping changes production units, not the approved story or cut intent. Map each sound item to its generating group, then resolve it to the actual video node for the structured plan.

### Sound plan

Write the scene's sound plan as a sound plan node (`addNodes` kind `soundPlan`) once its clips exist as video nodes, and keep it current when shots change. Use actual video node IDs for `source` and `continuesOver` (or their local IDs within the same change), not shot labels from the table below. Use the prose table for planning and the structured node for saved sound ownership. Each line and key sound from the screenplay is one item:

| Item          | Kind  | Critical | Source | Carries over | Content                                   | Tail / stop                    |
| ------------- | ----- | -------- | ------ | ------------ | ----------------------------------------- | ------------------------------ |
| L03           | line  | yes      | S02    | —            | Character A: "Who is out there?"          | —                              |
| door-close-01 | event | yes      | S01    | S02          | The heavy door hits the frame once, rings | natural decay carries into S02 |
| phone-ring-01 | event | no       | S18    | S19          | The phone rings in pairs                  | stops when answered            |

- **One source generation per sound.** That group generates it once, even across several cuts. Picture coverage uses the same designated source audio. In the structured plan, `continuesOver` lists the other video nodes over which this source sound continues; cuts within one group are tracked in the cut list. A reverse angle of the same action does not repeat the sound.
- **Preserve sound tails across picture cuts.** Choose picture timing for the scene; the source clip must run long enough for any required tail to continue in the edit.
- **Review overlapping sound and dialogue for intelligibility.** Allow a tail under a new line when it serves the scene; leave room or adjust the mix when the overlap obscures speech. Native dialogue and events in one take cannot be independently separated by the compose timeline.
- **Critical** marks what the film fails without: lines are normally critical; decorative sounds are not.
- Lasting sounds (a ringing phone, footsteps across shots) are one item with a start, the shots they carry over and what stops them.

## Stage 3c · Greybox timing cut

Before generating clips, put selected previs observations into a compose timeline in edit order, using each clip's `{previsNodeId, shotId}` reference. Previs owns scene windows, the sound plan owns sound assignments, and the compose timeline owns planned cut length and playback order. Coverage windows can overlap, but the cut should not accidentally repeat an event. Record dramatic reasons for a same-camera continuation or a new-angle cut and read timing from the owning structured fields. Shots without spatial or motion needs may use sketches or existing frame placeholders.

Connect previs exports directly to a compose node's `video` input and save the intended edit as `composeTimeline`; follow the canvas skill's [greybox-cut procedure](https://klox.ai/agent/skills/canvas/references/previs.md#export-readiness-and-greybox-cuts). Inspect playback of that assembled rough cut before generating clips. Local ffmpeg assembly remains an option for accessible files and temporary speaker/line cards; it is not required to bridge previs and compose. Timing aids are not synthesized episode dialogue. Use the export URLs returned by the tools.

For visual inspection, open the previs node's `reviewUrl` and use the canvas skill's [frame-review procedure](https://klox.ai/agent/skills/canvas/references/previs.md#inspect-frames-on-the-review-page). Before repairs, freeze a baseline with `freeze_previs_snapshot`; after saving, compare the affected frames and revisit later shots whose positions, props, cameras or continuity depend on the change. Use camera and top views together for passage or clearance questions, and adjacent-shot end/start frames for continuity. Record the actual frame range and step; unmodeled details remain unverified.

If files cannot be obtained, frame sequences plus the cut list and sound windows support a limited visual-and-plan review. Actual continuous scene playback can add timing evidence, but the review page's stills cannot establish motion between samples or dynamic rhythm. Report which evidence is available and that the assembled edit is unverified; neither this limited review nor separate scene playback is a rendered animatic. Continue within the user's existing scope with those limits explicit. Review images are not registered generation references; required production exports still come from the owner's editor.

Check the hook, event/reaction order, axis, readable scale and reveals, and whether cuts and pauses give the planned sound enough time. Fix timing and coverage here. For projects without previs, a static animatic from sketches or available frames serves this purpose using the available review material.

## Continuous shots

While cutting, mark which neighbouring shots belong to one **continuous shot**: picture, action and time carry straight on from one to the next, whether or not the camera moves (a continuous follow is one; two moments from the same fixed camera at different times are not). A continuous shot is generated once when one generation can hold it; when it cannot, its later part extends the earlier one through the stage 4 extension route. Place each extension join at a completed dialogue-line boundary. A cut to another camera is a new, independent clip.

## Stage review

Before showing the shot list, run the script → shot list handoff checks from the skill, then review in the skill's finding format:

- For each key scene: does the shot list actually deliver the scene plan's turn, alignment and held moment?
- After each important line or event, is the person it hits shown reacting?
- Does each cut change size, angle, relationship or information?
- List every departure from a default (shot length, coverage pattern) with its reason.
- Does every previs-backed shot name its setup, Shot ID and scene window, and does its Screen map come from that Shot? Are omitted previs routes and unavailable checks explained? List each cut that crosses the axis, with its reason.

After the first clips, review each against its planned scene moment and neighbouring shots: positions, held objects, states and screen direction carry across the cut, and the composition preserves the important spatial relationships shown by the Screen map. Allow natural changes in pose, small position shifts and fine timing; exact map coordinates and height percentages are diagnostic samples, not universal acceptance thresholds. A clip whose blocking is wrong is fixed through its previs Shot, with the prompt kept consistent with that corrected spatial plan. Check sides by derivation, not by asking whether something "is on the left": find where the head points and which surface faces the camera, work out where the condition must appear, then compare it with the Screen map and the state image, cropping in when it is small. A clip that is right except for a side is regenerated with a corrected state image, while preserving the accepted side and continuity requirements.

## Gate

Review the stage 3 timing cut (or the explicitly limited review with its available visual and playback evidence) before generating clips, with the continuous shots marked. Reuse decisions already approved, report what remains unverified, and give the clip-production credit estimate before starting work outside the current budget.

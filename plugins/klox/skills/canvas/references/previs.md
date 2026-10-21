# Previs operations and production handoff

Read this for previs-backed images or clips, greybox timing reviews, or edits to a shared scene. Current tool schemas and `get_capabilities` are authoritative. Drama's storyboard and clips references own creative planning and the production gates.

For final video generation, the exported previs is a white-model blocking reference combined with asset images. Read [white-model reference and rendering](video-models.md#white-model-reference-and-rendering) for the input responsibilities, shot prompt and motion review. The reference uses purpose `layout`; assets and tone references define the finished look.

## Default precision

Previs owns the camera and framing, shot order and planned cut windows, spatial relationships, relative scale, actor routes and object choreography. The prompt directs motives, goals, tactics and reciprocal responses within this plan. Use enough animation to make those decisions readable. Natural gait, weight transfer, joint poses, expressions, breathing, gestures and small pauses belong to video generation. Review against dramatic intent and continuity using spatial intent, readable key events and story continuity as the acceptance criteria. Use planned camera and shot windows as the reference edit; let performance and fine action rhythm develop naturally inside them. Give complete dialogue and meaningful responses room by revising the previs and generation timing together. Keep actual observed source ranges separate from that plan.

In the generation prompt, briefly reinforce the spatial relationships that affect story comprehension and the states that carry across shots. Describe key events through cause, action and visible result, consistent with the connected references. Ordinary travel and staging follow the previs; generation supplies natural performance and fine rhythm. Follow [prompt writing principles](prompt-writing.md#keep-the-spatial-meaning-and-action-causality-readable) for selective spatial reinforcement.

For a critical close-up, name the specific detail that must hold (contact, prop ownership, a visible state change, readable text or a synchronized event) and its supporting reference in the shot prompt. Increase precision for that feature only. Preserve story-critical sides and state continuity and apply detail precision to the relevant close-up.

## Write one shared scene

Use `addNodes` kind `previs` with `timeline`; update with `updateNodes[].timeline`, replacing the whole timeline. Keep unrelated actors, tracks and Shots when changing a scene. Base each update on a fresh read after user or agent edits.

Timeline v1 uses meters, seconds and degrees: floor coordinates x east/y north, height separate, yaw 0 north/90 east. The timeline includes duration, stage landmarks, actors, tracks and Shots. Actor types are humanoid (height and optional build), quadruped (species, shoulder height and length), and prop (box/cylinder/sphere dimensions). Associate actors with project asset IDs for correspondence; that association does not automatically feed asset reference images to a generator. Connect the appropriate asset nodes separately.

## Stand in a location set

A place that recurs is a location asset with a set (`save_asset` `identity.set`): bounds, wall/railing/open sides, openings and fixed furniture with stable IDs. Reference the shared room with `stage.location` = that assetId. Put only this scene's own objects in `stage.landmarks`. Change a set fixture for this scene only with `stage.overrides` (`{fixture, hide: true}` or `{fixture, position?, yaw?, elevation?}`). Furniture that moves during the scene is a fixture prop: an actor `{id, kind: 'prop', label, color, fixture: '<fixture id>'}` with no shape or start. It takes the fixture's size and pose, replaces the fixture in this scene only, and needs its own id (the fixture's id stays taken). Use the fixture-prop reference as the authority for its dimensions and initial pose, and use scene overrides for the other scene-specific set changes.

Walls the camera is ever outside of during a Shot are hidden for the whole Shot. Write `shots[].hide` (`wall:north`, `wall:south`, `wall:east`, `wall:west`, `ceiling`) only to choose differently.

Give an actor its character's `assetId` and leave `body` out: it takes the asset's body (`identity.body`). Write `body` only for a deliberate exception; a warning reports the difference.

If the location has no set yet, save one first (asset-design locations). For a one-off place with no asset, landmarks at explicit working sizes are still allowed. Use confirmed dimensions or explicitly labeled working measurements.

Evaluated tracks are move, motion, gaze, reach and transform. Use supported posture transitions and natural-duration bounds; movement and full-body motion may not overlap. A move key's yaw is allowed only at a stop and turning consumes dwell after arrival. To sit on the floor against a wall, stop the person with the back to the wall and play `slide_down_wall` (posture `sitting_floor`; `sit_floor` holds it, `stand_from_floor` gets up). A reach track moves one arm so the palm lands on a point or an actor anchor; the body does not lean or step, so stage the person within arm's reach and check the arm by eye. Reach places a hand; it does not prove a grip or a touch, so write the contact itself as a Shot note.

### Props in hand

Represent a held prop when its ownership, path or silhouette matters to the shot, attaching it for the time it is held. Incidental hand gestures and exact finger grip can remain generation details. Model it as a free prop at real size; give a long thing (knife, flashlight, bottle, phone) its length as height so it stands out of the fist, and hold it by `bottom`.

| Shot list says           | Write                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Picks it up              | A reach to the prop's grip; an attach starting inside that reach's full weight (after start + blendIn, before end − blendOut).                 |
| Carries it               | One attach for the whole time; the arm moves with the body's motion.                                                                           |
| Holds it up              | A reach to a point, kept for as long as it is held up.                                                                                         |
| Puts it down             | A reach over the surface; the attach ends inside that reach's full weight, with `placeOn` the surface (a landmark, a set fixture, or `floor`). |
| Hands it over            | The taker reaches for the prop while the giver holds it; the taker's attach starts the moment the giver's ends, with a `blendIn`.              |
| Holds it with both hands | One hand attached; the other reaches for another grip of the prop.                                                                             |
| An animal carries it     | Attach at `muzzle`.                                                                                                                            |

A prop moves by `transform` or by `attach`, not both. The next hold of a prop starts no earlier than 0.2 s after a `placeOn` set-down. A hand reaching for a prop someone else holds holds nothing itself. Read the warnings on the node: a pickup out of reach means the prop flies into the hand, so move the hold inside the reach; a set-down off its surface means the hand let go beside it; a prop let go in mid-air needs `placeOn` or a taker.

A transform track moves one prop in world space (one track per prop). Each key writes `position`, `yaw` and optionally `elevation`, `pitch`, `roll` and `ease` (`linear` by default, or `easeInOut`, for the interval the key starts). Elevation is the center height minus half the prop's height: 0 stands it on the floor; a prop lying on its side goes below 0 (a 1 m chair on its back, 0.5 m deep: −0.25). Positive pitch lifts the front, positive roll lifts the right side, and the prop turns about its center, so tipping over a leg also needs the center's path in the keys. A free prop's first key equals its start exactly; to hold before moving, place that key at the moment the move begins. A fixture prop's first key is `{t}` alone and holds the fixture's pose until `t`; every later key writes a whole pose. Keep each angle's change between neighbouring keys under 180° and add a key in between for longer turns (0 → 135 → 270). Transform does not simulate gravity, contact or collisions and is not checked against walls: a pushed chair goes only where its keys say, a hand does not hold it, and a prop through a wall is not refused. Inspect the relevant frame sequence on the review page for landing, floating and contact. When `save_asset` reports `fixtureMotionReview` for a node, the fixture under a moving prop changed while its keys stayed put: inspect the move from the new start and fix the keys if it no longer fits.

A Shot has an ID, scene start/end, aspect ratio and camera keys; camera key t is relative to the Shot start. When a Shot depends on an action the stand-ins cannot perform (an eye opening, a hand contact), still give it its real camera and window and write the action in `shots[].notes` (`{text, start?, end?}`, at most 3, times relative to the Shot start, default the whole Shot). The canvas shows notes over playback and keeps the production export clean; editing them keeps exports current. A note declares the action unmodeled; it does not validate it. Shots can observe overlapping windows. A recurring setup and a finished edit shot are not the same identifier: keep Shot IDs stable and name the setup in production notes. The scene timeline does not specify final edit order.

### Camera moves

Write the camera the shot list names. Position changes need multiple camera keys unless the position follows an actor; focal-length changes always need multiple keys. A single key can follow a moving actor or pan/tilt toward an actor target; it is static only when its position and aim stay fixed. Key times are seconds from the Shot start. Position and aim use `ease` (`easeInOut` by default, or `linear`) for the interval the key starts; focal length always interpolates linearly.

| Shot list says                      | Write                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static                              | One key with a fixed position and target.                                                                                                                                                                                                                                                                                                                                                             |
| Push in / pull out                  | Two keys on one line toward or away from an unchanged target. A slow push covers 0.3–1 m over the Shot; a sharp push covers it in under a second.                                                                                                                                                                                                                                                     |
| Pan / tilt                          | Same position in every key, target changes; or aim at an actor (`target: {actor, anchor: 'head'}`) to pan with it as it moves.                                                                                                                                                                                                                                                                        |
| Pedestal / crane                    | Height changes between keys, target kept.                                                                                                                                                                                                                                                                                                                                                             |
| Follow / tracking / dolly alongside | `position: {follow: {actor: '<id>'}, offset: [right, front, height]}` with the target on the same actor. The offset is in the actor's frame: +x its right, +y its front, height above the floor; it turns with the actor. `offsetSpace: 'world'` keeps the offset fixed on the plan (+x east, +y north) and stops the camera swinging when the actor turns. The camera follows the actor's root path. |
| Leading shot                        | Follow with a positive front offset, aimed back at the actor.                                                                                                                                                                                                                                                                                                                                         |
| Reveal                              | First key aimed away from the subject or with it blocked; last key on it.                                                                                                                                                                                                                                                                                                                             |
| Arc                                 | Three or more keys at one distance around the target.                                                                                                                                                                                                                                                                                                                                                 |
| Zoom                                | Focal length changes between keys; only when the shot list asks for a zoom.                                                                                                                                                                                                                                                                                                                           |
| Settle into a follow                | Mix keys: a fixed key, then a follow key; the camera eases from one to the other.                                                                                                                                                                                                                                                                                                                     |

Follow positions accept people and animals only, with `follow: {actor}` and no anchor. Aim separately with `target: {actor, anchor: 'head'}` or another supported anchor. Follow height is above the floor, including when the actor sits or lies down.

Describe handheld shake in the clip prompt for the video model to perform. After writing a move, inspect the Shot's relevant frame sequence on the review page and compare the computed Screen map with the shot list.

Fix all reported timeline issues and resubmit the change. Report timeline validation from the tool result and choose supported routes for the intended action. An externally made animation can use the normal media route, with its external-reference provenance identified.

## Read and review

The `get_workflow` overview lists each previs node's Shots with export status, a diagnostics count, blocked Shots and each Shot's gate state (`shotGates`). Read the node with `nodeIds` (add `shots` to read only some) for the timeline, the diagnostics, what blocks a Shot's export (a camera inside a body, a root walking through a wall where there is no door or gap), and Screen-map samples at start, middle and last frame when available. A node that cannot be resolved (missing location, a location without a set, an actor with no body anywhere, an id clashing with the set) is marked `unresolved` and does not play or export; fix it before anything else. Use the samples for frame thirds, facing, side-up and approximate height; preserve borderline cases and unavailable results with their reported uncertainty intact.

### Inspect frames on the review page

`get_workflow` gives each previs node a `reviewUrl` and each Shot a `frameCount`. Open that address in your browser tool. The page reads the saved scene once and renders static images in that browser; the owner need not have the editor open.

- Start from diagnostics and Screen maps to choose where to look. Leave `at` out for the scene's first/middle/last contact sheet; use targeted ranges for important action, occlusion and reveals. Frames are numbered `0` through `frameCount - 1`, relative to each Shot.
- Add `at=S11:60` for one frame, `at=S11:0,12,24` for a list, or `at=S11:24-96/4` for every fourth frame from 24 up to 96. A range takes the end only if the step lands on it; omit `/step` for every frame. Join selections with `;`, for example `at=S10:last;S11:first` for a cut boundary. `first`, `mid` and `last` resolve against the Shot's frame count.
- Use `view=camera` (default), `view=top`, or `view=camera,top`. The top view uses one fixed scale for the request; `area=x0,y0,x1,y1` in floor-plan meters pins an inspection region. It is a diagnostic view.
- Wait for any terminal state in the title (`[ready]`, `[error]`, `[stale]`) or the page root's `data-review-state`. Read the visible manifest first: requested frames, current page, successes and failures. Inspect successful images in an `error` result and report failed frames and proceed from the terminal state's manifest.
- Follow the page's pager links: they carry the current `input` identity. If it becomes `stale`, follow the restart link and start the review again. To inspect a newly saved change, reopen the base review address with a fresh input identity. Split oversized selections into smaller requests that cover the intended frames.

Before changing an existing scene to repair a visual problem, call `freeze_previs_snapshot` with `workflowId`, `nodeId` and an `idempotencyKey`. Retry the same request with the same key. It costs no generation credits and returns a baseline (currently valid for 24 hours) and `compareUrl`. Save the fix, open that comparison address with the same `at` and `view`, and recheck downstream shots the change affects. `align=local` compares equal frame indices; `align=progress` compares relative progress and can show different action moments. For an expired or incompatible baseline, report the comparison as unavailable and use a new snapshot for subsequent changes.

Both sides are rendered by the current engine. Read the comparison's environment-change notice: both inputs are rendered with the current engine. Report the actual Shot IDs, frame ranges, sampling steps, failures and unresolved details to the user. Name the actual sampled frames, for example “S11 frames 24–96, every fourth frame”. Use targeted visual inspection for whole-body clearance and generated-detail review for grip and contact pressure. Inspect generated keyframes and clips separately against the scene and assets.

`reviewUrl` and `compareUrl` are null when preview sharing is off. Tell the user when frame evidence is unavailable and why, including missing browser or WebGL support. The owner can use the canvas's previs frame-review entry, whose label follows the interface language, while signed in, independently of preview sharing.

### Dynamic timing review

Static review frames establish sampled visual evidence. Rhythm, motion between samples and cut timing still need continuous playback or an accessible greybox cut. The user can review whole-scene playback on the canvas (the clapperboard button): it plays only the Shots, in start order, so it runs as long as the Shots add up; uncovered scene time is skipped and labeled, and notes show over the picture. Tell the user whose playback evidence was available and what was inspected. Use continuous playback of the assembled cut as evidence for dynamic rhythm and episode timing.

Keep production notes on existing text nodes for what only a person decides: dramatic purpose, chosen route and why. Read shot windows, export status, accepted keyframes, selected takes and gate states from their canvas fields. Sound sources belong in the scene's sound plan node. Use previs sound windows for planned timing and the selected clip for observed sound onset and decay. Describe unmodeled actions in `shots[].notes`. Export hash and file provenance are not universally exposed through MCP; use actual available evidence and tell the user which dependencies are unverified.

## Connect a Shot

- `previs → imageGen`, target `image`: the selected Shot's frame 0 as a layout guide, for that moment and camera.
- `previs → videoGen`, target `video`: each selected Shot's exported video as a separate blocking/camera reference, in the chosen order.
- `previs → compose`, target `video`: selected Shot exports as rough-cut clips; each carries `shot: {previsNodeId, shotId}`.
- Set `connections[].shot` when adding the edge or `updateNodes[].previsShots` for an existing connection. Both accept one Shot ID or an ordered list. With no explicit selection, the first Shot is used; choose it deliberately when it is the intended observation.
- Match the aspect ratio and reference window to the shot, and check model input duration, output duration, total reference limits and combination rules. Validate reference-file duration independently from the planned cut length.
- `get_capabilities.referenceVideoRoutes[model].openingFrame` indicates the opening-picture input beside video: `firstFrame`, `image` with purpose `opening`, or null. Check voice compatibility through capabilities and motion fidelity through generated-take review. Connect needed identity/state/voice assets through the allowed route, within its limits.
- On `image`, `opening` requests the starting composition through the prompt; inspect the generated opening for fidelity. At most one picture gets that purpose. Other timed keyframes have no purpose and are identified by clip time in the prompt.

### Multiple Shot inputs and reference numbering

For a group covering several Shots from one scene, use one connection from that scene's previs node and select its Shots in input order. Each remains a separate registered export with its own freshness check; each Shot reaches the model as its own reference video. Prefer these live exports to manually spliced uploads for ordinary grouped production. Another scene's previs uses its own connection.

These are operation fragments for `apply_workflow_change`; replace node IDs with actual IDs or the local IDs of nodes created in that change. Add a connection with:

```json
{
  "connections": [
    {
      "from": "scene-previs-id",
      "to": "clip-node-id",
      "targetHandle": "video",
      "shot": ["S03", "S04"]
    }
  ]
}
```

Change the ordered selection on an existing connection with:

```json
{
  "updateNodes": [
    {
      "id": "clip-node-id",
      "previsShots": [{ "from": "scene-previs-id", "shot": ["S04", "S03"] }]
    }
  ]
}
```

Use a string for one Shot. Setting an existing selection to `null` explicitly clears it and returns to the default first Shot; the input connection stays in place. Check the current tool schema and model limits for list size, reference counts, individual and total reference duration, and any reference-plus-output limit. Each selected Shot consumes one media input; validate reference limits separately from output duration.

Reference numbers count **all video inputs to the target node** in one sequence: any videos stored on the node itself come first, then its connections by each edge's `order` in `get_workflow` (using the stored edge order), each connection's Shots in their chosen order. Include every other video input when mapping references. For example, if another video is input 1 before the `["S03", "S04"]` connection, these Shots are `video2` and `video3`. Write mentions as `@[S03 blocking](video:2)` and `@[S04 blocking](video:3)` for that mapping; they become the model's `@video2` and `@video3` tokens. `get_workflow` returns the ordered Shot selection on each edge, not an absolute `videoN` label. Derive and record the full node's reference mapping before writing timed prompt sections, and recheck all video mentions after adding, removing or reordering inputs.

If a selected Shot is deleted or its ID changes, `get_workflow` keeps its ID in the edge's selection and reports it in `missingShots`. Execution returns `previs_shot_missing` and preserves the input's existing reference position. Read the current timeline, replace or remove the missing selection through `updateNodes[].previsShots`, then update the grouping notes and recheck the full reference mapping and timed prompt sections before retrying. Clearing the selection to the first Shot is appropriate only when that is the intended replacement. Missing or stale exports for existing Shots instead follow the export-readiness procedure below.

A clip's scene window becomes a reference starting at 0; its generated take can have different actual timing. Keep final source in/out separate and review before editing. Extra model duration needs an explicit hold or usable coverage; represent the extra time through an explicit valid Shot window or prepared media. A separate short Shot can provide another moment's frame 0 if needed, within the existing contract. Use review-page images for inspection and registered Shot exports for generation references.

## Export readiness and greybox cuts

Exports are made by the owner's browser and registered against the saved timeline. Connected stale Shots export after edits settle while the owner has the editor open. Generate the required export in the owner's editor before submitting `run_node` / `run_nodes`; a missing export returns `previs_render_required` with the required node/Shot. Check whether any task or batch was created before retrying; use the existing idempotency key for the same uncreated request, and respect batch retry/status semantics.

Have the owner open the editor when this is required, re-read actual export status, and then retry. If it stays unavailable, report the named Shot and error, then continue work whose inputs are ready. Confirm `exported.image/video` after the owner's editor completes the production export.

For the episode greybox cut, connect previs nodes to a compose node's `video` input and choose the Shots deliberately. The initial default timeline follows input order (edges by `order`, then each selection); save the intended episode order and trims with `composeTimeline` so the rough cut, length and seams are real; a clip names its file by the Shot's `exports.video.fileKey` from a `get_workflow` detail read of the previs node (`nodeIds`, optionally `shots`), with `durationSeconds` for its source range. The editor leaves pending exports out of its initial timeline; server execution requires current exports and reports missing ones. Add newly exported shots explicitly to the saved compose timeline. Keep each clip's full `shot: {previsNodeId, shotId}` reference. Replace placeholders through the canvas skill's [shot replacement procedure](../SKILL.md#reviews-gates-and-shot-replacement), preserving timing and checking detached sound separately. Use clean generation references and keep timing annotations in the review and planning views.

If accessible exports are absent, use review-page frame sequences against the written cut list and sound windows for a limited visual-and-plan review. Include any actual continuous playback evidence separately. Report that the assembled edit, motion between uninspected frames and actual sound timing remain unverified where no such evidence exists and label the result as the review supported by that evidence.

## Changes

A relevant timeline/Shot change, or a change to the set or body it reads, invalidates affected exports; `save_asset` lists the previs nodes a set or body change touched and any problem it brought in. Title and note changes can leave exports current while invalidating the Shot's review fingerprint: review freshness and export freshness are different. Changing a Shot ID is deletion plus addition, so keep each Shot's ID stable and assign a fresh ID to a new Shot. Preserve stored images and takes, then explicitly review or regenerate affected results. Recheck affected inputs, takes and cut mappings; follow the canvas skill's [gate procedure](../SKILL.md#reviews-gates-and-shot-replacement) to record new evidence after a relevant change.

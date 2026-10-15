# Previs operations and production handoff

Read this for previs-backed images or clips, greybox timing reviews, or edits to a shared scene. Current tool schemas and `get_capabilities` are authoritative. Drama's storyboard and clips references own creative planning and the production gates.

## Write one shared scene

Use `addNodes` kind `previs` with `timeline`; update with `updateNodes[].timeline`, replacing the whole timeline. Keep unrelated actors, tracks and Shots when changing a scene. Read it again after user/agent edits rather than overwriting from an old copy.

Timeline v1 uses meters, seconds and degrees: floor coordinates x east/y north, height separate, yaw 0 north/90 east. The timeline includes duration, stage landmarks, actors, tracks and Shots. Actor types are humanoid (height and optional build), quadruped (species, shoulder height and length), and prop (box/cylinder/sphere dimensions). Associate actors with project asset IDs for correspondence; that association does not automatically feed asset reference images to a generator. Connect the appropriate asset nodes separately.

## Stand in a location set

A place that recurs is a location asset with a set (`save_asset` `identity.set`): bounds, wall/railing/open sides, openings and fixed furniture with stable IDs. Write `stage.location` = that assetId instead of copying the room into `stage.landmarks`. Put only this scene's own objects in `stage.landmarks`. Change a set fixture for this scene only with `stage.overrides` (`{fixture, hide: true}` or `{fixture, position?, yaw?, elevation?}`); for furniture that moves during the scene, hide the fixture and add a prop actor. Never edit the set to suit one scene.

Walls the camera is ever outside of during a Shot are hidden for the whole Shot. Write `shots[].hide` (`wall:north`, `wall:south`, `wall:east`, `wall:west`, `ceiling`) only to choose differently.

Give an actor its character's `assetId` and leave `body` out: it takes the asset's body (`identity.body`). Write `body` only for a deliberate exception; a warning reports the difference.

If the location has no set yet, save one first (asset-design locations). For a one-off place with no asset, landmarks at explicit working sizes are still allowed. Do not infer physical dimensions from perspective in one image.

Currently evaluated tracks are move, motion and gaze. Use supported posture transitions and natural-duration bounds; movement and full-body motion may not overlap. A move key's yaw is allowed only at a stop and turning consumes dwell after arrival. Unsupported reach, attach, transform and camera follow are rejected: choose supported staging or another production route, never hide the interaction as a supposed solved contact.

A Shot has an ID, scene start/end, aspect ratio and camera keys; camera key t is relative to the Shot start. Shots can observe overlapping windows. A recurring setup and a finished edit shot are not the same identifier: keep Shot IDs stable and name the setup in production notes. The scene timeline does not specify final edit order.

Fix all reported timeline issues and resubmit the change. Do not present a rejected timeline as validated or hide missing capabilities behind descriptions. An externally made animation can use the normal media route, identified as external reference rather than a solved Klox previs interaction.

## Read and review

`get_workflow` returns the timeline, each Shot's image/video export status, the node's diagnostics, what blocks a Shot's export (a camera inside a body, a root walking through a wall where there is no door or gap), and Screen-map samples at start, middle and last frame when available. A node that cannot be resolved (missing location, a location without a set, an actor with no body anywhere, an id clashing with the set) is marked `unresolved` and does not play or export; fix it before anything else. Use the samples for frame thirds, facing, side-up and approximate height; preserve borderline cases and unavailable results rather than inventing certainty.

Inspect playback for reveals, occlusion and important events between samples. A computed map describes the stand-ins, not a guarantee that generated pictures or clips followed them. Inspect those outputs separately against the scene and assets.

Keep production notes on existing text nodes: scene/previs ID, Shot ID and window, dramatic purpose, planned cut length, sound source, chosen route, accepted keyframe and selected take IDs. These are notes, not new structured API fields. Export hash and file provenance are not universally exposed through MCP; use actual available evidence and mark missing dependencies unverified.

## Connect a Shot

- `previs → imageGen`, target `image`: the selected Shot's frame 0 as a layout guide, for that moment and camera.
- `previs → videoGen`, target `video`: the selected Shot's exported video as a blocking/camera reference.
- Set `connections[].shot` when adding the edge or `updateNodes[].previsShots` for an existing connection. The default first Shot is convenient only when it is actually the intended observation.
- Match the aspect ratio and reference window to the shot, and check model input duration, output duration, total reference limits and combination rules. A short planned cut does not justify an illegal reference file.
- `get_capabilities.referenceVideoRoutes[model].openingFrame` indicates the opening-picture input beside video: `firstFrame`, `image` with purpose `opening`, or null. Presence in this map does not prove voice compatibility or motion fidelity. Connect needed identity/state/voice assets through the allowed route, within its limits.
- `opening` is a prompted reference when on `image`, not a strict first-frame guarantee. At most one picture gets that purpose. Other timed keyframes have no purpose and are identified by clip time in the prompt.

A clip's scene window becomes a reference starting at 0; its generated take can have different actual timing. Keep final source in/out separate and review before editing. Extra model duration needs an explicit hold or usable coverage; no automatic tail-hold or arbitrary-time image-export option exists today. A separate short Shot can provide another moment's frame 0 if needed, within the existing contract.

## Export readiness and greybox cuts

Exports are made by the owner's browser and registered against the saved timeline. Connected stale Shots export after edits settle while the owner has the editor open. `run_node` / `run_nodes` cannot render them on the server today; a missing export returns `previs_render_required` with the required node/Shot. Check whether any task or batch was created before retrying; use the existing idempotency key for the same uncreated request, and respect batch retry/status semantics.

Have the owner open the editor when this is required, re-read actual export status, and then retry. If it stays unavailable, report the named Shot and error instead of repeatedly starting generation. Anonymous preview playback does not replace the owner's export process.

There is no direct previs-to-compose edge. `get_workflow` exposes export status, not a general list of downloadable previs export URLs, and there is no general MCP render/download command. Never invent one or scrape an unexposed file key from a guessed URL.

When exports are accessible through authorized browser/file operations or supplied by the owner, assemble the greybox cut locally and upload it as source material with `addFileNodes`; combine accessible clips and temporary dialogue cards in edit order. Use `import_node_output` only if it is the actual result of an appropriate existing output node. Keep timing annotations out of the clean reference videos used for final generation.

If accessible exports are absent, review the owner's Shot playback against a written cut list and sound windows. Report that the assembled edit remains unverified; do not present separate scene playback as a finished animatic. Do not spend final-video credits merely to bridge this tool gap.

## Changes

A relevant timeline/Shot change, or a change to the set or body it reads, invalidates affected exports; `save_asset` lists the previs nodes a set or body change touched and any problem it brought in. Old generated images and takes are still stored and do not update automatically. Recheck the affected visual inputs, take selection and cut mappings using recorded sources and available current/outdated indicators. Renaming a Shot or node alone does not mean the picture must be regenerated.

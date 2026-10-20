# Locations and spatial references

Design a reusable space around its story or practical function: entrances and exits, where characters can stand, relevant surfaces, sightlines and identifiable landmarks. Keep the space as the location's set (`save_asset` `identity.set`): bounds in meters, each side solid, railing or open, doors/windows/gaps on their walls, fixed furniture with stable IDs (previs scenes refer to fixtures by ID, so keep IDs when you edit furniture). Keep real room boundaries in the set and use per-shot visibility to hide a wall for filming. In the description, say which measurements are confirmed and which are working assumptions, and where they came from.

## Design boards → master anchor → derived references

For a new location or a substantial redesign of its layout, architecture, fixed furnishings or visual style, generate and confirm design boards first, then generate and confirm one clean master-view anchor, and only then derive other camera views and lighting references. Review the generated design and anchor images alongside the written direction and greybox. Reuse the boards and anchor of an existing accepted location for work that preserves its design.

1. **Design boards.** Generate `DESIGN · <location>` boards that establish one coherent space: main action area, doors/windows, fixed furniture, materials, palette and maintenance level. Use alternative boards only when the direction is unresolved; a selected direction still needs a board. Review spatial and visual consistency and obtain the user's confirmation before generating the anchor. When selection is explicitly delegated, inspect, select and record the decision. Keep boards in `designBoards`; connect a reviewed selected view explicitly when using it in image generation.
2. **Master-view anchor.** Generate `ANCHOR · <location> · Master` from the confirmed design. Connect a clean, reviewed selected view from the board as the design reference. Use the matching static set view as `layout` when available. Review the actual empty-room image for geography, proportions, furniture, materials and design fidelity, then obtain confirmation (or record the explicitly delegated selection) before expanding it. Repair drift in the master anchor before expanding the reference set.
3. **Derived references.** Connect the accepted anchor as an actual image input when generating different camera views or lighting states together with the relevant layout and lighting inputs. State what the anchor preserves and what changes. Use the target set view as `layout` for camera changes; for light-only variants keep camera, architecture, furniture and materials fixed. Clips take the place from these references directly, so cover each main camera direction the episode's scenes use (towards the door, towards the window, the reverse angle), alongside the master view. Derive each view from the accepted anchor. Review every result against it before saving.

Complete each required confirmation before starting the dependent generation batch. Include the required stages in the generation scope and credit estimate; stop at the output the user requested.

## Set and camera matching

For a new location, save the working set before generating spatial design views and the master anchor. Its geometry and the selected design must agree; update the owning set or design when review changes it. Use these camera and export rules for the anchor and each derived reference:

1. Add an empty set-view previs node: `stage.location` = the location, `actors: []`, `tracks: []`, `stage.landmarks: []` and `stage.overrides: []`; one Shot per view, each with a single static camera key.
2. Connect each view Shot to an image node's `image` input with purpose `layout`, matching the image node's aspect ratio to the Shot; connect the confirmed design view for the anchor, or the accepted anchor for derived views. Add a compatible tone reference with purpose `tone` when needed; it supplies lighting alongside the anchor. Describe materials and light in the prompt. Connect the location's own asset node once it holds usable reference images.
3. Read the completed image task's `setViewCamera`, which is `{locationAssetId, camera}` or null. Check that `locationAssetId` is the location being updated, then save only `setViewCamera.camera` on the reference. When null or for another location, save the image reference with camera matching awaiting review. Use the camera recorded with the generated task to preserve its generation-time provenance.
4. Ask the user to check at least two clearly different views against the set in the asset library (camera button on the reference). Use the user's overlay review as evidence and keep its status awaiting review until they check it.

For a location whose references are already accepted, derive a working set from them, label it as such in the description, and ask the user to place and check cameras for two different views. Resolve a mismatch in the set or reference so both describe one consistent room.

## Establish geography before decorative variants

The confirmed empty master-view anchor must show the main action area and a few fixed spatial anchors. Record their relationships in the location's identity description (door left of reception desk, treatment table behind the desk, window on the opposite wall). Choose camera height and perspective that make these relationships readable; choose a lens that preserves usable scale.

If reverse angles are needed, derive them from that accepted anchor and geography. A new angle must show the same room with the accepted positions of doors and furniture. A simple top-down layout can support complex blocking, as an explanatory board; production-image use follows reference review.

When the location has a set, use a view of it as the layout guide when generating new location views. Check the actual images: verify that the door, window and table match the shared 3D layout. Resolve a mismatch in the owning asset/layout so the design remains consistent.

## Scene-only prompts

For empty location design boards, anchors and references, describe the visible space: function, architecture, layout, furniture, materials, maintenance, camera and lighting. Translate narrative history and ownership into the confirmed visible features that matter to the design. Connect assets for the subjects visible in the image. The location name can identify the asset in titles and production documents, but define its appearance through concrete visible features and reference images. If story history matters to the image, translate it into confirmed visible features and confirm proposed additions.

## Maintenance and wear

Set wear and cleanliness from the accepted design and visible evidence. Record enduring materials and maintenance in the identity description, and temporary dirt or damage in the relevant state.

## Lighting and state

Define identity through layout, architecture and fixed materials. Use looks for reusable day/night or weather variants; keep geometry fixed while changing light. Temporary damage or mess belongs to the relevant shot state unless a persistent redesigned set is required.

For different views of the same location at the same time, preserve the main light sources in world space, their colour temperature, and the motivated bright/dark relationships. Record these in the look description. Changing camera direction can move a source from screen-left to screen-right; preserve the actual window and light-source positions through the camera change. Check reverse views for consistent source direction, shadows and lit surfaces, allowing physically plausible view-dependent differences.

For each required lighting condition, make a tone frame that controls colour, light and texture. Downstream shots connect it to the `image` input with purpose `tone`, so it supplies colour, light and texture; the layout reference and shot description supply framing. A geography reference and a tone reference may be the same accepted image when both uses are compatible.

## Review

- Verify the confirmed design board → accepted master anchor → derived image inputs and review decisions.
- Check landmark positions, room depth, passage width and believable human scale.
- Compare reverse views for the same doors, windows and major furniture.
- Check that lighting variants preserve architecture and materials; same-time views retain the same light-source positions, colour temperature and illumination logic.
- Check that wear and cleanliness match the accepted maintenance level.
- Generate reusable empty-room references and put character scale studies on explanatory design boards.
- Include readable signage when it serves the story, following the project's text policy.

For close shots, choose references compatible with the intended crop, using accepted scene facts and the relevant tone reference. The scene's spatial facts still apply even when its location image is omitted.

Save clean location images under the relevant look as `other`; annotated plans and alternative layouts go to `designBoards`. Reference only the lighting and angles the production needs.

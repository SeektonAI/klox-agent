# Locations and spatial references

Design a reusable space around its story or practical function: entrances and exits, where characters can stand, relevant surfaces, sightlines and identifiable landmarks. Keep the space as the location's set (`save_asset` `identity.set`): bounds in meters, each side solid, railing or open, doors/windows/gaps on their walls, fixed furniture with stable IDs (previs scenes refer to fixtures by ID, so keep IDs when you edit furniture). Put only real boundaries in the set: a wall removed for filming is hidden per shot, never deleted. In the description, say which measurements are confirmed and which are working assumptions, and where they came from.

## Design boards → master anchor → derived references

For a new location or a substantial redesign of its layout, architecture, fixed furnishings or visual style, generate and confirm design boards first, then generate and confirm one clean master-view anchor, and only then derive other camera views and lighting references. A settled written direction or an approved greybox does not replace these image reviews. Reusing an existing accepted location without a substantial redesign does not require new boards or a new anchor.

1. **Design boards.** Generate `DESIGN · <location>` boards that establish one coherent space: main action area, doors/windows, fixed furniture, materials, palette and maintenance level. Use alternative boards only when the direction is unresolved; a selected direction still needs a board. Review spatial and visual consistency and obtain the user's confirmation before generating the anchor. When selection is explicitly delegated, inspect, select and record the decision. Keep boards in `designBoards`; they are display-only and are not automatically delivered to image generation.
2. **Master-view anchor.** Generate `ANCHOR · <location> · Master` from the confirmed design. Explicitly connect a clean selected view from the board as a design reference; never send unresolved alternatives or an annotated comparison grid as a production reference. Use the matching static set view as `layout` when available. Review the actual empty-room image for geography, proportions, furniture, materials and design fidelity, then obtain confirmation (or record the explicitly delegated selection) before expanding it. Repair drift here rather than spreading it across a batch.
3. **Derived references.** Connect the accepted anchor as an actual image input when generating different camera views or lighting states; do not generate each independently from text, greybox or a historical tone image alone. State what the anchor preserves and what changes. Use the target set view as `layout` for camera changes; for light-only variants keep camera, architecture, furniture and materials fixed. Derive from the accepted anchor rather than chaining imperfect candidates. Review every result against it before saving.

Do not batch the boards, anchor and derived references across an unresolved confirmation step. Include the required stages in the generation scope and credit estimate; stop at the output the user requested.

## Set and camera matching

For a new location, save the working set before generating spatial design views and the master anchor. Its geometry and the selected design must agree; update the owning set or design when review changes it. Use these camera and export rules for the anchor and each derived reference:

1. Add a previs node with `stage.location` = the location and no actors, tracks, landmarks or overrides; one Shot per view, each with a single static camera key.
2. Connect each view Shot to an image node's `image` input with purpose `layout`, matching the image node's aspect ratio to the Shot; connect the confirmed design view for the anchor, or the accepted anchor for derived views. Add a compatible tone reference with purpose `tone` when needed; it does not replace the anchor. Describe materials and light in the prompt. Do not connect the location's own asset node while it has no reference images.
3. Read the completed image task's `setViewCamera`, which is `{locationAssetId, camera}` or null. Check that `locationAssetId` is the location being updated, then save only `setViewCamera.camera` on the reference. When null or for another location, save without a new camera and leave matching unverified. Do not copy a current Shot's camera after generation: the set or Shot may have changed.
4. Ask the user to check at least two clearly different views against the set in the asset library (camera button on the reference). You cannot judge the overlay; report the views as unchecked until they do.

For a location whose references are already accepted, derive a working set from them, label it as such in the description, and ask the user to place and check cameras for two different views. A mismatch is fixed in the set or by remaking the reference; never keep two room designs.

## Establish geography before decorative variants

The confirmed empty master-view anchor must show the main action area and a few fixed spatial anchors. Record their relationships in the location's identity description (door left of reception desk, treatment table behind the desk, window on the opposite wall). Choose camera height and perspective that make these relationships readable; avoid an extreme wide lens that creates unusable scale.

If reverse angles are needed, derive them from that accepted anchor and geography. A new angle must show the same room rather than rearranging doors and furniture to make a pretty composition. A simple top-down layout can support complex blocking, but it is an explanatory board, not automatically a photo reference.

When the location has a set, use a view of it as the layout guide when generating new location views. Check the actual images: shared 3D layout does not ensure a model kept the door, window or table in the correct place. Resolve a mismatch in the owning asset/layout rather than maintaining two conflicting room designs.

## Scene-only prompts

For empty location design boards, anchors and references, describe the visible space: function, architecture, layout, furniture, materials, maintenance, camera and lighting. Omit character names, ownership and narrative history such as "Lena's inherited clinic"; write "a small-town veterinary examination room with maintained older cabinetry" and the specific visible details instead. A character asset is unnecessary when no character is shown. The location name can identify the asset in titles and production documents, but its name alone does not define its appearance for the image model. If story history matters to the image, translate it into confirmed visible features rather than leaving the model to invent them.

## Maintenance and wear

Set wear from the space's actual maintenance level, use and history in the accepted material. Limited means do not imply abandonment: a space with limited resources but careful upkeep can have older furnishings, repaired finishes and clean intact surfaces. Do not default every location to grime, peeling walls, rust or debris. Record enduring materials and maintenance in the identity description, and temporary dirt or damage in the relevant state. Review wear against those facts rather than treating "aged" as a universal style.

## Lighting and state

Define identity through layout, architecture and fixed materials. Use looks for reusable day/night or weather variants; keep geometry fixed while changing light. Temporary damage or mess belongs to the relevant shot state unless a persistent redesigned set is required.

For different views of the same location at the same time, preserve the main light sources in world space, their colour temperature, and the motivated bright/dark relationships. Record these in the look description. Changing camera direction can move a source from screen-left to screen-right; do not move the actual window or relight the room just to preserve image-left illumination. Check reverse views for consistent source direction, shadows and lit surfaces, allowing physically plausible view-dependent differences.

For each required lighting condition, make a tone frame that controls colour, light and texture. Downstream shots connect it to the `image` input with purpose `tone`, so it sets lighting, not framing. A geography reference and a tone reference may be the same accepted image when both uses are compatible.

## Review

- Verify the confirmed design board → accepted master anchor → derived image inputs and review decisions.
- Check landmark positions, room depth, passage width and believable human scale.
- Compare reverse views for the same doors, windows and major furniture.
- Check that lighting variants preserve architecture and materials; same-time views retain the same light-source positions, colour temperature and illumination logic.
- Check that wear and cleanliness match the accepted maintenance level.
- Keep character figures out of reusable empty references; use scale explanation on a design board instead.
- Avoid unnecessary readable signage; required story text follows the project's text policy.

For close shots, do not force a wide location plate into the inputs if it repeatedly widens the crop. Use the accepted scene facts in the shot prompt and the relevant tone reference when compatible. The scene's spatial facts still apply even when its location image is omitted.

Save clean location images under the relevant look as `other`; annotated plans and alternative layouts go to `designBoards`. Reference only the lighting and angles the production needs.

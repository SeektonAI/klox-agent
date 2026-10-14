# Locations and spatial references

Design a reusable space around its story or practical function: entrances and exits, where characters can stand, relevant surfaces, sightlines and identifiable landmarks. Do not invent precise floor dimensions when approximate relationships are enough.

## Establish geography before decorative variants

Create an empty anchor wide view showing the main action area and a few fixed spatial anchors. Record their relationships in the location's identity description (door left of reception desk, treatment table behind the desk, window on the opposite wall). Choose camera height and perspective that make these relationships readable; avoid an extreme wide lens that creates unusable scale.

If reverse angles are needed, derive them from that geography. A new angle must show the same room rather than rearranging doors and furniture to make a pretty composition. A simple top-down layout can support complex blocking, but it is an explanatory board, not automatically a photo reference.

## Maintenance and wear

Set wear from the space's actual maintenance level, use and history in the accepted material. Limited means do not imply abandonment: a space with limited resources but careful upkeep can have older furnishings, repaired finishes and clean intact surfaces. Do not default every location to grime, peeling walls, rust or debris. Record enduring materials and maintenance in the identity description, and temporary dirt or damage in the relevant state. Review wear against those facts rather than treating "aged" as a universal style.

## Lighting and state

Define identity through layout, architecture and fixed materials. Use looks for reusable day/night or weather variants; keep geometry fixed while changing light. Temporary damage or mess belongs to the relevant shot state unless a persistent redesigned set is required.

For different views of the same location at the same time, preserve the main light sources in world space, their colour temperature, and the motivated bright/dark relationships. Record these in the look description. Changing camera direction can move a source from screen-left to screen-right; do not move the actual window or relight the room just to preserve image-left illumination. Check reverse views for consistent source direction, shadows and lit surfaces, allowing physically plausible view-dependent differences.

For each required lighting condition, make a tone frame that controls colour, light and texture. Downstream shots connect it to the `image` input with purpose `tone`, so it sets lighting, not framing. A geography reference and a tone reference may be the same accepted image when both uses are compatible.

## Review

- Check landmark positions, room depth, passage width and believable human scale.
- Compare reverse views for the same doors, windows and major furniture.
- Check that lighting variants preserve architecture and materials; same-time views retain the same light-source positions, colour temperature and illumination logic.
- Check that wear and cleanliness match the accepted maintenance level.
- Keep character figures out of reusable empty references; use scale explanation on a design board instead.
- Avoid unnecessary readable signage; required story text follows the project's text policy.

For close shots, do not force a wide location plate into the inputs if it repeatedly widens the crop. Use the accepted scene facts in the shot prompt and the relevant tone reference when compatible. The scene's spatial facts still apply even when its location image is omitted.

Save clean location images under the relevant look as `other`; annotated plans and alternative layouts go to `designBoards`. Reference only the lighting and angles the production needs.

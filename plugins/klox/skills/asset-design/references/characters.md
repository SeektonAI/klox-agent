# Characters and turnarounds

## Design for the role and the frame

From the supplied material, identify what the viewer must recognise: approximate age, face structure, build, silhouette, hair and distinctive features. Choose costume, materials and grooming to express the accepted role, era and social position. Ground distinctive features in the supplied material and accepted design choices.

Make the cast distinguishable at the intended scale through a combination of silhouette, proportions, palette and styling. Maintain the chosen production style across faces and bodies. For a close-up-heavy drama, prioritise an identity face reference; for action, check full-body proportions and garment movement space.

## Recognition from side and back

For each principal or recognisable recurring character, identify at least one cue readable in profile and one from behind. Use established hair outline, body proportions, posture, garment silhouette or construction. Identity cues belong in `identity.description`; outfit-specific cues belong in the look description. If a costume or hairstyle hides a cue, choose another supported cue for that look. Verify it in the required side/back views at the intended shot scale. Give anonymous extras enough visual definition for their role.

## Cast height and scale

Save each character's approved height as its body (`save_asset` `identity.body`: `{kind: humanoid, height}`); previs actors of the character take it when they leave `body` out. Record relationships to named characters in the identity description. Derive the cast's height order and numeric gaps from the structured bodies when reviewing group shots; use descriptions for intended relationships, measurement sources and working assumptions, resolving any conflict with the body before production; use the structured bodies as the height authority. Resolve contradictory relationships before making references. If heights are not established, propose and confirm them as design choices.

Use at least one stable absolute scale reference for the cast when full-body or group framing needs it: an approved height measurement or a location feature whose size is established. When comparing a character to a doorway, specify upright posture, footwear, standing plane and perspective, and keep it compatible with the location's description. Compare heights using established scale, depth and posture. Check pair tests with comparable depth and posture to make scale relationships readable.

For animal assets used in previs, save species, shoulder height and body length as the body (`{kind: quadruped, species, shoulderHeight, length}`). Relative proportions are useful for design, but the production timeline needs explicit working measurements; label proposed values and resolve contradictions before use.

## Anchor and reference selection

Character identity and each look use one 3-view sheet: full-body front, full-body back and frontal face close-up. Establish and review the identity sheet first, using the supplied reference as an actual image input. Generate each look sheet from that accepted identity sheet as an actual image input, preserving the same face, build and body proportions while applying only the specified outfit, hair, makeup and accessories. Use a horizontal 16:9 row on neutral medium-grey with consistent soft diffuse light. Save the identity sheet in `identity.references` and each derived look sheet in that look's `references`, main sheet first; each reference carries its file key and, for locations when relevant, camera metadata. The close-up supplies facial identity and the body views establish proportions and silhouette. Add supplementary detail images when the planned shots need more resolution. Keep existing accepted references until the replacement is inspected and accepted.

## 3-view sheet prompts

Use a horizontal 16:9 sheet with three panels in one row, left to right:

1. **Full-body front:** head to feet, head and torso square to camera, neutral upright stance, relaxed arms, hands visible, headroom and foot room.
2. **Full-body back:** head to feet, facing directly away, the same figure scale and baseline as the front; show the accepted hair and costume construction from behind.
3. **Frontal close-up:** head and shoulders or chest up, face square to camera, eyes toward the lens, unobstructed facial detail and a neutral expression. Give this panel enough resolution to establish the face clearly.

Use a continuous neutral medium-grey background and consistent soft, diffuse lighting. Expose the image for readable skin, fur and fabric detail. Preserve the character's accepted look and the production's visual style. Use clean character panels on the continuous studio background, preserving essential costume accessories. Keep identity and look consistent as angle and crop change.

Check identity, anatomy, proportions, hair, garment seams, fastenings and accessory placement across views. Describe left/right as anatomical sides and verify any asymmetric feature visually. Resolve unknown back construction as a design choice. Review consistency across all three panels. If different faces within a sheet cause identity drift, a targeted edit can simplify the small face in the full-body front while preserving its head silhouette and leaving the close-up intact; apply this optional repair when reviewing identity drift.

Save the complete identity sheet in `identity.references`, then save each derived sheet in the corresponding look's `references`. Put the main sheet first in each list and supplementary detail images after it. Compare each look directly against the accepted identity sheet for facial structure, age, build and body proportions, then check the requested styling across all three panels.

Add profile, three-quarter, asymmetric detail or alternate-state references only when the planned shots need information absent from the sheet. Choose supplementary views from the planned shot requirements. For nonhuman characters whose anatomy needs a different view, adapt the body coverage to actual use and preserve a clear identity close-up using a posture appropriate to the species.

## Alternate forms

For a story with human/animal forms or other transformations, first preserve the established rules. Write which traits link the forms, which traits change and which form appears in each shot. Test the transformation itself through the production workflow.

When anatomy changes substantially, use separately identifiable assets for each form of the same character and document their shared story identity in their identity descriptions. A clothing change remains a look. Use dedicated anchors for each form with each form represented in its own reference sheet. Testing the transformation itself belongs to drama clip production.

## Prompt templates

For the identity sheet, adapt:

> Use the connected source reference to establish this character's identity in the accepted baseline styling. Create one 16:9 character reference sheet with three panels in a single horizontal row: LEFT full-body front, CENTER full-body back, RIGHT frontal face close-up. Both body views show the complete figure at matching scale and baseline, relaxed neutral stance, with head and feet uncropped. The close-up faces directly toward the camera with clear eyes and facial features; use it as the primary facial identity. Preserve the same face, build, hair, costume, materials and accessories across all views. Continuous neutral medium-grey background, consistent soft diffuse light, natural readable detail. Show the same selected outfit in all three clean character panels.

Replace the generic preservation list with the character's accepted visible anchors. Inspect all three panels before saving the sheet as a production reference.

For each look sheet, connect the accepted identity sheet as an actual image input and adapt:

> Use the connected identity 3-view sheet as the identity authority. Preserve the exact same face, age, build, height and body proportions. Apply the specified look: <accepted outfit, hair, makeup and accessories>. Create one 16:9 sheet with LEFT full-body front, CENTER full-body back and RIGHT frontal face close-up, matching the identity sheet’s panel arrangement, body scale, baseline, neutral pose, medium-grey background and soft diffuse lighting. Keep the face and physique consistent with the identity in every panel; show the requested styling consistently across all three views.

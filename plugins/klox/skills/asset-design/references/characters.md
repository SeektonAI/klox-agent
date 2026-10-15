# Characters and turnarounds

## Design for the role and the frame

From the supplied material, identify what the viewer must recognise: approximate age, face structure, build, silhouette, hair and distinctive features. Choose costume, materials and grooming to express the accepted role, era and social position. Do not add scars, insignia, jewellery or backstory simply to make a character distinctive.

Make the cast distinguishable at the intended scale through silhouette, proportions, palette and styling, not just hair colour. Maintain the chosen production style across faces and bodies. For a close-up-heavy drama, prioritise an identity face reference; for action, check full-body proportions and garment movement space.

## Recognition from side and back

For each principal or recognisable recurring character, identify at least one cue readable in profile and one from behind. Use established hair outline, body proportions, posture, garment silhouette or construction; do not invent scars or accessories just to fill the checklist. Identity cues belong in `identity.description`; outfit-specific cues belong in the look description. If a costume or hairstyle hides a cue, choose another supported cue for that look. Verify it in the required side/back views at the intended shot scale. An anonymous extra does not need a unique identity cue.

## Cast height and scale

Save each character's approved height as its body (`save_asset` `identity.body`: `{kind: humanoid, height}`); previs actors of the character take it when they leave `body` out. Record relationships to named characters in the identity description. Derive the cast's height order and numeric gaps from the structured bodies when reviewing group shots; use descriptions for intended relationships, measurement sources and working assumptions, resolving any conflict with the body before production; do not maintain a second editable height table. Resolve contradictory relationships before making references. If heights are not established, propose them as design choices rather than claiming source facts.

Use at least one stable absolute scale reference for the cast when full-body or group framing needs it: an approved height measurement or a location feature whose size is established. When comparing a character to a doorway, specify upright posture, footwear, standing plane and perspective, and keep it compatible with the location's description. A head aligning with a distant doorframe in one perspective shot does not establish real height. Check pair tests with comparable depth and posture so perspective cannot disguise a mismatch.

For animal assets used in previs, save species, shoulder height and body length as the body (`{kind: quadruped, species, shoulderHeight, length}`). Relative proportions are useful for design, but the production timeline needs explicit working measurements; label proposed values and resolve contradictions before use.

## Anchor and reference selection

For a newly generated character, establish a neutral full-body front anchor in the primary look: head and torso face the camera without yaw or tilt, shoulder and hip lines are parallel to the image plane, both feet point forward, and neither side is advanced toward the camera. Keep the face unobstructed, the silhouette readable and the hands relaxed. Specify this geometry explicitly; the word "front" alone is insufficient. Derive three-quarter views from the accepted front anchor rather than using them as the default anchor. A derived front face close-up must repeat the head-on orientation instead of inheriting a turned pose from another view. Preserve already accepted side or three-quarter references and add a front anchor when needed, without redesigning the identity. If the user has already accepted a face, use it when making the body anchor rather than redesigning it. Keep facial proportions consistent between the body and close-up references.

Choose views from actual use:

| Need                               | Reference                                                     |
| ---------------------------------- | ------------------------------------------------------------- |
| Close dialogue                     | Neutral face close-up; three-quarter or profile if needed     |
| Full figure or blocking            | Uncropped full-body anchor in the selected look               |
| Reverse angle or back entrance     | Side/back view derived from the anchor                        |
| Asymmetric detail or key accessory | Dedicated detail with anatomical side and attachment location |
| Costume change                     | New look referenced to the same identity                      |

Do not generate six views for every character automatically. A front/side/back sheet can be sufficient; asymmetric features may require both sides. A turnaround is a consistency check as well as a reference, not proof that the generated views agree.

## Turnaround prompts

For a sheet, specify the exact views and their order, consistent figure scale and baseline, one selected look, neutral light and a plain background. Ask for one character repeated, not a cast. Use restrained poses, the same garment construction, and minimal perspective distortion. Keep labels and dimensions on the explanatory sheet; prefer clean panels for production when annotations interfere.

Describe left/right as the character's anatomical sides, not the viewer's. A scar on the left eyebrow must remain on that eyebrow when the character turns. Compare shoulder width, limb lengths, facial profile, hair silhouette, seams, fastenings and accessory placement across all panels.

A single-view reference is tagged `other`; a multi-view turnaround sheet is tagged `turnaround`; a face close-up is tagged `face`. These are Klox's existing tags: do not invent `profile` or `back` API tags. Name the node to preserve the specific view. Extracting a panel from a sheet does not repair its anatomy or identity; inspect it before saving.

## Alternate forms

For a story with human/animal forms or other transformations, first preserve the established rules. Write which traits link the forms, which traits change and which form appears in each shot. Do not assume the generator can transform accurately just because both designs exist.

When anatomy changes substantially, use separately identifiable assets for each form of the same character and document their shared story identity in their identity descriptions. A clothing change remains a look. Use dedicated anchors for each form rather than a mixed reference sheet that can blend anatomies. Testing the transformation itself belongs to drama clip production.

## Prompt example

For an already accepted character anchor, a derived view prompt can say:

> Use the connected anchor for this character's identity and selected outfit. Show one full-body back view at the same figure scale, in a relaxed neutral pose on a plain light-grey background. Preserve build, hair length, collar shape, garment colour and hem length. Reveal the back construction described in the accepted look description. No alternate outfit, extra person or annotations.

Replace the generic preservation list with the actual visible anchors. If back construction has not been decided, propose it before presenting the view as canonical.

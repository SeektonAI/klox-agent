# Reference review and Klox handoff

## Review against intended use

Inspect the actual image and compare it to the accepted anchor and current asset descriptions (or proposed descriptions for text-only work). Accept the image after reviewing it against the intended use.

| Check               | Evidence to inspect                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| Source fidelity     | Required era, features, costume, branding or story facts are retained                           |
| Identity            | Face, build, silhouette or object geometry match the anchor                                     |
| Views and state     | Anatomical sides, seams, accessories, spatial landmarks and functional parts agree              |
| Usability           | Needed crop, resolution, pose and detail are clear and anatomically or geometrically consistent |
| Input contamination | Subjects, costumes, background and lighting suit the intended reference role                    |

Report a defect with node/view, visible evidence, the intended use it breaks and the smallest correction. Keep taste choices separate: palette preferences and continuity requirements are distinct review decisions. Repair affected views while preserving the accepted character design.

For a state image containing a prop or another project asset, compare that object's shape, scale and visible details to its accepted reference as well as checking state placement and contact. Check state placement and included prop fidelity as separate requirements. Report the checked details and remaining review gaps to the user.

When inspection is unavailable, keep the image as a candidate and report the checks awaiting review. Reuse user-supplied accepted designs and check their suitability for the intended input route.

## Storage and input planning

Use the canvas skill's `save_asset` and upload operations, with current tool schemas as the authority:

- Store enduring identity facts in `identity.description` and the accepted identity 3-view sheet in `identity.references`.
- Generate each character look’s 3-view sheet from the accepted identity sheet as an actual image input, preserving the face and body proportions while applying the specified styling. Save it on that look, main sheet first, supplementary details after it.
- Put temporary conditions on the asset node used by the affected shots.
- Store explanatory or comparison boards in `designBoards`, which are display-only. Promote a selected image to generation input through production-reference review.
- Save reference file keys and relevant location camera metadata. Review uploaded and imported files before accepting them as asset references.

Keep the reference set small enough for the target model and all subjects in a shot. Klox sends the first look reference, state images, the first identity reference, then remaining look and identity images in saved order within its limits. Put references in intentional priority order, inspect model capacity with `get_capabilities`, and resolve competing inputs before generation. Plan each shot's reference budget using the asset node's stored reference order and the model's current capacity.

Clips are generated straight from previs and assets, so the delivered references are what the model sees of each subject: plan which asset inputs and voice references the clip's model supports, and for a previs route hand over the approved dimensions. A recurring location needs references facing each main camera direction its scenes use. Only an optional keyframe on a strict first-frame route carries appearance instead; `opening` on a reference image requests the start, its starting composition is requested through the prompt. Verify that the required reference images reach the model.

## Acceptance note

Keep confirmed identity and look facts, design requirements and continuity locks only in the corresponding asset descriptions. A temporary `DESIGN · <asset>` node holds candidates and unresolved questions before the asset exists; after selection, merge accepted facts into the descriptions and remove duplicated design prose. Keep the asset descriptions authoritative for confirmed design facts.

Report acceptance evidence that has no asset field in your reply, with links or IDs for the inspected references. Keep design facts in asset descriptions and report review evidence in the reply. Keep the report concise:

```text
Asset / look: <existing IDs, or not saved for text-only work>
Anchor: <node ID and accepted output fileKey>
Accepted references: <node/file IDs, identity or look, control purpose>
Display-only boards: <IDs, if any>
Pair tests: <tested characters/looks, node/output IDs and observed results>
Missing / unverified: <missing reference or untested shot/pair use; design questions go to the corresponding description or temporary candidate node>
Affected shots: <IDs when replacing a used reference>
```

Fill the fields with actual decisions and available file IDs. Omit irrelevant fields. Preserve existing library references not affected by the request; include the prior references when the API replaces a reference array. Keep stable asset/look IDs when changing their content.

Replacing generation references can advance asset versions and make existing results outdated. Before replacement, identify the affected production work and follow the canvas skill's selection and generation authorization rules. Regenerate affected downstream shots within the authorized production scope. If the tools expose no reliable freshness evidence, report known changes, affected shots and the freshness checks awaiting evidence.

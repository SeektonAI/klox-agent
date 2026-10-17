# Reference review and Klox handoff

## Review against intended use

Inspect the actual image and compare it to the accepted anchor and current asset descriptions (or proposed descriptions for text-only work). A generation task finishing successfully is not an acceptance decision.

| Check               | Evidence to inspect                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Source fidelity     | Required era, features, costume, branding or story facts are retained                                |
| Identity            | Face, build, silhouette or object geometry match the anchor                                          |
| Views and state     | Anatomical sides, seams, accessories, spatial landmarks and functional parts agree                   |
| Usability           | Needed crop, resolution, pose and detail are readable without hidden or distorted features           |
| Input contamination | Extra subjects, competing costumes, labels, dramatic lighting or unintended marks will not be copied |

Report a defect with node/view, visible evidence, the intended use it breaks and the smallest correction. Keep taste choices separate: a preference for a different palette is not a continuity error. Repair only affected views; do not redesign the accepted character to accommodate a bad child image.

For a state image containing a prop or another project asset, compare that object's shape, scale and visible details to its accepted reference as well as checking state placement and contact. A correct wound side does not establish that the arrowhead matches the prop used in later shots. Report what was checked and any unverified details to the user; do not give the whole image a blanket reviewed status while a required check remains open.

When inspection is unavailable, say which checks are unverified and do not save the candidate as an accepted reference. User-supplied accepted designs need no new exploration, but their suitability for a new input route still needs checking.

## Storage and input planning

Use the canvas skill's `save_asset` and upload operations, with current tool schemas as the authority:

- Store enduring identity descriptions and identity references on the asset; put a face reference there only when it is suitable across looks.
- Store outfit-specific body references and turnarounds on the look. Makeup or hair that belongs to only one look must not accidentally become an identity-wide constraint.
- Put temporary conditions on the asset node used by the affected shots.
- Store explanatory or comparison boards in `designBoards`, which are display-only. Acceptance as a design board does not make the image a generation input.
- Use only `turnaround`, `face` and `other` reference tags. A file may be uploaded or imported without being accepted as an asset reference.

Keep the reference set small enough for the target model and all subjects in a shot. Klox sends turnaround references first, then face references, then other images within its limits; adding every possible view can crowd out another subject or an important input. Put useful `other` references in intentional order, inspect model capacity with `get_capabilities`, and resolve competing inputs before generation. The asset node does not offer arbitrary per-shot selection of reference views; do not promise a choice that the current tools cannot express.

Clips are generated straight from previs and assets, so the delivered references are what the model sees of each subject: plan which asset inputs and voice references the clip's model supports, and for a previs route hand over the approved dimensions. A recurring location needs references facing each main camera direction its scenes use. Only an optional keyframe on a strict first-frame route carries appearance instead; `opening` on a reference image requests the start, it does not make that image a strict first-frame input. Asset descriptions alone are not a substitute for the images actually delivered to the model.

## Acceptance note

Keep confirmed identity and look facts, design requirements and continuity locks only in the corresponding asset descriptions. A temporary `DESIGN · <asset>` node holds candidates and unresolved questions before the asset exists; after selection, merge accepted facts into the descriptions and remove duplicated design prose. Do not leave a second editable design specification on the canvas.

Report acceptance evidence that has no asset field in your reply, with links or IDs for the inspected references. Keep design facts in the asset descriptions; do not create or retain a canvas node just for review evidence or a second copy of those facts. Keep the report concise:

```text
Asset / look: <existing IDs, or not saved for text-only work>
Anchor: <node ID and accepted output fileKey>
Accepted references: <node/file IDs, view tags, identity or look, control purpose>
Display-only boards: <IDs, if any>
Pair tests: <tested characters/looks, node/output IDs and observed results>
Missing / unverified: <missing reference or untested shot/pair use; design questions go to the corresponding description or temporary candidate node>
Affected shots: <IDs when replacing a used reference>
```

The fields record actual decisions, not a new database schema or a claim that all files exist. Omit irrelevant fields. Preserve existing library references not affected by the request; include the prior references when the API replaces a reference array. Keep stable asset/look IDs when changing their content.

Replacing generation references can advance asset versions and make existing results outdated. Before replacement, identify the affected production work and follow the canvas skill's selection and generation authorization rules. Do not regenerate downstream shots automatically. If the tools expose no reliable freshness evidence, tell the user the known changes and affected shots rather than claiming a mechanical freshness check passed.

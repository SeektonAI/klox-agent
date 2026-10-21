---
name: asset-design
description: Design reusable characters, locations and props for Klox productions - explore visual directions, select a design, build anchor images, derive turnarounds and detail references, review consistency and save accepted references to project assets. Use for character design, design boards, model sheets, turnarounds, environment or prop bibles, and repairing asset references. Episode writing, story shots and final video use the drama and canvas skills.
---

# Klox Asset Design

This skill owns visual asset development. The Klox canvas skill owns tool operations, budgets, uploads and asset storage; follow it when working on Klox. The drama skill owns story facts and episode production. Preserve confirmed story facts and existing design choices; bring proposed story changes to the story decision stage.

Skill version 1.4.29. The latest version is always at https://klox.ai/agent/skills/asset-design/SKILL.md.

## Start from the material that exists

Read the requested canvas's `Brief`, relevant screenplay or shot requirements, and `get_assets`. Reuse accepted assets before designing new ones. Start standalone design tasks from the character idea or supplied reference. If the task is only a written design brief, deliver the written design directly.

Identify the few missing choices that change the design: production style, era, identity, required looks or essential story features. Resolve routine choices yourself; ask only about genuine forks not already delegated. Use supplied images to establish visible appearance; treat unseen details and story history as proposals for confirmation.

Read only the reference needed for the asset:

- Characters, faces, turnarounds and alternate forms: [characters.md](references/characters.md).
- Locations, spatial anchors and lighting variants: [locations.md](references/locations.md).
- Props, products, scale and functional states: [props.md](references/props.md).
- Before accepting references or updating the library: [review-and-handoff.md](references/review-and-handoff.md).

## Three outputs with different jobs

| Output                   | Purpose                                                                                          | Use in generation                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Design exploration board | Compare genuinely different directions in silhouette, palette, materials or character impression | Candidate for selecting a direction; production use follows image review                           |
| Design sheet             | Explain the selected design through views, details, scale and annotations                        | Save as a display-only `designBoards` image unless its actual content also passes reference review |
| Production reference     | Control identity, a look, geography, scale or a functional state                                 | A real, inspected image saved in `identity.references` or a look's `references`                    |

Accept production references after inspecting their generated images. Use reviewed turnarounds as production references and keep annotated comparison boards in `designBoards`. Choose the output types each asset needs; new or substantially redesigned locations must follow the design-board and master-anchor sequence in [locations.md](references/locations.md).

## Workflow

1. **Define the design requirements.** Use `identity.description` as the source for confirmed identity facts and design requirements, and each look's `description` for its confirmed visual variant, including the continuity lock. Include source facts, practical or dramatic function, visible anchors and required uses; keep temporary shot states on asset nodes. Only when an asset has not been created and its direction is unresolved, use a temporary `DESIGN · <asset>` node for candidate directions and open questions. Once settled, merge accepted facts into the asset descriptions and remove duplicated prose from that node. Report reference acceptance evidence and test gaps in your reply (see review-and-handoff.md). Use design nodes for unresolved candidates. For text-only work, deliver the proposed descriptions directly.
2. **Explore when a direction is open.** Offer a small set of materially different directions, with the viewing effect and production tradeoff of each. Generate exploration boards only when image generation is requested and the credit scope is agreed. When the direction is settled, skip alternative exploration; for a new or substantially redesigned location, still generate and confirm a design board documenting the selected design before making its master-view anchor (see locations.md). Ask the user to choose if the design fork has not been delegated.
3. **Establish an anchor.** For a new or substantially redesigned location, confirm its generated design board first, then generate and confirm the master-view anchor before deriving other views or lighting variants. For a character, establish an accepted identity 3-view sheet, then derive each look’s 3-view sheet from it as an actual image input, preserving face and build while applying the specified styling; follow characters.md. For other assets, make one clean image that defines the selected identity and relevant look or geometry. Name it `ANCHOR · <asset> · <look>`. Review it before expanding: correct design, usable proportions, recognisable features and the intended baseline state. When the user delegates selection, select and explain; otherwise present the concrete image for acceptance.
4. **Derive only needed references.** Connect accepted anchors as image inputs when deriving new views. Write what changes (angle, crop, outfit or functional state) and what must remain. If a rear view reveals new construction, confirm the new construction as a design choice. Derive from clean accepted references; keep complementary accepted views only when they establish necessary unseen facts.
5. **Review and save.** Compare each result to the anchor and required use, then accept, repair or mark missing using the handoff reference. Save only inspected, accepted images as production references. Keep candidate boards on the canvas or in `designBoards`, preserving accepted production references until a replacement passes review.
6. **Check practical use.** When shots exist and tests are within the agreed generation scope, test the main-character pairs that actually share a frame, prioritising frequent interactions and similar-looking characters. Use an existing inspected clip or image for a representative pair and look combination when available. If a separate static composition test is needed and authorized, make that test image and evaluate the production input route separately. Check face mixing, swapped identities, costume transfer and height relationships against both characters' anchors. Prioritise representative pairs used by the planned scenes. Also test a representative close-up, reverse angle or prop insert when needed. Evaluate sheet quality and practical shot use separately. Report tested combinations and evidence to the user, and name untested uses as unverified. Include video tests in the production scope when requested.

Stop at the requested output. Deliver written designs for text requests, generate asset references within the agreed image scope, and obtain the corresponding scope for episode clips. Apply the canvas skill's credit ceiling and retry rules, continuing covered views under existing authorization. If a result repeatedly drifts, diagnose the anchor, competing inputs or view specification before spending again.

## Identity, look and shot state

- **Identity**: what makes this the same person, place or object across productions.
- **Look**: a reusable visual variant such as costume, location light state or a prop's open configuration.
- **Shot state**: a temporary condition such as wet hair, a fresh bandage or a held object; it goes on the asset node used by those shots.

**State images.** When the location or direction of a shot state matters, make a state image that clearly shows its placement:

1. Derive it from the accepted anchor by image editing: keep the subject and change only the state. Choose a view in which the side and direction read directly from the image (the injured flank facing the camera, the arrow's full length visible). If the state includes a prop or another asset already defined in the project, also connect its accepted reference to establish its accepted design. The subject anchor sets identity and look, the additional asset reference sets that object's shape, and the state specification sets placement, direction and contact.
2. Decide the facts first and show them exactly: the anatomical side, the place on the body, the size, and for anything that pierced or struck, the direction it came from and the angle it sits at.
3. Put the key fact in one image. Add a second only for another angle or a close detail; a model with little room gets the first alone.
4. Use clean visual references; reserve annotations for explanatory boards or a tested reference route.
5. Review it like a reference (see review-and-handoff.md): the side matches the screenplay's `[CONT]` line, the accepted identity and look remain consistent, and any included prop or other asset matches its accepted reference. Report checked details and remaining review gaps. Name it `STATE · <asset> · <state>`.

Save temporary state images on the asset node as `stateReferences` (see the canvas skill). Use its state text to name the condition and its images to establish placement and direction.

In downstream shots, a reviewed state image can already carry the included prop's design. Add the prop's own reference when the shot needs more detail than the state image supplies, within the model's reference budget.

Write visual generation prompts with subjects grounded in connected assets or visible input images, with story names tied to their visible references. Empty location prompts describe the space alone (see locations.md); retain narrative context in production documents unless it has a concrete visible or audible effect.

Use visible, comparable anchors that establish concrete visual features. Choose a few features that survive the intended framing. Write a short continuity lock in the prompt language for facts that should stay fixed during that look; leave changing facts out. Keep ordinary poses and views attached to the same asset.

For speaking characters, record voice direction and use accepted voice references through the canvas skill where the video model supports them. Voice design establishes the reusable voice reference; generate episode dialogue in the production task's video model.

## Handoff to scene previs

When production uses previs, hand over approved physical proportions and space as asset data: each location's set and each acting character's body (see the locations and characters references). Keep plot-critical prop dimensions in the description, with measurements identified as confirmed or working assumptions. Scenes use the shared set and body references. Asset references define appearance and state, while previs defines shot pose, location and motion. Use a visual pair test to check generated appearance against that geometry. Build episode previs when it is included in the requested production scope.

## Completion

Report the selected direction, accepted anchor and reference node/file IDs, their identity or look placement, what each controls, any unresolved design or missing view, and which existing shots are affected by a replacement. Give the canvas preview link when available. State whether representative shot use was actually tested. Tie consistency, audio quality and readiness claims to the inspected evidence.

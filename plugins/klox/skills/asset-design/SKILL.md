---
name: asset-design
description: Design reusable characters, locations and props for Klox productions - explore visual directions, select a design, build anchor images, derive turnarounds and detail references, review consistency and save accepted references to project assets. Use for character design, design boards, model sheets, turnarounds, environment or prop bibles, and repairing asset references. Does not write episodes, storyboard story shots or generate final video.
---

# Klox Asset Design

This skill owns visual asset development. The Klox canvas skill owns tool operations, budgets, uploads and asset storage; follow it when working on Klox. The drama skill owns story facts and episode production. Preserve confirmed story facts and existing design choices; return a proposed story change to its owner rather than hiding it in a reference prompt.

Skill version 1.4.23. The latest version is always at https://klox.ai/agent/skills/asset-design/SKILL.md.

## Start from the material that exists

Read the requested canvas's `Brief`, relevant screenplay or shot requirements, and `get_assets`. Reuse accepted assets before designing new ones. A character idea or supplied reference can be enough; do not require an episode or full series bible for a standalone design task. If the task is only a written design brief, finish at text without requiring a Klox connection or generating images.

Identify the few missing choices that change the design: production style, era, identity, required looks or essential story features. Resolve routine choices yourself; ask only about genuine forks not already delegated. A supplied image is evidence of appearance, not proof of unseen anatomy, a back view or story history. Label inferred details as proposals.

Read only the reference needed for the asset:

- Characters, faces, turnarounds and alternate forms: [characters.md](references/characters.md).
- Locations, spatial anchors and lighting variants: [locations.md](references/locations.md).
- Props, products, scale and functional states: [props.md](references/props.md).
- Before accepting references or updating the library: [review-and-handoff.md](references/review-and-handoff.md).

## Three outputs with different jobs

| Output                   | Purpose                                                                                          | Use in generation                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Design exploration board | Compare genuinely different directions in silhouette, palette, materials or character impression | Candidate only; never automatically becomes a production reference                                 |
| Design sheet             | Explain the selected design through views, details, scale and annotations                        | Save as a display-only `designBoards` image unless its actual content also passes reference review |
| Production reference     | Control identity, a look, geography, scale or a functional state                                 | A real, inspected image saved in `identity.references` or a look's `references`                    |

Do not confuse a prompt, an ungenerated node or an approved written concept with an accepted image. A reviewed turnaround sheet can be a production reference; an annotated comparison board with several designs cannot. Do not require every asset to have all three output types; new or substantially redesigned locations must follow the design-board and master-anchor sequence in [locations.md](references/locations.md).

## Workflow

1. **Define the design requirements.** Use `identity.description` as the source for confirmed identity facts and design requirements, and each look's `description` for its confirmed visual variant, including the continuity lock. Include source facts, practical or dramatic function, visible anchors and required uses; keep temporary shot states on asset nodes. Only when an asset has not been created and its direction is unresolved, use a temporary `DESIGN · <asset>` node for candidate directions and open questions. Once settled, merge accepted facts into the asset descriptions and remove duplicated prose from that node. A node may retain reference acceptance evidence and test gaps that have no asset field (see review-and-handoff.md); do not require a design node for every asset. For text-only work, deliver the proposed descriptions without creating assets.
2. **Explore when a direction is open.** Offer a small set of materially different directions, with the viewing effect and production tradeoff of each. Generate exploration boards only when image generation is requested and the credit scope is agreed. When the direction is settled, skip alternative exploration; for a new or substantially redesigned location, still generate and confirm a design board documenting the selected design before making its master-view anchor (see locations.md). Ask the user to choose if the design fork has not been delegated.
3. **Establish an anchor.** For a new or substantially redesigned location, confirm its generated design board first, then generate and confirm the master-view anchor before deriving other views or lighting variants. Make one clean image that defines the selected identity and relevant look or geometry. Name it `ANCHOR · <asset> · <look>`. Review it before expanding: correct design, usable proportions, recognisable features and no accidental story state. When the user delegates selection, select and explain; otherwise present the concrete image for acceptance.
4. **Derive only needed references.** Use accepted anchors as inputs to new views, not fresh descriptions alone. Write what changes (angle, crop, outfit or functional state) and what must remain. If a rear view reveals new construction, decide it explicitly rather than treating an invented detail as established. Use clean references rather than repeatedly deriving from imperfect children; keep complementary accepted views only when they establish necessary unseen facts.
5. **Review and save.** Compare each result to the anchor and required use, then accept, repair or mark missing using the handoff reference. Save only inspected, accepted images as production references. Keep candidate boards on the canvas or in `designBoards`; do not replace existing accepted references with candidates.
6. **Check practical use.** When shots exist and tests are within the agreed generation scope, test the main-character pairs that actually share a frame, prioritising frequent interactions and similar-looking characters. Use one representative two-person keyframe per relevant pair and look combination; an existing inspected shot can satisfy this test. Check face mixing, swapped identities, costume transfer and height relationships against both characters' anchors. Do not generate all possible cast pairs. Also test a representative close-up, reverse angle or prop insert when needed. A beautiful sheet is not proof that the asset works in a shot. Record tested combinations and evidence; mark untested use as unverified. Video tests belong to the production task, not automatically to asset design.

Stop at the requested output. A written design request does not authorize image generation; making asset references does not authorize episode keyframes or video. Apply the canvas skill's credit ceiling and retry rules, reusing existing authorization rather than asking for every view. If a result repeatedly drifts, diagnose the anchor, competing inputs or view specification before spending again.

## Identity, look and shot state

- **Identity**: what makes this the same person, place or object across productions.
- **Look**: a reusable visual variant such as costume, location light state or a prop's open configuration.
- **Shot state**: a temporary condition such as wet hair, a fresh bandage or a held object; it goes on the asset node used by those shots.

**State images.** When where a shot state sits matters (which side a wound is on, which way an arrow points, where a stain or bandage is), words are not enough: image models and reviewers both confuse left and right, and the subject's own left is worse than the frame's. Make a state image for it:

1. Derive it from the accepted anchor by image editing: keep the subject and change only the state. Choose a view in which the side and direction read without labels (the injured flank facing the camera, the arrow's full length visible). If the state includes a prop or another asset already defined in the project, also connect its accepted reference; text alone does not preserve its design. The subject anchor sets identity and look, the additional asset reference sets that object's shape, and the state specification sets placement, direction and contact. For a wolf's arrow wound, use both the clean wolf anchor and the accepted arrowhead reference.
2. Decide the facts first and show them exactly: the anatomical side, the place on the body, the size, and for anything that pierced or struck, the direction it came from and the angle it sits at.
3. Put the key fact in one image. Add a second only for another angle or a close detail; a model with little room gets the first alone.
4. Keep it clean. Arrows, circles and text drawn on the image may be copied into shots; use them only after a test shows they are not.
5. Review it like a reference (see review-and-handoff.md): the side matches the screenplay's `[CONT]` line, nothing else about the subject changed, and any included prop or other asset matches its accepted reference. Record unchecked details as unverified rather than marking the whole image reviewed. Name it `STATE · <asset> · <state>`.

It never becomes an identity or look reference. It goes on the asset node as `stateReferences` (see the canvas skill), and the node's state text then says only what the condition is, never its side or direction.

In downstream shots, a reviewed state image can already carry the included prop's design. Do not automatically connect the prop again: add its own reference when the state image does not show enough detail for that shot, keeping the model's reference budget in view.

Write visual generation prompts with subjects grounded in connected assets or visible input images, not unexplained story names or ownership. Empty location prompts describe the space alone (see locations.md); retain narrative context in production documents unless it has a concrete visible or audible effect.

Use visible, comparable anchors rather than adjectives such as beautiful, luxurious or cinematic alone. Choose a few features that survive the intended framing. Write a short continuity lock in the prompt language for facts that should stay fixed during that look; leave changing facts out. Do not invent separate assets for ordinary poses or views.

For speaking characters, record voice direction and use accepted voice references through the canvas skill where the video model supports them. Voice design is a reference operation; episode dialogue is generated by the video model. Do not add a separate synthesized dialogue workflow here.

## Handoff to scene previs

When production uses previs, hand over approved physical proportions and space as asset data: each location's set and each acting character's body (see the locations and characters references). Keep plot-critical prop dimensions in the description, with measurements identified as confirmed or working assumptions. Scenes reference the set and bodies rather than copying them. Asset references define appearance and state, while previs defines shot pose, location and motion. A visual pair test checks generated appearance against that geometry; the greybox alone does not prove the references will hold. Do not build episode previs as an unsolicited part of a standalone asset task.

## Completion

Report the selected direction, accepted anchor and reference node/file IDs, their identity or look placement, what each controls, any unresolved design or missing view, and which existing shots are affected by a replacement. Give the canvas preview link when available. State whether representative shot use was actually tested. Do not claim consistency, audio quality or readiness beyond what was inspected.

# Video prompt writing principles

Use this guide when writing or revising Klox video prompts, especially a generation covering several previs shots. It defines the preferred writing structure; the user's current instructions and the production's approved requirements take precedence. Use [video-models.md](video-models.md) for model-specific behavior and extension timing.

Describe requirements as the intended picture, sound and action. Explain tool conditions through the supported input route and the next concrete step.

## Structure around the picture and sound

- Start with a short description of the finished visual style and setting. Separate `Subjects:` from `Place:` so character/object inputs and the location have distinct roles.
- Give each shot a simple numbered heading such as `Shot 1:`, followed by its output-local time range and corresponding previs mention. Use the production's prompt language throughout.
- Keep internal episode, scene and shot IDs in node titles, planning documents and structured `shotWindows`. Use numbered headings to organize the generation prose.
- Describe the starting condition, action, performance and intended end condition in each section. Preserve approved dialogue verbatim. Keep any final hold or sound tail explicit through the requested duration.

## Bind every asset mention

Every reference to a connected character, location or object in the prompt uses its `@[Name](asset:<assetId>)` mention, including every repeated reference in actions, sound descriptions and global rules. Use possessive asset mentions for body parts where needed.

Preserve approved dialogue and required in-world text verbatim. Bind the speaker outside the quotation. Use ordinary language for sounds and non-asset concepts. When an asset is unavailable, use the canvas skill's visible-input grounding or a self-contained description. Obtain real asset IDs from the project's assets.

Asset mentions identify the subject and its appearance; previs mentions such as `@[Entrance blocking](video:1)` identify the layout and motion reference. Keep both. Check the actual graph connections, selected asset looks/states, and reference media supplied to the node. Store reusable appearance descriptions on the assets.

## Preserve time and reference mappings

Keep the existing planned time ranges and `video:N` bindings when reorganizing prose. Number references by the node's actual input order, including all videos and ordered shot selections. A visible mention label may be renamed while preserving its bound type, index and asset ID.

For previs-backed generation, connect each corresponding previs video with its layout role. The white-model reference owns camera position and movement, framing, shot order and planned cut windows, spatial relationships, scale, actor routes and object choreography. Assets supply identity, finished appearance and accepted states; tone references supply the chosen light and color. The prompt interprets the story and directs the performance within that plan. Generation realizes natural physical acting, expressions, gestures, breath and fine action rhythm inside the shot windows. When a scene needs more time or a changed camera, revise the owning previs plan and its exports together with the generation timing and prompt.

## Keep the spatial meaning and action causality readable

Use previs for ordinary travel, staging and camera motion. In each timed section, briefly state the spatial relationships that determine the story's reading: who addresses whom, meaningful foreground or occlusion, on-screen and off-screen relationships, prop ownership, and body orientation or state visibility needed across shots. Ground these statements in the connected previs and accepted state references.

Describe each key event through its cause, action and visible result. Carry the relevant end state into the next shot until a motivated action changes it. Put each requirement in its owning shot section; use one shared statement for clip-wide continuity. Let the model develop natural gait, weight transfer, expressions, gestures, breathing and small pauses within the planned pacing. Critical close-ups receive added precision for their named detail and supporting reference.

## Direct performance through intention and response

For a dramatic exchange or emotional turn, state the character's motive (why the situation matters), immediate goal (what they want from the other person now), and tactic (how they try to achieve it). Include an obstacle or delivery subtext where it makes the attempt readable. Ground these in the accepted scene and express them as connected acting direction, with detail scaled to the passage. A short character acting block can establish intentions shared across several shots; each owning shot then describes the stimulus and reciprocal response that changes the next attempt.

Make the response relationship clear: what the character notices or hears, how they interpret it, and how that response changes their next action or delivery. Give listeners their own intention and response to the exchange, including during another character's line. Carry the emotional result into the next shot. In a solo scene, the response can be to an object, sound, discovery or changing circumstance.

Let the model realize that intention through natural expression, gaze, breath, gesture and fine timing appropriate to the character. Describe the needed physical outcome and ongoing condition, leaving ordinary steps, limb trajectories and secondary movement to the performance. A continuing state can contain purposeful activity: the character keeps observing, listening, protecting an injury or preparing the next action while the necessary spatial and prop facts persist. Specify a concrete gesture or exact moment when it carries an approved story fact, essential interaction or critical close-up detail. Choose stillness, ongoing activity and camera movement from the dramatic intent; give speech, listening and meaningful reactions enough time within the planned passage.

Review whether the objective, subtext and response are readable in the generated performance, alongside complete dialogue and continuity. Use viewing notes to refine the unclear dramatic beat and preserve effective choices in the accepted take. Apply this guidance with previs, image references and text-only inputs alike.

## Give emotional turns usable time

Choose the passage length for the complete dramatic exchange: perception of a stimulus, interpretation, a choice and the physical follow-through. Allow speech and meaningful listening or reconsideration to fit at the intended delivery pace. Use planned shot ranges to organize those beats, with flexible fine timing around the important events.

When a passage feels mechanical or rushed, identify the response or decision that needs room. Within the user's authorized scope and the model's supported durations, lengthen or regroup the passage and update its prompt ranges, requested duration and planned take intervals together. For previs-backed work, keep the selected reference windows consistent with the revised action and camera plan. Review resulting cut ranges before using a new take in the edit. Choose the needed duration for that scene; let the emotional change and physical action determine its allocation.

## Select camera, physical and light detail for the shot

Use the following guidance where it helps communicate the shot's dramatic purpose or a key event. Choose the relevant aspects and scale their detail to the shot, using the accepted previs, assets and tone references as their authorities.

- **Camera motivation.** When camera behavior matters, describe what it follows, reveals or brings to the viewer's attention, and relate the movement or held framing to that purpose. With previs, express the purpose of its planned camera; develop a changed camera in the owning Shot before revising the generation prompt. Both a held view and a moving view can serve the scene.
- **Key physical feedback.** When an interaction's credibility or meaning depends on its physical result, describe the causal response: weight and support, momentum and settling, contact and material deformation, or an environment reacting to the action. Select the response that makes the key event readable and let generation develop its natural secondary motion and fine timing. Critical close-ups can receive precise detail and a supporting reference for the named interaction.
- **Light, color and space.** When light or color helps establish depth, attention or scene continuity, relate it to a material or surface, a motivated light source and direction, and its role in the composition. Describe foreground, subject and background relationships where they clarify the intended image. Across camera changes, preserve the accepted world-space sources and allow their screen positions and surface reflections to change with the view.

## Put each sound with its shot

Describe each dialogue line and event sound once in its owning timed section, beside the action that triggers it. Specify order, count and synchronization only where they matter to the scene.

Put the clip-wide sound design in one final block: assigned speakers, dialogue, performance sounds, action effects, ambience and spatial acoustics. Let the model perform these with the picture; use post-production for joins, mixing and music. Keep the opening about visual style and setting. Shot-specific sound timing, count and delivery stay in the corresponding shot sections. Follow the sound plan's ownership and carry-over. Set the node's audio option to match the intended native sound or deliberate picture-only use. Describe sources, foreground/background balance, distance, enclosure and key synchronization. Place scene-specific listening choices in the relevant shot.

## Leave transitions open unless required

With a previs edit, follow its shot order, planned cuts and continuous camera passages; use timed sections and reference bindings to map each shot. For prompt-only work, choose transition detail according to the production's approved editing intent, allowing model interpretation where that intent leaves it open.

Preserve an explicitly requested transition, approved editing constraint, or genuinely continuous shot/extension when it is part of the production intent. In those cases state the needed constraint. Preserve approved action, dialogue, shot order and reference mappings throughout.

## Example shape

Adapt this example using the connected assets' real IDs, the node's actual reference numbers, and the production's planned times and sound assignments.

```text
<Accepted visual style and setting.>
Subjects: @[Character A](asset:character-a); @[Character B](asset:character-b).
Place: @[Location](asset:location-a).
Each section uses its previs video for space, camera and key event order.
The time ranges guide pacing; allow natural performance and fine timing.

Shot 1:
(<planned range>) Follow @[First shot blocking](video:1).
<Story-critical spatial relationship, visible start, event cause and intended result, using the connected asset mentions.>
<Character objective, delivery subtext and the response that motivates the next beat, where relevant.>
<Assigned dialogue with its speaker, and event sounds beside their triggers.>

Shot 2:
(<planned range>) Follow @[Second shot blocking](video:2).
<Next motivated action or reaction, carrying the relevant state forward and preserving the complete dialogue.>

<Clip-wide visual and sound requirements from this production's plan.>
```

## Revising an existing prompt

Read the node's complete current prompt before editing. Check that the saved revision preserves asset IDs, reference indices, time ranges, dialogue, sound ownership and generation settings except where the user asked to change them. Report the concrete changes. For a writing-only request, save the prompt and retain the existing selected output. Start generation or change the selected result only within the user's explicit authorization.

## Character reference sheets

Character identity and each look use one 3-view sheet: full-body front, full-body back and frontal face close-up. Establish and review the identity sheet first, using the supplied reference as an actual image input. Generate each look sheet from that accepted identity sheet as an actual image input, preserving the same face, build and body proportions while applying only the specified outfit, hair, makeup and accessories. Use a horizontal 16:9 row on neutral medium-grey with consistent soft diffuse light. Save the identity sheet in `identity.references` and each derived look sheet in that look's `references`, main sheet first; each reference carries its file key and, for locations when relevant, camera metadata. For look-sheet generation, connect the accepted identity sheet and specify the look changes positively. For story shots, identity images supply face and build, current-look images supply styling, and the shot supplies pose, camera and action.

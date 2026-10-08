---
name: canvas
description: Create and edit AI videos on Klox canvases - plan a short video with the user, build the script, storyboard, image and video shots on a Klox workflow canvas, generate them with the user's credits, and cut them into a film. Use when the user wants to make or change a video, ad, storyboard, image or video generation with Klox, or mentions Klox, klox.ai or a Klox canvas.
---

# Klox Canvas

Klox (https://klox.ai) is a visual canvas for AI video creation. You work on it through the `klox` MCP tools; the user watches and adjusts the same canvas in the browser. This skill is the working method. The tools' own descriptions and the server instructions are the contract, and they win if the two ever disagree.

Skill version 1.1.0. The latest version is always at https://klox.ai/agent/skill.md.

## Before you start

- Call `list_workflows`. If the `klox` tools are missing or not authorized, follow https://klox.ai/agent to connect, then continue.
- The user pasted a Klox link (`/canvas/<id>` or `/preview/<token>`): fetch it as Markdown (append `.md`) to get its `workflowId`, then call `get_workflow`. If it returns `workflow_not_found`, tell the user the canvas does not exist (for a preview link: that you cannot edit it, and they can still view it there); do not guess its contents.
- Continuing earlier work: call `get_workflow` on that canvas and read the node titled `Brief` first. The canvas is the whole project state; there is no chat history on the Klox side, and another agent or the user may have changed it since.
- Read `openComments` in `get_workflow`. They are notes the user pinned to nodes on the canvas for you, usually the most precise feedback you will get ("this shot is too dark"). Handle them as part of the current request, or tell the user why you did not, and close each with `resolve_comment` and one sentence on what you did.
- Give the user the canvas `previewUrl` early so they can watch alongside you; it opens without signing in and has an Edit button for them. If it is null, give `url` instead.

## Making a video from scratch

1. **Settle the creative decisions that change the result**, and only those the user has not already given or delegated: what it promotes or tells, where it will be shown (which sets the aspect ratio, for example 9:16 for short-video platforms), total length, style or mood, language of any on-screen text or voice. Ask them together in one short message. Model choice, resolution and similar technical settings have sensible defaults; do not ask about them. If the user says "you decide", decide and state your assumptions.
2. **Create the canvas** with `create_workflow`, then write a text node titled `Brief` holding the decisions and constraints. Update it whenever the user changes them.
3. **Lay out the structure** with `apply_workflow_change`. A typical short film:
   - one script text node (`kind: text`, finished prose in `content`);
   - one text node per shot describing it, or a single storyboard node for a very short piece;
   - one image node per shot for the keyframe, its prompt connected from the shot text (`targetHandle: prompt`);
   - one video node per shot, animated from that keyframe (`targetHandle: firstFrame`) with a prompt describing the motion and camera;
   - one `compose` node, with the video nodes connected in playback order (`targetHandle: video`).

   Keep it proportionate: roughly one shot per 3-5 seconds of film. Call `get_capabilities` for node modes, each model's options and allowed durations, and the valid connections. Build in a few coherent changes rather than one node at a time.

4. **Write prompts you would accept as a finished brief for a single frame.** Name the subject, the action, the setting, the camera (shot size, angle, movement), lighting and style. For consistency across shots, repeat the same concrete descriptions of the product, characters and palette in every shot instead of writing "the same person". Avoid asking for readable text inside images unless it matters; image and video models often garble it.
5. **Agree on a budget before spending credits.** Show the plan: which nodes you will generate, and a credit ceiling for it. Generation spends the user's credits; only generate what the user asked for.
6. **Generate with `run_nodes`** for anything beyond a single node: pass the nodes you want (for example all keyframes, or the compose node for the whole film) and the agreed `maxCredits`. The server runs them in dependency order, also generating upstream nodes that have no result yet, never spends more than `maxCredits`, and keeps going if your session ends. Poll `get_generation_batch`, waiting at least `retryAfterMs`; it reports each node's status and `spentCredits`. A batch that stopped with `stopCode: credit_limit` spent what it could; tell the user and ask before starting another. `stop_generation_batch` stops new nodes from starting. Use `run_node` (and `get_task`) for a single node.
7. **Review before moving on.** Look at each keyframe (the output `url` is public) and fix weak ones before animating them; a bad keyframe makes a bad clip. A sensible rhythm for a whole film is two batches: keyframes first, review, then the clips and compose. Tell the user what you are keeping and what you are redoing.
8. **Compose** runs once every clip has a result. Composing costs no credits. Give the user the `previewUrl` to watch the film.

## Changing an existing project

- Change only what was asked. Locate nodes by their titles in `get_workflow`; never recreate a canvas the user has been editing.
- Every `apply_workflow_change` is recorded and the user can undo it from the canvas. If you made a mistake, undo it with `revert_workflow_change` and the `changeId` it returned instead of writing the inverse by hand. It refuses with `workflow_change_conflict` and the `nodeIds` the user has edited since; then make a new change on top of theirs.
- `outputSelectedByUser: true` means the user picked that node's current result among several on the canvas. Regenerating the node replaces their pick, so confirm first.
- To redo a shot: update its prompt or options with `updateNodes`, then `run_node` it with a new idempotency key. Downstream nodes keep using their old inputs until they run again, so rerun the clip that uses a new keyframe, then compose.
- Existing results stay valid when you edit a node's settings; nothing is regenerated unless you run it.
- If the user edits the canvas while you work, your next change fails with `workflow_revision_conflict`. Read the canvas again, see what they changed, and build on it.

## Using media from elsewhere

If you or the user already have an image, video or audio file: `prepare_upload`, PUT the file to the returned URL with exactly the returned headers, `complete_upload`, then add it with `addFileNodes` in `apply_workflow_change` and connect it where it is needed, for example as a keyframe (`firstFrame`), a reference video (`video`), or a clip in compose (`video`).

## Working on media locally

You have a terminal and Klox does not cut, trim or grab frames on the server, so do that work locally with `ffmpeg` and upload the results. Check `ffmpeg -version` first; if it is missing, ask the user before installing anything. Keep originals untouched and write outputs to a working folder.

- **Split a video into segments** a model accepts (for example at most 15 seconds for reference-video models; `get_capabilities` lists each model's limits). Re-encode so the cut lands exactly where you asked instead of on the nearest keyframe:
  `ffmpeg -ss 00:00:30 -i input.mp4 -t 15 -c:v libx264 -crf 18 -preset veryfast -c:a aac -movflags +faststart seg-03.mp4`
  Cut at scene changes where you can rather than at fixed intervals; watch or sample frames to find them.
- **First or last frame of a clip**, for an image-edit keyframe or to continue from where a clip ends:
  `ffmpeg -i seg-03.mp4 -frames:v 1 seg-03-first.png` and `ffmpeg -sseof -0.1 -i seg-03.mp4 -frames:v 1 seg-03-last.png`
- **Results back to local**, for review or further editing: every output in `get_task` and `get_workflow` has a public `url`; `curl -L -o shot-03.mp4 '<url>'`.

Upload each derived file as above and give it a clear title (`Segment 3 (00:30-00:45)`), so the user can follow the canvas.

## Errors

| Code                         | What to do                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `workflow_revision_conflict` | Call `get_workflow` again, reconcile with what changed, resubmit against the new revision.                                               |
| `workflow_change_rejected`   | Nothing was applied. Fix the operations listed in `rejections` (index and reason) and resubmit the whole change.                         |
| `upstream_output_missing`    | Run the listed upstream nodes first.                                                                                                     |
| `node_task_in_progress`      | That node is already generating; wait for its task.                                                                                      |
| `insufficient_credits`       | Stop generating and tell the user they need more credits at https://klox.ai/pricing.                                                     |
| `workflow_change_conflict`   | The user edited the listed nodes after your change, so it cannot be undone automatically. Make a new change instead.                     |
| `email_not_verified`         | Ask the user to confirm their email from the message Klox sent them, then retry.                                                         |
| `insufficient_scope`         | The user did not allow generation for this connection. Ask whether they want to reconnect and allow it.                                  |
| A task ends `failed`         | Report the `errorCode`. Retry once, with a new idempotency key, only if adjusting the prompt or settings is likely to help; do not loop. |

Reuse the same idempotency key only when retrying the very same request after a timeout or lost response. That is what keeps a retry from charging twice.

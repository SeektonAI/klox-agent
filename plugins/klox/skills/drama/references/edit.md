# Stages 6–7 · Edit and review

## Cut list

Start from the stage 3 timing cut and shot plan. The compose timeline is the Cut List: playback order, exact files, source in/out and cut lengths live there. Preserve stable shot references as you replace the planned placeholders. An `EP01 · Cut List` text node, if useful, holds only edit intent, sound/caption decisions and unresolved choices keyed by shot reference, with operational timing and takes read from the compose timeline.

- **Plan and take**: the video node's `shotWindows` records intended local timing; inspect the take to establish observed source ranges. Inspect the take and use the canvas skill's [review and replacement procedure](https://klox.ai/agent/skills/canvas/SKILL.md#reviews-gates-and-shot-replacement) for cut checks, version-bound confirmation and `replace_cut_shot`. Replacement preserves slot position and duration, needs enough confirmed footage when windows exist, and reports detached audio that remains on the old file. Revise edit length or sound explicitly when required. Overlapping coverage does not mean an event should repeat.
- **Source in / out** inside the actual generated clip, with the reason. A Wan 3.0 extension repeats the clip it extends first: its range starts after that (`replace_cut_shot` defaults there), and the join to the earlier clip is checked where the edit cuts. Several shots may take different ranges of one multi-cut clip; map the actual generated cut boundaries. Preserve usable portions if another part needs a separate repair; a clip generated longer than its shot is trimmed here. The reason: start on the first readable frame or mid-motion; end once the action or reaction has read, or cut on motion into the next shot. Trim the frames where the model settles in or drifts.
- **Sound**: what plays under the shot and carries over the cut (a line continuing off screen, a door ringing out). Picture may cut in the middle of a line; check the sound timeline as its own track. For carried sound, name the source clip, its source in/out and where it plays on the episode timeline.
- **Caption / title**: the exact words from the screenplay, timed to the line, plus any `[TITLE]` overlay at its beat.
- Cut at the cliffhanger's peak; let the last sound ring into black only if the screenplay asks.

## Assembly

- Replace the planned shot placeholders with inspected final takes and write the cut as the compose node's timeline (`composeTimeline`): picture on video tracks with each take's inspected native sound and source range; carried sound, sound repairs and music on audio tracks as needed. A saved timeline pins exact files and is updated explicitly when selecting a different source. After choosing a new take, explicitly update every affected picture and audio clip and its ranges. Composing costs no credits.
- **Sound that carries over a cut** plays from its source clip: put the same video file on an audio track over the following shots, and mute the picture clips where that sound would otherwise play twice. Use each coverage clip's native ambience and spatial sound where it supports the mix. For deliberate picture-only coverage, use its designated source audio and mute the overlapping track. Native sound is a mixed track; plan edits around its dialogue, effects and ambience together. When several picture ranges use one group, keep its source audio continuous where intended and give each sound interval one playback on the episode timeline.
- **Mix and ambience:** preserve the scene's environmental continuity using accepted native tracks, suitable source ranges, level balance and fades. Let source distance and enclosure change with the intended camera perspective. Add or repair a background bed when needed for a smooth join. **Music** is added in post-production, entering and leaving on story beats with space for dialogue.
- **Fades:** use a short fade (2–4 frames) at a quiet boundary where an independent sound starts or stops. Preserve complete word and breath onsets, impacts, natural tails and sound carried across picture cuts.
- After the timeline is written, render the compose node and check that exact export. For each scene plan, run a film sound-check node with its `soundPlanNodeId` explicitly set, then read `get_sound_checks`. An edited timeline needs a fresh render before its sound can be checked; check the fresh render to verify those edits. Captions and anything the compose node cannot do are done locally with ffmpeg (see the canvas skill); upload the finished episode and attach it to the compose node with `import_node_output`. Keep picture timing and audio unchanged for a captions-only pass. Inspect the final imported file and rerun the relevant checks when sound or timing changed. Verify the imported file against the intended timeline and the task's saved configuration.
- Use the screenplay as the source for captions and place them inside the platform's safe area.

## Before showing the cut

Run the clips → edit and freshness handoff checks from the skill: every compose clip points at the reviewed file with valid source in/out, required gates are released and relevant cut/sound checks passed or have declared exceptions; picture cuts may fall inside a line, but the final sound timeline has every line and key sound exactly once, complete, none cut off or doubled, tails intact; the film's sound check is current; captions match the script word for word. Then watch the cut against the scene plan and write findings in the skill's format.

## Review (stage 7)

Watch the cut with the user and answer:

- Is the hook readable by the profile's first-hook time without knowing anyone?
- Where would a viewer swipe away? (Every gap longer than the rhythm profile's beat interval is a candidate.)
- Did the payoff land? Is the cliffhanger something the viewer already cares about?
- Do characters stay recognisable and consistent from shot to shot?
- Which shots needed the most attempts, and which failure causes recur?

For the weakest moment, trace it back through the layers (cut → generated take → visual inputs → shot/timing cut → scene previs/plan → screenplay) and name the first layer where it got weaker. Report the review answers and their evidence in your reply. Keep only lasting production decisions and a concise summary of group count, first-pass footage ratio, actual generation ratio, retake rate with its numerator and denominator, credits and hours spent in the `Brief` production log (use the definitions in [clips.md](clips.md#generation-groups-before-video-nodes)). Turn each recurring problem into a concrete change for the next episode's screenplay, scene plan or storyboard and report review evidence in the reply.

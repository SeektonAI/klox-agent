# Stages 7–8 · Edit and review

## Cut list

Start from the stage 3 timing cut and shot plan. Update `EP01 · Cut List` on the episode canvas with the accepted takes: one row per shot in playback order. Retain shot IDs and edit intent; replace placeholders instead of rebuilding the episode from generation order.

| Shot | Scene / previs Shot window | Group / video node / selected take | Source in | Source out | Cut length | Why here | Sound | Caption / title |
| ---- | -------------------------- | ---------------------------------- | --------- | ---------- | ---------- | -------- | ----- | --------------- |

- **Plan and take**: before generation, map every planned Shot ID to one group and its planned local interval. After inspection, each cut-list row identifies that group, actual video node, selected result/task/file ID and actual source in/out. Planned prompt timestamps remain estimates and cannot stand in for observed source ranges. Record the original scene window in production notes. Overlapping coverage does not mean the event should repeat in the edit. If timing or performance changed, revise affected cuts explicitly. These are text records, not new MCP fields.
- **Source in / out** inside the actual generated clip, with the reason. Several shots may take different ranges of one multi-cut clip; map the actual generated cut boundaries instead of assuming prompt timestamps were followed. Preserve usable portions if another part needs a separate repair; a clip generated longer than its shot is trimmed here. The reason: start on the first readable frame or mid-motion; end once the action or reaction has read, or cut on motion into the next shot. Trim the frames where the model settles in or drifts.
- **Sound**: what plays under the shot and carries over the cut (a line continuing off screen, a door ringing out). Picture may cut in the middle of a line; check the sound timeline as its own track. For carried sound, name the source clip, its source in/out and where it plays on the episode timeline.
- **Caption / title**: the exact words from the screenplay, timed to the line, plus any `[TITLE]` overlay at its beat.
- Cut at the cliffhanger's peak; let the last sound ring into black only if the screenplay asks.

## Assembly

- Replace the planned shot placeholders with inspected final takes and write the cut as the compose node's timeline (`composeTimeline`): picture on a video track in playback order with each take's source range; ambience, music and added effects as audio files on their own audio tracks. A saved timeline pins exact files: upstream regeneration and a new connection do not replace them. After choosing a new take, explicitly update every affected picture and audio clip and its ranges. Composing costs no credits.
- **Sound that carries over a cut** plays from its source clip: put the same video file on an audio track over the following shots, and mute the picture clips where that sound would otherwise play twice. Pure picture coverage contributes no native sound; mute any unwanted audio from routes that could not disable it. A group's own sound mixes dialogue and events and cannot be split into them. When several picture ranges use one group, keep its source audio continuous where intended and avoid replaying overlapping audio ranges.
- **Ambience** runs continuously under a whole scene and does not restart at picture cuts; fade it only where the place or the story changes. **Music** is optional, enters and leaves on story beats and makes room for dialogue.
- **Fades** only where a sound actually starts or stops: a short fade (2–4 frames) on an independent sound switching at a quiet moment; none on a sound that simply carries over a picture cut; never across the start of a word, a breath or an impact, and never in place of a natural tail.
- After the timeline is written, render the compose node and check that exact export. For each scene plan, run a film sound-check node with its `soundPlanNodeId` explicitly set, then read `get_sound_checks`. An edited timeline needs a fresh render before its sound can be checked; analyzing an old export cannot verify new edits. Captions and anything the compose node cannot do are done locally with ffmpeg (see the canvas skill); upload the finished episode and attach it to the compose node with `import_node_output`. Keep picture timing and audio unchanged for a captions-only pass. Reports about the pre-caption export do not analyze a different imported file: inspect the final file and rerun the relevant checks if sound or timing changed. An imported task snapshots the node config, which alone does not prove the local edit followed that timeline.
- Captions come from the screenplay text, never from transcribing the generated audio, and stay inside the safe area for vertical platforms.

## Before showing the cut

Run the clips → edit and freshness handoff checks from the skill: every cut-list row points at a current clip result with source in and out inside the clip; picture cuts may fall inside a line, but the final sound timeline has every line and key sound exactly once, complete, none cut off or doubled, tails intact; the film's sound check is current; captions match the script word for word. Then watch the cut against the scene plan and write findings in the skill's format.

## Review (stage 8)

Watch the cut with the user and answer:

- Is the hook readable by the profile's first-hook time without knowing anyone?
- Where would a viewer swipe away? (Every gap longer than the rhythm profile's beat interval is a candidate.)
- Did the payoff land? Is the cliffhanger something the viewer already cares about?
- Do characters stay recognisable and consistent from shot to shot?
- Which shots needed the most attempts, and which failure causes recur?

For the weakest moment, trace it back through the layers (cut → generated take → visual inputs → shot/timing cut → scene previs/plan → screenplay) and name the first layer where it got weaker. Write the answers, group count, first-pass footage ratio, actual generation ratio, retake rate with its numerator and denominator, credits and hours spent into the `Brief` production log (use the definitions in [clips.md](clips.md#generation-groups-before-video-nodes)), and turn each recurring problem into a concrete change for the next episode's screenplay, scene plan or storyboard.

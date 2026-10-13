# Stages 7–8 · Edit and review

## Cut list

Before assembling, write `EP01 · Cut List` on the episode canvas: one row per shot in playback order.

| Shot | Clip | Source in | Source out | Cut length | Why here | Sound | Caption / title |
| ---- | ---- | --------- | ---------- | ---------- | -------- | ----- | --------------- |

- **Source in / out** inside the clip, with the reason. Several shots may take different ranges of one multi-cut clip; a clip generated longer than its shot is trimmed here. The reason: start on the first readable frame or mid-motion; end once the action or reaction has read, or cut on motion into the next shot. Trim the frames where the model settles in or drifts.
- **Sound**: what plays under the shot and carries over the cut (a line continuing off screen, room tone, an effect). Picture may cut in the middle of a line; check the sound timeline as its own track. For carried dialogue, name the generated source clip, its audio in/out points and its destination offset on the episode timeline. Extract that audio when needed and preserve the full line while picture cuts change.
- **Caption / title**: the exact words from the screenplay, timed to the line, plus any `[TITLE]` overlay at its beat.
- Cut at the cliffhanger's peak; let the last sound ring into black only if the screenplay asks.

## Assembly

- Connect the clips to a `compose` node in playback order for the rough assembly; the user can trim each clip in the compose editor. Composing costs no credits.
- Trims beyond that, captions, music and mixing are done locally with ffmpeg (see the canvas skill): download the clips, cut them to the cut list, burn or attach captions, add music and effects on their own tracks, and even out loudness across the episode. Upload the finished episode and attach it to the compose node with `import_node_output`.
- Keep three tracks in the working folder: the clips' own audio (dialogue and scene sound together, as generated), music, and effects added in the edit. Dialogue cannot be separated from scene sound, so a dubbed version needs its scene sound rebuilt.
- Captions come from the screenplay text, never from transcribing the generated audio, and stay inside the safe area for vertical platforms.

## Before showing the cut

Run the clips → edit and freshness handoff checks from the skill: every cut-list row points at a current clip result with source in and out inside the clip; picture cuts may fall inside a line, but the final sound timeline has every line exactly once, complete and verbatim, none cut off or doubled; captions match the script word for word. Then watch the cut against the scene plan and write findings in the skill's format.

## Review (stage 8)

Watch the cut with the user and answer:

- Is the hook readable by the profile's first-hook time without knowing anyone?
- Where would a viewer swipe away? (Every gap longer than the rhythm profile's beat interval is a candidate.)
- Did the payoff land? Is the cliffhanger something the viewer already cares about?
- Do characters stay recognisable and consistent from shot to shot?
- Which shots needed the most attempts, and which failure causes recur?

For the weakest moment, trace it back through the layers (cut → clip → keyframe → shot → scene plan → screenplay) and name the first layer where it got weaker. Write the answers, the credits and the hours spent into the `Brief` production log, and turn each recurring problem into a concrete change for the next episode's screenplay, scene plan or storyboard.

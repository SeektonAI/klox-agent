# Klox for AI agents

Let your AI coding agent build and edit AI videos on [Klox](https://klox.ai) canvases. Klox is a visual canvas for AI video creation: an agent lays out the script, storyboard and shots as a node graph, and you keep editing the same canvas in the browser.

This repository contains the Klox **MCP server** connection and the Klox **agent skill**, packaged as a plugin for Claude Code and Codex.

- MCP server: `https://klox.ai/mcp` (remote, Streamable HTTP, OAuth 2.0 sign-in)
- Skill: [`plugins/klox/skills/canvas/SKILL.md`](plugins/klox/skills/canvas/SKILL.md), also served at https://klox.ai/agent/skill.md
- Setup guide: https://klox.ai/agent

The easiest way to connect any agent is to send it this link and ask it to set Klox up:

```
https://klox.ai/agent
```

## What your agent can do

- Plan a short video with you, then create a canvas with the script, storyboard, image and video shots.
- Read and edit an existing canvas: rewrite prompts, change models, add, connect and remove nodes.
- Upload your own images, video, audio or text as nodes.
- Generate a node with your Klox credits, only if you allow it, and cut the results into a film.

## Tools

| Tool                                 | What it does                                                                      | Changes data   |
| ------------------------------------ | --------------------------------------------------------------------------------- | -------------- |
| `get_capabilities`                   | Node modes, models with their options, allowed connections                        | No             |
| `list_workflows`                     | Your canvases, most recently updated first                                        | No             |
| `get_workflow`                       | A whole canvas: nodes, files, latest task status and outputs, edges               | No             |
| `get_task`                           | Status and outputs of a generation task                                           | No             |
| `create_workflow`                    | Create an empty canvas                                                            | Adds           |
| `apply_workflow_change`              | Add, update, connect, place and delete nodes and edges in one all-or-nothing edit | Can delete     |
| `prepare_upload` / `complete_upload` | Upload a local file to use as a node                                              | Adds           |
| `run_node`                           | Generate one node. **Spends credits**; needs the optional generate permission     | Spends credits |

## Permissions and privacy

When you connect, a Klox "Authorize app" page opens in your browser. Sign in, review the permissions and click Allow:

- **Read and edit your workflows** (always requested): view canvases, create and change nodes, and upload files.
- **Generate with your credits** (a checkbox, checked by default): start generations that spend credits from your balance. Uncheck it if you only want your agent to plan and edit; it then cannot spend credits.

The page shows the app name the agent reports for itself, so only continue if you just started the connection. You can review or revoke access at any time at https://klox.ai/connected-apps. Your agent never sees your password; authorization uses OAuth in your browser.

- [Privacy Policy](https://klox.ai/privacy-policy)
- [Terms of Service](https://klox.ai/terms-of-service)

You need a Klox account. Generating videos and images uses credits from your Klox plan; see https://klox.ai for current pricing.

## Claude Code

The `klox` plugin connects the Klox MCP server and adds the Klox skill (the working method for planning a video, laying out the canvas, writing prompts and spending credits carefully).

```bash
claude plugin marketplace add SeektonAI/klox-agent
claude plugin install klox@klox
```

Then run `/reload-plugins` (or restart Claude Code) so the plugin loads, run `/mcp`, select `klox` and authenticate in the browser.

To update, run `claude plugin marketplace update klox`, then `claude plugin update klox@klox`, and restart Claude Code. You can review or revoke access at any time at https://klox.ai/connected-apps.

## Codex

The same plugin includes the shared MCP configuration and Klox skill:

```bash
codex plugin marketplace add SeektonAI/klox-agent
codex plugin add klox@klox
codex mcp login klox
```

The login command starts OAuth in your browser. Sign in to Klox and approve access. If it reports that the server was not found, use `codex mcp list` to find the actual Klox server name and retry login with that name. Start a new chat after installation and call `list_workflows` to verify the connection.

To update the Codex plugin, run `codex plugin marketplace upgrade klox`, then `codex plugin add klox@klox` to install the new version, and start a new chat. Do not also install the standalone MCP entry or download a second skill. Existing manual installations can keep using that method; when migrating, remove the old entry and skill after the plugin works, preserving any customizations.

## Manual setup and other agents

For clients without plugin support, follow https://klox.ai/agent to add MCP and download the skill separately. Plugins use the production Klox endpoint; use manual setup for another deployment.

- MCP server: `https://klox.ai/mcp` (remote, Streamable HTTP, OAuth).
- Skill: https://klox.ai/agent/skill.md

## About this repository

This repository is published automatically from the Klox main repository. Changes made here are overwritten on the next release; please open an issue instead of a pull request.

Both clients share `plugins/klox/.mcp.json` and `plugins/klox/skills/canvas/SKILL.md`. When releasing changes to bundled plugin content, bump the version and keep the two plugin manifest versions and the skill version in sync; installed users load a cached copy. In the source repository, `npm run test` and `npm run plugin:publish` both run `plugin:validate`; it can also be run separately.

## Support

Questions or problems: open an issue here, or email support@klox.ai.

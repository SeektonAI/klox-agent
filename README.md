# Klox for AI agents

Plugins that let AI coding agents build and edit AI videos on [Klox](https://klox.ai) canvases.

The easiest way to connect any agent is to send it this link and ask it to set Klox up:

```
https://klox.ai/agent
```

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

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

Then run `/mcp`, select `klox` and authenticate in the browser. You can review or revoke access at any time at https://klox.ai/connected-apps.

## Other agents

- MCP server: `https://klox.ai/mcp` (remote, Streamable HTTP, OAuth).
- Skill: https://klox.ai/agent/skill.md

## About this repository

This repository is published automatically from the Klox main repository. Changes made here are overwritten on the next release; please open an issue instead of a pull request.

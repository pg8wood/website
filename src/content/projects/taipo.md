---
title: taipo
tagline: "An AI-powered oopsie catcher for your shell. Because typing ish ard and ths hsell is mean."
iconName: mdi:console
affiliation:
  type: personal
  logo: /public_html/images/favicons/favicon-white.svg
  label: Personal
links:
  repo: "https://github.com/pg8wood/taipo"
badges:
  - Open Source
  - AI
  - CLI
  - Python
platforms: ["macOS", "Linux"]
featured: false
weight: 80
date: "2025-10-01"
draft: false
---

taipo watches for failed shell commands ("command not found") and uses AI to guess what you meant. If you typo something like `got status`, it suggests `git status`—or, in autonomous mode, just fixes and runs it.

Modes:

- manual — always asks before running
- smart — auto-runs when confidence is high
- autonomous — runs immediately

Example:

```
❯ got status
[taipo] Trying to make sense of: 'got status'... ✔
⚡ Run git status? (y/N)
```

Designed to drop into `zsh` without changing muscle memory; includes an optional debug mode for inspecting prompts and responses. Built for developers who type fast, miss fast, and like a little AI redemption baked into their shell.

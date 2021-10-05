+++
title = "Curbing Cumbersome CHANGELOG Conflicts with Swift Argument Parser"
description = "How I made the first tool that I use every single day."
author = "Patrick Gatewood"
date = "2021-10-05"
categories = ["swift"]
draft = true
tags = ["devops", "swift argument parser"]
[[images]]
  src = "images/2021/merge-conflict.png"
  alt = "CHANGELOG merge conflict"
+++

For the past year or so I've been working on an SDK. We maintain a fairly comprehensive CHANGELOG to keep our integrators up to date on our latest features and bugfixes. Until recently, this CHANGELOG was the source of dozens of hours of small, annoying merge conflict resolutions that slowed down our velocity. Here's how I crafted a tool that I use every single day.

## Identifying a Solvable Problem
Our merge conflict crisis started out simple: when I joined the team, I noticed that each PR always ended in a quick and dirty `Update changelog` commit or a rebase that removed the conflict. For quite awhile, I wrote this off as just part of being on this team.

Does this sound familiar? I'd encourage you to stop here for a moment and think about if you or your team have any similar issues. Let me know in a comment, and maybe you can use this article to help craft a similar tool to help your team focus on what's important. You'll be surprised at how much your team appreciates your gift.

## What About Existing Tools?
One of the reasons I open-sourced the changelog generator is because I know this problem is not unique to my team. [GitLab](https://about.gitlab.com/blog/2018/07/03/solving-gitlabs-changelog-conflict-crisis/) blogged about the very same problem and actually gave me most of the inspiration for my tool. Heck, the only reason I didn't just use their tool was that it solved a very specific problem in the GitLab team's workflow, and my team worked a bit differently. I wanted to make a slightly more generic tool that could be utilized by teams of varying workflows. 

## Enter Swift Argument Parser
I've written my share of bash scripts and other command-line tools, but they were always clunky and never tested. This time around I wanted to do right by the open-source community and make sure my tool was solid before casting it out into the world. The last thing in the world I also wanted was to soak up more of my team's development cycles by introducing a buggy tool.

[Swift Argumenet Parser](https://swift.org/blog/argument-parser/) is an open-source Swift package created by Apple to make parsing command-line arguments straightforward, type-safe, and to be honest, pretty fun.

## Design
One of the things that caught my eye about Swift Argument Parser was how it uses your command line utility's types to design the command line interface. This may not sound like much without some example code, but this makes designing elegant command line utilities a breeze, and the user interacts with the command line tool in a standard way that they expect. 

I took major cues from git's succinct command line interface. My intention was that the tool would both feel familiar and be easily understood. Since my project already followed the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format, I already had my commands in mind (taken straight from the Keep a Changelog document): 

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

And I had our existing Changelog format that I wanted the tool to eventually output (GitHub-flavored Markdown): 

```md 
Changelog Header. Contains some project-specific information.

## [1.0.0] - <release-date>

### Added
- Add something cool
- And something boring

### Changed
- Start following [Semantic Versioning](https://semver.org) properly 

### Fixed
- Fix all of `guy who used to work here`'s bugs
```
Now all I had to do was design the changelog tool's commands and then actually implement the thing. 

## Commands
Boiled down into its simplest form, the changelog tool needed two commands: a `log` command to create a new entry, and a `publish` command to collect all the changelog entries and prepend them to the existing `CHANGELOG.md`. 

#### Log 
TBD
+++
title = "Curbing Cumbersome CHANGELOG Conflicts with Swift Argument Parser | Part 1"
description = "How I made the first tool that I use every single day."
author = "Patrick Gatewood"
date = "2021-10-05"
categories = ["swift"]
draft = false
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
Boiled down into its simplest form, the changelog tool needed two subcommands: a `log` command to create a new entry, and a `publish` command to collect all the changelog entries and prepend them to the existing `CHANGELOG.md`. 

Before digging into the subcommands, I created the `changelog` command. The building blocks of Commands created through the Argument Parser are [`ParsableCommand`](https://github.com/apple/swift-argument-parser/blob/main/Sources/ArgumentParser/Parsable%20Types/ParsableCommand.swift) types. These types are simply declared, and the Argument Parser handles all the boilerplate code necessary to hook them up to the command line. 

```swift
import ArgumentParser

public struct Changelog: ParsableCommand {
    public static let configuration = CommandConfiguration(
        abstract: "Curbing Cumbersome Changelog Conflicts.",
        discussion: "Creates changelog entries and stores them as single files to avoid merge conflictss in version control. When it's time to release, `changelog publish` collects these files and appends them to your changelog file.",
        version: "0.3.0",
        subcommands: [])
        
    public init() { }
}
```

As you can see, the `Changelog` command declaration is surprisingly simple. It also doesn't do anything yet. 


#### Log Subcommand
How does the tool _actually_ prevent merge conflicts? The strategy I settled on was saving each changelog entry as an entry with a unique filename. This way, each changelog entry is purely additive, and there's no interaction between a new entry and an existing one. 

The meat of the `Log` command definition is fairly straightforward. 

```swift
struct Log: ParsableCommand {
    @Argument(help: ArgumentHelp(
                "The type of changelog entry to create. ",
                discussion: "Valid entry types are \(EntryType.allCasesSentenceString).\n"),
                transform: EntryType.init)
    var entryType: EntryType // One of the types of changelog entries from the Keep a Changelog list above
    
    // Properties wrapped with the @Argument property wrapper are automatically parsed and type-checked for you
    @Argument(help: ArgumentHelp("A list of quoted strings separated by spaces to be recorded as a bulleted changelog entry.")
    var text: [String] = []
    
    // Errors thrown from the run() function cause your program to exit with a helpful message.
    public func run() throws {
        guard fileManager.fileExists(atPath: options.unreleasedChangelogsDirectory.path) else {
            throw ChangelogError.changelogDirectoryNotFound(expectedPath: options.unreleasedChangelogsDirectory.relativeString)
        }
        
        if text.isEmpty {
            try openEditor(editor, for: entryType)
        } else {
            try createEntry(with: text)
        }
    }
    
    private func createEntry(with text: [String]) throws {
        // save the entry to disk
    }
    
    private func openEditor(_ editor: String, for entryType: EntryType) throws {
        // opens vim or another text editor for interactive editing and save to disk
    }
}
```

I've omitted a few bells and whistles for simplicity's sake. If you want, you can view the [full `Log` command implementation](https://github.com/pg8wood/changelog-generator/blob/main/Sources/ChangelogCore/Commands/Log.swift). 

Adding `Log.self` to the `Changelog` command's `subcommands` array allows the tool to start logging changes. I also made the `Log` command the `Changelog` command's `defaultSubcommand` by using another the `CommandConfiguration` initializer. 

Now, the tool is actually functional. The user can run `changelog fix "A ton of cool stuff"` and a new changelog entry will be saved to disk.

Next up is to document how I created the `publish` command. This command also was where I really started focusing on the testability of the tool, which required a bit of a refactor to get around some Swift Package implementation details. If there's anything in particular you'd like me to touch on in part 2, leave me a comment to let me know. Or, if you'd like to peek ahead and see the completed implementation, check out the [changelog-generator repository](https://github.com/pg8wood/changelog-generator)!
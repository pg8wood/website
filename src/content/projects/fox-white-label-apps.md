---
title: FOX White-Label Apps
tagline: "Scaled white-label architecture supporting 27 FOX Television Station apps."
icon: public_html/images/company-logos/fox-tv-stations.png
badges:
  - XcodeGen
  - Continuous Integration
  - Scalable Architecture
platforms:
  - iOS
featured: false
weight: 25
date: "2020"
affiliation:
  type: enterprise
  logo: public_html/images/company-logos/willowtree.svg
  label: WillowTree
---

# Scaling Local News: Engineering at FOX Television Stations

While working with FOX Television Stations, I focused on building scalable infrastructure and developer workflows that supported 27 white-label apps powering local news across the country. From architecting app templates to eliminating massive workflow bottlenecks, my work helped streamline development for one of the largest teams I'd ever collaborated with.

## 🏗️ Launching 8 New Station Apps

I developed and launched **8 new white-label TV station apps** using a custom-built architecture designed for flexibility and reuse. These apps were tailored for local markets but shared a unified codebase, allowing rapid expansion and centralized improvements.

To support this ecosystem, I scaled the **CI infrastructure** to handle **27 total white-label apps**, ensuring stability and speed in builds and testing across the entire suite.

## 🧠 Fixing Merge Hell: From 80,000 Lines to 200

In a 50-person engineering environment working on a massive shared codebase, I noticed an ongoing pain point: each sprint, engineers spent roughly **10 person-hours resolving `.xcodeproj` merge conflicts** — a slow, frustrating, and error-prone process.

I proposed and championed a **generated project file workflow using XcodeGen**. This involved:

- Converting an **80,000-line `.pbxproj`** monstrosity into a clean, maintainable **200-line YAML** config
- Rolling it out across **all 27 white-label apps**
- Significantly improving merge reliability and saving hours of engineering time every sprint

## 🛠️ Developer Experience at Scale

This work wasn’t just about automation: it was about enabling developers to move faster, break less, and spend more time on actual features instead of fighting tooling. By identifying bottlenecks and building scalable solutions, I helped elevate the engineering experience across a large, fast-moving organization.

---

My time with FOX Television Stations was a masterclass in high-scale mobile development where decisions about tooling and architecture had direct impact on dozens of apps and the developers behind them.

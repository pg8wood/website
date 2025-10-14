---
title: Predicate Builder
tagline: "Declarative, type-safe Core Data predicates powering every Square point-of-sale app."
client: Square
iconName: "mdi:code-braces"
links:
  repo: "https://github.com/square/predicate-builder/"
badges:
  - Open Source
  - Result Builders
  - Swift
  - Swift Package Manager
  - Core Data
  - Advanced generics
platforms:
  - iOS
featured: false
weight: 50
date: "2023"
affiliation:
  type: enterprise
  logo: public_html/images/company-logos/square.png
  label: Square
---

Architected and shipped a safer Core Data layer across Square's POS ecosystem by building **Predicate Builder** — a declarative, compile-time-checked way to write fetch predicates.

The initiative eliminated entire classes of runtime crashes and cut development and review time by 40%, establishing a new internal standard later open-sourced by Square.

---

PredicateBuilder is a declarative, type-safe way to create NSPredicate types used to constrain Core Data fetching and collection filtering.

🧱 Build predicates with a DSL, key paths, simple included operator types like And, and SwiftUI-like modifiers

🔍 Visualize and understand predicate problems at compile-time and leave runtime crashes behind

📚 Transform dense, complex predicate format strings into composable and readable predicates

🧩 Integrate seamlessly into existing codebases since all @PredicateBuilder types build a normal NSPredicate

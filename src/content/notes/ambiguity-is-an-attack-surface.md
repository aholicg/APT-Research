---
title: Ambiguity Is an Attack Surface
description: When two systems interpret the same message differently, intent can disappear—or be rewritten.
pubDate: 2026-07-14
tags:
  - security
  - systems
  - design
readingTime: 7 min
featured: true
---

We usually picture an attack surface as a list of ports, endpoints, dependencies, and permissions. That map is useful, but incomplete. Every boundary where meaning has to be translated is also an attack surface.

A filename passes from a browser to a server. A string crosses from SQL into a template. A human reads a button label and predicts what will happen next. In each case, one thing is carrying two possible interpretations.

## One signal, two parsers

Many familiar vulnerability classes begin here. Request smuggling depends on systems disagreeing about where one request ends. Path confusion depends on layers normalizing the same path differently. Social engineering works when visual meaning and operational meaning drift apart.

> The dangerous question is not only “What input is accepted?” It is “Who gets to decide what that input means?”

A good review therefore follows data through every interpreter. Write down where it changes representation. Note who owns each decision. The moments that feel too obvious to document are often the ones built on incompatible assumptions.

## Designing for one meaning

Canonicalize once. Make state visible. Prefer explicit actions over clever inference. When a boundary cannot be removed, force both sides to share the same grammar and test the disagreement cases—not only the happy path.

Clarity is not decoration. In a complex system, clarity is a security control.

---
title: Reading Memory Like a City Map
description: Addresses are street names, permissions are zoning laws, and every process carries a private atlas.
pubDate: 2026-06-28
tags:
  - memory
  - reverse-engineering
  - systems
readingTime: 5 min
featured: false
---

Process memory becomes less mysterious when we stop imagining it as a long drawer of bytes. It is closer to a city: regions have purposes, routes connect them, and maps describe an arrangement rather than the material itself.

The executable supplies an initial plan. The loader maps segments, shared libraries arrive, the heap expands, and threads receive stacks. By the time a program is running, its city is alive—constructed from both a file and ongoing decisions.

## Read the zoning signs

Permissions provide the first useful legend. A readable and executable region probably carries code. A writable anonymous region may be heap or stack. A guard page is not empty space; it is a deliberate border.

> A memory address is meaningful only inside its process, at its moment in time, under its current mapping.

This is why `0x401000` is not intrinsically “code.” Its meaning comes from the map. Randomization can move districts between runs, while relative structure may remain stable.

## Maps are evidence, not territory

Debugger labels and decompiler types are hypotheses. Useful ones—but still hypotheses. The bytes, permissions, control flow, and runtime behavior have the final word.

The habit that matters is simple: orient first, name later. Find the region. Check its permissions. Identify how the address was reached. Then decide what you think lives there.

# Trang's Notes

An interactive personal blog built with Astro. Notes are Markdown files and are
automatically listed on the homepage and rendered as standalone HTML pages.

## Add a note

Create a file in `src/content/notes/`:

```md
---
title: A useful title
description: A one-line summary.
pubDate: 2026-07-26
tags:
  - security
  - systems
readingTime: 5 min
featured: false
draft: false
---

Write the note in Markdown here.
```

No page component needs to be created. Astro's `notes` content collection
validates the frontmatter, adds the note to the filterable index, and generates
its `/notes/<filename>/` page during the build.

## Run locally

```bash
npm install
npm run dev
```

The configured project path is `http://localhost:4321/APT-Research/`.

## Build

```bash
npm run build
```

The static site is generated in `dist/`. Pushing `main` runs the included
GitHub Pages workflow.

## Research archive

The repository also preserves the original APT persistence research source code
and internship exercise reports.

## Credits

- Hero image by [Nat on Unsplash](https://unsplash.com/photos/a-futuristic-city-at-night-with-neon-lights-dA0-qxdbyyY),
  used under the Unsplash License.
- Interface icons are based on [Lucide](https://lucide.dev/), used under the ISC License.

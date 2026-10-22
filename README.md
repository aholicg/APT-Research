# APT Research

Research notes and exercises on offensive security topics.

## Contents

- **Notes** (`src/content/notes/`) — Short articles on security concepts: persistence, memory, attack surfaces, and human factors.
- **APT persistence research** (`custom code/`) — Windows persistence techniques implemented in C: Image Hijack, Registry Run Key, Scheduled Task, and Startup Folder.
- **Remote Template Injection** (`Remote Template Injection/`) — Research on RTI vulnerabilities, including a proof-of-concept exploit and analysis documents.
- **Internship reports** (`report/`) — Exercise reports and CVE analyses from security training.

## Website

The repository includes an Astro-based static site that renders the notes as readable pages. The site is a straightforward UI for browsing the notes content.

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321/APT-Research/`.

## Credits

- Hero image by [Nat on Unsplash](https://unsplash.com/photos/a-futuristic-city-at-night-with-neon-lights-dA0-qxdbyyY), used under the Unsplash License.
- Interface icons are based on [Lucide](https://lucide.dev/), used under the ISC License.

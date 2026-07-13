// Static blog content (frontend-only). Bodies are Markdown strings.
// Tag colors are SOLID (no gradients).

export const posts = [
  {
    slug: "realtime-dashboards",
    title: "Streaming a million events without dropping frames",
    excerpt: "How I architected Aurora Analytics to handle high-throughput realtime data while keeping the UI at a smooth 60fps.",
    tag: "Engineering",
    color: "#2f6fe0",
    readTime: "8 min",
    date: "2024-11-02",
    body: `## The problem

Rendering a live dashboard sounds easy until the data starts arriving faster than the browser can paint. Aurora Analytics ingests **tens of thousands of events per second**, and every one of them wants to be on screen.

## Batching is your friend

Instead of updating state on every message, I buffer incoming events and flush them once per animation frame:

\`\`\`js
let buffer = [];
socket.onmessage = (e) => buffer.push(JSON.parse(e.data));
function flush() {
  if (buffer.length) applyBatch(buffer.splice(0));
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);
\`\`\`

## Takeaways

- Coalesce updates to the frame rate, not the network rate.
- Move heavy math off the main thread with a Web Worker.
- Virtualize long lists so you only render what's visible.

> The UI stayed buttery smooth even under synthetic load of 1M events.`,
  },
  {
    slug: "rust-for-clis",
    title: "Why I reach for Rust when building CLI tools",
    excerpt: "A practical look at the ergonomics, performance, and distribution wins that made Rust my default for command-line software.",
    tag: "Rust",
    color: "#c2410c",
    readTime: "6 min",
    date: "2024-08-19",
    body: `## Single binary, zero fuss

Shipping a CLI written in Rust means handing someone **one file**. No runtime, no dependency hell.

## The ecosystem is quietly excellent

- \`clap\` for argument parsing
- \`indicatif\` for progress bars
- \`anyhow\` and \`thiserror\` for painless error handling

\`\`\`rust
use clap::Parser;

#[derive(Parser)]
struct Args { name: String }

fn main() {
    let args = Args::parse();
    println!("Hello, {}!", args.name);
}
\`\`\`

It compiles fast enough, runs *instantly*, and the compiler catches the bugs I'd otherwise ship.`,
  },
  {
    slug: "glass-ui",
    title: "Designing a clean UI system that stays readable",
    excerpt: "Contrast, spacing, and hierarchy — the guardrails I use to keep minimal interfaces beautiful and accessible.",
    tag: "Design",
    color: "#0891b2",
    readTime: "7 min",
    date: "2024-05-30",
    body: `## Restraint is a feature

A good interface says only what it needs to. My rules:

1. Keep text on **solid, high-contrast** surfaces.
2. Always test contrast against the *busiest* background.
3. Use whitespace to separate layers, not decoration.

\`\`\`css
.card {
  background: #ffffff;
  border: 1px solid #e3e5e3;
  border-radius: 1rem;
}
\`\`\`

Accessibility first, sparkle second.`,
  },
  {
    slug: "indie-game",
    title: "Lessons from shipping my first indie game",
    excerpt: "Scope creep, playtesting, and the joy of a launch day — what I learned building a small game solo.",
    tag: "Gamedev",
    color: "#dc2626",
    readTime: "9 min",
    date: "2024-02-14",
    body: `## Cut the scope, then cut it again

My first design doc had airships, crafting, and multiplayer. My shipped game had **one mechanic**, polished until it shone.

## Playtest embarrassingly early

The first time someone else touched my game, they did everything *wrong* — which meant my tutorial was wrong.

## Launch day

- Hit publish.
- Watched the first stranger play.
- Cried a little (happy tears).

Shipping something small and finished beats a masterpiece that never leaves your hard drive.`,
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

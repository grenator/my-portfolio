"""Seed data for the portfolio backend (generic placeholder content)."""

SEED_POSTS = [
    {
        "slug": "realtime-dashboards",
        "title": "Streaming a million events without dropping frames",
        "excerpt": "How I architected Aurora Analytics to handle high-throughput realtime data while keeping the UI at a smooth 60fps.",
        "tag": "Engineering",
        "color": "#4a86f0",
        "read_time": "8 min",
        "date": "2024-11-02",
        "body": (
            "## The problem\n\n"
            "Rendering a live dashboard sounds easy until the data starts arriving faster than the browser can paint. "
            "Aurora Analytics ingests **tens of thousands of events per second**, and every one of them wants to be on screen.\n\n"
            "## Batching is your friend\n\n"
            "Instead of updating state on every message, I buffer incoming events and flush them once per animation frame:\n\n"
            "```js\n"
            "let buffer = [];\n"
            "socket.onmessage = (e) => buffer.push(JSON.parse(e.data));\n"
            "function flush() {\n"
            "  if (buffer.length) applyBatch(buffer.splice(0));\n"
            "  requestAnimationFrame(flush);\n"
            "}\n"
            "requestAnimationFrame(flush);\n"
            "```\n\n"
            "## Takeaways\n\n"
            "- Coalesce updates to the frame rate, not the network rate.\n"
            "- Move heavy math off the main thread with a Web Worker.\n"
            "- Virtualize long lists so you only render what's visible.\n\n"
            "> The UI stayed buttery smooth even under synthetic load of 1M events."
        ),
    },
    {
        "slug": "rust-for-clis",
        "title": "Why I reach for Rust when building CLI tools",
        "excerpt": "A practical look at the ergonomics, performance, and distribution wins that made Rust my default for command-line software.",
        "tag": "Rust",
        "color": "#0a95d9",
        "read_time": "6 min",
        "date": "2024-08-19",
        "body": (
            "## Single binary, zero fuss\n\n"
            "Shipping a CLI written in Rust means handing someone **one file**. No runtime, no dependency hell.\n\n"
            "## The ecosystem is quietly excellent\n\n"
            "- `clap` for argument parsing\n"
            "- `indicatif` for progress bars\n"
            "- `anyhow` and `thiserror` for painless error handling\n\n"
            "```rust\n"
            "use clap::Parser;\n\n"
            "#[derive(Parser)]\n"
            "struct Args { name: String }\n\n"
            "fn main() {\n"
            "    let args = Args::parse();\n"
            "    println!(\"Hello, {}!\", args.name);\n"
            "}\n"
            "```\n\n"
            "It compiles fast enough, runs *instantly*, and the compiler catches the bugs I'd otherwise ship."
        ),
    },
    {
        "slug": "glass-ui",
        "title": "Designing a glassmorphic UI system that stays readable",
        "excerpt": "Blur, contrast, and depth — the guardrails I use to keep frosted-glass interfaces beautiful and accessible.",
        "tag": "Design",
        "color": "#a855f7",
        "read_time": "7 min",
        "date": "2024-05-30",
        "body": (
            "## Glass is a spice, not a meal\n\n"
            "Frosted panels look gorgeous, but overdo it and everything turns to mush. My rules:\n\n"
            "1. Keep text on **solid or near-solid** surfaces.\n"
            "2. Always test contrast against the *busiest* background.\n"
            "3. Use blur to separate layers, not to decorate text.\n\n"
            "```css\n"
            ".glass {\n"
            "  background: rgba(255,255,255,0.55);\n"
            "  backdrop-filter: blur(18px) saturate(160%);\n"
            "  border: 1px solid rgba(255,255,255,0.65);\n"
            "}\n"
            "```\n\n"
            "Accessibility first, sparkle second."
        ),
    },
    {
        "slug": "indie-game",
        "title": "Lessons from shipping my first indie game",
        "excerpt": "Scope creep, playtesting, and the joy of a launch day — what I learned building a small game solo.",
        "tag": "Gamedev",
        "color": "#e2483d",
        "read_time": "9 min",
        "date": "2024-02-14",
        "body": (
            "## Cut the scope, then cut it again\n\n"
            "My first design doc had airships, crafting, and multiplayer. My shipped game had **one mechanic**, polished until it shone.\n\n"
            "## Playtest embarrassingly early\n\n"
            "The first time someone else touched my game, they did everything *wrong* — which meant my tutorial was wrong.\n\n"
            "## Launch day\n\n"
            "- Hit publish.\n"
            "- Watched the first stranger play.\n"
            "- Cried a little (happy tears).\n\n"
            "Shipping something small and finished beats a masterpiece that never leaves your hard drive."
        ),
    },
]

_c = {"blue": "#4a86f0", "purple": "#a855f7", "cyan": "#0a95d9", "red": "#e2483d"}

SEED_PROJECTS = [
    {"title": "Aurora Analytics", "date": "2024 — present", "tech": ["TypeScript", "React", "D3", "WebSockets"], "description": "A realtime analytics dashboard that streams and visualizes millions of events with buttery-smooth charts.", "color": _c["blue"], "featured": True, "links": [{"label": "Live", "url": "#"}, {"label": "Code", "url": "#"}]},
    {"title": "Pulse Chat", "date": "2024", "tech": ["Node", "Socket.IO", "Redis"], "description": "An end-to-end encrypted group messaging app with presence, typing indicators, and offline sync.", "color": _c["purple"], "featured": True, "links": [{"label": "Live", "url": "#"}, {"label": "Code", "url": "#"}]},
    {"title": "Orbit CLI", "date": "2023 — present", "tech": ["Rust"], "description": "A blazing-fast developer productivity CLI for scaffolding, linting, and deploying projects in one command.", "color": _c["cyan"], "featured": True, "links": [{"label": "Code", "url": "#"}]},
    {"title": "Verdant", "date": "2023", "tech": ["Swift", "SwiftUI"], "description": "A gentle plant-care companion app with smart reminders and a calming, tactile interface.", "color": _c["blue"], "featured": True, "links": [{"label": "App Store", "url": "#"}]},
    {"title": "Foundry UI", "date": "2022 — present", "tech": ["React", "Storybook", "TS"], "description": "An accessible, themeable component library powering several production design systems.", "color": _c["purple"], "featured": True, "links": [{"label": "Docs", "url": "#"}, {"label": "Code", "url": "#"}]},
    {"title": "Nimbus", "date": "2022", "tech": ["Go", "AWS"], "description": "A tiny serverless deploy tool that ships static sites and functions with zero config.", "color": _c["cyan"], "featured": True, "links": [{"label": "Code", "url": "#"}]},
    {"title": "Pixel Forge", "date": "2024", "tech": ["Godot"], "description": "A pixel-art platformer prototype built in a 48-hour game jam.", "color": _c["red"], "featured": False, "links": [{"label": "itch", "url": "#"}]},
    {"title": "Cadence", "date": "2023", "tech": ["Flutter"], "description": "A minimalist metronome and practice tracker for musicians.", "color": _c["purple"], "featured": False, "links": [{"label": "Live", "url": "#"}]},
    {"title": "Sentinel", "date": "2023", "tech": ["Python"], "description": "A lightweight uptime and log monitor with Slack alerts.", "color": _c["blue"], "featured": False, "links": [{"label": "Code", "url": "#"}]},
    {"title": "Mosaic", "date": "2022", "tech": ["JavaScript", "Canvas"], "description": "A browser-based photo collage maker with drag-and-drop layouts.", "color": _c["cyan"], "featured": False, "links": [{"label": "Live", "url": "#"}]},
    {"title": "Relay", "date": "2022", "tech": ["Node"], "description": "A developer-friendly webhook inspector and replay tool.", "color": _c["blue"], "featured": False, "links": [{"label": "Code", "url": "#"}]},
    {"title": "Beacon", "date": "2021", "tech": ["C++", "Arduino"], "description": "An IoT presence sensor that quietly automates my office lighting.", "color": _c["red"], "featured": False, "links": []},
    {"title": "Quill", "date": "2021", "tech": ["Electron", "React"], "description": "A distraction-free markdown editor with live preview and themes.", "color": _c["purple"], "featured": False, "links": [{"label": "Code", "url": "#"}]},
    {"title": "Tempo", "date": "2020", "tech": ["Vue"], "description": "A friendly time tracker that turns your week into clear visual blocks.", "color": _c["cyan"], "featured": False, "links": [{"label": "Live", "url": "#"}]},
]

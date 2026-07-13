// Mock data (frontend-only) — generic placeholder persona

export const profile = {
  name: "Jordan Ellis",
  first: "Jordan",
  role: "Full-Stack Developer & Creative Technologist",
  tagline: "I design and build delightful digital products — from realtime web apps to playful little games.",
  location: "Portland, OR",
  available: true,
  intro:
    "I'm a full-stack developer who loves turning fuzzy ideas into polished, performant products. My happy place sits somewhere between clean architecture and pixel-perfect interfaces.",
  paragraphs: [
    {
      text: "I work across the stack — TypeScript on the front, Go and Python on the back — and I care a lot about the small details that make software feel good to use. ",
      link: { text: "Take a look at my r\u00e9sum\u00e9", to: "/resume" },
      after: " for the full story.",
    },
    {
      text: "Outside of client work I tinker with ",
      link: { text: "side projects", to: "/projects" },
      after: " — developer tools, indie games, and the occasional over-engineered weekend experiment. When I step away from the keyboard, I'm usually sketching or making music.",
    },
  ],
  stats: [
    { value: "7+", label: "Years shipping" },
    { value: "40+", label: "Projects built" },
    { value: "12", label: "Open-source repos" },
    { value: "∞", label: "Cups of coffee" },
  ],
};

export const socials = [
  { id: "bluesky", handle: "@jordanellis.dev", subtitle: null, platform: "on Bluesky", description: "Half-baked thoughts on design, code, and whatever's caught my attention this week.", url: "#", color: "#4a86f0", icon: "bluesky" },
  { id: "mastodon", handle: "@jordan", subtitle: "@mastodon.social", platform: "on Mastodon", description: "Deeper dives into what I'm building, plus the occasional dev-log thread.", url: "#", color: "#a855f7", icon: "mastodon" },
  { id: "youtube", handle: "@jordanbuilds", subtitle: null, platform: "on YouTube", description: "Short clips and build-in-public demos of the projects I'm working on.", url: "#", color: "#e2483d", icon: "youtube" },
  { id: "linkedin", handle: "jordanellis", subtitle: null, platform: "on LinkedIn", description: "The professional-shaped version of me. Good for the business folks.", url: "#", color: "#0a95d9", icon: "linkedin" },
];

const c = { blue: "#4a86f0", purple: "#a855f7", cyan: "#0a95d9", red: "#e2483d" };

export const featuredProjects = [
  { id: "aurora", title: "Aurora Analytics", date: "2024 — present", tech: ["TypeScript", "React", "D3", "WebSockets"], description: "A realtime analytics dashboard that streams and visualizes millions of events with buttery-smooth charts.", color: c.blue, links: [{ label: "Live", url: "#" }, { label: "Code", url: "#" }] },
  { id: "pulse", title: "Pulse Chat", date: "2024", tech: ["Node", "Socket.IO", "Redis"], description: "An end-to-end encrypted group messaging app with presence, typing indicators, and offline sync.", color: c.purple, links: [{ label: "Live", url: "#" }, { label: "Code", url: "#" }] },
  { id: "orbit", title: "Orbit CLI", date: "2023 — present", tech: ["Rust"], description: "A blazing-fast developer productivity CLI for scaffolding, linting, and deploying projects in one command.", color: c.cyan, links: [{ label: "Code", url: "#" }] },
  { id: "verdant", title: "Verdant", date: "2023", tech: ["Swift", "SwiftUI"], description: "A gentle plant-care companion app with smart reminders and a calming, tactile interface.", color: c.blue, links: [{ label: "App Store", url: "#" }] },
  { id: "foundry", title: "Foundry UI", date: "2022 — present", tech: ["React", "Storybook", "TS"], description: "An accessible, themeable component library powering several production design systems.", color: c.purple, links: [{ label: "Docs", url: "#" }, { label: "Code", url: "#" }] },
  { id: "nimbus", title: "Nimbus", date: "2022", tech: ["Go", "AWS"], description: "A tiny serverless deploy tool that ships static sites and functions with zero config.", color: c.cyan, links: [{ label: "Code", url: "#" }] },
];

export const otherProjects = [
  { id: "pixelforge", title: "Pixel Forge", date: "2024", tech: ["Godot"], description: "A pixel-art platformer prototype built in a 48-hour game jam.", color: c.red, links: [{ label: "itch", url: "#" }] },
  { id: "cadence", title: "Cadence", date: "2023", tech: ["Flutter"], description: "A minimalist metronome and practice tracker for musicians.", color: c.purple, links: [{ label: "Live", url: "#" }] },
  { id: "sentinel", title: "Sentinel", date: "2023", tech: ["Python"], description: "A lightweight uptime and log monitor with Slack alerts.", color: c.blue, links: [{ label: "Code", url: "#" }] },
  { id: "mosaic", title: "Mosaic", date: "2022", tech: ["JavaScript", "Canvas"], description: "A browser-based photo collage maker with drag-and-drop layouts.", color: c.cyan, links: [{ label: "Live", url: "#" }] },
  { id: "relay", title: "Relay", date: "2022", tech: ["Node"], description: "A developer-friendly webhook inspector and replay tool.", color: c.blue, links: [{ label: "Code", url: "#" }] },
  { id: "beacon", title: "Beacon", date: "2021", tech: ["C++", "Arduino"], description: "An IoT presence sensor that quietly automates my office lighting.", color: c.red, links: [] },
  { id: "quill", title: "Quill", date: "2021", tech: ["Electron", "React"], description: "A distraction-free markdown editor with live preview and themes.", color: c.purple, links: [{ label: "Code", url: "#" }] },
  { id: "tempo", title: "Tempo", date: "2020", tech: ["Vue"], description: "A friendly time tracker that turns your week into clear visual blocks.", color: c.cyan, links: [{ label: "Live", url: "#" }] },
];

export const blogPosts = [
  { id: "realtime-dashboards", title: "Streaming a million events without dropping frames", date: "2024-11-02", readTime: "8 min", tag: "Engineering", excerpt: "How I architected Aurora Analytics to handle high-throughput realtime data while keeping the UI at a smooth 60fps.", color: "#4a86f0" },
  { id: "rust-for-clis", title: "Why I reach for Rust when building CLI tools", date: "2024-08-19", readTime: "6 min", tag: "Rust", excerpt: "A practical look at the ergonomics, performance, and distribution wins that made Rust my default for command-line software.", color: "#0a95d9" },
  { id: "glass-ui", title: "Designing a glassmorphic UI system that stays readable", date: "2024-05-30", readTime: "7 min", tag: "Design", excerpt: "Blur, contrast, and depth — the guardrails I use to keep frosted-glass interfaces beautiful and accessible.", color: "#a855f7" },
  { id: "indie-game", title: "Lessons from shipping my first indie game", date: "2024-02-14", readTime: "9 min", tag: "Gamedev", excerpt: "Scope creep, playtesting, and the joy of a launch day — what I learned building a small game solo.", color: "#e2483d" },
];

export const education = [
  { degree: "B.S. in Computer Science", school: "State University", date: "2015 — 2019", points: ["Graduated with honors, GPA 3.9", "Focus in human-computer interaction and distributed systems", "Led the student developer club for two years"] },
  { degree: "Interaction Design Certificate", school: "Design Institute", date: "2020", points: ["Studied visual design, prototyping, and design systems", "Capstone: an accessible component library"] },
];

export const experience = [
  { role: "Senior Full-Stack Engineer", org: "Northwind Labs", date: "2022 — present", points: ["Lead engineer on a realtime analytics platform used by 50k+ users", "Introduced a design system that cut UI build time in half", "Mentor two junior engineers and run weekly code reviews"] },
  { role: "Full-Stack Developer", org: "Brightside Studio", date: "2020 — 2022", points: ["Built client web apps end-to-end with React and Node", "Owned CI/CD pipelines and cloud infrastructure on AWS", "Collaborated closely with designers to ship polished interfaces"] },
  { role: "Software Engineer Intern", org: "Cobalt Systems", date: "2019", points: ["Developed internal tooling with Python and Flask", "Wrote the team's first automated test suite"] },
];

export const skills = [
  { title: "Languages & Frameworks", body: "The tools I reach for day to day to build fast, reliable products across the stack.", tags: ["TypeScript", "JavaScript", "React", "Next.js", "Node", "Go", "Python", "Rust", "Swift", "SwiftUI"] },
  { title: "Infrastructure & Data", body: "How I ship and scale what I build — from databases to deployment.", tags: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "GraphQL"] },
  { title: "Craft & Collaboration", body: "Beyond code: I care about clear communication, thoughtful design, and shipping things people love to use.", tags: ["Design Systems", "Accessibility", "Prototyping", "Mentoring", "Technical Writing"] },
];

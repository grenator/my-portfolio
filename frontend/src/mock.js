// Static site content (frontend-only) — Conor McIntyre ("grenator")

export const profile = {
  name: "Conor McIntyre",
  first: "Conor",
  role: "Full-Stack Developer & Aspiring Game Dev",
  tagline:
    "A 16-year-old self-taught developer from Ireland, currently falling head-first into game development.",
  location: "Ireland",
  available: true,
  intro:
    "Hi! I'm Conor \u2014 but online I go by grenator. I've been coding since I was 9, starting out on Scratch and working my way up to full-stack web development and, most recently, game development.",
  paragraphs: [
    {
      text:
        "I picked up web development in 2020 after taking a course, learning HTML, CSS and JavaScript. Since then I've grown into a full-stack developer who's fairly comfortable with React, MongoDB and MySQL. ",
      link: { text: "See what I've been building.", to: "/projects" },
    },
    {
      text:
        "In 2022 I got into Python and had a lot of fun with Pygame, though it drifted away from me after 2023. More recently I started learning Godot \u2014 my first proper game engine \u2014 and I'm completely hooked. ",
      link: { text: "Here's the full journey.", to: "/resume" },
      after: " My goal is to become a game developer.",
    },
  ],
  stats: [
    { value: "5+", label: "Years coding" },
    { value: "9", label: "Age I started" },
    { value: "100%", label: "CS assessment" },
    { value: "Godot", label: "Current focus" },
  ],
};

export const socials = [
  {
    id: "github",
    handle: "grenator",
    subtitle: null,
    platform: "on GitHub",
    description: "All my code and projects live here \u2014 feel free to poke around.",
    url: "https://github.com/grenator",
    color: "#24292e",
    icon: "github",
  },
  {
    id: "itch",
    handle: "grenator",
    subtitle: null,
    platform: "on itch.io",
    description: "Where I'll be publishing my games as I make them.",
    url: "https://grenator.itch.io",
    color: "#fa5c5c",
    icon: "itch",
  },
  {
    id: "bluesky",
    handle: "@grenator",
    subtitle: null,
    platform: "on Bluesky",
    description: "I post about what I'm learning and building along the way.",
    url: "https://bsky.app/profile/grenator.bsky.social",
    color: "#4a86f0",
    icon: "bluesky",
  },
  {
    id: "youtube",
    handle: "@grenator",
    subtitle: null,
    platform: "on YouTube",
    description: "The occasional clip of my projects and game dev experiments.",
    url: "https://www.youtube.com/@grenator",
    color: "#cc0000",
    icon: "youtube",
  },
];

const godot = "#478cbf";

export const featuredProjects = [
  {
    id: "first-godot-game",
    title: "My First Godot Game",
    date: "2024 \u2014 present",
    tech: ["Godot", "GDScript"],
    description:
      "My very first game built in Godot while learning the engine \u2014 a small 2D project where I got to grips with scenes, nodes and GDScript from scratch. It's the start of my game dev journey!",
    color: godot,
    links: [
      { label: "itch", url: "https://grenator.itch.io" },
      { label: "GitHub", url: "https://github.com/grenator" },
    ],
  },
];

export const otherProjects = [];

export const education = [
  {
    degree: "Cisco Networking Course & Exam",
    school: "Cisco Networking Academy",
    date: "Completed",
    points: [
      "Learnt the basics of computer hardware and software",
      "Passed the course exam",
    ],
  },
  {
    degree: "Computer Science \u2014 Summer School",
    school: "Assessment",
    date: "",
    points: ["Scored 100% in my Computer Science assessments"],
  },
  {
    degree: "Self-taught Developer",
    school: "Secondary school, Ireland",
    date: "2019 \u2014 present",
    points: [
      "Learning independently since age 9",
      "No formal qualifications yet \u2014 just building my portfolio and growing",
    ],
  },
];

// Personal coding timeline (shown under "My Journey")
export const experience = [
  {
    role: "Discovered Godot & game dev",
    org: "Self-taught",
    date: "2024 \u2014 present",
    points: [
      "Started learning Godot, my first proper game engine",
      "Building small 2D games and learning GDScript",
      "Aspiring to become a game developer",
    ],
  },
  {
    role: "Python & Pygame",
    org: "Self-taught",
    date: "2022 \u2014 2023",
    points: [
      "Learnt Python and built small projects with Pygame",
      "Explored game loops and 2D graphics",
    ],
  },
  {
    role: "Full-stack web development",
    org: "Self-taught",
    date: "2021 \u2014 present",
    points: [
      "Comfortable building full-stack apps with React",
      "Familiar with MongoDB and MySQL databases",
    ],
  },
  {
    role: "Learnt web development",
    org: "Online course",
    date: "2020",
    points: [
      "Took a course and learnt HTML, CSS and JavaScript",
      "Built my first websites",
    ],
  },
  {
    role: "Started coding on Scratch",
    org: "Age 9",
    date: "2019",
    points: [
      "Wrote my first programs using Scratch",
      "Fell in love with making things with code",
    ],
  },
];

export const skills = [
  {
    title: "Languages & Frameworks",
    body: "The core tools I build with, picked up over years of self-teaching.",
    tags: ["JavaScript", "HTML5", "CSS", "React", "Python", "GDScript", "MySQL", "MongoDB"],
  },
  {
    title: "Game Development",
    body: "My current focus \u2014 learning to design and build games.",
    tags: ["Godot", "Pygame", "GDScript"],
  },
  {
    title: "Foundations",
    body:
      "Beyond code: I completed a Cisco course and exam covering the basics of computer hardware and software, and scored 100% in Computer Science in my summer school assessments. I started out on Scratch at age 9 and have been self-teaching ever since.",
    tags: ["Scratch", "Cisco basics", "Self-taught"],
  },
];

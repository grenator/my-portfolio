// Static site content (frontend-only) — Conor McIntyre ("grenator")
import { PFP, GODOT_LOGO } from "./lib/logos";

export const profile = {
  name: "Conor McIntyre",
  first: "Conor",
  avatar: PFP,
  role: "Full-Stack Developer & Aspiring Game Dev",
  tagline:
    "A 16-year-old self-taught developer from Ireland, currently falling head-first into game development.",
  location: "Ireland",
  available: true,
  intro:
    "Hi! I'm Conor \u2014 but online I go by grenator. I've been coding since I was 9, starting out on Scratch and working my way up to full-stack web development and, most recently, game development. I grew up around computers, so I tend to pick up new technology fast.",
  paragraphs: [
    {
      text:
        "I picked up web development in 2020 after taking a course, learning HTML, CSS and JavaScript. Since then I've grown into a full-stack developer who's fairly comfortable with React, MongoDB and MySQL. ",
      link: { text: "See what I've been building.", to: "/projects" },
    },
    {
      text:
        "In 2022 I got into Python and had a lot of fun with Pygame, though it drifted away from me after 2023. This year I started learning Godot \u2014 my first proper game engine \u2014 and I'm completely hooked, though I'm still very much learning. ",
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
    id: "bluesky",
    handle: "@grenator",
    subtitle: null,
    platform: "on Bluesky",
    description: "I post about what I'm learning and whatever intreresting I see that week.",
    url: "https://bsky.app/profile/grenator.bsky.social",
    color: "#4a86f0",
    icon: "bluesky",
  },
];

const godot = "#478cbf";

export const featuredProjects = [
  {
    id: "first-godot-game",
    title: "My First Godot Game",
    date: "2025 \u2014 present",
    tech: ["Godot", "GDScript"],
    logo: GODOT_LOGO,
    description:
      "My first real dive into Godot \u2014 I followed Brackey's Godot tutorial to learn the engine from the ground up: scenes, nodes, GDScript, and building a small 2D game. It's the start of my game dev journey!",
    color: godot,
    links: [
      { label: "GitHub", url: "https://github.com/grenator/Completed-Brackeys-Godot-Tutorial" },
    ],
  },
];

export const otherProjects = [];

export const education = [
  {
    degree: "Junior Certificate",
    school: "Secondary school, Ireland",
    date: "June 2026",
    points: [
      "Completed my Junior Cert exams in June",
      "Results expected in October 2026",
    ],
  },
  {
    degree: "Cisco Networking Course & Exam",
    school: "Cisco Networking Academy",
    date: "2023",
    points: [
      "Learnt the basics of computer hardware and software",
      "Passed the course exam",
    ],
  },
  {
    degree: "Computer Science \u2014 Summer School exams",
    school: "Assessment",
    date: "",
    points: ["Scored 100% in my Computer Science assessments 3 years in a row"],
  },
  {
    degree: "Self-taught Developer",
    school: "2019 \u2014 present",
    date: "",
    points: [
      "Learning independently since age 9",
      "Grew up around computers, so I pick up new tech fast",
      "No formal qualifications yet \u2014 just building my portfolio and growing",
    ],
  },
];

// Personal coding timeline (shown under "My Journey")
export const experience = [
  {
    role: "Discovered Godot & game dev",
    org: "Self-taught",
    date: "2026 \u2014 present",
    points: [
      "Started learning Godot this year, my first proper game engine",
      "Completed the Brackeys Godot tutorial and building small 2D games",
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
      "Beyond code: I completed a Cisco course and exam covering the basics of computer hardware and software, and scored 100% in Computer Science in my summer school assessments. I grew up around computers, started out on Scratch at age 9, and have been self-teaching ever since.",
    tags: ["Scratch", "Cisco basics", "Self-taught"],
  },
];

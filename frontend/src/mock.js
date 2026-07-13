// Mock data for the portfolio clone (frontend-only)

export const profile = {
  name: "Malcolm Anderson",
  tagline: "Professional nerd by day. Hobbyist nerd by night.",
  intro:
    "I'm a computer science graduate student at Washington State University of Vancouver.",
  paragraphs: [
    {
      text:
        "I graduated from Washington State University of Vancouver with my bachelor's degree in Computer Science, summa cum laude with a cumulative GPA of 3.98. ",
      link: { text: "See my resumé for more info about my background and qualifications.", to: "/resume" },
    },
    {
      text: "In my free time, I enjoy working on ",
      link: { text: "programming projects", to: "/projects" },
      after:
        ", ranging from video games to web apps to frameworks. When I'm not writing code, I enjoy doing digital art and creative writing.",
    },
  ],
};

export const socials = [
  {
    id: "bluesky",
    handle: "@meorge.com",
    subtitle: null,
    platform: "on Bluesky",
    description:
      "I hang out here a fair bit and post about whatever interests me. This is probably the closest thing I have to a Twitter replacement.",
    url: "https://bsky.app/profile/meorge.com",
    color: "#4a86f0",
    icon: "bluesky",
  },
  {
    id: "mastodon",
    handle: "@meorge",
    subtitle: "@mastodon.gamedev.place",
    platform: "on Mastodon",
    description:
      "I post here a bit less frequently, but when I do it tends to be more focused on my development projects.",
    url: "https://mastodon.gamedev.place/@meorge",
    color: "#a855f7",
    icon: "mastodon",
  },
  {
    id: "youtube",
    handle: "@meorge_",
    subtitle: null,
    platform: "on YouTube",
    description: "I sometimes post short clips of the projects I'm working on here.",
    url: "https://www.youtube.com/@Meorge_",
    color: "#e2483d",
    icon: "youtube",
  },
  {
    id: "linkedin",
    handle: "malcolmanderson",
    subtitle: null,
    platform: "on LinkedIn",
    description:
      "I rarely use this, but the business people say it's good for business and who am I to judge?",
    url: "https://www.linkedin.com/in/malcolmanderson/",
    color: "#0a95d9",
    icon: "linkedin",
  },
];

// color per project for the placeholder logo tile
const c = {
  godot: "#478cbf",
  react: "#61dafb",
  python: "#3776ab",
  unity: "#222c37",
  swift: "#f05138",
  cpp: "#00599c",
  java: "#e76f00",
  gray: "#6b7280",
};

export const featuredProjects = [
  { id: "godot", title: "Godot Engine (contributor)", date: "September 2023 - present", tech: ["C++", "Godot"], description: "A popular open-source game engine to which I have made several contributions", color: c.godot, links: [{ label: "GitHub", url: "https://github.com/godotengine/godot" }, { label: "More", url: "https://meorge.com/projects/godot" }] },
  { id: "automaton", title: "Automaton GUI", date: "September 2023 - present", tech: ["JavaScript", "React"], description: "A web app for building and verifying finite state automata, created as a capstone project for undergraduate students at Washington State University Vancouver", color: c.react, links: [{ label: "GitHub", url: "https://github.com/AutomatonBuilderGUI/AutomatonBuilderGUI" }] },
  { id: "portfolio", title: "Portfolio Site", date: "May 2023 - present", tech: ["JavaScript", "React", "Next.js"], description: "The website you're looking at right now!", color: c.react, links: [{ label: "Try", url: "https://meorge.com/" }] },
  { id: "turnabout", title: "Turnabout CA DMV", date: "April 2023 - present", tech: ["Python"], description: "A Bluesky bot that renders California DMV license plate applications as Ace Attorney scenes", color: c.python, links: [{ label: "Try", url: "https://bsky.app/profile/turnabout-ca-dmv.meorge.com" }, { label: "More", url: "https://meorge.com/projects/turnabout_ca_dmv" }] },
  { id: "objection-godot", title: "Objection Godot", date: "December 2024 - present", tech: ["Godot"], description: "A program that renders conversations as Ace Attorney scenes", color: c.godot, links: [{ label: "GitHub", url: "https://github.com/Meorge/objection-godot" }] },
  { id: "countinator", title: "Countinator", date: "April 2023", tech: ["Python", "Flask", "MongoDB", "JavaScript", "React", "Next.js"], description: "A web app for creating countup and countdown boards", color: c.python, links: [{ label: "Try", url: "https://meorge.com/countinator" }] },
  { id: "pov-duo", title: "POV You Forgot Your Duolingo Lesson", date: "January 2023 - April 2023", tech: ["C#", "Unity"], description: "A parody horror game about what happens when you miss your daily language practice", color: c.unity, links: [{ label: "itch", url: "https://meorge.itch.io/pov-you-forgot-your-duolingo-lesson" }, { label: "YouTube", url: "https://www.youtube.com/playlist?list=PLtPXiJedNjDHEekubBfUaIvqPK7XmkRPX" }] },
  { id: "sneaksters", title: "Sneaksters", date: "July 2019 - December 2021", tech: ["C#", "Unity"], description: "A cooperative multiplayer game about stealing treasure", color: c.unity, links: [{ label: "More", url: "https://meorge.com/projects/sneaksters" }, { label: "GitHub", url: "https://github.com/Meorge/SneakstersSource" }, { label: "YouTube", url: "https://www.youtube.com/playlist?list=PLtPXiJedNjDGdoZWlh54KB5UJA8-IkY8A" }] },
];

export const otherProjects = [
  { id: "weird-escape", title: "Weird Lil Escape Room Thing", date: "August 2024", tech: ["Godot"], description: "A very short escape-room game made in, like, 5 hours", color: c.godot, links: [{ label: "itch", url: "https://meorge.itch.io/weird-lil-escape-room-thing" }] },
  { id: "lost-phone", title: "Lost Phone", date: "July 2024", tech: ["Godot"], description: "A visual novel and puzzle game made in 8 days", color: c.godot, links: [{ label: "itch", url: "https://meorge.itch.io/lost-phone" }] },
  { id: "elon", title: "You Are Elon Musk", date: "January 2024", tech: [], description: "A short interactive fiction story about a 13-year-old stuck in the body of a 52-year-old 12-year-old", color: c.gray, links: [{ label: "itch", url: "https://meorge.itch.io/you-are-elon-musk" }] },
  { id: "cornhole", title: "Cornhole VR", date: "January 2023", tech: ["C#", "Unity"], description: "A basic VR adaptation of the classic outdoor game", color: c.unity, links: [{ label: "itch", url: "https://meorge.itch.io/cornhole-vr" }] },
  { id: "tesla", title: "You Are A Tesla", date: "December 2022", tech: ["C#", "Unity"], description: "A small single-player game about Elon Musk", color: c.unity, links: [{ label: "itch", url: "https://meorge.itch.io/you-are-a-tesla" }] },
  { id: "dvd", title: "Don't Get Hit By The DVD Logo", date: "December 2022", tech: ["Godot"], description: "A small single-player game about avoiding a bouncing DVD logo", color: c.godot, links: [{ label: "itch", url: "https://meorge.itch.io/dont-get-hit-by-the-dvd-logo" }] },
  { id: "objection4", title: "Objection 4 (contributor)", date: "October 2022 - November 2022", tech: ["Python"], description: "A program that renders conversations as Ace Attorney scenes", color: c.python, links: [{ label: "GitHub", url: "https://github.com/LuisMayo/objection_engine" }] },
  { id: "beepovac-bustle", title: "BeepoVac Bustle", date: "May 2022 - October 2022", tech: ["C#", "Unity"], description: "A small single-player game about cleaning a house", color: c.unity, links: [{ label: "itch", url: "https://meorge.itch.io/beepovac-bustle" }, { label: "YouTube", url: "https://www.youtube.com/playlist?list=PLtPXiJedNjDHMLx6NcR_Yum18lmUa4P1C" }] },
  { id: "vibrato", title: "Vibrato", date: "July 2022 - October 2022", tech: ["C#", "Unity"], description: "A Unity package for rich controller haptics", color: c.unity, links: [{ label: "GitHub", url: "https://github.com/Meorge/Vibrato" }] },
  { id: "videosync", title: "VideoSync", date: "September 2021 - July 2022", tech: ["C++", "Qt"], description: "A tool for viewing Delta RMC plot data synchronized with recorded video", color: c.cpp, links: [] },
  { id: "hp-config", title: "HP Site Flow Configurator", date: "October 2021 - April 2022", tech: ["JavaScript", "React"], description: "A web application for configuring HP Site Flow factories", color: c.react, links: [{ label: "GitHub", url: "https://github.com/WSUV2021-CSCapstoneTeam1/frontend" }] },
  { id: "sneaksters-solo", title: "Sneaksters: Solo Mission", date: "September 2021 - October 2021", tech: ["Java"], description: "A small single-player game about stealing treasure", color: c.java, links: [] },
  { id: "genni", title: "Genni", date: "October 2021 - December 2021", tech: ["Python", "Qt"], description: "An easy-to-use app for using text-generation machine learning models", color: c.python, links: [{ label: "GitHub", url: "https://github.com/Meorge/Genni" }] },
  { id: "beepovac-attack", title: "BeepoVac Attack", date: "November 2021 - December 2021", tech: ["Java"], description: "A cooperative multiplayer game about cleaning a house", color: c.java, links: [{ label: "GitHub", url: "https://github.com/TheBrosGameDesignTeam/BeepoVacAttack" }] },
  { id: "joycon", title: "JoyConUnity", date: "December 2021", tech: ["C#", "Unity"], description: "Bindings for the Nintendo Switch Joy-Con + Pro Controller for Unity's Input System", color: c.unity, links: [{ label: "GitHub", url: "https://github.com/Meorge/JoyConUnityInputSystem" }] },
  { id: "meme", title: "Meme-O-Matic", date: "August 2021 - January 2022", tech: ["Python", "Qt"], description: "An engine for building images from templates", color: c.python, links: [] },
  { id: "videosync-py", title: "VideoSync Python", date: "May 2021 - September 2021", tech: ["Python", "Qt"], description: "A tool for viewing Delta RMC plot data synchronized with recorded video", color: c.python, links: [] },
  { id: "dmcpkit", title: "DMCPKit", date: "July 2021", tech: ["Swift"], description: "A Swift package for interfacing with Delta RMC motion controllers", color: c.swift, links: [] },
  { id: "inputhints", title: "InputHints", date: "March 2021 - May 2021", tech: ["C#", "Unity"], description: "A simple library for displaying controller input hints in Unity games", color: c.unity, links: [{ label: "GitHub", url: "https://github.com/Meorge/InputHints" }] },
  { id: "fitcoin", title: "Fitcoin", date: "April 2021 - May 2021", tech: ["Python", "Flask", "MongoDB", "Swift", "SwiftUI", "C#", "Unity"], description: "A virtual (non-crypto!) currency that rewards users for taking care of themselves", color: c.python, links: [] },
  { id: "callog", title: "CalLog", date: "April 2021", tech: ["Swift", "SwiftUI"], description: "An app for tracking calorie intake and output", color: c.swift, links: [{ label: "Gitlab", url: "https://gitlab.com/Meorge/CalLog" }] },
  { id: "tweetinator", title: "Tweetinator", date: "March 2021 - May 2021", tech: ["Python", "Flask", "MongoDB"], description: "A web server and frontend for scheduling Tweets", color: c.python, links: [{ label: "GitHub", url: "https://github.com/Meorge/Tweetinator" }] },
  { id: "canvas", title: "Canvas", date: "September 2020 - August 2022", tech: ["Swift", "SwiftUI"], description: "A native macOS app for accessing the Canvas LMS", color: c.swift, links: [] },
  { id: "clock", title: "Clock", date: "June 2020 - July 2020", tech: ["Swift", "SwiftUI"], description: "World clocks, countdowns, timers, alarms, and stopwatches for macOS (pre-Ventura)", color: c.swift, links: [{ label: "Gitlab", url: "https://gitlab.com/Meorge/Clock" }] },
  { id: "gamekit", title: "GameKit", date: "April 2020 - September 2020", tech: ["C#"], description: "A basic 2D component-based game engine", color: c.unity, links: [{ label: "Gitlab", url: "https://gitlab.com/Meorge/GameKit" }] },
  { id: "uqlick", title: "uQlick", date: "January 2020 - May 2020", tech: ["JavaScript", "React", "Meteor"], description: "A web app for improving student engagement in lectures", color: c.react, links: [{ label: "Gitlab", url: "https://gitlab.com/Meorge/uQlick" }] },
  { id: "doremi", title: "Doremi", date: "December 2019", tech: ["C#", "Unity"], description: "A Unity package providing support for multiple variations of seamlessly-looped music tracks", color: c.unity, links: [{ label: "GitHub", url: "https://github.com/Meorge/Doremi" }] },
  { id: "zenith2020", title: "Zenith 2020", date: "February 2020 - March 2020", tech: ["C++", "Qt"], description: "A native application for tracking rocket statistics, built for Clark Aerospace", color: c.cpp, links: [] },
  { id: "scargo", title: "sCargo", date: "2018 - 2019", tech: ["Swift", "Python", "C++", "Arduino"], description: "A smart mailbox that lets you check your mail from your Apple devices", color: c.swift, links: [] },
  { id: "rocketui", title: "RocketUI", date: "April 2019 - January 2020", tech: ["C#", "Unity"], description: "A program for tracking rocket statistics, built for Clark Aerospace", color: c.unity, links: [] },
  { id: "zenith2018", title: "Zenith 2018", date: "May 2017 - January 2018", tech: ["C#", "Unity"], description: "An augmented-reality mobile app for identifying nearby landmarks", color: c.unity, links: [] },
];

export const blogPosts = [
  { id: "2022-08-01-plans", title: "Plans for Summer 2022", date: "2022-08-01" },
  { id: "2021-11-25-retrospective-2021", title: "The Return of the Guy (+ my most complex project yet)", date: "2021-11-25" },
  { id: "2021-05-27-summer-2021-plans", title: "The future of @gptupaguy, and my plans for summer 2021", date: "2021-05-27" },
  { id: "2021-05-16-fitcoin", title: "Fitcoin Retrospective: my (non-crypto) currency", date: "2021-05-16" },
];

export const education = [
  { degree: "PhD in Computer Science", school: "Washington State University of Vancouver", date: "August 2022 - present", points: ["Performed research on machine learning, cognitive radio systems, and nanonetworks", "Took classes on big data, cloud systems, and machine learning", "Acted as a teaching assistant concurrently with research and coursework (see \"Teaching Assistant\" below)"] },
  { degree: "Bachelor's in Computer Science", school: "Washington State University of Vancouver", date: "August 2020 - May 2022", points: ["Cumulative GPA of 3.98", "Graduated summa cum laude", "Minor in Mathematics", "Inducted member of the National Society of Leadership and Success (NSLS)"] },
  { degree: "Associate's in Computer & Electrical Engineering", school: "Clark College", date: "September 2018 - August 2020", points: ["Cumulative GPA of 3.95", "Graduated with High Honors", "Vice President's List for all quarters"] },
  { degree: "International Baccalaureate Diploma", school: "Columbia River High School", date: "September 2014 - June 2018", points: ["Graduated with Honors", "Awarded Washington State Seal of Biliteracy for Spanish"] },
];

export const experience = [
  { role: "MESA Volunteer", org: "Washington State University Vancouver and Fort Vancouver High School", date: "September 2023 - present", points: ["Prepared and gave presentations to high school teachers about programming fundamentals", "Assisted high school teachers and students in the classroom with programming projects"] },
  { role: "Capstone Project Sponsor", org: "Washington State University Vancouver", date: "August 2022 - May 2025", points: ["Coordinated meetings with undergraduate students and other sponsors to discuss project progress", "Encouraged standard open-source software practices", "Performed code reviews and merged code from undergraduate students"] },
  { role: "Teaching Assistant", org: "Washington State University Vancouver", date: "August 2022 - May 2024", points: ["Graded student assignments and provided detailed feedback", "Communicated with students using Microsoft Teams", "Communicated with professors frequently"] },
  { role: "Software Development Intern", org: "Delta Computer Systems", date: "May 2021 - July 2022", points: ["Developed user-facing software using the Qt framework", "Developed Swift packages and iPadOS apps using SwiftUI", "Worked with Windows C and C++ APIs for applications and shell extensions"] },
  { role: "Lab Aide", org: "Clark College", date: "Spring 2019 - Spring 2020", points: ["Edited textbook materials used by Clark College's computer science courses", "Wrote textbook chapter on Python programming for Clark College's computer science courses", "Assisted students with computer science and engineering labs", "Contributed to open-source web application"] },
  { role: "Software Developer", org: "Clark Aerospace (Clark College)", date: "Fall 2018 - Spring 2020", points: ["Developed software for rocket tracking and recovery"] },
  { role: "Columbia River IB Parent Group Volunteer", org: "Columbia River High School", date: "2017 - 2018", points: ["Updated layout and content of website for parent group in coordination with group lead"] },
  { role: "One of a Kind Drumline", org: "", date: "2007 - 2018", points: ["Performed for a wide variety of events (Portland Trail Blazers, Portland Timbers, Susan G. Komen Race for the Cure)", "Assisted in instruction of new members"] },
  { role: "StreamTeam Volunteer", org: "Clark Public Utilities", date: "2014 - 2016", points: ["40 hours of instruction on stream ecology", "Many hours of stream restoration volunteer work, as well as potting and planting trees"] },
];

export const skills = [
  { title: "Wide-Reaching Software Development Experience", body: "I have experience with a wide variety of programming languages and environments. See my Projects page for examples of what I've used.", tags: ["C", "C++", "C#", "Python", "JavaScript", "HTML5", "Swift", "React", "Next.js", "Flask", "MongoDB", "Qt", "SwiftUI", "Unity", "Godot"] },
  { title: "Proficient with Computer Software", body: "I'm familiar with the following software: Office, Google Docs, Affinity Suite (Publisher, Photo), Blender. Having grown up around computers, I'm also very adaptable to new software.", tags: [] },
  { title: "Critical Thinking & Time Management Skills", body: "As a graduate of the International Baccalaureate Diploma Programme, I know how important good time management is. That's why I always use lists and schedules to make sure I'm using my time as effectively as possible.", tags: [] },
  { title: "Work Well in Groups", body: "The ability to collaborate with others is one of the most important qualities a worker can have. The International Baccalaureate Diploma Programme taught me how to work effectively in a team, and projects like Sneaksters and Zenith 2020 have given me lots of practice.", tags: [] },
];

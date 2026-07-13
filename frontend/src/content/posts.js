// Static blog content (frontend-only). Bodies are Markdown strings.

export const posts = [
  {
    slug: "learning-godot",
    title: "Starting my journey with Godot \u2014 my first proper game engine",
    excerpt:
      "After years of Scratch, web dev and a bit of Python, I finally took the leap into a real game engine. Here's why Godot clicked for me.",
    tag: "Gamedev",
    color: "#478cbf",
    readTime: "5 min",
    date: "2024-11-20",
    body: `## From Scratch to a real engine

I've been coding since I was 9. It started with **Scratch** back in 2019 \u2014 dragging blocks around and being amazed that I could make things move. From there I got into **web development** in 2020, learning HTML, CSS and JavaScript, and eventually became comfortable building full-stack projects with React, MongoDB and MySQL.

In 2022 I dabbled in **Python** and had a lot of fun with **Pygame**, but it slowly drifted away from me. I always felt like I was missing the tools a real game needs.

## Why Godot?

Recently I finally decided to pick up a proper game engine, and I chose **Godot**. A few things immediately won me over:

- It's completely **free and open source**.
- **GDScript** feels familiar coming from Python and JavaScript.
- The scene and node system just *makes sense* to me.

\`\`\`gdscript
extends CharacterBody2D

const SPEED = 200.0

func _physics_process(delta):
    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED
    move_and_slide()
\`\`\`

Writing my first bit of GDScript and watching a character actually move around the screen was one of those little moments that reminds me why I love this.

## What's next

I'm building my first small 2D game right now, learning a bit more with every session. My dream is to become a **game developer**, and for the first time it feels like I've found the path that fits.

> I'm 16, self-taught, and just getting started \u2014 but I'm genuinely excited about where this is heading.`,
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

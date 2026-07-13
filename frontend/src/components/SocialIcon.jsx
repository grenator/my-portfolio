import React from "react";
import { Youtube, Github, Gamepad2, Linkedin } from "lucide-react";

// Brand glyphs for social platforms.
export default function SocialIcon({ name, size = 34 }) {
  if (name === "youtube") return <Youtube size={size} color="#fff" />;
  if (name === "github") return <Github size={size} color="#fff" />;
  if (name === "itch") return <Gamepad2 size={size} color="#fff" />;
  if (name === "linkedin") return <Linkedin size={size} color="#fff" fill="#fff" />;

  if (name === "bluesky") {
    return (
      <svg width={size} height={size} viewBox="0 0 600 530" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M135.7 44.2c66.6 50 138.2 151.4 164.5 205.8 26.3-54.4 97.9-155.8 164.5-205.8 48-36.1 125.8-64 125.8 24.8 0 17.7-10.2 148.9-16.1 170.2-20.7 74-96.2 92.9-163.4 81.4 117.4 20 147.3 86.2 82.8 152.4-122.4 125.6-175.9-31.5-189.6-71.8-2.5-7.4-3.7-10.8-3.7-7.9 0-2.9-1.2.5-3.7 7.9-13.7 40.3-67.2 197.4-189.6 71.8-64.5-66.2-34.6-132.4 82.8-152.4C63.5 314.1-12 295.2-32.7 221.2c-6-21.3-16.1-152.5-16.1-170.2 0-88.8 77.8-60.9 125.8-24.8z" transform="translate(48.8 0)"/>
      </svg>
    );
  }
  return null;
}

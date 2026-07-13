import React from "react";
import { ArrowUpRight } from "lucide-react";

function initials(title) {
  const words = title.replace(/\(.*?\)/g, "").trim().split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <div
      className="glass card-hover reveal rounded-3xl p-6 flex flex-col relative overflow-hidden group"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      {/* accent glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: project.color }}
      />
      <div className="flex items-start justify-between gap-4 relative">
        <div
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg font-display shadow-md"
          style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
        >
          {initials(project.title)}
        </div>
        <span className="text-xs font-medium text-neutral-500 pt-1">{project.date}</span>
      </div>

      <h3 className="font-display text-xl font-semibold text-neutral-900 mt-4 leading-snug relative">
        {project.title}
      </h3>
      <p className="text-sm text-neutral-600 mt-2 leading-relaxed relative flex-1">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 relative">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-medium bg-white/70 border border-white/80 text-neutral-700 rounded-lg px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 relative">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-1 text-sm font-medium text-neutral-800 bg-white/60 hover:bg-white border border-white/80 rounded-xl px-3 py-1.5"
            >
              {l.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

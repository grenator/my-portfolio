import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getTechLogo } from "../lib/logos";

function initials(title) {
  const words = title.replace(/\(.*?\)/g, "").trim().split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <div
      className="glass card-hover reveal rounded-2xl p-6 flex flex-col"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
          style={
            project.logo
              ? { backgroundColor: "#fff", border: "1px solid #e2e5e2" }
              : { backgroundColor: project.color }
          }
        >
          {project.logo ? (
            <img src={project.logo} alt={`${project.title} logo`} className="w-9 h-9 object-contain" />
          ) : (
            <span className="text-white font-bold text-lg font-display">{initials(project.title)}</span>
          )}
        </div>
        <span className="text-xs font-medium text-neutral-500 pt-1">{project.date}</span>
      </div>

      <h3 className="font-display text-xl font-semibold text-neutral-900 mt-4 leading-snug">
        {project.title}
      </h3>
      <p className="text-sm text-neutral-600 mt-2 leading-relaxed flex-1">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-lg px-2.5 py-1">
              {getTechLogo(t) && <img src={getTechLogo(t)} alt="" className="w-3.5 h-3.5 object-contain" />}
              {t}
            </span>
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-1 text-sm font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg px-3 py-1.5"
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

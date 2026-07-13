import React from "react";
import { ExternalLink } from "lucide-react";

function initials(title) {
  const clean = title.replace(/\(.*?\)/g, "").trim();
  const words = clean.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProjectCard({ project }) {
  return (
    <div className="project-card fade-in bg-white rounded-xl p-5 shadow-sm flex flex-col">
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
          style={{ backgroundColor: project.color }}
        >
          {initials(project.title)}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs uppercase tracking-wide text-neutral-500 mt-0.5">
            {project.date}
          </p>
        </div>
      </div>

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
        {project.description}
      </p>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg px-3 py-1.5 transition-colors"
            >
              {l.label}
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

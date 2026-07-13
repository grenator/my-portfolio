import React, { useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects, otherProjects } from "../mock";
import { Layers } from "lucide-react";

const all = [...featuredProjects, ...otherProjects];

export default function Projects() {
  const techs = useMemo(() => {
    const set = new Set();
    all.forEach((p) => (p.tech || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);
  const [filter, setFilter] = useState("All");

  const featured = filter === "All" ? featuredProjects : featuredProjects.filter((p) => p.tech.includes(filter));
  const others = filter === "All" ? otherProjects : otherProjects.filter((p) => p.tech.includes(filter));

  return (
    <div>
      <header className="reveal">
        <p className="flex items-center gap-2 text-sm font-medium accent-blue"><Layers size={16} /> Portfolio</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">Things I've built</h1>
        <p className="text-lg text-neutral-600 mt-3 max-w-2xl">
          A mix of product work, developer tools, and playful experiments. Filter by the tech you're curious about.
        </p>
      </header>

      <div className="reveal flex flex-wrap gap-2 mt-8" style={{ animationDelay: "80ms" }}>
        {techs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`btn-press text-sm font-medium rounded-full px-4 py-1.5 border ${
              filter === t
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {featured.length > 0 && (
        <>
          <h2 className="font-display text-2xl font-bold text-neutral-900 mt-10 mb-5">Featured</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </>
      )}

      {others.length > 0 && (
        <>
          <h2 className="font-display text-2xl font-bold text-neutral-900 mt-14 mb-5">More projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </>
      )}

      {featured.length === 0 && others.length === 0 && (
        <p className="text-neutral-500 mt-12 text-center">No projects with that tech yet.</p>
      )}
    </div>
  );
}

import React from "react";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects, otherProjects } from "../mock";

export default function Projects() {
  return (
    <div className="fade-in">
      <h2 className="text-3xl font-semibold text-neutral-900">Featured Projects</h2>
      <p className="text-neutral-700 mt-2 leading-relaxed">
        Here are a few of the projects I'm most actively working on, and/or are
        most proud of. In the past, I've made a <em>lot</em> more things, which
        I've included down below under "Other Projects".
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {featuredProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-neutral-900 mt-14">Other Projects</h2>
      <p className="text-neutral-700 mt-2 leading-relaxed">
        Here are more projects I've worked on over the years. I don't consider
        them milestones as much as what I've listed above, but I'm still proud of
        them!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {otherProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

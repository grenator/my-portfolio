import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, Circle } from "lucide-react";
import { profile, socials, featuredProjects } from "../mock";
import SocialIcon from "../components/SocialIcon";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const initials = profile.name.split(" ").map((w) => w[0]).join("");
  return (
    <div>
      {/* HERO */}
      <section className="reveal grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
        <div>
          {profile.available && (
            <span className="glass-strong inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-700 mb-6">
              <Circle size={8} className="fill-green-500 text-green-500" />
              Available for new projects
            </span>
          )}
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-neutral-900">
            Hey, I'm <span className="gradient-text">{profile.first}</span>.
          </h1>
          <p className="font-display text-2xl sm:text-3xl font-medium text-neutral-500 mt-2">
            {profile.role}
          </p>
          <p className="text-lg text-neutral-600 mt-6 leading-relaxed max-w-xl">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/projects" className="btn-press gradient-ring inline-flex items-center gap-2 text-white font-semibold rounded-2xl px-6 py-3 shadow-lg">
              View my work <ArrowRight size={18} />
            </Link>
            <Link to="/resume" className="btn-press glass-strong inline-flex items-center gap-2 text-neutral-800 font-semibold rounded-2xl px-6 py-3">
              {"R\u00e9sum\u00e9"}
            </Link>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-neutral-500 mt-6">
            <MapPin size={15} /> {profile.location}
          </p>
        </div>

        {/* profile glass card */}
        <div className="glass rounded-[2rem] p-8 flex flex-col items-center text-center card-hover">
          <div className="gradient-ring w-28 h-28 rounded-3xl flex items-center justify-center text-white text-4xl font-bold font-display shadow-xl">
            {initials}
          </div>
          <h2 className="font-display text-xl font-semibold text-neutral-900 mt-5">{profile.name}</h2>
          <p className="text-sm text-neutral-500 mt-1">{profile.role}</p>
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            {profile.stats.map((s) => (
              <div key={s.label} className="bg-white/50 border border-white/70 rounded-2xl py-3">
                <p className="font-display text-2xl font-bold gradient-text">{s.value}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="reveal glass rounded-3xl p-8 sm:p-10 mt-8" style={{ animationDelay: "120ms" }}>
        <p className="text-lg text-neutral-800 leading-relaxed">{profile.intro}</p>
        <div className="mt-4 space-y-4">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-neutral-600 leading-relaxed">
              {p.text}
              {p.link && <Link to={p.link.to} className="link-anim font-medium text-neutral-900">{p.link.text}</Link>}
              {p.after}
            </p>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS PREVIEW */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium gradient-text"><Sparkles size={16} /> Selected work</p>
            <h2 className="font-display text-3xl font-bold text-neutral-900 mt-1">Featured Projects</h2>
          </div>
          <Link to="/projects" className="link-anim text-sm font-medium text-neutral-700 hidden sm:inline-flex items-center gap-1">
            See all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {featuredProjects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* SOCIALS */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-neutral-900">Let's connect</h2>
        <p className="text-neutral-600 mt-2">Find me around the web — I don't post a ton, but when I do it's usually worth it.</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {socials.map((s, i) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover reveal rounded-3xl p-5 text-white no-underline relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`, animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 bg-white/15 rounded-2xl p-2.5">
                  <SocialIcon name={s.icon} size={26} />
                </div>
                <div>
                  <p className="font-display font-semibold leading-tight">{s.handle}</p>
                  {s.subtitle && <p className="text-sm text-white/85 leading-tight">{s.subtitle}</p>}
                  <p className="text-sm text-white/85 leading-tight">{s.platform}</p>
                  <p className="text-sm text-white/95 mt-1.5 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

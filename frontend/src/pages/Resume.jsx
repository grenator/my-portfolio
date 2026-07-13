import React from "react";
import { education, experience, skills } from "../mock";
import { GraduationCap, Route, Sparkles, Github } from "lucide-react";

function TimelineItem({ title, subtitle, date, points, last }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-900 ring-4 ring-white" />
      {!last && <span className="absolute left-[6px] top-6 bottom-[-1.25rem] w-0.5 bg-neutral-200" />}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h3 className="font-display text-lg font-semibold text-neutral-900">{title}</h3>
        <span className="text-xs font-medium text-neutral-500 shrink-0">{date}</span>
      </div>
      {subtitle && <p className="text-sm font-medium accent-blue">{subtitle}</p>}
      {points?.length > 0 && (
        <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
          {points.map((pt, i) => (
            <li key={i} className="leading-relaxed flex gap-2"><span className="text-neutral-400 mt-1">•</span>{pt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionHead({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="gradient-ring w-9 h-9 rounded-xl flex items-center justify-center text-white"><Icon size={18} /></span>
      <h2 className="font-display text-2xl font-bold text-neutral-900">{title}</h2>
    </div>
  );
}

export default function Resume() {
  return (
    <div>
      <header className="reveal glass rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900">{"R\u00e9sum\u00e9"}</h1>
          <p className="text-lg text-neutral-600 mt-2 max-w-xl">
            A snapshot of my background, experience, and the tools I love working with.
          </p>
        </div>
        <a href="https://github.com/grenator" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-2 bg-neutral-900 text-white font-semibold rounded-xl px-5 py-3 hover:bg-neutral-800">
          <Github size={18} /> View GitHub
        </a>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <section className="reveal glass rounded-2xl p-8" style={{ animationDelay: "60ms" }}>
          <SectionHead icon={Route} title="My Journey" />
          <div className="space-y-6">
            {experience.map((e, i) => (
              <TimelineItem key={i} title={e.role} subtitle={e.org} date={e.date} points={e.points} last={i === experience.length - 1} />
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="reveal glass rounded-2xl p-8" style={{ animationDelay: "120ms" }}>
            <SectionHead icon={GraduationCap} title="Education" />
            <div className="space-y-6">
              {education.map((e, i) => (
                <TimelineItem key={i} title={e.degree} subtitle={e.school} date={e.date} points={e.points} last={i === education.length - 1} />
              ))}
            </div>
          </section>

          <section className="reveal glass rounded-2xl p-8" style={{ animationDelay: "180ms" }}>
            <SectionHead icon={Sparkles} title="Skills" />
            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={i}>
                  <h3 className="font-display font-semibold text-neutral-900">{s.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{s.body}</p>
                  {s.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {s.tags.map((t) => (
                        <span key={t} className="text-xs font-medium bg-neutral-100 text-neutral-700 rounded-lg px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

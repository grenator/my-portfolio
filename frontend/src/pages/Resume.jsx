import React from "react";
import { education, experience, skills } from "../mock";
import { GraduationCap, Briefcase, Sparkles } from "lucide-react";

function EntryCard({ title, subtitle, date, points }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <span className="text-xs uppercase tracking-wide text-neutral-500 shrink-0">
          {date}
        </span>
      </div>
      {subtitle && <p className="text-sm text-neutral-600 mt-0.5">{subtitle}</p>}
      {points && points.length > 0 && (
        <ul className="list-disc pl-5 mt-3 space-y-1.5 text-sm text-neutral-700">
          {points.map((pt, i) => (
            <li key={i} className="leading-relaxed">{pt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mt-12 mb-5">
      <Icon size={26} className="text-neutral-900" />
      <h2 className="text-3xl font-semibold text-neutral-900">{children}</h2>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="fade-in">
      <SectionTitle icon={GraduationCap}>Education</SectionTitle>
      <div className="space-y-4">
        {education.map((e, i) => (
          <EntryCard key={i} title={e.degree} subtitle={e.school} date={e.date} points={e.points} />
        ))}
      </div>

      <SectionTitle icon={Briefcase}>Work &amp; Volunteer Experience</SectionTitle>
      <div className="space-y-4">
        {experience.map((e, i) => (
          <EntryCard key={i} title={e.role} subtitle={e.org} date={e.date} points={e.points} />
        ))}
      </div>

      <SectionTitle icon={Sparkles}>Skills &amp; Knowledge</SectionTitle>
      <div className="space-y-4">
        {skills.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-900">{s.title}</h3>
            <p className="text-sm text-neutral-700 mt-2 leading-relaxed">{s.body}</p>
            {s.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs font-medium bg-neutral-100 text-neutral-700 rounded-md px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

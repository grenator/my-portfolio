import React from "react";
import { Link } from "react-router-dom";
import { profile, socials } from "../mock";
import SocialIcon from "../components/SocialIcon";

export default function Home() {
  return (
    <div className="fade-in">
      <p className="text-lg text-neutral-800 leading-relaxed">{profile.intro}</p>

      <div className="mt-4 space-y-4">
        {profile.paragraphs.map((p, i) => (
          <p key={i} className="text-neutral-700 leading-relaxed">
            {p.text}
            {p.link && (
              <Link to={p.link.to} className="link-blue">
                {p.link.text}
              </Link>
            )}
            {p.after}
          </p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-neutral-900">Follow me online!</h2>
        <p className="text-neutral-700 mt-2 leading-relaxed">
          Here's where you can find me online. I don't post a lot but when I do,
          they're usually bangers.
        </p>

        <div className="mt-6 space-y-4">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card block rounded-2xl p-5 text-white no-underline shadow-md"
              style={{ backgroundColor: s.color }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  <SocialIcon name={s.icon} />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{s.handle}</p>
                  {s.subtitle && (
                    <p className="text-sm text-white/90 leading-tight">{s.subtitle}</p>
                  )}
                  <p className="text-sm text-white/90 leading-tight">{s.platform}</p>
                  <p className="text-sm text-white/95 mt-1.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

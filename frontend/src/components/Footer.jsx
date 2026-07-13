import React from "react";
import { Link } from "react-router-dom";
import { profile } from "../mock";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/resume", label: "R\u00e9sum\u00e9" },
];

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-5 pb-10">
      <div className="glass rounded-3xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="gradient-ring w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm font-display">
            {profile.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div>
            <p className="font-display font-semibold text-neutral-900 leading-tight">{profile.name}</p>
            <p className="text-xs text-neutral-500">{profile.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="link-anim text-sm font-medium text-neutral-600 hover:text-neutral-900">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-neutral-500 mt-5">
        {"\u00a9"} {new Date().getFullYear()} {profile.name}. Designed & built with care.
      </p>
    </footer>
  );
}

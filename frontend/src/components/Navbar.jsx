import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Box, MessageSquare, FileText } from "lucide-react";
import { profile } from "../mock";

const items = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/projects", label: "Projects", icon: Box },
  { to: "/blog", label: "Blog", icon: MessageSquare },
  { to: "/resume", label: "Resum\u00e9", icon: FileText },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="flex flex-col items-center">
      <Link to="/" className="no-underline">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-neutral-900 text-center">
          {profile.name}
        </h1>
      </Link>
      <nav className="mt-6 flex flex-wrap justify-center gap-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`nav-pill flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium ${
                active
                  ? "bg-neutral-900 text-white shadow-md"
                  : "bg-white text-neutral-800 shadow-sm"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

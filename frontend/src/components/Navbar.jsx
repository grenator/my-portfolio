import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Layers, PenLine, FileText } from "lucide-react";
import { profile } from "../mock";

const items = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/blog", label: "Blog", icon: PenLine },
  { to: "/resume", label: "R\u00e9sum\u00e9", icon: FileText },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav className={`glass rounded-2xl w-full max-w-5xl flex items-center justify-between px-3 sm:px-4 py-2.5 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <Link to="/" className="flex items-center gap-2.5 group pl-1">
          <span className="gradient-ring w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm font-display group-hover:scale-105 transition-transform">
            {initials}
          </span>
          <span className="font-display font-semibold text-neutral-900 hidden sm:block">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to === "/blog" && pathname.startsWith("/blog"));
            return (
              <Link
                key={to}
                to={to}
                className={`btn-press flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium ${active ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
              >
                <Icon size={16} strokeWidth={2.2} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

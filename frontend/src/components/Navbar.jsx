import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Layers, PenLine, FileText, LogIn, LogOut } from "lucide-react";
import { profile } from "../mock";
import { useAuth } from "../context/AuthContext";

const items = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/blog", label: "Blog", icon: PenLine },
  { to: "/resume", label: "R\u00e9sum\u00e9", icon: FileText },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, login, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav className={`glass rounded-2xl w-full max-w-5xl flex items-center justify-between px-3 sm:px-4 py-2.5 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        <Link to="/" className="flex items-center gap-2.5 group pl-1">
          <span className="gradient-ring w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm font-display shadow-md group-hover:scale-105 transition-transform">
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
                className={`btn-press flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium ${active ? "bg-neutral-900 text-white shadow-md" : "text-neutral-700 hover:bg-white/70"}`}
              >
                <Icon size={16} strokeWidth={2.2} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          <span className="w-px h-6 bg-neutral-300/70 mx-1 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-2">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-lg object-cover" title={user.name} />
              ) : (
                <span className="w-8 h-8 rounded-lg gradient-ring text-white text-xs font-bold flex items-center justify-center">{user.name?.[0]}</span>
              )}
              <button onClick={logout} title="Sign out" className="btn-press flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-white/70">
                <LogOut size={16} /><span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <button onClick={login} className="btn-press gradient-ring flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-white shadow-md">
              <LogIn size={16} /><span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

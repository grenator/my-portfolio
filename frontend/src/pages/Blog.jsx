import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { posts } from "../content/posts";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div>
      <header className="reveal">
        <p className="flex items-center gap-2 text-sm font-medium accent-blue"><PenLine size={16} /> Writing</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">The Blog</h1>
        <p className="text-lg text-neutral-600 mt-3 max-w-2xl">Notes on what I'm learning and building along the way — currently all about game development.</p>
      </header>

      {featured && (
        <Link to={`/blog/${featured.slug}`} className="glass card-hover reveal rounded-2xl p-8 mt-8 grid md:grid-cols-[1fr_auto] gap-6 items-center no-underline" style={{ animationDelay: "60ms" }}>
          <div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium rounded-full px-3 py-1 text-white" style={{ backgroundColor: featured.color }}>{featured.tag}</span>
              <span className="text-neutral-500">Latest</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mt-4 leading-snug">{featured.title}</h2>
            <p className="text-neutral-600 mt-3 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-neutral-500 mt-4">
              <span>{formatDate(featured.date)}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
            </div>
          </div>
          <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: featured.color }}><ArrowUpRight size={28} /></div>
        </Link>
      )}

      <div className="grid sm:grid-cols-2 gap-5 mt-6">
        {rest.map((post, i) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="glass card-hover reveal rounded-2xl p-6 no-underline" style={{ animationDelay: `${i * 70}ms` }}>
            <span className="text-xs font-medium rounded-full px-2.5 py-1 text-white" style={{ backgroundColor: post.color }}>{post.tag}</span>
            <h3 className="font-display text-lg font-semibold text-neutral-900 mt-3 leading-snug">{post.title}</h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

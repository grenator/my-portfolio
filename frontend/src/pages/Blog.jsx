import React from "react";
import { blogPosts } from "../mock";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [featured, ...rest] = blogPosts;
  return (
    <div>
      <header className="reveal">
        <p className="flex items-center gap-2 text-sm font-medium gradient-text"><PenLine size={16} /> Writing</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">The Blog</h1>
        <p className="text-lg text-neutral-600 mt-3 max-w-2xl">
          Notes on engineering, design, and the things I learn while building. No fluff, just what stuck with me.
        </p>
      </header>

      {/* featured post */}
      <a
        href={`#/blog/${featured.id}`}
        className="glass card-hover reveal rounded-3xl p-8 mt-8 grid md:grid-cols-[1fr_auto] gap-6 items-center relative overflow-hidden"
        style={{ animationDelay: "60ms" }}
      >
        <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full blur-3xl opacity-25" style={{ backgroundColor: featured.color }} />
        <div className="relative">
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
        <div className="relative shrink-0 gradient-ring w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <ArrowUpRight size={28} />
        </div>
      </a>

      {/* other posts */}
      <div className="grid sm:grid-cols-2 gap-5 mt-6">
        {rest.map((post, i) => (
          <a
            key={post.id}
            href={`#/blog/${post.id}`}
            className="glass card-hover reveal rounded-3xl p-6 no-underline relative overflow-hidden group"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity" style={{ backgroundColor: post.color }} />
            <span className="relative text-xs font-medium rounded-full px-2.5 py-1 text-white" style={{ backgroundColor: post.color }}>{post.tag}</span>
            <h3 className="font-display text-lg font-semibold text-neutral-900 mt-3 leading-snug relative">{post.title}</h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed relative">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4 relative">
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

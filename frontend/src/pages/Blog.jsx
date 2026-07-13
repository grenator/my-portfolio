import React from "react";
import { blogPosts } from "../mock";
import { ChevronRight } from "lucide-react";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  return (
    <div className="fade-in">
      <h2 className="text-3xl font-semibold text-neutral-900">Blog</h2>
      <p className="text-neutral-700 mt-2 leading-relaxed">
        Thoughts, retrospectives, and updates on what I've been working on.
      </p>

      <div className="mt-6 space-y-4">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={`https://meorge.com/blog/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card block bg-white rounded-xl p-5 shadow-sm no-underline"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm font-medium text-neutral-500 mt-1">
                  {formatDate(post.date)}
                </p>
              </div>
              <ChevronRight size={20} className="text-neutral-400 shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

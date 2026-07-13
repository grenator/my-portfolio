import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import MarkdownView from "../components/MarkdownView";
import { getPost } from "../content/posts";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-neutral-600">That post doesn't exist.</p>
        <Link to="/blog" className="link-anim font-medium accent-blue mt-3 inline-block">Back to the blog</Link>
      </div>
    );
  }

  return (
    <article>
      <Link to="/blog" className="btn-press glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-neutral-700"><ArrowLeft size={16} /> All posts</Link>

      <header className="reveal mt-6">
        <span className="text-xs font-medium rounded-full px-3 py-1 text-white" style={{ backgroundColor: post.color }}>{post.tag}</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-neutral-500 mt-4">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
        </div>
      </header>

      <div className="reveal glass rounded-2xl p-8 sm:p-10 mt-6" style={{ animationDelay: "80ms" }}>
        <MarkdownView>{post.body}</MarkdownView>
      </div>
    </article>
  );
}

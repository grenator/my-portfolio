import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Pencil, Trash2 } from "lucide-react";
import MarkdownView from "../components/MarkdownView";
import PostEditor from "../components/PostEditor";
import { fetchPost, deletePost } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const load = () => {
    setLoading(true);
    fetchPost(slug)
      .then((p) => setPost(p))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  };
  useEffect(load, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try { await deletePost(post.id); navigate("/blog"); } catch (e) { alert("Failed to delete"); }
  };

  if (loading) return <div className="glass rounded-3xl p-10 text-center text-neutral-500">Loading…</div>;
  if (notFound || !post) return (
    <div className="glass rounded-3xl p-10 text-center">
      <p className="text-neutral-600">That post doesn't exist.</p>
      <Link to="/blog" className="link-anim font-medium text-neutral-900 mt-3 inline-block">Back to the blog</Link>
    </div>
  );

  return (
    <article>
      <Link to="/blog" className="btn-press glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-neutral-700"><ArrowLeft size={16} /> All posts</Link>

      <header className="reveal mt-6">
        <span className="text-xs font-medium rounded-full px-3 py-1 text-white" style={{ backgroundColor: post.color }}>{post.tag}</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-neutral-500 mt-4">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.read_time}</span>
        </div>
        {user?.is_owner && (
          <div className="flex gap-2 mt-5">
            <button onClick={() => setEditing(true)} className="btn-press glass inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-neutral-800"><Pencil size={15} /> Edit</button>
            <button onClick={handleDelete} className="btn-press inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </header>

      <div className="reveal glass rounded-3xl p-8 sm:p-10 mt-6" style={{ animationDelay: "80ms" }}>
        <MarkdownView>{post.body}</MarkdownView>
      </div>

      {editing && (
        <PostEditor
          post={post}
          onClose={() => setEditing(false)}
          onSaved={(saved) => { setEditing(false); if (saved.slug !== slug) navigate(`/blog/${saved.slug}`); else setPost(saved); }}
        />
      )}
    </article>
  );
}

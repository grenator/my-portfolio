import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, PenLine, Plus, Pencil, Trash2 } from "lucide-react";
import { fetchPosts, deletePost } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import PostEditor from "../components/PostEditor";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const load = () => {
    setLoading(true);
    fetchPosts().then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const isOwner = user?.is_owner;

  const openNew = () => { setEditingPost(null); setEditorOpen(true); };
  const openEdit = (e, post) => { e.preventDefault(); e.stopPropagation(); setEditingPost(post); setEditorOpen(true); };
  const handleDelete = async (e, post) => {
    e.preventDefault(); e.stopPropagation();
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    try { await deletePost(post.id); setPosts((p) => p.filter((x) => x.id !== post.id)); } catch (err) { alert("Failed to delete"); }
  };
  const onSaved = () => { setEditorOpen(false); load(); };

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div>
      <header className="reveal flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium gradient-text"><PenLine size={16} /> Writing</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">The Blog</h1>
          <p className="text-lg text-neutral-600 mt-3 max-w-2xl">Notes on engineering, design, and the things I learn while building.</p>
        </div>
        {isOwner && (
          <button onClick={openNew} className="btn-press gradient-ring shrink-0 inline-flex items-center gap-2 text-white font-semibold rounded-2xl px-5 py-3 shadow-lg"><Plus size={18} /> <span className="hidden sm:inline">New post</span></button>
        )}
      </header>

      {loading ? (
        <div className="glass rounded-3xl p-10 text-center text-neutral-500 mt-8">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-neutral-500 mt-8">No posts yet.{isOwner && " Click \u2018New post\u2019 to write one."}</div>
      ) : (
        <>
          {featured && (
            <Link to={`/blog/${featured.slug}`} className="glass card-hover reveal rounded-3xl p-8 mt-8 grid md:grid-cols-[1fr_auto] gap-6 items-center relative overflow-hidden no-underline" style={{ animationDelay: "60ms" }}>
              <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full blur-3xl opacity-25" style={{ backgroundColor: featured.color }} />
              <div className="relative">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium rounded-full px-3 py-1 text-white" style={{ backgroundColor: featured.color }}>{featured.tag}</span>
                  <span className="text-neutral-500">Latest</span>
                  {isOwner && (
                    <span className="flex gap-1 ml-auto">
                      <button onClick={(e) => openEdit(e, featured)} className="btn-press w-8 h-8 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center text-neutral-700"><Pencil size={14} /></button>
                      <button onClick={(e) => handleDelete(e, featured)} className="btn-press w-8 h-8 rounded-lg bg-white/70 hover:bg-red-50 flex items-center justify-center text-red-500"><Trash2 size={14} /></button>
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mt-4 leading-snug">{featured.title}</h2>
                <p className="text-neutral-600 mt-3 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mt-4">
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {featured.read_time}</span>
                </div>
              </div>
              <div className="relative shrink-0 gradient-ring w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"><ArrowUpRight size={28} /></div>
            </Link>
          )}

          <div className="grid sm:grid-cols-2 gap-5 mt-6">
            {rest.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="glass card-hover reveal rounded-3xl p-6 no-underline relative overflow-hidden group" style={{ animationDelay: `${i * 70}ms` }}>
                <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity" style={{ backgroundColor: post.color }} />
                <div className="flex items-center justify-between relative">
                  <span className="text-xs font-medium rounded-full px-2.5 py-1 text-white" style={{ backgroundColor: post.color }}>{post.tag}</span>
                  {isOwner && (
                    <span className="flex gap-1">
                      <button onClick={(e) => openEdit(e, post)} className="btn-press w-7 h-7 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center text-neutral-700"><Pencil size={13} /></button>
                      <button onClick={(e) => handleDelete(e, post)} className="btn-press w-7 h-7 rounded-lg bg-white/70 hover:bg-red-50 flex items-center justify-center text-red-500"><Trash2 size={13} /></button>
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-neutral-900 mt-3 leading-snug relative">{post.title}</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed relative">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4 relative">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {post.read_time}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {editorOpen && (
        <PostEditor post={editingPost} onClose={() => setEditorOpen(false)} onSaved={onSaved} />
      )}
    </div>
  );
}

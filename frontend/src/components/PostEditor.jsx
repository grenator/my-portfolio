import React, { useState } from "react";
import { X, Eye, Pencil } from "lucide-react";
import MarkdownView from "./MarkdownView";
import { createPost, updatePost } from "../lib/api";

const PALETTE = [
  { name: "Blue", value: "#4a86f0" },
  { name: "Purple", value: "#a855f7" },
  { name: "Cyan", value: "#0a95d9" },
  { name: "Red", value: "#e2483d" },
];

export default function PostEditor({ post, onClose, onSaved }) {
  const editing = Boolean(post);
  const [form, setForm] = useState({
    title: post?.title || "",
    tag: post?.tag || "Engineering",
    color: post?.color || "#4a86f0",
    read_time: post?.read_time || "5 min",
    date: post?.date || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
  });
  const [tab, setTab] = useState("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    setSaving(true); setError("");
    try {
      const saved = editing ? await updatePost(post.id, form) : await createPost(form);
      onSaved(saved, editing);
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to save. Are you signed in as the owner?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 overflow-y-auto" style={{ background: "rgba(20,25,45,0.35)", backdropFilter: "blur(6px)" }}>
      <div className="glass-strong rounded-3xl w-full max-w-3xl my-8 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-neutral-900">{editing ? "Edit post" : "New post"}</h2>
          <button onClick={onClose} className="btn-press w-9 h-9 rounded-xl bg-white/70 hover:bg-white flex items-center justify-center"><X size={18} /></button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700">Title</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" placeholder="An interesting title" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Tag</label>
              <input value={form.tag} onChange={(e) => set("tag", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Read time</label>
              <input value={form.read_time} onChange={(e) => set("read_time", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" placeholder="5 min" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Date</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700">Accent color</label>
            <div className="flex gap-2 mt-1">
              {PALETTE.map((c) => (
                <button key={c.value} onClick={() => set("color", c.value)} className={`w-9 h-9 rounded-xl transition-transform ${form.color === c.value ? "ring-2 ring-offset-2 ring-neutral-800 scale-105" : ""}`} style={{ backgroundColor: c.value }} title={c.name} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none" placeholder="A short summary shown on the blog list" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">Content (Markdown)</label>
              <div className="flex gap-1 bg-white/70 rounded-lg p-1">
                <button onClick={() => setTab("write")} className={`flex items-center gap-1 text-xs font-medium rounded-md px-2.5 py-1 ${tab === "write" ? "bg-neutral-900 text-white" : "text-neutral-600"}`}><Pencil size={12} /> Write</button>
                <button onClick={() => setTab("preview")} className={`flex items-center gap-1 text-xs font-medium rounded-md px-2.5 py-1 ${tab === "preview" ? "bg-neutral-900 text-white" : "text-neutral-600"}`}><Eye size={12} /> Preview</button>
              </div>
            </div>
            {tab === "write" ? (
              <textarea value={form.body} onChange={(e) => set("body", e.target.value)} rows={12} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm resize-y" placeholder={"## Heading\n\nWrite your post in **markdown**..."} />
            ) : (
              <div className="mt-1 rounded-xl border border-neutral-200 bg-white/80 px-5 py-4 min-h-[18rem]"><MarkdownView>{form.body}</MarkdownView></div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-press glass rounded-xl px-5 py-2.5 font-medium text-neutral-700">Cancel</button>
          <button onClick={save} disabled={saving} className="btn-press gradient-ring rounded-xl px-6 py-2.5 font-semibold text-white shadow-md disabled:opacity-60">{saving ? "Saving…" : editing ? "Save changes" : "Publish"}</button>
        </div>
      </div>
    </div>
  );
}

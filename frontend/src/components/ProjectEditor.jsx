import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { createProject, updateProject } from "../lib/api";

const PALETTE = [
  { name: "Blue", value: "#4a86f0" },
  { name: "Purple", value: "#a855f7" },
  { name: "Cyan", value: "#0a95d9" },
  { name: "Red", value: "#e2483d" },
];

export default function ProjectEditor({ project, onClose, onSaved }) {
  const editing = Boolean(project);
  const [form, setForm] = useState({
    title: project?.title || "",
    date: project?.date || "",
    description: project?.description || "",
    color: project?.color || "#4a86f0",
    featured: project?.featured || false,
    techText: (project?.tech || []).join(", "),
    links: project?.links?.length ? project.links : [{ label: "", url: "" }],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const setLink = (i, k, v) => setForm((f) => {
    const links = [...f.links];
    links[i] = { ...links[i], [k]: v };
    return { ...f, links };
  });
  const addLink = () => set("links", [...form.links, { label: "", url: "" }]);
  const removeLink = (i) => set("links", form.links.filter((_, idx) => idx !== i));

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    setSaving(true); setError("");
    const payload = {
      title: form.title,
      date: form.date,
      description: form.description,
      color: form.color,
      featured: form.featured,
      tech: form.techText.split(",").map((t) => t.trim()).filter(Boolean),
      links: form.links.filter((l) => l.label.trim() && l.url.trim()),
    };
    try {
      const saved = editing ? await updateProject(project.id, payload) : await createProject(payload);
      onSaved(saved, editing);
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to save. Are you signed in as the owner?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 overflow-y-auto" style={{ background: "rgba(20,25,45,0.35)", backdropFilter: "blur(6px)" }}>
      <div className="glass-strong rounded-3xl w-full max-w-2xl my-8 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-neutral-900">{editing ? "Edit project" : "New project"}</h2>
          <button onClick={onClose} className="btn-press w-9 h-9 rounded-xl bg-white/70 hover:bg-white flex items-center justify-center"><X size={18} /></button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>}

        <div className="mt-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Title</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Date / period</label>
              <input value={form.date} onChange={(e) => set("date", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" placeholder="2024 — present" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700">Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700">Tech (comma separated)</label>
            <input value={form.techText} onChange={(e) => set("techText", e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400" placeholder="React, Node, Redis" />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="text-sm font-medium text-neutral-700">Accent color</label>
              <div className="flex gap-2 mt-1">
                {PALETTE.map((c) => (
                  <button key={c.value} onClick={() => set("color", c.value)} className={`w-9 h-9 rounded-xl transition-transform ${form.color === c.value ? "ring-2 ring-offset-2 ring-neutral-800 scale-105" : ""}`} style={{ backgroundColor: c.value }} title={c.name} />
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mt-6 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-blue-500" />
              Featured
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700">Links</label>
              <button onClick={addLink} className="btn-press text-xs font-medium flex items-center gap-1 bg-white/70 rounded-lg px-2.5 py-1"><Plus size={13} /> Add</button>
            </div>
            <div className="space-y-2 mt-1">
              {form.links.map((l, i) => (
                <div key={i} className="flex gap-2">
                  <input value={l.label} onChange={(e) => setLink(i, "label", e.target.value)} placeholder="Label (e.g. Live)" className="w-1/3 rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                  <input value={l.url} onChange={(e) => setLink(i, "url", e.target.value)} placeholder="https://…" className="flex-1 rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
                  <button onClick={() => removeLink(i)} className="btn-press w-9 rounded-xl bg-white/70 hover:bg-red-50 flex items-center justify-center text-neutral-500 hover:text-red-500"><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn-press glass rounded-xl px-5 py-2.5 font-medium text-neutral-700">Cancel</button>
          <button onClick={save} disabled={saving} className="btn-press gradient-ring rounded-xl px-6 py-2.5 font-semibold text-white shadow-md disabled:opacity-60">{saving ? "Saving…" : editing ? "Save changes" : "Create"}</button>
        </div>
      </div>
    </div>
  );
}

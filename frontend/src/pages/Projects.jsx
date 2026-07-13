import React, { useEffect, useMemo, useState } from "react";
import { Layers, Plus, Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { fetchProjects, deleteProject } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import ProjectEditor from "../components/ProjectEditor";

function initials(title) {
  const words = (title || "").replace(/\(.*?\)/g, "").trim().split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return ((words[0]?.[0] || "") + (words[1]?.[0] || "")).toUpperCase();
}

function Card({ project, index, isOwner, onEdit, onDelete }) {
  return (
    <div className="glass card-hover reveal rounded-3xl p-6 flex flex-col relative overflow-hidden group" style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}>
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: project.color }} />
      <div className="flex items-start justify-between gap-4 relative">
        <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg font-display shadow-md" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}>{initials(project.title)}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-500 pt-1">{project.date}</span>
          {isOwner && (
            <span className="flex gap-1">
              <button onClick={() => onEdit(project)} className="btn-press w-7 h-7 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center text-neutral-700"><Pencil size={13} /></button>
              <button onClick={() => onDelete(project)} className="btn-press w-7 h-7 rounded-lg bg-white/70 hover:bg-red-50 flex items-center justify-center text-red-500"><Trash2 size={13} /></button>
            </span>
          )}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-neutral-900 mt-4 leading-snug relative">{project.title}</h3>
      <p className="text-sm text-neutral-600 mt-2 leading-relaxed relative flex-1">{project.description}</p>
      {project.tech?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 relative">
          {project.tech.map((t) => (<span key={t} className="text-xs font-medium bg-white/70 border border-white/80 text-neutral-700 rounded-lg px-2.5 py-1">{t}</span>))}
        </div>
      )}
      {project.links?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 relative">
          {project.links.map((l) => (<a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-1 text-sm font-medium text-neutral-800 bg-white/60 hover:bg-white border border-white/80 rounded-xl px-3 py-1.5">{l.label}<ArrowUpRight size={14} /></a>))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const load = () => {
    setLoading(true);
    fetchProjects().then(setProjects).catch(() => setProjects([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const isOwner = user?.is_owner;
  const techs = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.tech || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = filter === "All" ? projects : projects.filter((p) => (p.tech || []).includes(filter));
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  const openNew = () => { setEditingProject(null); setEditorOpen(true); };
  const openEdit = (p) => { setEditingProject(p); setEditorOpen(true); };
  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try { await deleteProject(p.id); setProjects((x) => x.filter((y) => y.id !== p.id)); } catch (e) { alert("Failed to delete"); }
  };
  const onSaved = () => { setEditorOpen(false); load(); };

  return (
    <div>
      <header className="reveal flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium gradient-text"><Layers size={16} /> Portfolio</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">Things I've built</h1>
          <p className="text-lg text-neutral-600 mt-3 max-w-2xl">A mix of product work, developer tools, and playful experiments. Filter by the tech you're curious about.</p>
        </div>
        {isOwner && (
          <button onClick={openNew} className="btn-press gradient-ring shrink-0 inline-flex items-center gap-2 text-white font-semibold rounded-2xl px-5 py-3 shadow-lg"><Plus size={18} /> <span className="hidden sm:inline">New</span></button>
        )}
      </header>

      {!loading && projects.length > 0 && (
        <div className="reveal flex flex-wrap gap-2 mt-8" style={{ animationDelay: "80ms" }}>
          {techs.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`btn-press text-sm font-medium rounded-full px-4 py-1.5 border ${filter === t ? "bg-neutral-900 text-white border-neutral-900 shadow-md" : "glass text-neutral-700 border-white/70 hover:bg-white/80"}`}>{t}</button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="glass rounded-3xl p-10 text-center text-neutral-500 mt-8">Loading projects…</div>
      ) : (
        <>
          {featured.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-10 mb-5">Featured</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((p, i) => <Card key={p.id} project={p} index={i} isOwner={isOwner} onEdit={openEdit} onDelete={handleDelete} />)}
              </div>
            </>
          )}
          {others.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-neutral-900 mt-14 mb-5">More projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((p, i) => <Card key={p.id} project={p} index={i} isOwner={isOwner} onEdit={openEdit} onDelete={handleDelete} />)}
              </div>
            </>
          )}
          {filtered.length === 0 && (
            <p className="text-neutral-500 mt-12 text-center">No projects to show yet.</p>
          )}
        </>
      )}

      {editorOpen && (
        <ProjectEditor project={editingProject} onClose={() => setEditorOpen(false)} onSaved={onSaved} />
      )}
    </div>
  );
}

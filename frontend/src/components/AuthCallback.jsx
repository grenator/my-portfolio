import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    const sessionId = match ? decodeURIComponent(match[1]) : null;

    const run = async () => {
      if (!sessionId) {
        navigate("/", { replace: true });
        return;
      }
      try {
        const res = await api.post("/auth/session", { session_id: sessionId });
        setUser(res.data);
      } catch (e) {
        // ignore, land as guest
      } finally {
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/blog", { replace: true });
      }
    };
    run();
  }, [navigate, setUser]);

  return (
    <div className="App">
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" /><div className="blob blob-4" />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl px-10 py-8 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-neutral-300 border-t-neutral-800 animate-spin mx-auto" />
          <p className="mt-4 font-display font-medium text-neutral-700">Signing you in…</p>
        </div>
      </div>
    </div>
  );
}

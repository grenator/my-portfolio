import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center gap-3 pb-4">
      <Logo size={44} color="#1a1a1a" />
      <p className="text-sm text-neutral-600">{"\u00a9"} 2026 Malcolm Anderson</p>
    </footer>
  );
}

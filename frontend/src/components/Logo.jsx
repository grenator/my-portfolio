import React from "react";

// The meorge "M" logo made of two triangular chevrons
export default function Logo({ size = 40, color = "#1a1a1a" }) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 100 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Malcolm Anderson logo"
    >
      <path d="M25 0 L50 72 L0 72 Z" fill={color} />
      <path d="M75 0 L100 72 L50 72 Z" fill={color} />
    </svg>
  );
}

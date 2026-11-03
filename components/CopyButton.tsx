"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState("📋 Copy");

  function handleClick() {
    const input = document.createElement("input");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setLabel("✅ Copied!");
    setTimeout(() => setLabel("📋 Copy"), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium cursor-pointer"
    >
      {label}
    </button>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function SearchableDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  loading = false,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(filter.toLowerCase())
  );

  const displayValue = value || "";

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div
        className={`relative flex items-center bg-white border-2 rounded-xl transition-all ${
          open ? "border-blue-500 ring-4 ring-blue-100" : "border-gray-200"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={open ? filter : displayValue}
          onChange={(e) => {
            setFilter(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (!disabled) {
              setOpen(true);
              setFilter("");
            }
          }}
          placeholder={loading ? "Loading..." : placeholder}
          disabled={disabled}
          className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none rounded-xl"
          autoComplete="off"
        />
        {/* Clear button */}
        {value && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setFilter("");
              setOpen(false);
            }}
            className="absolute right-10 text-gray-400 hover:text-gray-600 p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18" /><path d="M6 6l12 12" />
            </svg>
          </button>
        )}
        {/* Chevron */}
        <svg
          className={`absolute right-3 h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Dropdown list */}
      {open && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
          {loading ? (
            <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-400">No results found</div>
          ) : (
            filtered.slice(0, 100).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setFilter("");
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                  opt === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                }`}
              >
                {opt}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

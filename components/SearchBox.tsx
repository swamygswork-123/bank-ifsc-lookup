"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";

interface SearchResult {
  ifsc: string;
  bank: string;
  branch: string;
  city: string;
  state: string;
}

export default function SearchBox({
  size = "large",
  initialQuery = "",
  autoFocus = false,
}: {
  size?: "large" | "small";
  initialQuery?: string;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`
      );
      const data = await res.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelectedIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const navigateToSearch = () => {
    const q = query.trim();
    if (!q) return;
    setShowSuggestions(false);

    if (/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(q)) {
      window.location.href = `/ifsc/${q.toUpperCase()}`;
    } else {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        setShowSuggestions(false);
        window.location.href = `/ifsc/${suggestions[selectedIndex].ifsc}`;
      } else {
        navigateToSearch();
      }
      return;
    }

    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
  };

  const isLarge = size === "large";

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form action="/search" method="GET" onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm hover:shadow-md ${
            isLarge ? "h-16" : "h-12"
          }`}
        >
          <Search
            className={`absolute left-4 text-gray-400 ${isLarge ? "h-6 w-6" : "h-5 w-5"}`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder={isLarge ? "Enter IFSC code, bank name, or branch..." : "Search IFSC or bank..."}
            className={`w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 ${
              isLarge ? "pl-14 pr-32 text-lg" : "pl-12 pr-28 text-sm"
            }`}
            name="q"
            autoComplete="off"
            aria-label="Search IFSC code"
          />
          {loading && (
            <Loader2
              className={`absolute ${isLarge ? "right-28" : "right-22"} h-5 w-5 text-gray-400 animate-spin`}
            />
          )}
          <button
            type="submit"
            className={`absolute right-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1 cursor-pointer ${
              isLarge ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm"
            }`}
          >
            Search
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          {suggestions.map((result, index) => (
            <button
              key={result.ifsc}
              onClick={() => {
                setShowSuggestions(false);
                window.location.href = `/ifsc/${result.ifsc}`;
              }}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-b border-gray-50 last:border-0 ${
                index === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <code className="text-blue-600 font-mono font-semibold text-sm mt-0.5 shrink-0">
                {result.ifsc}
              </code>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {result.bank}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {result.branch}, {result.city || result.state}
                </p>
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              setShowSuggestions(false);
              window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
            }}
            className="w-full text-center px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
          >
            View all results for &quot;{query}&quot; →
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import SearchableDropdown from "./SearchableDropdown";

interface BranchResult {
  ifsc: string;
  bank: string;
  branch: string;
  city: string;
  district: string;
  state: string;
  address: string;
  micr: string;
  neft: boolean;
  rtgs: boolean;
  imps: boolean;
  upi: boolean;
}

export default function DropdownSearch() {
  const [popularBanks, setPopularBanks] = useState<string[]>([]);
  const [banks, setBanks] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  const [selectedBank, setSelectedBank] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  const [results, setResults] = useState<BranchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  // Load banks and states on mount
  useEffect(() => {
    fetch("/api/banks")
      .then((r) => r.json())
      .then((data) => {
        setPopularBanks(data.popular || []);
        setBanks(data.all || []);
      })
      .finally(() => setLoadingBanks(false));

    fetch("/api/states")
      .then((r) => r.json())
      .then((data) => setStates(data))
      .finally(() => setLoadingStates(false));
  }, []);

  // When bank or state changes → reload districts
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict("");
      setBranches([]);
      setSelectedBranch("");
      return;
    }
    setLoadingDistricts(true);
    setSelectedDistrict("");
    setBranches([]);
    setSelectedBranch("");

    const params = new URLSearchParams({ state: selectedState });
    if (selectedBank) params.set("bank", selectedBank);

    fetch(`/api/districts?${params}`)
      .then((r) => r.json())
      .then((data) => setDistricts(data))
      .finally(() => setLoadingDistricts(false));
  }, [selectedState, selectedBank]);

  // When district changes → reload branches
  useEffect(() => {
    if (!selectedState || !selectedDistrict) {
      setBranches([]);
      setSelectedBranch("");
      return;
    }
    setLoadingBranches(true);
    setSelectedBranch("");

    const params = new URLSearchParams({ state: selectedState, district: selectedDistrict });
    if (selectedBank) params.set("bank", selectedBank);

    fetch(`/api/branches?${params}`)
      .then((r) => r.json())
      .then((data) => setBranches(data))
      .finally(() => setLoadingBranches(false));
  }, [selectedState, selectedDistrict, selectedBank]);

  // When bank changes, reset downstream if they don't apply
  const handleBankChange = (val: string) => {
    setSelectedBank(val);
    // Reset district and branch since options will change
    setSelectedDistrict("");
    setSelectedBranch("");
    setResults([]);
    setSearched(false);
  };

  const handleSearch = async () => {
    if (!selectedState && !selectedBank) return;
    setSearching(true);
    setResults([]);
    setSearched(true);

    const parts: string[] = [];
    if (selectedBank) parts.push(selectedBank);
    if (selectedState) parts.push(selectedState);
    if (selectedDistrict) parts.push(selectedDistrict);
    if (selectedBranch) parts.push(selectedBranch);
    const q = parts.join(" ");

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&limit=50`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <SearchableDropdown
          label="Bank"
          placeholder="Select Bank..."
          options={banks}
          popularOptions={popularBanks}
          value={selectedBank}
          onChange={handleBankChange}
          loading={loadingBanks}
        />
        <SearchableDropdown
          label="State"
          placeholder="Select State..."
          options={states}
          value={selectedState}
          onChange={setSelectedState}
          loading={loadingStates}
        />
        <SearchableDropdown
          label="District"
          placeholder="Select District..."
          options={districts}
          value={selectedDistrict}
          onChange={setSelectedDistrict}
          disabled={!selectedState}
          loading={loadingDistricts}
        />
        <SearchableDropdown
          label="Branch / Place"
          placeholder="Select Branch..."
          options={branches}
          value={selectedBranch}
          onChange={setSelectedBranch}
          disabled={!selectedDistrict}
          loading={loadingBranches}
        />
      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={(!selectedState && !selectedBank) || searching}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {searching ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Searching...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Find IFSC Codes
          </>
        )}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              Found {results.length} branches
              {selectedBank && ` — ${selectedBank}`}
              {selectedState && ` in ${selectedState}`}
              {selectedDistrict && ` > ${selectedDistrict}`}
              {selectedBranch && ` > ${selectedBranch}`}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Bank</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700">IFSC</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700 hidden sm:table-cell">Branch</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-700 hidden md:table-cell">District</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((r) => (
                  <tr key={r.ifsc} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-2.5 text-gray-800 font-medium text-xs">{r.bank}</td>
                    <td className="px-4 py-2.5">
                      <a
                        href={`/ifsc/${r.ifsc}`}
                        className="font-mono text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        {r.ifsc}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 hidden sm:table-cell">{r.branch}</td>
                    <td className="px-4 py-2.5 text-gray-600 hidden md:table-cell">{r.district}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {searched && !searching && results.length === 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm py-6 bg-white rounded-xl border border-gray-200">
          No results found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}

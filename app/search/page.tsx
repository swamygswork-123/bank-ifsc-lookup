export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import { searchBranches } from "@/lib/db";
import { formatBankName } from "@/lib/utils";
import SearchBox from "@/components/SearchBox";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Search IFSC Codes - Find Bank Branch Details",
  description:
    "Search IFSC codes by bank name, branch, city, or IFSC code. Find complete branch details including MICR code, address, and transfer support.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const { results, total } = q
    ? await searchBranches(q, limit, offset)
    : { results: [], total: 0 };
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "Search" }]} />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {q ? `Search Results for "${q}"` : "Search IFSC Codes"}
        </h1>
        <SearchBox size="small" initialQuery={q} autoFocus={!q} />
      </div>

      {q && (
        <p className="text-sm text-gray-500 mb-6">
          Found {total.toLocaleString()} results
          {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((branch, index) => (
            <>
              <Link
                key={branch.ifsc}
                href={`/ifsc/${branch.ifsc}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-blue-600 font-mono font-bold text-sm">
                        {branch.ifsc}
                      </code>
                    </div>
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {formatBankName(branch.bank)}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {branch.branch}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      {[branch.city, branch.district, branch.state]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {branch.neft && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        NEFT
                      </span>
                    )}
                    {branch.rtgs && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        RTGS
                      </span>
                    )}
                    {branch.upi && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        UPI
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              {index === 4 && (
                <AdBanner
                  key="ad-inline"
                  slot="1234567890"
                  format="horizontal"
                />
              )}
            </>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-2">
            No results found for &quot;{q}&quot;
          </p>
          <p className="text-gray-400 text-sm">
            Try searching with a different bank name, branch, or IFSC code.
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Enter a search query to find IFSC codes
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

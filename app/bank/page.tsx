import { Metadata } from "next";
import Link from "next/link";
import { getAllBanks } from "@/lib/db";
import { SITE_NAME } from "@/lib/constants";
import { formatBankName } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchBox from "@/components/SearchBox";
import AdBanner from "@/components/AdBanner";
import { Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `All Banks IFSC Codes - Complete Bank Directory`,
  description: `Browse IFSC codes for all banks in India. Complete directory of Indian banks with branch details, IFSC codes, MICR codes, and contact information.`,
  alternates: { canonical: "/bank" },
};

export default async function AllBanksPage() {
  const banks = await getAllBanks();

  // Group banks by first letter
  const grouped: Record<string, typeof banks> = {};
  for (const bank of banks) {
    const letter = bank.bank.charAt(0).toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(bank);
  }
  const letters = Object.keys(grouped).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "All Banks" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All Banks in India - IFSC Code Directory
        </h1>
        <p className="text-gray-600">
          Browse IFSC codes for {banks.length.toLocaleString()} banks in India.
          Select a bank to find IFSC codes by state and branch.
        </p>
      </div>

      <div className="mb-8">
        <SearchBox size="small" />
      </div>

      {/* Letter Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 bg-white p-3 rounded-xl border border-gray-200 sticky top-16 z-10">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      <AdBanner slot="1234567890" format="horizontal" className="mb-8" />

      {/* Bank Listings */}
      <div className="space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4 inline-block">
              {letter}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {grouped[letter].map((bank, index) => (
                <Link
                  key={`${bank.slug}-${index}`}
                  href={`/bank/${bank.slug}`}
                  className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 shrink-0">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600">
                      {formatBankName(bank.bank)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bank.count.toLocaleString()} branches
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

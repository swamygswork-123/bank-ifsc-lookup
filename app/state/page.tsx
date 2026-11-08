export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import { rawQuery, getAllBanks, stateToSlug, bankToSlug } from "@/lib/db";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "IFSC Codes by State - Find Bank Branches State-wise",
  description:
    "Browse IFSC codes by state. Find all bank branches and their IFSC codes in your state — Maharashtra, Delhi, Karnataka, Tamil Nadu, UP, and all other states.",
  alternates: { canonical: "/state" },
  keywords: [
    "IFSC code by state",
    "bank branches Maharashtra",
    "IFSC code Delhi",
    "bank branches Karnataka",
    "state wise IFSC code",
    "bank branches in my state",
  ],
};

interface StateInfo {
  state: string;
  bankCount: number;
  branchCount: number;
}

export default async function StatesPage() {
  const states = await rawQuery(
    "SELECT state, COUNT(DISTINCT bank) as bankCount, COUNT(*) as branchCount FROM branches GROUP BY state ORDER BY branchCount DESC"
  ) as unknown as StateInfo[];

  const banks = await getAllBanks();
  const topBanks = [...banks].sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "States" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          IFSC Codes by State
        </h1>
        <p className="text-gray-600">
          Browse {states.length} states and union territories. Select your state
          to find bank branches and IFSC codes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {states.map((state) => {
          const slug = stateToSlug(state.state);
          // Link to the most popular bank in this state
          const topBank = topBanks[0];
          return (
            <div
              key={state.state}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-50 text-green-600 p-2.5 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{state.state}</h2>
                  <p className="text-xs text-gray-500">
                    {state.branchCount.toLocaleString()} branches •{" "}
                    {state.bankCount} banks
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topBanks.slice(0, 5).map((bank) => (
                  <Link
                    key={bank.slug}
                    href={`/bank/${bank.slug}/${slug}`}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {bank.bank.split(" ").slice(0, 2).join(" ")}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AdBanner slot="1234567890" format="horizontal" />
    </div>
  );
}

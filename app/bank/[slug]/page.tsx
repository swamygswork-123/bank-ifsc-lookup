export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBankBySlug,
  getStatesForBank,
  bankToSlug,
  stateToSlug,
} from "@/lib/db";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { formatBankName, generateBreadcrumbSchema } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { MapPin, Building2 } from "lucide-react";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bankName = getBankBySlug(slug);
  if (!bankName) return { title: "Bank Not Found" };

  const formatted = formatBankName(bankName);
  return {
    title: `${formatted} IFSC Codes - All Branches & States`,
    description: `Find IFSC codes for all ${formatted} branches across India. Browse by state to get branch details, MICR code, and transfer support information.`,
    alternates: { canonical: `/bank/${slug}` },
    openGraph: {
      title: `${formatted} IFSC Codes - All Branches`,
      description: `Complete list of ${formatted} IFSC codes by state.`,
      url: `${SITE_URL}/bank/${slug}`,
    },
  };
}

export default async function BankPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const bankName = getBankBySlug(slug);
  if (!bankName) notFound();

  const formatted = formatBankName(bankName);
  const states = getStatesForBank(bankName);
  const totalBranches = states.reduce((sum, s) => sum + s.count, 0);

  const breadcrumbItems = [
    { label: "Banks", href: "/bank" },
    { label: formatted },
  ];

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbItems.map((item) => ({
            name: item.label,
            url: item.href
              ? `${SITE_URL}${item.href}`
              : `${SITE_URL}/bank/${slug}`,
          }))
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Bank Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {formatted}
              </h1>
              <p className="text-gray-600 mt-1">
                {totalBranches.toLocaleString()} branches across{" "}
                {states.length} states and union territories
              </p>
            </div>
          </div>
        </div>

        <AdBanner slot="1234567890" format="horizontal" className="mb-8" />

        {/* States Grid */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Select State / Union Territory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {states.map((state) => (
            <Link
              key={state.state}
              href={`/bank/${slug}/${stateToSlug(state.state)}`}
              className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-green-50 text-green-600 p-2.5 rounded-lg group-hover:bg-green-100">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {state.state}
                </p>
                <p className="text-sm text-gray-500">
                  {state.count.toLocaleString()} branches
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            About {formatted}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {formatted} has {totalBranches.toLocaleString()} branches spread
            across {states.length} states and union territories in India. Use our
            search tool to find the IFSC code for any {formatted} branch. Select
            a state above to browse branches by district, or use the search bar
            to find a specific branch by name or location.
          </p>
        </section>
      </div>
    </>
  );
}

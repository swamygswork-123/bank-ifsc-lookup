export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBankBySlug,
  getDistrictsForBankState,
  getStateNameFromSlug,
  bankToSlug,
  stateToSlug,
  districtToSlug,
} from "@/lib/db";
import { SITE_URL } from "@/lib/constants";
import { formatBankName, generateBreadcrumbSchema } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { MapPin } from "lucide-react";

type Params = { slug: string; state: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, state } = await params;
  const bankName = await getBankBySlug(slug);
  if (!bankName) return { title: "Not Found" };
  const stateName = await getStateNameFromSlug(bankName, state);
  if (!stateName) return { title: "Not Found" };

  const formatted = formatBankName(bankName);
  return {
    title: `${formatted} Branches in ${stateName} - IFSC Codes`,
    description: `Find IFSC codes for all ${formatted} branches in ${stateName}. Browse by district to get branch details, MICR code, address, and NEFT/RTGS/IMPS support.`,
    alternates: { canonical: `/bank/${slug}/${state}` },
  };
}

export default async function BankStatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, state } = await params;
  const bankName = await getBankBySlug(slug);
  if (!bankName) notFound();
  const stateName = await getStateNameFromSlug(bankName, state);
  if (!stateName) notFound();

  const formatted = formatBankName(bankName);
  const districts = await getDistrictsForBankState(bankName, state);
  const totalBranches = districts.reduce((sum, d) => sum + d.count, 0);

  const breadcrumbItems = [
    { label: "Banks", href: "/bank" },
    { label: formatted, href: `/bank/${slug}` },
    { label: stateName },
  ];

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbItems.map((item) => ({
            name: item.label,
            url: item.href
              ? `${SITE_URL}${item.href}`
              : `${SITE_URL}/bank/${slug}/${state}`,
          }))
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {formatted} Branches in {stateName}
          </h1>
          <p className="text-gray-600">
            {totalBranches.toLocaleString()} branches across{" "}
            {districts.length} districts. Select a district to view branch
            details and IFSC codes.
          </p>
        </div>

        <AdBanner slot="1234567890" format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {districts.map((district) => (
            <Link
              key={district.district}
              href={`/bank/${slug}/${state}/${districtToSlug(district.district)}`}
              className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg group-hover:bg-blue-100">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {district.district}
                </p>
                <p className="text-sm text-gray-500">
                  {district.count} branches
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

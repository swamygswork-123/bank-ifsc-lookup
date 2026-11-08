export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBankBySlug,
  getBranchesForBankStateDistrict,
  getStateNameFromSlug,
  getDistrictNameFromSlug,
  bankToSlug,
} from "@/lib/db";
import { SITE_URL } from "@/lib/constants";
import { formatBankName, generateBreadcrumbSchema } from "@/lib/utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { CheckCircle2, XCircle } from "lucide-react";

type Params = { slug: string; state: string; district: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, state, district } = await params;
  const bankName = await getBankBySlug(slug);
  if (!bankName) return { title: "Not Found" };
  const stateName = await getStateNameFromSlug(bankName, state);
  const districtName = await getDistrictNameFromSlug(bankName, state, district);
  if (!stateName || !districtName) return { title: "Not Found" };

  const formatted = formatBankName(bankName);
  return {
    title: `${formatted} ${districtName} Branches - IFSC Codes`,
    description: `Complete list of ${formatted} branches in ${districtName}, ${stateName} with IFSC codes, MICR codes, addresses, and NEFT/RTGS/IMPS/UPI support details.`,
    alternates: { canonical: `/bank/${slug}/${state}/${district}` },
  };
}

export default async function BankDistrictPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, state, district } = await params;
  const bankName = await getBankBySlug(slug);
  if (!bankName) notFound();
  const stateName = await getStateNameFromSlug(bankName, state);
  const districtName = await getDistrictNameFromSlug(bankName, state, district);
  if (!stateName || !districtName) notFound();

  const formatted = formatBankName(bankName);
  const branches = await getBranchesForBankStateDistrict(bankName, state, district);

  const breadcrumbItems = [
    { label: "Banks", href: "/bank" },
    { label: formatted, href: `/bank/${slug}` },
    { label: stateName, href: `/bank/${slug}/${state}` },
    { label: districtName },
  ];

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbItems.map((item) => ({
            name: item.label,
            url: item.href
              ? `${SITE_URL}${item.href}`
              : `${SITE_URL}/bank/${slug}/${state}/${district}`,
          }))
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {formatted} Branches in {districtName}, {stateName}
          </h1>
          <p className="text-gray-600">
            Found {branches.length} branches. Click on any IFSC code for
            detailed branch information.
          </p>
        </div>

        <AdBanner slot="1234567890" format="horizontal" className="mb-6" />

        {/* Branches Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Branch
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    IFSC Code
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">
                    MICR
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">
                    NEFT
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden sm:table-cell">
                    RTGS
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                    IMPS
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">
                    UPI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {branches.map((branch) => (
                  <tr
                    key={branch.ifsc}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/ifsc/${branch.ifsc}`}
                        className="text-gray-800 hover:text-blue-600 font-medium"
                      >
                        {branch.branch}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">
                        {branch.address}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/ifsc/${branch.ifsc}`}
                        className="font-mono text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        {branch.ifsc}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-600 hidden md:table-cell">
                      {branch.micr || "-"}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <StatusIcon enabled={!!branch.neft} />
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <StatusIcon enabled={!!branch.rtgs} />
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <StatusIcon enabled={!!branch.imps} />
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <StatusIcon enabled={!!branch.upi} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusIcon({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <CheckCircle2 className="h-4 w-4 text-green-600 inline" />
  ) : (
    <XCircle className="h-4 w-4 text-gray-300 inline" />
  );
}

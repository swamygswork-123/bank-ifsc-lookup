export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { searchByIFSC, bankToSlug, stateToSlug, getPopularBanks } from "@/lib/db";
import { SITE_NAME, SITE_URL, ADSENSE_SLOT_INCONTENT } from "@/lib/constants";
import {
  formatBankName,
  generateBankSchema,
  generateBreadcrumbSchema,
} from "@/lib/utils";
import SearchBox from "@/components/SearchBox";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import RelatedBanks from "@/components/RelatedBanks";
import {
  Building2,
  MapPin,
  Hash,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

type Params = { code: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const branch = searchByIFSC(code);
  if (!branch) {
    return { title: `IFSC Code ${code.toUpperCase()} Not Found` };
  }

  const bankName = formatBankName(branch.bank);
  const title = `${branch.ifsc} - ${bankName}, ${branch.branch} IFSC Code`;
  const description = `IFSC Code ${branch.ifsc} belongs to ${bankName}, ${branch.branch} branch in ${branch.district}, ${branch.state}. Get MICR code, address, NEFT, RTGS, IMPS, UPI details.`;

  return {
    title,
    description,
    alternates: { canonical: `/ifsc/${branch.ifsc}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/ifsc/${branch.ifsc}`,
      type: "website",
    },
  };
}

function StatusBadge({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
        enabled
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-gray-50 border-gray-200 text-gray-500"
      }`}
    >
      {enabled ? (
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-gray-400" />
      )}
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

export default async function IFSCDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const branch = searchByIFSC(code);

  if (!branch) {
    notFound();
  }

  const bankName = formatBankName(branch.bank);
  const bankSlug = bankToSlug(branch.bank);
  const stateSlug = stateToSlug(branch.state);
  const popularBanks = getPopularBanks();

  const breadcrumbItems = [
    { label: "Banks", href: "/bank" },
    { label: bankName, href: `/bank/${bankSlug}` },
    { label: branch.state, href: `/bank/${bankSlug}/${stateSlug}` },
    { label: branch.ifsc },
  ];

  return (
    <>
      <StructuredData data={generateBankSchema(branch)} />
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbItems.map((item, i) => ({
            name: item.label,
            url:
              item.href
                ? `${SITE_URL}${item.href}`
                : `${SITE_URL}/ifsc/${branch.ifsc}`,
          }))
        )}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbItems} />

        {/* IFSC Code Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">
                IFSC Code
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-wider select-all cursor-pointer" title="Click to select">
                {branch.ifsc}
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                {bankName} &mdash; {branch.branch}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                id="copy-btn"
                data-copy={branch.ifsc}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium cursor-pointer active:scale-95 transition-all"
              >
                📋 Copy
              </button>
            </div>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.getElementById('copy-btn').addEventListener('click', function() {
                    var text = this.getAttribute('data-copy');
                    var btn = this;
                    var input = document.createElement('input');
                    input.value = text;
                    input.style.position = 'fixed';
                    input.style.opacity = '0';
                    document.body.appendChild(input);
                    input.focus();
                    input.select();
                    input.setSelectionRange(0, 99999);
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    btn.textContent = '✅ Copied!';

                    var toast = document.createElement('div');
                    toast.innerHTML = '✅ Copied: <b>' + text + '</b>';
                    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e293b;color:white;padding:12px 24px;border-radius:12px;font-size:14px;z-index:9999;box-shadow:0 10px 40px rgba(0,0,0,0.3);';
                    document.body.appendChild(toast);

                    setTimeout(function() { btn.textContent = '📋 Copy'; }, 2000);
                    setTimeout(function() { toast.remove(); }, 3000);
                  });
                `,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Branch Details Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Branch Details
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                <DetailRow label="Bank" value={bankName} />
                <DetailRow label="IFSC Code" value={branch.ifsc} mono />
                <DetailRow label="Branch" value={branch.branch} />
                <DetailRow
                  label="MICR Code"
                  value={branch.micr || "N/A"}
                  mono
                />
                {branch.swift && (
                  <DetailRow label="SWIFT Code" value={branch.swift} mono />
                )}
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Location Details
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                <DetailRow label="Address" value={branch.address || "N/A"} />
                <DetailRow label="City" value={branch.city || "N/A"} />
                <DetailRow label="District" value={branch.district || "N/A"} />
                <DetailRow label="State" value={branch.state} />
                {branch.contact && (
                  <DetailRow label="Contact" value={branch.contact} />
                )}
              </div>
            </div>

            {/* Transfer Support */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-600" />
                  Transfer Methods Supported
                </h2>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatusBadge enabled={!!branch.neft} label="NEFT" />
                <StatusBadge enabled={!!branch.rtgs} label="RTGS" />
                <StatusBadge enabled={!!branch.imps} label="IMPS" />
                <StatusBadge enabled={!!branch.upi} label="UPI" />
              </div>
            </div>

            <AdBanner slot={ADSENSE_SLOT_INCONTENT} format="horizontal" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">
                Search Another IFSC
              </h3>
              <SearchBox size="small" />
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href={`/bank/${bankSlug}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="h-4 w-4" />
                  All {bankName} Branches
                </Link>
                <Link
                  href={`/bank/${bankSlug}/${stateSlug}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="h-4 w-4" />
                  {bankName} in {branch.state}
                </Link>
                <Link
                  href="/bank"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="h-4 w-4" />
                  All Banks Directory
                </Link>
              </div>
            </div>

            {/* Ad */}
            <AdBanner
              slot={ADSENSE_SLOT_INCONTENT}
              format="rectangle"
              className="sticky top-20"
            />

            {/* Banking Products - Affiliate Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5">
              <p className="text-xs text-amber-600 font-medium mb-2">
                SPONSORED
              </p>
              <h3 className="font-semibold text-gray-800 mb-2">
                Open a Savings Account
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Compare savings accounts from top banks. Get the best interest
                rates and zero-balance options.
              </p>
              <Link
                href="/about"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Compare Now
              </Link>
            </div>
          </div>
        </div>

        {/* Related Banks — Internal Linking for SEO */}
        <RelatedBanks banks={popularBanks} currentSlug={bankSlug} />
      </div>
    </>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center px-6 py-3.5">
      <span className="text-sm text-gray-500 sm:w-40 shrink-0 mb-1 sm:mb-0">
        {label}
      </span>
      <span
        className={`text-sm text-gray-800 font-medium ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

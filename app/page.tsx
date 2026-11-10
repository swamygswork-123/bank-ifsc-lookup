import { Metadata } from "next";
import SearchBox from "@/components/SearchBox";
import DropdownSearch from "@/components/DropdownSearch";
import PopularBanks from "@/components/PopularBanks";
import FAQSection from "@/components/FAQSection";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { getPopularBanks, getTotalStats } from "@/lib/db";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
  FAQ_ITEMS,
  ADSENSE_SLOT_INCONTENT,
} from "@/lib/constants";
import {
  generateFAQSchema,
  generateWebSiteSchema,
} from "@/lib/utils";
import {
  Search,
  Database,
  Zap,
  Shield,
  MapPin,
  CreditCard,
  Smartphone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `IFSC Code Search - Find Any Bank IFSC Code Instantly | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const popularBanks = await getPopularBanks();
  const stats = await getTotalStats();

  return (
    <>
      <StructuredData data={generateWebSiteSchema()} />
      <StructuredData data={generateFAQSchema(FAQ_ITEMS)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Find Any Bank&apos;s{" "}
              <span className="text-blue-200">IFSC Code</span> Instantly
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              {SITE_TAGLINE}. Search from{" "}
              <strong>{stats.totalBranches.toLocaleString()}+</strong> bank
              branches across India.
            </p>
          </div>

          <SearchBox size="large" autoFocus />

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <Search className="h-4 w-4" /> Search by IFSC Code
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Search by Branch / City
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" /> Get MICR Code
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" /> Check UPI Support
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {stats.totalBranches.toLocaleString()}+
              </p>
              <p className="text-sm text-gray-600">Bank Branches</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {stats.totalBanks.toLocaleString()}+
              </p>
              <p className="text-sm text-gray-600">Banks Covered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {stats.totalStates}
              </p>
              <p className="text-sm text-gray-600">States &amp; UTs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown Search Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Search by State, District &amp; Branch
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm">
            Use dropdowns to narrow down and find the exact IFSC code
          </p>
          <DropdownSearch />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Popular Banks */}
        <PopularBanks banks={popularBanks} />

        {/* Ad Banner */}
        <AdBanner slot={ADSENSE_SLOT_INCONTENT} format="horizontal" />

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Use {SITE_NAME}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl inline-block mb-4">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Comprehensive Database
              </h3>
              <p className="text-sm text-gray-600">
                Access IFSC codes for {stats.totalBranches.toLocaleString()}+
                bank branches across {stats.totalBanks.toLocaleString()} banks
                in India, sourced directly from RBI data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="bg-green-50 text-green-600 p-3 rounded-xl inline-block mb-4">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Instant Results
              </h3>
              <p className="text-sm text-gray-600">
                Get instant search results with auto-suggestions. Find any IFSC
                code in seconds by bank name, branch, city, or IFSC code.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-xl inline-block mb-4">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Verified &amp; Updated
              </h3>
              <p className="text-sm text-gray-600">
                All data is verified and regularly updated to reflect the latest
                bank mergers, new branches, and RBI changes.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How to Find IFSC Code
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Enter Details
              </h3>
              <p className="text-sm text-gray-600">
                Type your bank name, branch name, city, or IFSC code in the
                search box above.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Select Branch
              </h3>
              <p className="text-sm text-gray-600">
                Pick the correct branch from the search results or use our bank
                directory to browse.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Details</h3>
              <p className="text-sm text-gray-600">
                View complete branch details including IFSC, MICR, address, and
                NEFT/RTGS/IMPS support.
              </p>
            </div>
          </div>
        </section>

        {/* Ad Banner */}
        <AdBanner slot={ADSENSE_SLOT_INCONTENT} format="horizontal" />

        {/* FAQ Section */}
        <FAQSection faqs={FAQ_ITEMS} />

        {/* SEO Content Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            IFSC Code - Complete Guide
          </h2>
          <p className="text-gray-600 leading-relaxed">
            IFSC (Indian Financial System Code) is an alphanumeric code that
            uniquely identifies a bank branch participating in the two main
            electronic funds settlement systems in India: the Real Time Gross
            Settlement (RTGS) and the National Electronic Funds Transfer (NEFT).
            The code is assigned by the Reserve Bank of India (RBI) and consists
            of 11 characters.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            Structure of IFSC Code
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The IFSC code has a standardized format: the first four alphabetic
            characters represent the bank (e.g., SBIN for State Bank of India,
            HDFC for HDFC Bank), the fifth character is always 0 (reserved for
            future use), and the last six characters (numeric or alphabetic)
            uniquely identify the branch. For example, SBIN0001234 identifies a
            specific branch of State Bank of India.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            When Do You Need an IFSC Code?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            You need an IFSC code for any electronic fund transfer in India,
            including NEFT transfers, RTGS transfers for high-value transactions,
            IMPS for instant mobile payments, and UPI transactions. The IFSC code
            ensures your money reaches the correct bank branch. You can find the
            IFSC code on your cheque book, bank passbook, or by searching on{" "}
            {SITE_NAME}.
          </p>
        </section>
      </div>
    </>
  );
}

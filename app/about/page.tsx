import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Database, Zap, Shield, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} - India's most comprehensive IFSC code search engine with 1,80,000+ bank branches.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "About" }]} />

      <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About {SITE_NAME}
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            {SITE_NAME} is India&apos;s most trusted and comprehensive IFSC code
            search engine. We provide instant access to IFSC codes, MICR codes,
            and complete branch details for over 1,80,000 bank branches across
            India.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make banking information accessible to every
            Indian. Whether you need to find an IFSC code for a NEFT transfer,
            verify a MICR code for a cheque, or look up a bank branch address,
            we&apos;re here to help — instantly and for free.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-blue-50 p-5 rounded-xl">
              <Database className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">
                Comprehensive Data
              </h3>
              <p className="text-sm text-gray-600">
                Our database covers 1,80,000+ branches from 1,300+ banks,
                sourced from the Reserve Bank of India.
              </p>
            </div>
            <div className="bg-green-50 p-5 rounded-xl">
              <Zap className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">
                Instant Search
              </h3>
              <p className="text-sm text-gray-600">
                Find any IFSC code in milliseconds with our optimized search
                engine and auto-suggestions.
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl">
              <Shield className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">
                Verified Data
              </h3>
              <p className="text-sm text-gray-600">
                All information is verified against official RBI data to ensure
                accuracy and reliability.
              </p>
            </div>
            <div className="bg-amber-50 p-5 rounded-xl">
              <RefreshCw className="h-8 w-8 text-amber-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">
                Regular Updates
              </h3>
              <p className="text-sm text-gray-600">
                Our database is updated regularly to reflect bank mergers, new
                branches, and RBI changes.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Free API Access
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We offer a free REST API for developers to integrate IFSC code
            lookup into their applications. Simply make a GET request to{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
              /api/ifsc/SBIN0001234
            </code>{" "}
            to get branch details in JSON format. For search functionality, use{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
              /api/search?q=sbi+mumbai
            </code>
            .
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {SITE_NAME} is not affiliated with the Reserve Bank of India or any
            bank. The information provided is sourced from publicly available RBI
            data and is for informational purposes only. While we strive for
            accuracy, we recommend verifying critical information with your bank
            before making transactions.
          </p>
        </div>
      </article>
    </div>
  );
}

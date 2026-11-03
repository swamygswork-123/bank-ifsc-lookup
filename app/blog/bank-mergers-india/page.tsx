import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { generateFAQSchema } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "Bank Mergers in India 2024-2026 - Updated IFSC Codes After Merger",
  description:
    "Complete list of bank mergers in India. Find updated IFSC codes after merger of SBI, PNB, Canara Bank, Union Bank, and Indian Bank. Know which old IFSC codes still work.",
  alternates: { canonical: "/blog/bank-mergers-india" },
  keywords: [
    "bank merger India",
    "SBI merger IFSC code",
    "PNB merger new IFSC",
    "Canara Bank merger",
    "Union Bank merger",
    "old IFSC code after merger",
    "bank merger list India",
    "IFSC code changed after merger",
  ],
};

const faqs = [
  {
    question: "Does IFSC code change after bank merger?",
    answer:
      "Yes, after a bank merger, the IFSC codes of the merged (absorbed) bank branches are eventually changed to the new bank's IFSC code format. However, this transition happens gradually — old IFSC codes typically continue to work for 1-2 years after the merger.",
  },
  {
    question: "What happens to my old bank account after merger?",
    answer:
      "Your account number, balance, and all banking services continue as before. The account is automatically transferred to the new (surviving) bank. You'll receive a new cheque book, passbook, and debit card with the new bank's branding.",
  },
  {
    question: "Do I need to update my IFSC code for salary credit after merger?",
    answer:
      "Yes, it's recommended to update your IFSC code with your employer, pension providers, and any standing instructions. While old codes may work temporarily, updating ensures uninterrupted fund transfers.",
  },
  {
    question: "How to find new IFSC code after bank merger?",
    answer:
      "You can find the updated IFSC code by: (1) Checking your new bank's website, (2) Visiting your branch, (3) Searching on IFSCLookup.in — our database is regularly updated with post-merger IFSC codes.",
  },
];

export default function BankMergersPage() {
  return (
    <>
      <StructuredData data={generateFAQSchema(faqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "Bank Mergers in India" },
          ]}
        />

        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
          <header className="mb-8">
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
              Important Update
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
              Bank Mergers in India — Updated IFSC Codes After Merger
            </h1>
            <p className="text-lg text-gray-600">
              Complete guide to recent bank mergers in India and how they
              affect your IFSC codes, account numbers, and banking services.
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>Major Bank Mergers (2020-2024)</h2>
            <p>
              The Indian government merged 10 public sector banks into 4
              larger entities effective April 1, 2020. Here&apos;s the complete
              list:
            </p>

            <div className="not-prose space-y-4 my-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-900 text-lg mb-2">
                  1. Punjab National Bank (PNB)
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  Merged banks: Oriental Bank of Commerce + United Bank of India
                </p>
                <p className="text-xs text-blue-600">
                  New IFSC prefix: PUNB | Old prefixes (ORBC, UTBI) being phased out
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-900 text-lg mb-2">
                  2. Canara Bank
                </h3>
                <p className="text-sm text-green-800 mb-2">
                  Merged bank: Syndicate Bank
                </p>
                <p className="text-xs text-green-600">
                  New IFSC prefix: CNRB | Old prefix (SYNB) being phased out
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <h3 className="font-bold text-purple-900 text-lg mb-2">
                  3. Union Bank of India
                </h3>
                <p className="text-sm text-purple-800 mb-2">
                  Merged banks: Andhra Bank + Corporation Bank
                </p>
                <p className="text-xs text-purple-600">
                  New IFSC prefix: UBIN | Old prefixes (ANDB, CORP) being phased out
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 text-lg mb-2">
                  4. Indian Bank
                </h3>
                <p className="text-sm text-amber-800 mb-2">
                  Merged bank: Allahabad Bank
                </p>
                <p className="text-xs text-amber-600">
                  New IFSC prefix: IDIB | Old prefix (ALLA) being phased out
                </p>
              </div>
            </div>

            <h2>Earlier Merger: SBI (2017)</h2>
            <p>
              In April 2017, State Bank of India merged its 5 associate banks
              and Bharatiya Mahila Bank:
            </p>
            <ul>
              <li>State Bank of Bikaner and Jaipur</li>
              <li>State Bank of Hyderabad</li>
              <li>State Bank of Mysore</li>
              <li>State Bank of Patiala</li>
              <li>State Bank of Travancore</li>
              <li>Bharatiya Mahila Bank</li>
            </ul>
            <p>
              All branches now use the <strong>SBIN</strong> IFSC prefix.
            </p>

            <h2>What Should You Do After a Merger?</h2>
            <ol>
              <li>
                <strong>Find your new IFSC code</strong> — Search on{" "}
                <Link href="/" className="text-blue-600">
                  IFSCLookup.in
                </Link>{" "}
                using your branch name
              </li>
              <li>
                <strong>Update your employer</strong> — Give them your new IFSC
                code for salary credit
              </li>
              <li>
                <strong>Update SIP/EMI mandates</strong> — Inform mutual fund
                companies and loan providers
              </li>
              <li>
                <strong>Update insurance</strong> — LIC, health insurance
                premium auto-debits
              </li>
              <li>
                <strong>Get new cheque book</strong> — Old cheques will
                eventually stop working
              </li>
              <li>
                <strong>Update UPI</strong> — Re-link your bank account in UPI
                apps if needed
              </li>
            </ol>

            <h2>Do Old IFSC Codes Still Work?</h2>
            <p>
              Yes, old IFSC codes typically continue to work for 1-2 years
              after the merger through a mapping system. However, it&apos;s
              strongly recommended to switch to the new IFSC code as soon as
              possible to avoid any transaction failures.
            </p>

            <p>
              Our database is regularly updated to include both old and new
              IFSC codes. Use our{" "}
              <Link href="/" className="text-blue-600">
                IFSC code search
              </Link>{" "}
              to find the latest code for your branch.
            </p>
          </div>
        </article>

        <div className="mt-8">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        <div className="mt-8">
          <FAQSection faqs={faqs} />
        </div>
      </div>
    </>
  );
}

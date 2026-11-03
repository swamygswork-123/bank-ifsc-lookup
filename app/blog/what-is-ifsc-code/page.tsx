import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { generateFAQSchema } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "What is IFSC Code? Complete Guide to Indian Financial System Code",
  description:
    "Learn everything about IFSC codes - what they are, the 11-character format, how they work in NEFT/RTGS/IMPS transfers, and why every bank branch has a unique code.",
  alternates: { canonical: "/blog/what-is-ifsc-code" },
  openGraph: {
    title: "What is IFSC Code? Complete Guide",
    description:
      "Everything you need to know about IFSC codes - format, structure, and usage in Indian banking.",
    type: "article",
  },
};

const pageFaqs = [
  {
    question: "What does IFSC stand for?",
    answer:
      "IFSC stands for Indian Financial System Code. It is an 11-character alphanumeric code assigned by the Reserve Bank of India to every bank branch.",
  },
  {
    question: "How many characters are in an IFSC code?",
    answer:
      "An IFSC code has exactly 11 characters: 4 alphabetic characters for the bank, 1 zero (reserved), and 6 alphanumeric characters for the branch.",
  },
  {
    question: "Who assigns the IFSC code?",
    answer:
      "The Reserve Bank of India (RBI) assigns IFSC codes to all bank branches that participate in electronic payment systems like NEFT, RTGS, and IMPS.",
  },
  {
    question: "Can two branches have the same IFSC code?",
    answer:
      "No, every bank branch has a unique IFSC code. No two branches, even of the same bank, can share an IFSC code.",
  },
];

export default function WhatIsIFSCPage() {
  return (
    <>
      <StructuredData data={generateFAQSchema(pageFaqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "What is IFSC Code?" },
          ]}
        />

        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
          <header className="mb-8">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Banking Basics
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
              What is IFSC Code? Complete Guide to Indian Financial System Code
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about IFSC codes, their format,
              structure, and how they&apos;re used in electronic fund transfers
              across India.
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>What is IFSC Code?</h2>
            <p>
              <strong>IFSC (Indian Financial System Code)</strong> is an
              11-character alphanumeric code that uniquely identifies every bank
              branch participating in electronic fund transfer systems in India.
              It was introduced by the <strong>Reserve Bank of India (RBI)</strong>{" "}
              to facilitate electronic payment systems like NEFT, RTGS, and IMPS.
            </p>
            <p>
              Think of the IFSC code as a &quot;PIN code&quot; for bank branches — just
              like a postal PIN code identifies a specific post office area, the
              IFSC code identifies a specific bank branch for electronic
              transactions.
            </p>

            <h2>IFSC Code Format &amp; Structure</h2>
            <p>Every IFSC code follows a standardized 11-character format:</p>

            <div className="bg-gray-50 rounded-xl p-6 my-6 not-prose">
              <div className="flex flex-wrap items-center justify-center gap-1 text-center font-mono text-2xl font-bold">
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                  S
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                  B
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                  I
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                  N
                </span>
                <span className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg">
                  0
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  0
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  0
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  1
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  2
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  3
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  4
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-blue-200" />
                  <span className="text-gray-600">
                    Bank Code (1st-4th character)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-gray-200" />
                  <span className="text-gray-600">
                    Reserved - Always 0 (5th character)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-green-200" />
                  <span className="text-gray-600">
                    Branch Code (6th-11th character)
                  </span>
                </div>
              </div>
            </div>

            <ul>
              <li>
                <strong>First 4 characters (Bank Code):</strong> Alphabetic
                characters identifying the bank. For example, SBIN = State Bank
                of India, HDFC = HDFC Bank, ICIC = ICICI Bank.
              </li>
              <li>
                <strong>5th character:</strong> Always &quot;0&quot; (zero), reserved for
                future use by the RBI.
              </li>
              <li>
                <strong>Last 6 characters (Branch Code):</strong> Alphanumeric
                characters that uniquely identify the specific branch of the
                bank.
              </li>
            </ul>

            <h2>Where is IFSC Code Used?</h2>
            <p>The IFSC code is mandatory for the following transactions:</p>
            <ul>
              <li>
                <strong>NEFT (National Electronic Funds Transfer):</strong>{" "}
                Batch-based transfer system for transferring funds between banks.
              </li>
              <li>
                <strong>RTGS (Real Time Gross Settlement):</strong> Real-time
                transfer system for high-value transactions (minimum ₹2 lakh).
              </li>
              <li>
                <strong>IMPS (Immediate Payment Service):</strong> Instant
                inter-bank transfer available 24/7.
              </li>
              <li>
                <strong>UPI (Unified Payments Interface):</strong> Used
                internally by UPI apps for routing transactions.
              </li>
              <li>
                <strong>Online Banking:</strong> Required when adding
                beneficiaries for fund transfers.
              </li>
            </ul>

            <h2>How to Find Your IFSC Code</h2>
            <ol>
              <li>
                <strong>Cheque Book:</strong> The IFSC code is printed on every
                cheque leaf, usually near the MICR code at the bottom.
              </li>
              <li>
                <strong>Bank Passbook:</strong> Check the first page of your
                passbook for the IFSC code.
              </li>
              <li>
                <strong>Online Search:</strong> Use{" "}
                <Link href="/" className="text-blue-600">
                  {SITE_NAME}
                </Link>{" "}
                to instantly search for any bank&apos;s IFSC code.
              </li>
              <li>
                <strong>Bank Website:</strong> Visit your bank&apos;s official
                website and use their branch locator.
              </li>
              <li>
                <strong>RBI Website:</strong> The Reserve Bank of India
                maintains an official list of all IFSC codes.
              </li>
            </ol>

            <h2>Common Bank IFSC Code Prefixes</h2>
            <div className="not-prose">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
                {[
                  ["SBIN", "State Bank of India"],
                  ["HDFC", "HDFC Bank"],
                  ["ICIC", "ICICI Bank"],
                  ["PUNB", "Punjab National Bank"],
                  ["BARB", "Bank of Baroda"],
                  ["UTIB", "Axis Bank"],
                  ["CNRB", "Canara Bank"],
                  ["UBIN", "Union Bank of India"],
                  ["BKID", "Bank of India"],
                  ["IDIB", "Indian Bank"],
                  ["KKBK", "Kotak Mahindra Bank"],
                  ["IBKL", "IDBI Bank"],
                ].map(([code, name]) => (
                  <div
                    key={code}
                    className="bg-gray-50 px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <code className="text-blue-600 font-bold text-sm">
                      {code}
                    </code>
                    <span className="text-xs text-gray-600">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        <div className="mt-8">
          <FAQSection faqs={pageFaqs} />
        </div>
      </div>
    </>
  );
}

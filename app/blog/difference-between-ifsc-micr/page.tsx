import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { generateFAQSchema } from "@/lib/utils";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "IFSC Code vs MICR Code - Key Differences Explained",
  description:
    "Understand the difference between IFSC code and MICR code. Learn their format, purpose, and when to use each for banking transactions in India.",
  alternates: { canonical: "/blog/difference-between-ifsc-micr" },
};

const pageFaqs = [
  {
    question: "Can I use MICR code instead of IFSC code for NEFT transfer?",
    answer:
      "No, you cannot use MICR code for NEFT or RTGS transfers. These electronic transfers specifically require the IFSC code. MICR code is only used for cheque-based clearing.",
  },
  {
    question: "Do all bank branches have both IFSC and MICR codes?",
    answer:
      "Most bank branches have both codes, but some newer branches or those that don't participate in cheque clearing may not have a MICR code. All branches participating in electronic transfers have an IFSC code.",
  },
  {
    question: "Are IFSC and MICR codes printed on the same cheque?",
    answer:
      "Yes, both codes are typically printed on a cheque. The IFSC code is printed on the top portion of the cheque, while the MICR code is printed at the bottom in a special magnetic ink band.",
  },
];

export default function IFSCvsMICRPage() {
  return (
    <>
      <StructuredData data={generateFAQSchema(pageFaqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "IFSC vs MICR Code" },
          ]}
        />

        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
          <header className="mb-8">
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              Comparison
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
              IFSC Code vs MICR Code — Key Differences Explained
            </h1>
            <p className="text-lg text-gray-600">
              Both IFSC and MICR codes identify bank branches, but they serve
              very different purposes. Here&apos;s everything you need to know.
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>Quick Comparison</h2>

            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-blue-700 border-b">
                      IFSC Code
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-green-700 border-b">
                      MICR Code
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Full Form
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Indian Financial System Code
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Magnetic Ink Character Recognition
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Length
                    </td>
                    <td className="px-4 py-3 text-gray-600">11 characters</td>
                    <td className="px-4 py-3 text-gray-600">9 digits</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Format
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Alphanumeric (e.g., SBIN0001234)
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Numeric only (e.g., 400002001)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Used For
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      NEFT, RTGS, IMPS, UPI
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Cheque clearing
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Assigned By
                    </td>
                    <td className="px-4 py-3 text-gray-600">RBI</td>
                    <td className="px-4 py-3 text-gray-600">RBI</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Found On
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Top of cheque, passbook
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Bottom of cheque (magnetic band)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>What is IFSC Code?</h2>
            <p>
              The <strong>IFSC (Indian Financial System Code)</strong> is an
              11-character code used to identify bank branches for electronic fund
              transfers. It&apos;s required for NEFT, RTGS, IMPS, and UPI
              transactions. Learn more in our detailed guide on{" "}
              <Link href="/blog/what-is-ifsc-code" className="text-blue-600">
                what is IFSC code
              </Link>
              .
            </p>

            <h2>What is MICR Code?</h2>
            <p>
              The <strong>MICR (Magnetic Ink Character Recognition)</strong> code
              is a 9-digit numeric code used specifically for cheque processing.
              It appears at the bottom of every cheque leaf, printed in a special
              magnetic ink that can be read by MICR readers in cheque processing
              machines.
            </p>

            <h3>MICR Code Structure</h3>
            <ul>
              <li>
                <strong>First 3 digits:</strong> City code (e.g., 400 for Mumbai,
                110 for Delhi)
              </li>
              <li>
                <strong>Middle 3 digits:</strong> Bank code
              </li>
              <li>
                <strong>Last 3 digits:</strong> Branch code
              </li>
            </ul>

            <h2>Key Differences</h2>

            <h3>1. Purpose</h3>
            <p>
              <strong>IFSC</strong> is used for electronic transfers (NEFT, RTGS,
              IMPS), while <strong>MICR</strong> is used for cheque-based
              clearing. If you&apos;re sending money electronically, you need the
              IFSC code. If you&apos;re depositing a cheque, the bank uses the
              MICR code to process it.
            </p>

            <h3>2. Format</h3>
            <p>
              IFSC codes are alphanumeric (mix of letters and numbers, 11
              characters), while MICR codes are purely numeric (9 digits only).
            </p>

            <h3>3. Technology</h3>
            <p>
              IFSC is a digital code used in electronic systems. MICR uses
              special magnetic ink technology that allows high-speed processing of
              cheques by machines, even if the cheque is slightly damaged.
            </p>

            <h2>Which One Do You Need?</h2>
            <ul>
              <li>
                <strong>For NEFT/RTGS/IMPS transfer:</strong> You need the{" "}
                <strong>IFSC code</strong>
              </li>
              <li>
                <strong>For depositing a cheque:</strong> The bank reads the{" "}
                <strong>MICR code</strong> automatically
              </li>
              <li>
                <strong>For UPI payments:</strong> The <strong>IFSC code</strong>{" "}
                is used internally by the system
              </li>
              <li>
                <strong>For adding a beneficiary in net banking:</strong> You
                need the <strong>IFSC code</strong>
              </li>
            </ul>

            <p>
              You can find both IFSC and MICR codes for any bank branch on our{" "}
              <Link href="/" className="text-blue-600">
                IFSC code search page
              </Link>
              .
            </p>
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

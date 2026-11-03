import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import FAQSection from "@/components/FAQSection";
import StructuredData from "@/components/StructuredData";
import { generateFAQSchema } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "NEFT vs RTGS vs IMPS vs UPI - Complete Comparison Guide 2026",
  description:
    "Compare NEFT, RTGS, IMPS, and UPI fund transfer methods. Learn the differences in speed, limits, charges, timing, and which one to use for your transaction.",
  alternates: { canonical: "/blog/neft-rtgs-imps-upi-difference" },
  keywords: [
    "NEFT vs RTGS",
    "IMPS vs UPI",
    "NEFT RTGS IMPS difference",
    "fund transfer methods India",
    "best way to transfer money",
    "NEFT transfer time",
    "RTGS minimum amount",
    "IMPS charges",
    "UPI transfer limit",
  ],
};

const faqs = [
  {
    question: "Which is faster — NEFT, RTGS, IMPS, or UPI?",
    answer:
      "IMPS and UPI are the fastest — both transfer money instantly (within seconds) and are available 24/7. RTGS is also real-time but only during banking hours. NEFT processes in half-hourly batches.",
  },
  {
    question: "What is the maximum amount I can transfer through UPI?",
    answer:
      "The standard UPI transfer limit is ₹1 lakh per transaction. However, for specific categories like capital markets, IPO, and insurance, the limit has been increased to ₹2-5 lakh.",
  },
  {
    question: "Is NEFT available on Sundays and holidays?",
    answer:
      "Yes, NEFT is now available 24x7x365 since December 2019. Earlier it was only available during banking hours, but RBI made it round-the-clock.",
  },
  {
    question: "Do I need IFSC code for UPI transfer?",
    answer:
      "No, UPI transactions use VPA (Virtual Payment Address) like yourname@upi. You don't need to enter an IFSC code. However, the system internally uses IFSC codes to route the transaction to the correct bank branch.",
  },
  {
    question: "Are there any charges for NEFT and RTGS?",
    answer:
      "Inward NEFT and RTGS transactions are free. For outward transactions, banks may charge a small fee (₹2-25 for NEFT, ₹25-50 for RTGS). Many banks offer free online NEFT/RTGS transfers.",
  },
];

export default function NEFTvsRTGSPage() {
  return (
    <>
      <StructuredData data={generateFAQSchema(faqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "NEFT vs RTGS vs IMPS vs UPI" },
          ]}
        />

        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
          <header className="mb-8">
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
              Fund Transfer Guide
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
              NEFT vs RTGS vs IMPS vs UPI — Complete Comparison Guide
            </h1>
            <p className="text-lg text-gray-600">
              India has four major electronic fund transfer methods. Here&apos;s
              a detailed comparison to help you choose the right one for your
              transaction.
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>Quick Comparison Table</h2>

            <div className="not-prose overflow-x-auto mb-8">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-blue-700 border-b">
                      NEFT
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-green-700 border-b">
                      RTGS
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-purple-700 border-b">
                      IMPS
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-orange-700 border-b">
                      UPI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Full Form
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      National Electronic Funds Transfer
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      Real Time Gross Settlement
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      Immediate Payment Service
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      Unified Payments Interface
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Speed
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      30 min batches
                    </td>
                    <td className="px-4 py-3 text-gray-600">Instant</td>
                    <td className="px-4 py-3 text-gray-600">Instant</td>
                    <td className="px-4 py-3 text-gray-600">Instant</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Availability
                    </td>
                    <td className="px-4 py-3 text-gray-600">24x7</td>
                    <td className="px-4 py-3 text-gray-600">
                      7 AM - 6 PM (weekdays)
                    </td>
                    <td className="px-4 py-3 text-gray-600">24x7</td>
                    <td className="px-4 py-3 text-gray-600">24x7</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Min Amount
                    </td>
                    <td className="px-4 py-3 text-gray-600">₹1</td>
                    <td className="px-4 py-3 text-gray-600">₹2,00,000</td>
                    <td className="px-4 py-3 text-gray-600">₹1</td>
                    <td className="px-4 py-3 text-gray-600">₹1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Max Amount
                    </td>
                    <td className="px-4 py-3 text-gray-600">₹10,00,000</td>
                    <td className="px-4 py-3 text-gray-600">No limit</td>
                    <td className="px-4 py-3 text-gray-600">₹5,00,000</td>
                    <td className="px-4 py-3 text-gray-600">₹1,00,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Charges
                    </td>
                    <td className="px-4 py-3 text-gray-600">₹0 - ₹25</td>
                    <td className="px-4 py-3 text-gray-600">₹25 - ₹50</td>
                    <td className="px-4 py-3 text-gray-600">₹5 - ₹15</td>
                    <td className="px-4 py-3 text-gray-600">Free</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      IFSC Required?
                    </td>
                    <td className="px-4 py-3 text-gray-600">Yes</td>
                    <td className="px-4 py-3 text-gray-600">Yes</td>
                    <td className="px-4 py-3 text-gray-600">Yes</td>
                    <td className="px-4 py-3 text-gray-600">No (uses VPA)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      Best For
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Regular transfers
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Large amounts (₹2L+)
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Urgent transfers
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Daily payments
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>NEFT — National Electronic Funds Transfer</h2>
            <p>
              NEFT is one of the most widely used electronic fund transfer
              systems in India. Operated by the RBI, it processes transactions
              in half-hourly batches. Since December 2019, NEFT is available
              24x7, including weekends and holidays.
            </p>
            <ul>
              <li>No minimum transfer amount — you can send even ₹1</li>
              <li>Maximum limit varies by bank (usually up to ₹10 lakh online)</li>
              <li>Requires the beneficiary&apos;s account number and{" "}
                <Link href="/" className="text-blue-600">IFSC code</Link>
              </li>
              <li>Inward transactions are always free</li>
            </ul>

            <h2>RTGS — Real Time Gross Settlement</h2>
            <p>
              RTGS is designed for high-value transactions. As the name
              suggests, it settles transactions in real-time on a gross
              (individual) basis. It&apos;s the fastest way to transfer large
              amounts between banks.
            </p>
            <ul>
              <li>Minimum transfer: ₹2,00,000 (₹2 lakh)</li>
              <li>No upper limit on the amount</li>
              <li>Available 24x7 since December 2020</li>
              <li>
                Requires{" "}
                <Link href="/" className="text-blue-600">IFSC code</Link> of
                the beneficiary&apos;s branch
              </li>
              <li>Best for property purchases, business payments, large transfers</li>
            </ul>

            <h2>IMPS — Immediate Payment Service</h2>
            <p>
              IMPS was launched by NPCI (National Payments Corporation of
              India) to provide instant 24x7 inter-bank electronic fund
              transfers through mobile, internet, and ATMs.
            </p>
            <ul>
              <li>Instant transfer — money credited within seconds</li>
              <li>Available 24x7x365, including bank holidays</li>
              <li>Can transfer using account number + IFSC or MMID + mobile number</li>
              <li>Upper limit: ₹5,00,000 per transaction</li>
              <li>Small charges: ₹5-15 depending on amount</li>
            </ul>

            <h2>UPI — Unified Payments Interface</h2>
            <p>
              UPI is India&apos;s most popular payment system, handling over 10
              billion transactions per month. Built on IMPS infrastructure, it
              allows instant transfers using a simple VPA (Virtual Payment
              Address) like yourname@upi.
            </p>
            <ul>
              <li>No need for account number or IFSC code</li>
              <li>Completely free — no charges for transactions</li>
              <li>Available on apps like Google Pay, PhonePe, Paytm, BHIM</li>
              <li>Standard limit: ₹1,00,000 per transaction</li>
              <li>Can also scan QR codes for payments</li>
            </ul>

            <h2>Which One Should You Use?</h2>
            <ul>
              <li>
                <strong>Daily payments &amp; bills:</strong> Use{" "}
                <strong>UPI</strong> — free and instant
              </li>
              <li>
                <strong>Sending money to someone&apos;s bank account:</strong>{" "}
                Use <strong>NEFT</strong> or <strong>IMPS</strong>
              </li>
              <li>
                <strong>Urgent transfer:</strong> Use <strong>IMPS</strong> —
                instant and available 24/7
              </li>
              <li>
                <strong>Large amounts (above ₹2 lakh):</strong> Use{" "}
                <strong>RTGS</strong> — designed for high-value transfers
              </li>
              <li>
                <strong>International transfers:</strong> None of these — use
                SWIFT or remittance services
              </li>
            </ul>

            <p>
              For NEFT, RTGS, and IMPS transfers, you&apos;ll need the
              recipient&apos;s IFSC code. Use our{" "}
              <Link href="/" className="text-blue-600">
                IFSC code search
              </Link>{" "}
              to find it instantly.
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

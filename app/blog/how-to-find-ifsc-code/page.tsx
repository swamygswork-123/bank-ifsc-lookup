import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdBanner from "@/components/AdBanner";
import StructuredData from "@/components/StructuredData";
import { generateFAQSchema } from "@/lib/utils";
import FAQSection from "@/components/FAQSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Find IFSC Code of Any Bank - 5 Easy Methods",
  description:
    "Learn 5 easy ways to find the IFSC code of any bank branch in India. From cheque books to online search, find the right IFSC code for your NEFT/RTGS/IMPS transfer.",
  alternates: { canonical: "/blog/how-to-find-ifsc-code" },
};

const pageFaqs = [
  {
    question: "Can I find IFSC code without a cheque book?",
    answer: `Yes! You can find the IFSC code using your bank passbook, net banking portal, mobile banking app, or by searching on ${SITE_NAME}. You can also call your bank's customer care to ask for the IFSC code.`,
  },
  {
    question: "Is the IFSC code printed on ATM cards?",
    answer:
      "No, IFSC codes are not printed on ATM or debit cards. You can find it on your cheque book, passbook, or through online lookup tools.",
  },
  {
    question: "How do I verify if an IFSC code is correct?",
    answer: `You can verify an IFSC code by searching it on ${SITE_NAME}. Enter the IFSC code in the search box and it will show you the bank name, branch, and address. Cross-check this with the intended recipient's bank details.`,
  },
];

export default function HowToFindIFSCPage() {
  return (
    <>
      <StructuredData data={generateFAQSchema(pageFaqs)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "How to Find IFSC Code" },
          ]}
        />

        <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
          <header className="mb-8">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              How-To Guide
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-3">
              How to Find IFSC Code of Any Bank Branch — 5 Easy Methods
            </h1>
            <p className="text-lg text-gray-600">
              Need to find an IFSC code for a money transfer? Here are 5 proven
              methods to find the IFSC code of any bank branch in India.
            </p>
          </header>

          <div className="prose prose-gray max-w-none">
            <h2>Method 1: Search Online on {SITE_NAME}</h2>
            <p>
              The fastest and easiest way to find any IFSC code is to search
              online:
            </p>
            <ol>
              <li>
                Visit{" "}
                <Link href="/" className="text-blue-600">
                  {SITE_NAME}
                </Link>
              </li>
              <li>
                Enter the bank name, branch name, city, or IFSC code in the
                search box
              </li>
              <li>Select the correct branch from the results</li>
              <li>
                Copy the IFSC code along with other branch details like MICR
                code and address
              </li>
            </ol>
            <p>
              You can also browse banks by state and district using our{" "}
              <Link href="/bank" className="text-blue-600">
                bank directory
              </Link>
              .
            </p>

            <h2>Method 2: Check Your Cheque Book</h2>
            <p>
              The IFSC code is printed on every cheque leaf issued by your bank.
              You&apos;ll find it:
            </p>
            <ul>
              <li>On the top-left or top-right corner of the cheque</li>
              <li>
                Near the MICR code band at the bottom of the cheque (the
                9-digit number printed in magnetic ink)
              </li>
              <li>It&apos;s usually labeled &quot;IFSC&quot; or &quot;IFS Code&quot;</li>
            </ul>

            <h2>Method 3: Look at Your Bank Passbook</h2>
            <p>
              Your bank passbook typically has the IFSC code printed on the first
              page along with other account details like:
            </p>
            <ul>
              <li>Account number</li>
              <li>Account holder name</li>
              <li>Branch name and address</li>
              <li>IFSC code</li>
              <li>MICR code</li>
            </ul>

            <h2>Method 4: Use Net Banking or Mobile Banking</h2>
            <p>
              Most banks display the IFSC code in their internet banking or
              mobile banking apps:
            </p>
            <ol>
              <li>Log in to your net banking or mobile banking app</li>
              <li>Go to &quot;Account Details&quot; or &quot;Account Summary&quot;</li>
              <li>
                The IFSC code is usually displayed along with your account
                details
              </li>
            </ol>
            <p>
              Some banks also show the IFSC code when you try to add a
              beneficiary for fund transfer.
            </p>

            <h2>Method 5: Contact Your Bank</h2>
            <p>
              If you can&apos;t find the IFSC code using the above methods:
            </p>
            <ul>
              <li>
                Call your bank&apos;s customer care helpline and ask for the
                IFSC code of your branch
              </li>
              <li>
                Visit your bank branch and ask the staff — they can provide the
                IFSC code immediately
              </li>
              <li>
                Send an email to your bank&apos;s support address requesting
                branch details
              </li>
            </ul>

            <h2>Important Tips</h2>
            <ul>
              <li>
                <strong>Always double-check:</strong> Verify the IFSC code
                before making a transfer. An incorrect code can lead to failed or
                misdirected transactions.
              </li>
              <li>
                <strong>Check for updates:</strong> After bank mergers (like the
                recent SBI and PNB mergers), IFSC codes may change. Always use
                the latest code.
              </li>
              <li>
                <strong>Cross-verify:</strong> Compare the IFSC code from
                multiple sources to ensure accuracy.
              </li>
            </ul>
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

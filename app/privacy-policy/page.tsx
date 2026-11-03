import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: October 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When you use {SITE_NAME}, we may collect the following types of
              information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
              <li>
                Search queries you enter (anonymized, for improving search
                quality)
              </li>
              <li>
                Device information (browser type, operating system, screen size)
              </li>
              <li>IP address (for analytics and security purposes)</li>
              <li>Cookies for functionality and advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>To provide and improve our IFSC code search service</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To display relevant advertisements through Google AdSense</li>
              <li>To prevent abuse and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use Google AdSense for advertising and Google Analytics for
              website analytics. These services may use cookies and collect data
              according to their own privacy policies. We recommend reviewing
              Google&apos;s privacy policy for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies to improve your experience, remember your
              preferences, and serve relevant advertisements. You can control
              cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us through our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

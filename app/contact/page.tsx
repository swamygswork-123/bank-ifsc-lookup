import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} for queries, feedback, or suggestions about our IFSC code search engine.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions, feedback, or suggestions? We&apos;d love to hear from
          you. Fill out the form below or reach out via email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="What is this about?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Email Us</h3>
              </div>
              <p className="text-sm text-gray-600">
                For general inquiries and support:
              </p>
              <p className="text-blue-600 font-medium mt-1">
                contact@ifsclookup.in
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-gray-800">Feedback</h3>
              </div>
              <p className="text-sm text-gray-600">
                Found incorrect data or have suggestions? Let us know and
                we&apos;ll fix it promptly.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                API & Business Inquiries
              </h3>
              <p className="text-sm text-gray-600">
                For API access, partnerships, or advertising opportunities,
                please email us with details about your requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

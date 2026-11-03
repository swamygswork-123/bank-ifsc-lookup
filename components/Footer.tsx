import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">
                IFSC<span className="text-blue-400">Lookup</span>
                <span className="text-xs text-gray-500">.in</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India&apos;s most comprehensive IFSC code search engine. Find any
              bank branch details instantly with our database of 1,80,000+
              branches.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  IFSC Code Search
                </Link>
              </li>
              <li>
                <Link
                  href="/bank"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  All Banks Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Branch Search
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Banking Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Banks */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Popular Banks
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/bank/state-bank-of-india"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  State Bank of India
                </Link>
              </li>
              <li>
                <Link
                  href="/bank/hdfc-bank"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  HDFC Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/bank/icici-bank-limited"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ICICI Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/bank/punjab-national-bank"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Punjab National Bank
                </Link>
              </li>
              <li>
                <Link
                  href="/bank/axis-bank"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Axis Bank
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/what-is-ifsc-code"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  What is IFSC Code?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-find-ifsc-code"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  How to Find IFSC Code
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/difference-between-ifsc-micr"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  IFSC vs MICR Code
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2026 IFSCLookup.in. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Data sourced from Reserve Bank of India (RBI). Updated regularly.
              Not an official RBI website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

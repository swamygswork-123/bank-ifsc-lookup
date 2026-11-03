import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Banking Guide - IFSC Code, MICR, NEFT, RTGS Explained",
  description:
    "Complete guide to Indian banking codes and transfers. Learn about IFSC codes, MICR codes, NEFT, RTGS, IMPS, UPI, and more.",
  alternates: { canonical: "/blog" },
};

const articles = [
  {
    slug: "what-is-ifsc-code",
    title: "What is IFSC Code? Complete Guide to Indian Financial System Code",
    description:
      "Learn everything about IFSC codes - what they are, their format, how they work, and why every bank branch has a unique IFSC code.",
    readTime: "5 min read",
    category: "Basics",
  },
  {
    slug: "how-to-find-ifsc-code",
    title: "How to Find IFSC Code of Any Bank Branch - 5 Easy Methods",
    description:
      "Discover the easiest ways to find the IFSC code of any bank branch in India. From cheque books to online tools, we cover all methods.",
    readTime: "4 min read",
    category: "How-To",
  },
  {
    slug: "difference-between-ifsc-micr",
    title: "IFSC Code vs MICR Code - Key Differences Explained",
    description:
      "Understand the difference between IFSC and MICR codes, when to use each, and how they help in different banking transactions.",
    readTime: "4 min read",
    category: "Comparison",
  },
  {
    slug: "neft-rtgs-imps-upi-difference",
    title: "NEFT vs RTGS vs IMPS vs UPI - Complete Comparison Guide 2026",
    description:
      "Compare all 4 fund transfer methods in India. Learn speed, limits, charges, and which one to use for your transaction.",
    readTime: "6 min read",
    category: "Comparison",
  },
  {
    slug: "bank-mergers-india",
    title: "Bank Mergers in India - Updated IFSC Codes After Merger",
    description:
      "Complete list of bank mergers and how they affect your IFSC codes. Find updated codes for PNB, Canara Bank, Union Bank, Indian Bank, and SBI.",
    readTime: "5 min read",
    category: "Important Update",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Breadcrumbs items={[{ label: "Banking Guide" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Banking Guide
        </h1>
        <p className="text-gray-600">
          Everything you need to know about IFSC codes, MICR codes, and
          electronic fund transfers in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
              <BookOpen className="h-8 w-8 text-white/80" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

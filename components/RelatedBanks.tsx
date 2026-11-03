import Link from "next/link";
import { Building2 } from "lucide-react";
import { formatBankName } from "@/lib/utils";

interface RelatedBank {
  bank: string;
  slug: string;
  count: number;
}

export default function RelatedBanks({ banks, currentSlug }: { banks: RelatedBank[]; currentSlug: string }) {
  const filtered = banks.filter((b) => b.slug !== currentSlug).slice(0, 8);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Other Popular Banks
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filtered.map((bank, index) => (
          <Link
            key={`${bank.slug}-${index}`}
            href={`/bank/${bank.slug}`}
            className="group flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <Building2 className="h-4 w-4 text-blue-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-blue-600">
                {formatBankName(bank.bank)}
              </p>
              <p className="text-[10px] text-gray-500">
                {bank.count.toLocaleString()} branches
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { formatBankName } from "@/lib/utils";

interface BankItem {
  bank: string;
  slug: string;
  count: number;
}

export default function PopularBanks({ banks }: { banks: BankItem[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Popular Banks</h2>
        <Link
          href="/bank"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          View All Banks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {banks.map((bank) => (
          <Link
            key={bank.slug}
            href={`/bank/${bank.slug}`}
            className="group flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 transition-colors mb-2">
              <Building2 className="h-5 w-5" />
            </div>
            <p className="font-semibold text-gray-800 text-xs truncate w-full group-hover:text-blue-600 transition-colors">
              {formatBankName(bank.bank)}
            </p>
            <p className="text-[10px] text-gray-500">
              {bank.count.toLocaleString()} branches
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

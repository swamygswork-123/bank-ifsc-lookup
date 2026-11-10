import { NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

// Popular banks shown at top of dropdown
const POPULAR_BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Yes Bank",
];

export async function GET() {
  const rows = await rawQuery(
    "SELECT DISTINCT bank FROM branches ORDER BY bank"
  );
  const allBanks = rows.map((r) => r.bank as string);

  // Find popular banks (case-insensitive match)
  const popular: string[] = [];
  for (const p of POPULAR_BANKS) {
    const found = allBanks.find(
      (b) => b.toLowerCase() === p.toLowerCase()
    );
    if (found) popular.push(found);
  }

  // Rest of banks (excluding popular ones)
  const popularSet = new Set(popular.map((b) => b.toLowerCase()));
  const others = allBanks.filter((b) => !popularSet.has(b.toLowerCase()));

  return NextResponse.json(
    { popular, all: others },
    { headers: { "Cache-Control": "public, s-maxage=86400" } }
  );
}

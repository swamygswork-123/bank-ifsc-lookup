import { NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET() {
  const rows = await rawQuery(
    "SELECT DISTINCT bank FROM branches ORDER BY bank"
  );
  const banks = rows.map((r) => r.bank as string);
  return NextResponse.json(banks, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

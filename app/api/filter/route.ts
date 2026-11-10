import { NextRequest, NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const bank = request.nextUrl.searchParams.get("bank");
  const state = request.nextUrl.searchParams.get("state");
  const district = request.nextUrl.searchParams.get("district");
  const branch = request.nextUrl.searchParams.get("branch");

  if (!bank && !state) {
    return NextResponse.json({ results: [], total: 0 });
  }

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (bank) {
    conditions.push("bank = ?");
    params.push(bank);
  }
  if (state) {
    conditions.push("state = ?");
    params.push(state);
  }
  if (district) {
    conditions.push("district = ?");
    params.push(district);
  }
  if (branch) {
    conditions.push("branch = ?");
    params.push(branch);
  }

  const where = conditions.join(" AND ");

  const countRow = await rawQuery(
    `SELECT COUNT(*) as total FROM branches WHERE ${where}`,
    params
  );
  const total = (countRow[0]?.total as number) || 0;

  const results = await rawQuery(
    `SELECT * FROM branches WHERE ${where} ORDER BY bank, state, district, branch LIMIT 50`,
    params
  );

  return NextResponse.json(
    { results, total },
    { headers: { "Cache-Control": "public, s-maxage=3600" } }
  );
}

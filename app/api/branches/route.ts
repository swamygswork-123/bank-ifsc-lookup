import { NextRequest, NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  const district = request.nextUrl.searchParams.get("district");
  const bank = request.nextUrl.searchParams.get("bank");
  if (!state || !district) {
    return NextResponse.json([]);
  }

  const params: unknown[] = [state, district];
  let sql = "SELECT DISTINCT branch FROM branches WHERE state = ? AND district = ?";
  if (bank) {
    sql += " AND bank = ?";
    params.push(bank);
  }
  sql += " ORDER BY branch";

  const rows = await rawQuery(sql, params);
  const branches = rows.map((r) => r.branch as string);
  return NextResponse.json(branches, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

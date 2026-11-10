import { NextRequest, NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  const bank = request.nextUrl.searchParams.get("bank");
  if (!state) {
    return NextResponse.json([]);
  }

  const params: unknown[] = [state];
  let sql = "SELECT DISTINCT district FROM branches WHERE state = ?";
  if (bank) {
    sql += " AND bank = ?";
    params.push(bank);
  }
  sql += " ORDER BY district";

  const rows = await rawQuery(sql, params);
  const districts = rows.map((r) => r.district as string);
  return NextResponse.json(districts, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

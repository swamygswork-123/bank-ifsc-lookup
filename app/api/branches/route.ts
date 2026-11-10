import { NextRequest, NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  const district = request.nextUrl.searchParams.get("district");
  if (!state || !district) {
    return NextResponse.json([]);
  }

  const rows = await rawQuery(
    "SELECT DISTINCT branch FROM branches WHERE state = ? AND district = ? ORDER BY branch",
    [state, district]
  );
  const branches = rows.map((r) => r.branch as string);
  return NextResponse.json(branches, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

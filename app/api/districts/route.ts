import { NextRequest, NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state");
  if (!state) {
    return NextResponse.json([]);
  }

  const rows = await rawQuery(
    "SELECT DISTINCT district FROM branches WHERE state = ? ORDER BY district",
    [state]
  );
  const districts = rows.map((r) => r.district as string);
  return NextResponse.json(districts, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

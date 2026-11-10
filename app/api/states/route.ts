import { NextResponse } from "next/server";
import { rawQuery } from "@/lib/db";

export async function GET() {
  const rows = await rawQuery(
    "SELECT DISTINCT state FROM branches ORDER BY state"
  );
  const states = rows.map((r) => r.state as string);
  return NextResponse.json(states, {
    headers: { "Cache-Control": "public, s-maxage=86400" },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { searchBranches } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], total: 0 });
  }

  const { results, total } = await searchBranches(q, limit, offset);

  return NextResponse.json(
    {
      results: results.map((r) => ({
        ifsc: r.ifsc,
        bank: r.bank,
        branch: r.branch,
        city: r.city,
        district: r.district,
        state: r.state,
        address: r.address,
        micr: r.micr,
        neft: !!r.neft,
        rtgs: !!r.rtgs,
        imps: !!r.imps,
        upi: !!r.upi,
      })),
      total,
      limit,
      offset,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}

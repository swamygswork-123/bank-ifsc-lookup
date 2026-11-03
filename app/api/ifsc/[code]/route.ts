import { NextRequest, NextResponse } from "next/server";
import { searchByIFSC } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!code || code.length !== 11) {
    return NextResponse.json(
      { error: "Invalid IFSC code. Must be 11 characters." },
      { status: 400 }
    );
  }

  const branch = searchByIFSC(code);

  if (!branch) {
    return NextResponse.json(
      { error: `IFSC code ${code.toUpperCase()} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      ifsc: branch.ifsc,
      bank: branch.bank,
      branch: branch.branch,
      centre: branch.centre,
      district: branch.district,
      state: branch.state,
      address: branch.address,
      contact: branch.contact,
      city: branch.city,
      micr: branch.micr,
      imps: !!branch.imps,
      rtgs: !!branch.rtgs,
      neft: !!branch.neft,
      upi: !!branch.upi,
      swift: branch.swift,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}

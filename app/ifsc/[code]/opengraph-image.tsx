import { ImageResponse } from "next/og";
import { searchByIFSC } from "@/lib/db";

export const runtime = "nodejs";
export const alt = "IFSC Code Details";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const branch = await searchByIFSC(code);

  const bankName = branch?.bank || "Unknown Bank";
  const branchName = branch?.branch || "";
  const ifsc = branch?.ifsc || code.toUpperCase();
  const state = branch?.state || "";
  const district = branch?.district || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "12px",
          }}
        >
          IFSC Code
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "4px",
            marginBottom: "24px",
          }}
        >
          {ifsc}
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          {bankName}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
          }}
        >
          {branchName}
          {district ? `, ${district}` : ""}
          {state ? `, ${state}` : ""}
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "36px",
          }}
        >
          {branch?.neft && (
            <div
              style={{
                background: "rgba(34,197,94,0.3)",
                borderRadius: "999px",
                padding: "6px 18px",
                fontSize: "18px",
                color: "#86efac",
              }}
            >
              NEFT
            </div>
          )}
          {branch?.rtgs && (
            <div
              style={{
                background: "rgba(59,130,246,0.3)",
                borderRadius: "999px",
                padding: "6px 18px",
                fontSize: "18px",
                color: "#93c5fd",
              }}
            >
              RTGS
            </div>
          )}
          {branch?.imps && (
            <div
              style={{
                background: "rgba(168,85,247,0.3)",
                borderRadius: "999px",
                padding: "6px 18px",
                fontSize: "18px",
                color: "#c4b5fd",
              }}
            >
              IMPS
            </div>
          )}
          {branch?.upi && (
            <div
              style={{
                background: "rgba(249,115,22,0.3)",
                borderRadius: "999px",
                padding: "6px 18px",
                fontSize: "18px",
                color: "#fed7aa",
              }}
            >
              UPI
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          IFSCLookup.in — India&apos;s Most Trusted IFSC Code Search
        </div>
      </div>
    ),
    { ...size }
  );
}

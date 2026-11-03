import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "IFSCLookup.in - Find Any Bank IFSC Code Instantly";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "white",
            }}
          >
            IFSCLookup.in
          </span>
        </div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Find Any Bank&apos;s IFSC Code Instantly
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
          }}
        >
          1,83,000+ Branches • 1,349 Banks • 43 States & UTs
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["IFSC Code", "MICR Code", "NEFT", "RTGS", "IMPS", "UPI"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

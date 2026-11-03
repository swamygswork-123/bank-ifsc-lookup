import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IFSCLookup.in - Find Any Bank IFSC Code",
    short_name: "IFSC Lookup",
    description:
      "India's most trusted IFSC code search engine. Find IFSC, MICR, branch details for 1,83,000+ bank branches.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

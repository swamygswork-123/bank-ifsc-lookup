import { MetadataRoute } from "next";
import {
  getAllBanks,
  getStatesForBank,
  getDistrictsForBankState,
  stateToSlug,
  districtToSlug,
} from "@/lib/db";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const banks = await getAllBanks();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/bank`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Blog pages
    ...[
      "blog",
      "blog/what-is-ifsc-code",
      "blog/how-to-find-ifsc-code",
      "blog/difference-between-ifsc-micr",
      "blog/neft-rtgs-imps-upi-difference",
      "blog/bank-mergers-india",
    ].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Info pages
    ...[
      "about",
      "contact",
      "privacy-policy",
    ].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  // Bank pages — ALL banks (not just top 100)
  const bankPages: MetadataRoute.Sitemap = banks.map((bank) => ({
    url: `${SITE_URL}/bank/${bank.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // State pages for top 50 banks
  const topBanks = [...banks].sort((a, b) => b.count - a.count).slice(0, 50);
  const statePages: MetadataRoute.Sitemap = [];
  const districtPages: MetadataRoute.Sitemap = [];

  for (const bank of topBanks) {
    const states = await getStatesForBank(bank.bank);
    for (const state of states) {
      const stSlug = stateToSlug(state.state);
      statePages.push({
        url: `${SITE_URL}/bank/${bank.slug}/${stSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });

      // District pages for top 10 banks only (to keep sitemap manageable)
      if (topBanks.indexOf(bank) < 10) {
        const districts = await getDistrictsForBankState(bank.bank, stSlug);
        for (const district of districts) {
          districtPages.push({
            url: `${SITE_URL}/bank/${bank.slug}/${stSlug}/${districtToSlug(district.district)}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
      }
    }
  }

  return [...staticPages, ...bankPages, ...statePages, ...districtPages];
}

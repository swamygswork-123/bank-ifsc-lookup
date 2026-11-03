export function formatBankName(name: string): string {
  if (!name) return "";
  const words = name.toLowerCase().split(" ");
  const abbreviations = new Set([
    "sbi",
    "hdfc",
    "icici",
    "idbi",
    "rbl",
    "dcb",
    "hsbc",
    "dbs",
    "uco",
    "iob",
    "pnb",
    "psb",
    "kvb",
    "tmb",
    "csb",
    "cub",
    "dhfl",
    "nkgsb",
  ]);
  const smallWords = new Set(["of", "the", "and", "in", "for", "to", "at"]);

  return words
    .map((word, index) => {
      if (abbreviations.has(word)) return word.toUpperCase();
      if (word === "limited" || word === "ltd") return "Ltd.";
      if (index !== 0 && smallWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBankSchema(branch: {
  bank: string;
  branch: string;
  address: string;
  ifsc: string;
  contact: string;
  state: string;
  district: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BankOrCreditUnion",
    name: `${formatBankName(branch.bank)} - ${branch.branch}`,
    description: `${formatBankName(branch.bank)} ${branch.branch} branch. IFSC Code: ${branch.ifsc}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.district,
      addressRegion: branch.state,
      addressCountry: "IN",
    },
    telephone: branch.contact || undefined,
    identifier: branch.ifsc,
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IFSC Lookup",
    url: "https://ifsclookup.in",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ifsclookup.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export const SITE_NAME = "IFSCLookup.in";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bank-ifsc-lookup.vercel.app";
export const SITE_DESCRIPTION =
  "Find any Indian bank's IFSC code instantly. Search by IFSC code, bank name, branch, or location. Get complete branch details including MICR code, address, and NEFT/RTGS/IMPS/UPI support.";
export const SITE_TAGLINE = "India's Most Trusted IFSC Code Search Engine";

export const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXX"; // Replace with your AdSense ID
export const ADSENSE_SLOT_HEADER = "1234567890";
export const ADSENSE_SLOT_SIDEBAR = "0987654321";
export const ADSENSE_SLOT_INCONTENT = "1122334455";
export const ADSENSE_SLOT_FOOTER = "5566778899";

export const POPULAR_BANK_SHORTCUTS: Record<string, string> = {
  SBI: "STATE BANK OF INDIA",
  HDFC: "HDFC BANK",
  ICICI: "ICICI BANK LIMITED",
  PNB: "PUNJAB NATIONAL BANK",
  "BANK OF BARODA": "BANK OF BARODA",
  "AXIS BANK": "AXIS BANK",
  "CANARA BANK": "CANARA BANK",
  "UNION BANK": "UNION BANK OF INDIA",
  "BANK OF INDIA": "BANK OF INDIA",
  "INDIAN BANK": "INDIAN BANK",
  KOTAK: "KOTAK MAHINDRA BANK LIMITED",
  IDBI: "IDBI BANK",
};

export const FAQ_ITEMS = [
  {
    question: "What is an IFSC Code?",
    answer:
      "IFSC (Indian Financial System Code) is an 11-character alphanumeric code assigned by the Reserve Bank of India (RBI) to uniquely identify every bank branch participating in electronic fund transfers. The first 4 characters represent the bank, the 5th character is always 0, and the last 6 characters identify the specific branch.",
  },
  {
    question: "How to find IFSC Code of a bank?",
    answer:
      "You can find the IFSC code of any bank branch by: (1) Searching on IFSCLookup.in by bank name, branch, or city, (2) Checking your bank passbook or cheque book, (3) Looking at your bank's website, or (4) Visiting the RBI website.",
  },
  {
    question: "Why do I need an IFSC Code?",
    answer:
      "IFSC code is required for all electronic fund transfers in India including NEFT (National Electronic Funds Transfer), RTGS (Real Time Gross Settlement), IMPS (Immediate Payment Service), and UPI transactions. Without the correct IFSC code, your money transfer may fail or go to the wrong branch.",
  },
  {
    question: "Is IFSC Code same for all branches?",
    answer:
      "No, every bank branch has a unique IFSC code. Even two branches of the same bank in the same city will have different IFSC codes. This is because the IFSC code uniquely identifies each branch for electronic transactions.",
  },
  {
    question: "What is the difference between IFSC and MICR Code?",
    answer:
      "IFSC (Indian Financial System Code) is used for electronic fund transfers like NEFT, RTGS, and IMPS. MICR (Magnetic Ink Character Recognition) is a 9-digit code used for cheque clearing. Both codes are different and serve different purposes, though both identify a specific bank branch.",
  },
  {
    question: "Can IFSC Code change?",
    answer:
      "Yes, IFSC codes can change when banks merge, branches relocate, or due to RBI directives. For example, after the merger of several public sector banks in 2020-2021, many IFSC codes were changed. Always verify the latest IFSC code before making a transaction.",
  },
];

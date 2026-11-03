import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), "data", "ifsc.db");
    db = new Database(dbPath, { readonly: true });
    db.pragma("journal_mode = WAL");
    db.pragma("cache_size = -64000"); // 64MB cache
  }
  return db;
}

export interface BankBranch {
  id: number;
  bank: string;
  ifsc: string;
  branch: string;
  centre: string;
  district: string;
  state: string;
  address: string;
  contact: string;
  city: string;
  micr: string;
  imps: boolean;
  rtgs: boolean;
  neft: boolean;
  upi: boolean;
  swift: string;
}

export function searchByIFSC(code: string): BankBranch | null {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM branches WHERE ifsc = ? LIMIT 1");
  return (stmt.get(code.toUpperCase()) as BankBranch) || null;
}

export function searchBranches(
  query: string,
  limit = 20,
  offset = 0
): { results: BankBranch[]; total: number } {
  const db = getDb();
  const searchTerm = `%${query}%`;
  const countStmt = db.prepare(
    "SELECT COUNT(*) as total FROM branches WHERE ifsc LIKE ? OR bank LIKE ? OR branch LIKE ? OR district LIKE ? OR city LIKE ?"
  );
  const { total } = countStmt.get(
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm
  ) as { total: number };

  const stmt = db.prepare(
    "SELECT * FROM branches WHERE ifsc LIKE ? OR bank LIKE ? OR branch LIKE ? OR district LIKE ? OR city LIKE ? ORDER BY bank, state, district LIMIT ? OFFSET ?"
  );
  const results = stmt.all(
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    limit,
    offset
  ) as BankBranch[];

  return { results, total };
}

export function getAllBanks(): { bank: string; slug: string; count: number }[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT bank, COUNT(*) as count FROM branches GROUP BY bank ORDER BY bank"
  );
  const rows = stmt.all() as { bank: string; count: number }[];

  // Deduplicate slugs by appending a suffix for collisions
  const slugCount: Record<string, number> = {};
  return rows.map((r) => {
    let slug = bankToSlug(r.bank);
    if (slugCount[slug] !== undefined) {
      slugCount[slug]++;
      slug = `${slug}-${slugCount[slug]}`;
    } else {
      slugCount[slug] = 0;
    }
    return { bank: r.bank, slug, count: r.count };
  });
}

export function getBankBySlug(slug: string): string | null {
  const banks = getAllBanks();
  const found = banks.find((b) => b.slug === slug);
  return found ? found.bank : null;
}

export function getStatesForBank(
  bankName: string
): { state: string; count: number }[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT state, COUNT(*) as count FROM branches WHERE bank = ? GROUP BY state ORDER BY state"
  );
  return stmt.all(bankName) as { state: string; count: number }[];
}

export function getDistrictsForBankState(
  bankName: string,
  state: string
): { district: string; count: number }[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT district, COUNT(*) as count FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? GROUP BY district ORDER BY district"
  );
  return stmt.all(bankName, state.toLowerCase()) as {
    district: string;
    count: number;
  }[];
}

export function getBranchesForBankStateDistrict(
  bankName: string,
  state: string,
  district: string
): BankBranch[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT * FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? AND LOWER(REPLACE(district, ' ', '-')) = ? ORDER BY branch"
  );
  return stmt.all(
    bankName,
    state.toLowerCase(),
    district.toLowerCase()
  ) as BankBranch[];
}

export function getStateNameFromSlug(
  bankName: string,
  stateSlug: string
): string | null {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT state FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? LIMIT 1"
  );
  const row = stmt.get(bankName, stateSlug.toLowerCase()) as {
    state: string;
  } | null;
  return row ? row.state : null;
}

export function getDistrictNameFromSlug(
  bankName: string,
  stateSlug: string,
  districtSlug: string
): string | null {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT district FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? AND LOWER(REPLACE(district, ' ', '-')) = ? LIMIT 1"
  );
  const row = stmt.get(
    bankName,
    stateSlug.toLowerCase(),
    districtSlug.toLowerCase()
  ) as { district: string } | null;
  return row ? row.district : null;
}

export function getPopularBanks(): {
  bank: string;
  slug: string;
  count: number;
}[] {
  const db = getDb();
  const stmt = db.prepare(
    "SELECT bank, COUNT(*) as count FROM branches GROUP BY bank ORDER BY count DESC LIMIT 20"
  );
  const rows = stmt.all() as { bank: string; count: number }[];
  return rows.map((r) => ({
    bank: r.bank,
    slug: bankToSlug(r.bank),
    count: r.count,
  }));
}

export function getTotalStats(): {
  totalBranches: number;
  totalBanks: number;
  totalStates: number;
} {
  const db = getDb();
  const branches = (
    db.prepare("SELECT COUNT(*) as c FROM branches").get() as { c: number }
  ).c;
  const banks = (
    db.prepare("SELECT COUNT(DISTINCT bank) as c FROM branches").get() as {
      c: number;
    }
  ).c;
  const states = (
    db.prepare("SELECT COUNT(DISTINCT state) as c FROM branches").get() as {
      c: number;
    }
  ).c;
  return { totalBranches: branches, totalBanks: banks, totalStates: states };
}

export function bankToSlug(bank: string): string {
  return bank
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function stateToSlug(state: string): string {
  return state
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function districtToSlug(district: string): string {
  return district
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

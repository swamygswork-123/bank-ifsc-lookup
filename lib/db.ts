import path from "path";
import fs from "fs";

/* eslint-disable @typescript-eslint/no-explicit-any */
let db: any = null;
let dbPromise: Promise<any> | null = null;

async function getDb(): Promise<any> {
  if (db) return db;

  if (!dbPromise) {
    dbPromise = (async () => {
      const dbPath = path.join(process.cwd(), "data", "ifsc.db");
      if (!fs.existsSync(dbPath)) {
        throw new Error(`Database not found at ${dbPath}. Run: node scripts/seed.mjs`);
      }
      const initSqlJs = (await import("sql.js/dist/sql-asm.js")).default;
      const SQL = await initSqlJs();
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      return db;
    })();
  }

  return dbPromise;
}

async function query(sql: string, params: unknown[] = []): Promise<Record<string, unknown>[]> {
  const database = await getDb();
  const stmt = database.prepare(sql);
  stmt.bind(params as (string | number | null)[]);
  const results: Record<string, unknown>[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as Record<string, unknown>);
  }
  stmt.free();
  return results;
}

async function querySingle(sql: string, params: unknown[] = []): Promise<Record<string, unknown> | null> {
  const results = await query(sql, params);
  return results.length > 0 ? results[0] : null;
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

export async function searchByIFSC(code: string): Promise<BankBranch | null> {
  const row = await querySingle("SELECT * FROM branches WHERE ifsc = ? LIMIT 1", [code.toUpperCase()]);
  return (row as unknown as BankBranch) || null;
}

export async function searchBranches(
  q: string,
  limit = 20,
  offset = 0
): Promise<{ results: BankBranch[]; total: number }> {
  const searchTerm = `%${q}%`;
  const params = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];

  const countRow = await querySingle(
    "SELECT COUNT(*) as total FROM branches WHERE ifsc LIKE ? OR bank LIKE ? OR branch LIKE ? OR district LIKE ? OR city LIKE ?",
    params
  );
  const total = (countRow?.total as number) || 0;

  const results = await query(
    "SELECT * FROM branches WHERE ifsc LIKE ? OR bank LIKE ? OR branch LIKE ? OR district LIKE ? OR city LIKE ? ORDER BY bank, state, district LIMIT ? OFFSET ?",
    [...params, limit, offset]
  );

  return { results: results as unknown as BankBranch[], total };
}

export async function getAllBanks(): Promise<{ bank: string; slug: string; count: number }[]> {
  const rows = await query("SELECT bank, COUNT(*) as count FROM branches GROUP BY bank ORDER BY bank");
  const slugCount: Record<string, number> = {};
  return rows.map((r) => {
    let slug = bankToSlug(r.bank as string);
    if (slugCount[slug] !== undefined) {
      slugCount[slug]++;
      slug = `${slug}-${slugCount[slug]}`;
    } else {
      slugCount[slug] = 0;
    }
    return { bank: r.bank as string, slug, count: r.count as number };
  });
}

export async function getBankBySlug(slug: string): Promise<string | null> {
  const banks = await getAllBanks();
  const found = banks.find((b) => b.slug === slug);
  return found ? found.bank : null;
}

export async function getStatesForBank(bankName: string): Promise<{ state: string; count: number }[]> {
  return (await query(
    "SELECT state, COUNT(*) as count FROM branches WHERE bank = ? GROUP BY state ORDER BY state",
    [bankName]
  )) as unknown as { state: string; count: number }[];
}

export async function getDistrictsForBankState(bankName: string, state: string): Promise<{ district: string; count: number }[]> {
  return (await query(
    "SELECT district, COUNT(*) as count FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? GROUP BY district ORDER BY district",
    [bankName, state.toLowerCase()]
  )) as unknown as { district: string; count: number }[];
}

export async function getBranchesForBankStateDistrict(bankName: string, state: string, district: string): Promise<BankBranch[]> {
  return (await query(
    "SELECT * FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? AND LOWER(REPLACE(district, ' ', '-')) = ? ORDER BY branch",
    [bankName, state.toLowerCase(), district.toLowerCase()]
  )) as unknown as BankBranch[];
}

export async function getStateNameFromSlug(bankName: string, stateSlug: string): Promise<string | null> {
  const row = await querySingle(
    "SELECT state FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? LIMIT 1",
    [bankName, stateSlug.toLowerCase()]
  );
  return row ? (row.state as string) : null;
}

export async function getDistrictNameFromSlug(bankName: string, stateSlug: string, districtSlug: string): Promise<string | null> {
  const row = await querySingle(
    "SELECT district FROM branches WHERE bank = ? AND LOWER(REPLACE(state, ' ', '-')) = ? AND LOWER(REPLACE(district, ' ', '-')) = ? LIMIT 1",
    [bankName, stateSlug.toLowerCase(), districtSlug.toLowerCase()]
  );
  return row ? (row.district as string) : null;
}

export async function getPopularBanks(): Promise<{ bank: string; slug: string; count: number }[]> {
  const rows = await query("SELECT bank, COUNT(*) as count FROM branches GROUP BY bank ORDER BY count DESC LIMIT 20");
  return rows.map((r) => ({
    bank: r.bank as string,
    slug: bankToSlug(r.bank as string),
    count: r.count as number,
  }));
}

export async function getTotalStats(): Promise<{ totalBranches: number; totalBanks: number; totalStates: number }> {
  const branches = await querySingle("SELECT COUNT(*) as c FROM branches");
  const banks = await querySingle("SELECT COUNT(DISTINCT bank) as c FROM branches");
  const states = await querySingle("SELECT COUNT(DISTINCT state) as c FROM branches");
  return {
    totalBranches: (branches?.c as number) || 0,
    totalBanks: (banks?.c as number) || 0,
    totalStates: (states?.c as number) || 0,
  };
}

export function bankToSlug(bank: string): string {
  return bank.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export function districtToSlug(district: string): string {
  return district.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

// Export for direct usage in state page
export { query as rawQuery };

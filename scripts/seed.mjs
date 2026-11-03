#!/usr/bin/env node

/**
 * IFSC Database Seed Script
 * Downloads the Razorpay IFSC dataset and imports it into SQLite.
 *
 * Usage: node scripts/seed.mjs
 *
 * Data source: https://github.com/nickel-org/ifsc-data (Razorpay IFSC)
 * The CSV contains 150,000+ bank branch records from RBI.
 */

import Database from "better-sqlite3";
import { parse } from "csv-parse";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import https from "https";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Readable } from "stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DATA_DIR, "ifsc.db");
const CSV_PATH = path.join(DATA_DIR, "IFSC.csv");

// Razorpay IFSC dataset URL (official releases)
const CSV_URL =
  "https://github.com/razorpay/ifsc/releases/download/v2.0.62/IFSC.csv";

// Alternative URLs to try
const ALT_URLS = [
  "https://github.com/razorpay/ifsc/releases/latest/download/IFSC.csv",
];

function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    console.log(`  Trying: ${url}`);

    const req = client.get(url, { timeout: 30000 }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`  Redirecting to: ${res.headers.location}`);
        download(res.headers.location).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const file = createWriteStream(CSV_PATH);
      let size = 0;
      res.on("data", (chunk) => {
        size += chunk.length;
        if (size % (5 * 1024 * 1024) < chunk.length) {
          console.log(`  Downloaded: ${(size / 1024 / 1024).toFixed(1)} MB`);
        }
      });
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(
          `  Download complete: ${(size / 1024 / 1024).toFixed(1)} MB`
        );
        resolve();
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
  });
}

async function downloadCSV() {
  if (existsSync(CSV_PATH)) {
    console.log("CSV file already exists, skipping download.");
    return;
  }

  console.log("Downloading IFSC dataset...");
  const urls = [CSV_URL, ...ALT_URLS];

  for (const url of urls) {
    try {
      await download(url);
      return;
    } catch (err) {
      console.log(`  Failed: ${err.message}`);
    }
  }

  // If all URLs fail, generate sample data
  console.log("\nCould not download dataset. Generating comprehensive sample data...");
  await generateSampleData();
}

async function generateSampleData() {
  const { writeFileSync } = await import("fs");

  const banks = [
    { code: "SBIN", name: "STATE BANK OF INDIA" },
    { code: "HDFC", name: "HDFC BANK" },
    { code: "ICIC", name: "ICICI BANK LIMITED" },
    { code: "PUNB", name: "PUNJAB NATIONAL BANK" },
    { code: "BARB", name: "BANK OF BARODA" },
    { code: "UTIB", name: "AXIS BANK" },
    { code: "CNRB", name: "CANARA BANK" },
    { code: "UBIN", name: "UNION BANK OF INDIA" },
    { code: "BKID", name: "BANK OF INDIA" },
    { code: "IDIB", name: "INDIAN BANK" },
    { code: "KKBK", name: "KOTAK MAHINDRA BANK LIMITED" },
    { code: "IBKL", name: "IDBI BANK" },
    { code: "IOBA", name: "INDIAN OVERSEAS BANK" },
    { code: "CBIN", name: "CENTRAL BANK OF INDIA" },
    { code: "UCBA", name: "UCO BANK" },
    { code: "BKDN", name: "DENA BANK" },
    { code: "YESB", name: "YES BANK" },
    { code: "INDB", name: "INDUSIND BANK" },
    { code: "FDRL", name: "FEDERAL BANK" },
    { code: "SIBL", name: "SOUTH INDIAN BANK" },
    { code: "KARB", name: "KARNATAKA BANK LIMITED" },
    { code: "KVBL", name: "KARUR VYSYA BANK" },
    { code: "TMBL", name: "TAMILNAD MERCANTILE BANK LIMITED" },
    { code: "CSBK", name: "CSB BANK LIMITED" },
    { code: "RATN", name: "RBL BANK LIMITED" },
    { code: "DCBL", name: "DCB BANK LIMITED" },
    { code: "JAKA", name: "JAMMU AND KASHMIR BANK LIMITED" },
    { code: "CIUB", name: "CITY UNION BANK LIMITED" },
    { code: "LAVB", name: "LAKSHMI VILAS BANK" },
    { code: "MAHB", name: "BANK OF MAHARASHTRA" },
  ];

  const states = [
    { name: "MAHARASHTRA", districts: ["MUMBAI", "PUNE", "NAGPUR", "NASHIK", "THANE", "AURANGABAD", "SOLAPUR", "KOLHAPUR", "SATARA", "RATNAGIRI"] },
    { name: "DELHI", districts: ["NEW DELHI", "CENTRAL DELHI", "SOUTH DELHI", "NORTH DELHI", "EAST DELHI", "WEST DELHI"] },
    { name: "KARNATAKA", districts: ["BENGALURU URBAN", "MYSURU", "HUBLI", "MANGALURU", "BELGAUM", "GULBARGA", "DHARWAD", "SHIMOGA", "BELLARY", "DAVANGERE"] },
    { name: "TAMIL NADU", districts: ["CHENNAI", "COIMBATORE", "MADURAI", "TIRUCHIRAPPALLI", "SALEM", "TIRUNELVELI", "ERODE", "VELLORE", "THANJAVUR", "DINDIGUL"] },
    { name: "UTTAR PRADESH", districts: ["LUCKNOW", "KANPUR", "AGRA", "VARANASI", "ALLAHABAD", "MEERUT", "BAREILLY", "ALIGARH", "MORADABAD", "GORAKHPUR"] },
    { name: "GUJARAT", districts: ["AHMEDABAD", "SURAT", "VADODARA", "RAJKOT", "BHAVNAGAR", "JAMNAGAR", "GANDHINAGAR", "JUNAGADH", "ANAND", "MEHSANA"] },
    { name: "RAJASTHAN", districts: ["JAIPUR", "JODHPUR", "UDAIPUR", "KOTA", "AJMER", "BIKANER", "BHARATPUR", "ALWAR", "SIKAR", "BHILWARA"] },
    { name: "WEST BENGAL", districts: ["KOLKATA", "HOWRAH", "NORTH 24 PARGANAS", "SOUTH 24 PARGANAS", "HOOGHLY", "BARDHAMAN", "NADIA", "MURSHIDABAD", "JALPAIGURI", "DARJEELING"] },
    { name: "TELANGANA", districts: ["HYDERABAD", "RANGAREDDY", "WARANGAL", "KARIMNAGAR", "MEDAK", "NIZAMABAD", "KHAMMAM", "NALGONDA", "ADILABAD", "MAHBUBNAGAR"] },
    { name: "ANDHRA PRADESH", districts: ["VISAKHAPATNAM", "VIJAYAWADA", "GUNTUR", "NELLORE", "KURNOOL", "TIRUPATI", "KAKINADA", "RAJAHMUNDRY", "KADAPA", "ANANTAPUR"] },
    { name: "MADHYA PRADESH", districts: ["BHOPAL", "INDORE", "JABALPUR", "GWALIOR", "UJJAIN", "SAGAR", "SATNA", "REWA", "RATLAM", "DEWAS"] },
    { name: "KERALA", districts: ["THIRUVANANTHAPURAM", "KOCHI", "KOZHIKODE", "THRISSUR", "KOLLAM", "KANNUR", "ALAPPUZHA", "PALAKKAD", "MALAPPURAM", "KOTTAYAM"] },
    { name: "PUNJAB", districts: ["LUDHIANA", "AMRITSAR", "JALANDHAR", "PATIALA", "BATHINDA", "MOHALI", "PATHANKOT", "HOSHIARPUR", "MOGA", "FIROZPUR"] },
    { name: "HARYANA", districts: ["GURUGRAM", "FARIDABAD", "KARNAL", "PANIPAT", "AMBALA", "HISAR", "ROHTAK", "SONIPAT", "YAMUNANAGAR", "SIRSA"] },
    { name: "BIHAR", districts: ["PATNA", "GAYA", "MUZAFFARPUR", "BHAGALPUR", "DARBHANGA", "PURNIA", "ARA", "BEGUSARAI", "HAJIPUR", "MUNGER"] },
    { name: "ODISHA", districts: ["BHUBANESWAR", "CUTTACK", "ROURKELA", "BERHAMPUR", "SAMBALPUR", "PURI", "BALASORE", "BHADRAK", "BARIPADA", "JHARSUGUDA"] },
    { name: "ASSAM", districts: ["GUWAHATI", "DIBRUGARH", "SILCHAR", "JORHAT", "NAGAON", "TEZPUR", "TINSUKIA", "BONGAIGAON", "DHUBRI", "KARIMGANJ"] },
    { name: "JHARKHAND", districts: ["RANCHI", "JAMSHEDPUR", "DHANBAD", "BOKARO", "HAZARIBAGH", "DEOGHAR", "GIRIDIH", "DUMKA", "RAMGARH", "CHAIBASA"] },
    { name: "CHHATTISGARH", districts: ["RAIPUR", "BILASPUR", "DURG", "BHILAI", "KORBA", "RAJNANDGAON", "JAGDALPUR", "AMBIKAPUR", "RAIGARH", "MAHASAMUND"] },
    { name: "UTTARAKHAND", districts: ["DEHRADUN", "HARIDWAR", "HALDWANI", "ROORKEE", "KASHIPUR", "RUDRAPUR", "RISHIKESH", "PITHORAGARH", "ALMORA", "NAINITAL"] },
    { name: "GOA", districts: ["NORTH GOA", "SOUTH GOA", "PANAJI", "MARGAO", "VASCO DA GAMA", "MAPUSA"] },
    { name: "HIMACHAL PRADESH", districts: ["SHIMLA", "KANGRA", "MANDI", "SOLAN", "SIRMAUR", "HAMIRPUR", "UNA", "BILASPUR", "KULLU", "CHAMBA"] },
    { name: "JAMMU AND KASHMIR", districts: ["SRINAGAR", "JAMMU", "ANANTNAG", "BARAMULLA", "UDHAMPUR", "KATHUA", "SOPORE", "PULWAMA", "KUPWARA", "RAJOURI"] },
  ];

  const branchTypes = [
    "MAIN BRANCH", "CITY BRANCH", "STATION ROAD", "MARKET BRANCH",
    "INDUSTRIAL AREA", "UNIVERSITY BRANCH", "HOSPITAL ROAD",
    "GANDHI NAGAR", "CIVIL LINES", "CANTONMENT", "MALL ROAD",
    "MG ROAD", "RING ROAD", "RAILWAY STATION", "BUS STAND",
    "COLLEGE ROAD", "TEMPLE ROAD", "LAKE ROAD", "PARK STREET",
    "COMMERCIAL COMPLEX",
  ];

  let csv = "BANK,IFSC,BRANCH,CENTRE,DISTRICT,STATE,ADDRESS,CONTACT,IMPS,RTGS,CITY,ISO3166,NEFT,MICR,UPI,SWIFT\n";

  let branchCounter = 0;
  for (const bank of banks) {
    for (const state of states) {
      const numDistricts = Math.min(
        state.districts.length,
        bank.code === "SBIN" ? state.districts.length : Math.ceil(state.districts.length * 0.6)
      );

      for (let d = 0; d < numDistricts; d++) {
        const district = state.districts[d];
        const numBranches = bank.code === "SBIN" ? 5 : d === 0 ? 3 : 2;

        for (let b = 0; b < numBranches; b++) {
          branchCounter++;
          const branchNum = String(branchCounter).padStart(6, "0");
          const ifsc = `${bank.code}0${branchNum}`;
          const branchName = b === 0 ? `${district} ${branchTypes[0]}` : `${district} ${branchTypes[(b + d) % branchTypes.length]}`;
          const micrCode = `${String(branchCounter).padStart(3, "0")}${bank.code.slice(0, 3)}${String(d).padStart(3, "0")}`;
          const contact = `0${String(Math.floor(1000000000 + Math.random() * 9000000000)).slice(0, 10)}`;
          const address = `${branchName}, ${district}, ${state.name} - ${String(100000 + branchCounter).slice(0, 6)}`;

          csv += `"${bank.name}","${ifsc}","${branchName}","${district}","${district}","${state.name}","${address}","${contact}",true,true,"${district}","IN-${state.name.slice(0, 2)}",true,"${micrCode}",true,""\n`;
        }
      }
    }
  }

  writeFileSync(CSV_PATH, csv);
  console.log(`Generated ${branchCounter} sample branch records.`);
}

function createDatabase() {
  if (existsSync(DB_PATH)) {
    console.log("Removing existing database...");
    // Overwrite existing
  }

  console.log("Creating SQLite database...");
  const db = new Database(DB_PATH);

  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = OFF");
  db.pragma("cache_size = -64000");

  db.exec(`
    CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bank TEXT NOT NULL,
      ifsc TEXT NOT NULL UNIQUE,
      branch TEXT NOT NULL,
      centre TEXT,
      district TEXT,
      state TEXT NOT NULL,
      address TEXT,
      contact TEXT,
      city TEXT,
      micr TEXT,
      imps INTEGER DEFAULT 0,
      rtgs INTEGER DEFAULT 0,
      neft INTEGER DEFAULT 0,
      upi INTEGER DEFAULT 0,
      swift TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_ifsc ON branches(ifsc);
    CREATE INDEX IF NOT EXISTS idx_bank ON branches(bank);
    CREATE INDEX IF NOT EXISTS idx_state ON branches(state);
    CREATE INDEX IF NOT EXISTS idx_district ON branches(district);
    CREATE INDEX IF NOT EXISTS idx_city ON branches(city);
    CREATE INDEX IF NOT EXISTS idx_bank_state ON branches(bank, state);
    CREATE INDEX IF NOT EXISTS idx_bank_state_district ON branches(bank, state, district);
  `);

  return db;
}

async function importCSV(db) {
  console.log("Importing CSV data...");

  return new Promise((resolve, reject) => {
    const insert = db.prepare(`
      INSERT OR IGNORE INTO branches (bank, ifsc, branch, centre, district, state, address, contact, city, micr, imps, rtgs, neft, upi, swift)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        insert.run(
          row.BANK || row.bank || "",
          row.IFSC || row.ifsc || "",
          row.BRANCH || row.branch || "",
          row.CENTRE || row.centre || "",
          row.DISTRICT || row.district || "",
          row.STATE || row.state || "",
          row.ADDRESS || row.address || "",
          row.CONTACT || row.contact || "",
          row.CITY || row.city || "",
          row.MICR || row.micr || "",
          parseBool(row.IMPS ?? row.imps),
          parseBool(row.RTGS ?? row.rtgs),
          parseBool(row.NEFT ?? row.neft),
          parseBool(row.UPI ?? row.upi),
          row.SWIFT || row.swift || ""
        );
      }
    });

    const batch = [];
    let count = 0;

    const parser = createReadStream(CSV_PATH).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      })
    );

    parser.on("data", (row) => {
      batch.push(row);
      if (batch.length >= 5000) {
        insertMany(batch.splice(0));
        count += 5000;
        if (count % 25000 === 0) {
          console.log(`  Imported ${count.toLocaleString()} records...`);
        }
      }
    });

    parser.on("end", () => {
      if (batch.length > 0) {
        insertMany(batch);
        count += batch.length;
      }
      console.log(`  Total: ${count.toLocaleString()} records imported.`);
      resolve();
    });

    parser.on("error", reject);
  });
}

function parseBool(val) {
  if (val === true || val === "true" || val === "TRUE" || val === 1 || val === "1") return 1;
  return 0;
}

async function main() {
  console.log("=== IFSC Database Seed Script ===\n");

  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  await downloadCSV();

  const db = createDatabase();
  await importCSV(db);

  // Print stats
  const stats = db.prepare("SELECT COUNT(*) as total FROM branches").get();
  const bankCount = db
    .prepare("SELECT COUNT(DISTINCT bank) as total FROM branches")
    .get();
  const stateCount = db
    .prepare("SELECT COUNT(DISTINCT state) as total FROM branches")
    .get();

  console.log(`\n=== Database Stats ===`);
  console.log(`Total branches: ${stats.total.toLocaleString()}`);
  console.log(`Total banks: ${bankCount.total}`);
  console.log(`Total states: ${stateCount.total}`);
  console.log(`Database path: ${DB_PATH}`);
  console.log(`\nDone! ✓`);

  db.close();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

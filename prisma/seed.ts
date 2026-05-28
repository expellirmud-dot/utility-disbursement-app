/**
 * prisma/seed.ts
 *
 * Seeds BudgetMaster records for Thai municipal fiscal year B.E. 2569.
 *
 * FY 2569 = Oct 1, 2025 (C.E.) → Sep 30, 2026 (C.E.)
 *
 * Budget amounts sourced from available documentation.
 * Water uses 0/null values as no transaction data was provided.
 *
 * Prisma 7 uses driver adapters for DB connections.
 * PrismaLibSql takes a config object {url, authToken?} and creates the libsql client internally.
 *
 * Run: npm run db:seed
 */

import 'dotenv/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';

// Use DATABASE_URL from .env, defaulting to the project root dev.db
// Note: Prisma CLI creates dev.db at project root (file:./dev.db resolved from cwd).
const dbUrl = process.env['DATABASE_URL'] ?? 'file:./dev.db';

// PrismaLibSql factory takes {url} config, creates libsql client internally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaLibSql({ url: dbUrl }) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

const FISCAL_YEAR = 2569;

const budgetMasterRecords = [
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'electricity',
    budgetCode: '9969011134010001',
    budgetName: 'ค่าไฟฟ้า',
    approvedAmount: 400000.00,
    committedAmount: 31505.38,
    disbursedAmount: 158711.20,
    remainingAmount: 209783.42,
    note: 'ค่าไฟฟ้า (ไม่หักภาษี ณ ที่จ่าย)',
  },
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'water',
    budgetCode: '9969011134020001',
    budgetName: 'ค่าน้ำประปา ค่าน้ำบาดาล',
    approvedAmount: 0,
    committedAmount: 0,
    disbursedAmount: 0,
    remainingAmount: 0,
    note: 'ไม่มีข้อมูลงบประมาณ (ใช้ค่าเริ่มต้น)',
  },
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'phone',
    budgetCode: '9969011134030001',
    budgetName: 'ค่าบริการโทรศัพท์',
    approvedAmount: 15000.00,
    committedAmount: 0,
    disbursedAmount: 1432.25,
    remainingAmount: 13567.75,
    note: null,
  },
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'postal',
    budgetCode: '9969011134040001',
    budgetName: 'ค่าบริการไปรษณีย์',
    approvedAmount: 15000.00,
    committedAmount: 0,
    disbursedAmount: 1507.00,
    remainingAmount: 13493.00,
    note: null,
  },
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'telecom',
    budgetCode: '9969011134050001',
    budgetName: 'ค่าบริการสื่อสารและโทรคมนาคม',
    approvedAmount: 40000.00,
    committedAmount: 0,
    disbursedAmount: 30470.00,
    remainingAmount: 9530.00,
    note: null,
  },
  {
    fiscalYear: FISCAL_YEAR,
    expenseType: 'website',
    budgetCode: '9969011134060001',
    budgetName: 'ค่าเช่าพื้นที่เว็บไซต์ และค่าธรรมเนียมที่เกี่ยวข้อง',
    approvedAmount: 10000.00,
    committedAmount: 0,
    disbursedAmount: 0,
    remainingAmount: 10000.00,
    note: null,
  },
];

async function main() {
  console.log(`Seeding BudgetMaster for FY B.E. ${FISCAL_YEAR}...`);
  console.log(`DB: ${dbUrl}`);

  for (const record of budgetMasterRecords) {
    const result = await prisma.budgetMaster.upsert({
      where: {
        fiscalYear_expenseType: {
          fiscalYear: record.fiscalYear,
          expenseType: record.expenseType,
        },
      },
      update: {
        budgetCode: record.budgetCode,
        budgetName: record.budgetName,
        approvedAmount: record.approvedAmount,
        committedAmount: record.committedAmount,
        disbursedAmount: record.disbursedAmount,
        remainingAmount: record.remainingAmount,
        note: record.note,
      },
      create: record,
    });
    console.log(`  ✓ ${result.expenseType} → ${result.budgetName} [${result.budgetCode}]`);
  }

  console.log(`\nSeed complete. ${budgetMasterRecords.length} BudgetMaster records upserted.`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

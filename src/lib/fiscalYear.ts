/**
 * fiscalYear.ts
 *
 * Thai municipal fiscal year utilities.
 *
 * Rules (from PROJECT_RULES.md):
 * - Fiscal year B.E. YYYY starts on October 1 of B.E. YYYY-1
 * - Fiscal year B.E. YYYY ends on September 30 of B.E. YYYY
 *
 * Example:
 *   FY B.E. 2569 starts 2024-10-01 (C.E.) and ends 2025-09-30 (C.E.)
 *   Which is 2567-10-01 (B.E.) → 2568-09-30 (B.E.) in Buddhist calendar
 *
 * Relationship: Buddhist Era (B.E.) = Christian Era (C.E.) + 543
 */

/**
 * Convert a C.E. date to Buddhist Era year.
 */
export function getBuddhistYear(date: Date): number {
  return date.getFullYear() + 543;
}

/**
 * Get the Thai municipal fiscal year (B.E.) for a given date.
 *
 * Logic:
 *   - If month >= October (month index 9), FY = buddhistYear + 1
 *   - Otherwise FY = buddhistYear
 *
 * Example (C.E.):
 *   2025-10-01 → B.E. 2568 + 1 = FY B.E. 2569
 *   2026-09-30 → B.E. 2569     = FY B.E. 2569
 *   2024-09-30 → B.E. 2567     = FY B.E. 2567
 */
export function getFiscalYear(date: Date): number {
  const buddhistYear = getBuddhistYear(date);
  // October = month index 9 (0-based)
  if (date.getMonth() >= 9) {
    return buddhistYear + 1;
  }
  return buddhistYear;
}

/**
 * Get the start and end C.E. dates for a given B.E. fiscal year.
 *
 * FY B.E. YYYY:
 *   start = October 1 of C.E. (YYYY - 543 - 1)
 *   end   = September 30 of C.E. (YYYY - 543)
 */
export function getFiscalYearRange(fiscalYearBE: number): { start: Date; end: Date } {
  const startCE = fiscalYearBE - 543 - 1;
  const endCE = fiscalYearBE - 543;
  return {
    start: new Date(startCE, 9, 1),    // Oct 1 of CE startYear
    end: new Date(endCE, 8, 30, 23, 59, 59, 999), // Sep 30 end of day
  };
}

/**
 * Get the current Thai municipal fiscal year (B.E.) based on today's date.
 */
export function currentFiscalYear(): number {
  return getFiscalYear(new Date());
}

/**
 * Thai month names (1-indexed).
 */
const THAI_MONTH_NAMES: readonly string[] = [
  'มกราคม',    // 1
  'กุมภาพันธ์', // 2
  'มีนาคม',    // 3
  'เมษายน',    // 4
  'พฤษภาคม',   // 5
  'มิถุนายน',  // 6
  'กรกฎาคม',   // 7
  'สิงหาคม',   // 8
  'กันยายน',   // 9
  'ตุลาคม',    // 10
  'พฤศจิกายน', // 11
  'ธันวาคม',   // 12
];

/**
 * Get Thai month name from 1-indexed month number.
 * Returns empty string for invalid month numbers.
 */
export function getThaiMonthName(month: number): string {
  if (month < 1 || month > 12) return '';
  return THAI_MONTH_NAMES[month - 1];
}

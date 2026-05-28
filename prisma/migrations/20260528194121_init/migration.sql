-- CreateTable
CREATE TABLE "BudgetMaster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fiscalYear" INTEGER NOT NULL,
    "expenseType" TEXT NOT NULL,
    "budgetCode" TEXT NOT NULL,
    "budgetName" TEXT NOT NULL,
    "approvedAmount" REAL NOT NULL DEFAULT 0,
    "committedAmount" REAL NOT NULL DEFAULT 0,
    "disbursedAmount" REAL NOT NULL DEFAULT 0,
    "remainingAmount" REAL NOT NULL DEFAULT 0,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UploadedBill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "extractionStatus" TEXT NOT NULL DEFAULT 'pending',
    "extractedJson" TEXT,
    "fiscalYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "DisbursementDraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fiscalYear" INTEGER NOT NULL,
    "expenseType" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "memoFieldsJson" TEXT NOT NULL,
    "readinessJson" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "uploadedBillId" TEXT,
    CONSTRAINT "DisbursementDraft_uploadedBillId_fkey" FOREIGN KEY ("uploadedBillId") REFERENCES "UploadedBill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "BudgetMaster_fiscalYear_idx" ON "BudgetMaster"("fiscalYear");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetMaster_fiscalYear_expenseType_key" ON "BudgetMaster"("fiscalYear", "expenseType");

-- CreateIndex
CREATE INDEX "UploadedBill_fiscalYear_idx" ON "UploadedBill"("fiscalYear");

-- CreateIndex
CREATE INDEX "UploadedBill_extractionStatus_idx" ON "UploadedBill"("extractionStatus");

-- CreateIndex
CREATE UNIQUE INDEX "DisbursementDraft_uploadedBillId_key" ON "DisbursementDraft"("uploadedBillId");

-- CreateIndex
CREATE INDEX "DisbursementDraft_fiscalYear_idx" ON "DisbursementDraft"("fiscalYear");

-- CreateIndex
CREATE INDEX "DisbursementDraft_status_idx" ON "DisbursementDraft"("status");

-- CreateIndex
CREATE INDEX "DisbursementDraft_expenseType_idx" ON "DisbursementDraft"("expenseType");

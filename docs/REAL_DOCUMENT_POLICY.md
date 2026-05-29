# Real Document Policy

## 1. Safe Folder Policy
Use private documents only outside the repo.

**Allowed Path:**
`C:\Users\Expellirmud\Desktop\temp-utility-bills\`

**Rules:**
- Do not copy PDFs/images into `D:\utility-disbursement-app`.
- Do not place files in `public/`, `docs/`, `scripts/`, or repo root.
- Use short local-only labels: `PRIVATE-PEA-01`, `PRIVATE-NT-PHONE-01`, etc.
- Before commit, ensure no raw files leaked by checking untracked files.

## 2. Masking Rules
Use irreversible masking in all output, logs, and documentation:
- Bill/document numbers: `PEA-DOC-XXXX`, `NT-INVOICE-XXXX`
- Account/customer/service numbers: `PEA-CUST-XXXX`, `NT-ACCOUNT-XXXX`
- Phone numbers: `PHONE-XXXX`
- Names: `PERSON-XXXX`
- Addresses: `ADDRESS-XXXX`
- File names: `PRIVATE-PEA-01`, never original filename.
- Amounts may be recorded if needed for extraction accuracy, but avoid pairing with real identifiers.
- Keep snippets short, ideally under 25 words each.
- Never commit full OCR text or full PDF text.

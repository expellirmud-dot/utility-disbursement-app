# NEW_PROJECT_BRIEF

## Project
โปรแกรมเบิกจ่ายค่าสาธารณูปโภค

## Goal
อ่านรายละเอียดบิล ตรวจข้อมูล คำนวณยอดเบิกจ่าย สร้างบันทึกข้อความ และเตรียมข้อมูลสำหรับ e-LAAS

## V1 Scope
- Next.js + React + TypeScript + Tailwind
- กรอกข้อมูลเบิกจ่ายได้
- อ่านบิลแบบ mock/OCR-ready
- ตรวจและแก้ไขข้อมูลที่อ่านได้
- คำนวณภาษีหัก ณ ที่จ่าย
- Preview บันทึกข้อความ
- e-LAAS prepare/copy helper

## Business Rules
- ค่าไฟฟ้าไม่หักภาษี ณ ที่จ่าย
- รายการอื่นนอกจากค่าไฟฟ้าให้หักภาษี ณ ที่จ่าย

## Not In V1
- ไม่ทำระบบ login ซับซ้อน
- ไม่ทำ database หนัก
- ไม่กดส่ง e-LAAS อัตโนมัติ
- ไม่ย้าย ai_runtime/governance เดิมเข้ามา

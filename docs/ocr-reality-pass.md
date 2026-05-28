# OCR Reality Pass (TASK 011-D)

This document records the measurement of Tesseract OCR behavior on a real scanned document (`Unknown_2026_0005.pdf`), a summary letter, to validate its effectiveness as a fallback mechanism.

## Test Environment
- **Engine**: Tesseract.js (`eng` + `tha` languages)
- **Document**: `Unknown_2026_0005.pdf`
- **Execution Context**: Rendered via pdf.js to Canvas, then processed by Tesseract.

## Results
- **Timing**: ~4.5 seconds for a single page.
- **Output Snippet**:
  ```text
  PR ms ไฟ ฟ้า ส ่ ว น ภู ม ิ ภา ค
  (ย ) 200 ถนน ง า ม ว ง ศ์ ว า น แข ว ง ล า ค ย า ว เข ต จ ต ุ จ ั ก ร ก ร ุ ง เท พ ม ห า น ค ร 10900
  INA ns 0-2589-0100-1
  CSD
  ท ี ่ ม ท 5307.46115/00019/2569 ก า ร ไฟ ฟ้า ส ่ ว น ภู ม ิ ภา ค อ ํ า เภ อ จ อ ม บ ึ ง
  เล ข ท ี ่ 128 ห ม ู ่ 2 ถนน ร า ช บ ุ ร ี - จ อ ม บ ึ ง
  ต ํ า บ ล จ อ ม บ ึ ง อ ํ า เภ อ จ อ ม บ ึ ง จ ั ง ห ว ั ด ร า ช บ ุ ร ี
  " 70150
  2 มีนาคม 2569
  เร ื ่ อ ง แจ ้ ง ค ่ า ไฟ ฟ้า
  เร ี ย น น า ย ก เท ศ ม น ต ร ี เท ศ บ า ล ค ด่ า น ท ั บ ต ะ โก
  ส ิ ่ ง ท ี ่ ส ่ ง ม า ด ้ ว ย : ห น ั ง ส ื อ แจ ้ ง ค ่ า ไฟ ฟ้า แล ะ ร า ย ล ะ เอ ี ย ด ค ่ า ไฟ ฟ้า
  ก า ร ไฟ ฟ้า ส ่ ว น ภู ม ิ ภา ค ขอ แจ ้ ง เร ี ย ก เก ็ บ เง ิ น ค ่ า ไฟ ฟ้า ใน ห น ่ ว ย ง า น ส ั ง ก ั ด จ ํ า น ว น 70 sw
  เป ็ น จ ํ า น ว น เง ิ น 4,882.65 บ า ท (ส ี ่ พ ั น แป ค ร ้ อ ย แป ด ส ิ บ ส อ ง บ า ท ห ก ส ิ บ ห ้ า ส ต า ง ค ์ )
  ```

## Observations
1. **Accuracy**: The text is identifiable but highly fragmented, containing artificial spaces between Thai characters (e.g., `จ ํ า น ว น`). Some English/Numeric text is misinterpreted (e.g., `70 sw` instead of `70 ราย`). 
2. **Key Data Preservation**: Despite the noise, critical data such as the provider (`ก า ร ไฟ ฟ้า ส ่ ว น ภู ม ิ ภา ค`) and the gross amount (`4,882.65`) successfully survived the OCR process.
3. **Regex Viability**: Standard regex parsing fails completely on this output due to the fragmented character spacing.

## Conclusion
Tesseract OCR is functionally viable as a raw text extractor for image-based PDFs, but its output format is incompatible with our deterministic parser. It confirms that the AI Verifier is strictly required to process OCR outputs in this pipeline.

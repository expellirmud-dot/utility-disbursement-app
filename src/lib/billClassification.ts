import { ExpenseType } from '../types/disbursement';

/**
 * Classify provider name (Thai) to expense type.
 * Matches common Thai utility provider keywords.
 * Falls back to 'other' for unrecognized providers.
 */
export const classifyExpenseType = (providerName: string): ExpenseType => {
  const name = providerName.toLowerCase();

  // Electricity
  if (name.includes('ไฟฟ้า') || name.includes('pea') || name.includes('mea')) {
    return 'electricity';
  }

  // Water
  if (name.includes('ประปา') || name.includes('น้ำบาดาล') || name.includes('น้ำ')) {
    return 'water';
  }

  // Phone
  if (
    name.includes('โทรศัพท์') ||
    name.includes('ais') ||
    name.includes('dtac') ||
    name.includes('true move') ||
    name.includes('nt mobile')
  ) {
    return 'phone';
  }

  // Postal
  if (name.includes('ไปรษณีย์') || name.includes('thailand post')) {
    return 'postal';
  }

  // Telecom / Internet
  if (
    name.includes('สื่อสาร') ||
    name.includes('โทรคมนาคม') ||
    name.includes('internet') ||
    name.includes('อินเตอร์เน็ต') ||
    name.includes('cat telecom') ||
    name.includes('tot') ||
    name.includes('นท.')
  ) {
    return 'telecom';
  }

  // Website hosting / domain
  if (name.includes('เว็บไซต์') || name.includes('domain') || name.includes('hosting')) {
    return 'website';
  }

  return 'other';
};

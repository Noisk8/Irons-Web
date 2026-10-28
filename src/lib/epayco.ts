import { createHash, timingSafeEqual } from 'crypto';

export type EpaycoConfirmation = {
  p_cust_id_cliente?: string;
  x_ref_payco?: string;
  x_transaction_id?: string;
  x_amount?: string;
  x_currency_code?: string;
  x_response?: string;
  x_response_reason_text?: string;
  x_cod_response?: string;
  [key: string]: string | undefined;
};

function signatureSource(data: EpaycoConfirmation, customerId: string, pKey: string) {
  return [customerId, pKey, data.x_ref_payco, data.x_transaction_id, data.x_amount, data.x_currency_code].join('^');
}

export function hasRequiredEpaycoConfirmationFields(data: EpaycoConfirmation) {
  return Boolean(data.x_ref_payco && data.x_transaction_id && data.x_amount && data.x_currency_code);
}

/** Validates the SHA-256 signature described by ePayco's confirmation API. */
export function isValidEpaycoConfirmation(data: EpaycoConfirmation): boolean {
  const customerId = process.env.EPAYCO_P_CUST_ID_CLIENTE;
  const pKey = process.env.EPAYCO_P_KEY;
  const receivedSignature = data.x_signature;
  if (!customerId || !pKey || !receivedSignature || !hasRequiredEpaycoConfirmationFields(data)) return false;

  const expectedSignature = createHash('sha256').update(signatureSource(data, customerId, pKey), 'utf8').digest('hex');
  const expected = Buffer.from(expectedSignature.toLowerCase());
  const received = Buffer.from(receivedSignature.trim().toLowerCase());
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function epaycoPaymentStatus(data: EpaycoConfirmation) {
  // ePayco code 1 is approved. Every other result remains non-approved until
  // the order is reconciled in the database.
  return data.x_cod_response === '1' ? 'APPROVED' : 'PENDING';
}

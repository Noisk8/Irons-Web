import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { epaycoPaymentStatus, isValidEpaycoConfirmation } from './epayco';

test('interpreta los estados de ePayco sin aprobar códigos desconocidos', () => {
  assert.equal(epaycoPaymentStatus({ x_cod_response: '1' }), 'APPROVED');
  assert.equal(epaycoPaymentStatus({ x_cod_response: '2' }), 'REJECTED');
  assert.equal(epaycoPaymentStatus({ x_cod_response: '3' }), 'PENDING');
  assert.equal(epaycoPaymentStatus({ x_cod_response: '4' }), 'FAILED');
  assert.equal(epaycoPaymentStatus({ x_cod_response: '99' }), undefined);
});

test('acepta únicamente firmas correspondientes a la transacción', () => {
  const previousId = process.env.EPAYCO_P_CUST_ID_CLIENTE;
  const previousKey = process.env.EPAYCO_P_KEY;
  process.env.EPAYCO_P_CUST_ID_CLIENTE = 'cliente';
  process.env.EPAYCO_P_KEY = 'secreto';
  try {
    const data = { x_ref_payco: '123', x_transaction_id: 'abc', x_amount: '100.00', x_currency_code: 'COP', x_signature: createHash('sha256').update('cliente^secreto^123^abc^100.00^COP').digest('hex') };
    assert.equal(isValidEpaycoConfirmation(data), true);
    assert.equal(isValidEpaycoConfirmation({ ...data, x_amount: '1.00' }), false);
    assert.equal(isValidEpaycoConfirmation({ ...data, x_signature: '' }), false);
  } finally {
    if (previousId === undefined) delete process.env.EPAYCO_P_CUST_ID_CLIENTE; else process.env.EPAYCO_P_CUST_ID_CLIENTE = previousId;
    if (previousKey === undefined) delete process.env.EPAYCO_P_KEY; else process.env.EPAYCO_P_KEY = previousKey;
  }
});

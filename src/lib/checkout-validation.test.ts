import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutDetailsSchema, checkoutFieldErrors } from './checkout-validation';

const valid = { email: 'cliente@example.com', phone: '3001234567', shippingAddress: { name: 'Ana Pérez', address: 'Calle 1 # 2-3', department: 'Antioquia', city: 'Medellín', notes: '' } };

test('acepta un formulario completo y un celular colombiano', () => {
  assert.equal(checkoutDetailsSchema.safeParse(valid).success, true);
});

test('identifica los campos requeridos y los celulares inválidos', () => {
  const result = checkoutDetailsSchema.safeParse({ ...valid, email: 'mal', phone: '6011234567', shippingAddress: { ...valid.shippingAddress, name: ' ', address: '', department: '', city: '' } });
  assert.equal(result.success, false);
  if (!result.success) {
    const errors = checkoutFieldErrors(result.error);
    for (const field of ['email', 'phone', 'name', 'address', 'department', 'city'] as const) assert.ok(errors[field], field);
  }
  for (const phone of ['300123456', '30012345678', 'abcdefghij', '+573001234567']) assert.equal(checkoutDetailsSchema.safeParse({ ...valid, phone }).success, false);
});

test('rechaza municipios que no pertenecen al departamento', () => {
  const result = checkoutDetailsSchema.safeParse({ ...valid, shippingAddress: { ...valid.shippingAddress, city: 'Santiago de Cali' } });
  assert.equal(result.success, false);
  if (!result.success) assert.ok(checkoutFieldErrors(result.error).city);
});

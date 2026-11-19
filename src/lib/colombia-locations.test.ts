import test from 'node:test';
import assert from 'node:assert/strict';
import { colombiaLocations, isColombianLocation } from './colombia-locations';

test('incluye los departamentos y Bogotá y valida municipios por departamento', () => {
  assert.equal(colombiaLocations.length, 33);
  assert.equal(isColombianLocation('Antioquia', 'Medellín'), true);
  assert.equal(isColombianLocation('Bogotá, D.C.', 'Bogotá, D.C.'), true);
  assert.equal(isColombianLocation('Valle del Cauca', 'Santiago de Cali'), true);
  assert.equal(isColombianLocation('Antioquia', 'Santiago de Cali'), false);
  assert.equal(isColombianLocation('', ''), false);
});

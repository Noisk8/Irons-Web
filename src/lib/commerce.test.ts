import test from 'node:test'; import assert from 'node:assert/strict'; import { calculateLineTotal, calculateShipping } from './commerce';
test('calcula el total por cantidad',()=>assert.equal(calculateLineTotal(125000,2),250000));
test('envío gratis desde $400.000',()=>{assert.equal(calculateShipping(399999),25000);assert.equal(calculateShipping(400000),0)});

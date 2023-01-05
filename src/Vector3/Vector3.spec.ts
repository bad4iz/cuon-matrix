import { test, expect } from 'vitest';
import { Vector3 } from './Vector3';

test('Vector3 constructor default', () => {
  expect(new Vector3()).toEqual({
    elements: new Float32Array([0, 0, 0]),
  });
});

test('Vector3 constructor default', () => {
  const vector3 = new Vector3();
  expect(vector3.normalize()).toEqual({
    elements: new Float32Array([0, 0, 0]),
  });

  const vector31 = new Vector3([0, 50, 0.5]);
  expect(vector31.normalize()).toEqual({
    elements: new Float32Array([0, 0.9999499917030334, 0.009999499656260014]),
  });
});

test('Vector3 normalize', () => {
  const vector31 = new Vector3([0, 50, 0.5]);
  expect(vector31.normalize()).toEqual({
    elements: new Float32Array([0, 0.9999499917030334, 0.009999499656260014]),
  });
  const vector32 = new Vector3([50, 50, 50]);
  expect(vector31.normalize()).toEqual({
    elements: new Float32Array([0, 0.9999499917030334, 0.009999499656260014]),
  });
});

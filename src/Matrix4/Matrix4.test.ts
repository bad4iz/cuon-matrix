import { test, expect } from 'vitest';
import { Matrix4 } from './Matrix4';

test('Matrix4 constructor default', () => {
  expect(new Matrix4().elements).toEqual(
    new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  );
});

test('Matrix4 constructor default', () => {
  expect(new Matrix4().elements).toEqual(
    new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  );
});

test('setIdentity', () => {
  const matrix4 = new Matrix4();
  expect(matrix4.setIdentity().elements).toEqual(
    new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  );
});

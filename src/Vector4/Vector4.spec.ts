import { test, expect } from 'vitest';
import { Vector4 } from './Vector4';

test('Vector4 constructor default', () => {
  expect(new Vector4()).toEqual({
    elements: new Float32Array([0, 0, 0, 0]),
  });
});

test('Vector4 constructor', () => {
  expect(new Vector4([1, 2, 3, 4])).toEqual({
    elements: new Float32Array([1, 2, 3, 4]),
  });
});
test('Vector4 constructor type', () => {
  const arr: [number, number, number, number] = [1, 2, 3, 4];
  arr.push(3);
  expect(new Vector4(arr)).toEqual({
    elements: new Float32Array([1, 2, 3, 4]),
  });
});

test('Vector4 constructor', () => {
  const arr: [number, number, number, number, number] = [1, 2, 3, 4, 3];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(new Vector4(arr)).toEqual({
    elements: new Float32Array([1, 2, 3, 4]),
  });
});

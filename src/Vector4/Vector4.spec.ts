import { test, expect } from 'vitest'
import { Vector4 } from './Vector4'

test('Vector4 constructor default', () => {
  expect(new Vector4()).toEqual({
    elements: new Float32Array([0, 0, 0, 0])
  })
})

test('Vector4 constructor', () => {
  expect(new Vector4([1, 2, 3, 4])).toEqual({
    elements: new Float32Array([1, 2, 3, 4])
  })
})

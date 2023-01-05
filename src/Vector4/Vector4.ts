/**
 * Тип пропросов массива из четырех элементов.
 *
 * @example ------
 * const arr: Array4 = [1, 2, 1, 0]
 */
export type Array4 = readonly [number, number, number, number];

/**
 * Vector4 __Четырехмерный Вектор (вектор из четырех элементов).__
 *
 * @example ------
 * new Vector4();
 */
class Vector4 {
  readonly elements: Float32Array;

  /**
   * Constructor.
   *
   * @constructs
   * @param {Array4} [arr4=[0, 0, 0, 0]] - The source vector.
   */
  constructor(arr4: Array4 = [0, 0, 0, 0]) {
    this.elements = new Float32Array(arr4.slice(0, 4));
  }
}

export { Vector4 };

/**
 * Тип пропросов массива из трех элементов.
 *
 * @example ------
 * const arr: Array4 = [1, 2, 1]
 */
export type Array3 = readonly [number, number, number];

/**
 * Vector3 - _Трехмерный вектор (вектор из трех элементов)._
 *
 * @example ------
 * new Vector3();
 */
class Vector3 {
  readonly elements: Float32Array;

  /**
   * Constructor.
   *
   * @param {Array3} [arr3=[0, 0, 0, 0]] - The source vector.
   */
  constructor(arr3: Array3 = [0, 0, 0]) {
    this.elements = new Float32Array(arr3.slice(0, 3));
  }

  /**
   * Нормализовать вектор.
   *
   * @returns {Vector3} this
   */
  normalize(): Vector3 {
    const vec3 = this.elements;
    const [c, d, e] = vec3;
    const g = Math.sqrt(c * c + d * d + e * e);

    if (g) {
      if (g === 1) {
        return this;
      }
    } else {
      vec3[0] = 0;
      vec3[1] = 0;
      vec3[2] = 0;
      return this;
    }
    const g1 = 1 / g;
    vec3[0] = c * g1;
    vec3[1] = d * g1;
    vec3[2] = e * g1;
    return this;
  }
}

export { Vector3 };

/**
 * Тип пропросов массива из четырех элементов.
 *
 * @example ------
 * const arr: Array4 = [1, 2, 1, 0]
 */
export type Array4 = readonly [number, number, number, number];

/**
 * Vector4 __Вектор из четырех элементов.__
 * Если указан opt_src, новый вектор инициализируется opt_src.
 * If opt_src is specified, new vector is initialized by opt_src.
 *
 * @example ------
 * new Vector4();
 */
class Vector4 {
  readonly elements: Float32Array;

  /**
   * Constructor.
   *
   * @param {Array4} [opt_src=[0, 0, 0, 0]] - The source vector.
   */
  constructor(opt_src: Array4 = [0, 0, 0, 0]) {
    this.elements = new Float32Array(opt_src.slice(0, 4));
  }
}

export { Vector4 };

new Vector4();

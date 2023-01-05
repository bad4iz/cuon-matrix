/**
 * @typedef {} Float
 */

/**
 * Vector4
 * __Вектор из четырех элементов.__
 *
 * Если указан opt_src, новый вектор инициализируется opt_src.
 * If opt_src is specified, new vector is initialized by opt_src.
 *
 * @class
 * @param {[Float, Float, Float, Float]} [opt_src] - Source vector(option).
 */
class Vector4 {
  readonly elements: Float32Array;
  constructor(opt_src: [number, number, number, number] = [0, 0, 0, 0]) {
    this.elements = new Float32Array(opt_src.slice(0, 4));
  }
}

export { Vector4 };

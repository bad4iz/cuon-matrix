/**
 * Конструктор Vector3
 * Если указан opt_src, новый вектор инициализируется opt_src.
 *
 * @param opt_src source vector(option)
 */
class Vector3 {
  readonly elements: Float32Array;

  constructor(opt_src: [number, number, number] = [0, 0, 0]) {
    this.elements = new Float32Array(opt_src.slice(0, 3));
  }

  /**
   * Нормализовать.
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

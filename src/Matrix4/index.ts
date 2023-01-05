import { Vector3 } from '~/Vector3';
import { Vector4 } from '~/Vector4';

/**
 * @name cuon-matrix @2022
 * @author bad4iz
 */

/**
 * Это класс, обрабатывающий матрицу 4x4.
 * Этот класс содержит функцию, эквивалентную матричному стеку OpenGL.
 * Матрица после преобразования вычисляется путем умножения матрицы преобразования справа.
 * Матрица заменяется рассчитанным результатом.
 *
 * @param {Array} optSrc исходная матрица(опция)
 */
class Matrix4 {
  constructor(optSrc) {
    let i, s, d;
    if (optSrc && typeof optSrc === 'object' && optSrc.hasOwnProperty('elements')) {
      s = optSrc.elements;
      d = new Float32Array(16);
      for (i = 0; i < 16; ++i) {
        d[i] = s[i];
      }
      this.elements = d;
    } else {
      this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
  }

  /**
   * Установить тождественную матрицу.
   *
   * @returns {Matrix4} this
   */
  setIdentity() {
    let e = this.elements;
    e[0] = 1;
    e[4] = 0;
    e[8] = 0;
    e[12] = 0;
    e[1] = 0;
    e[5] = 1;
    e[9] = 0;
    e[13] = 0;
    e[2] = 0;
    e[6] = 0;
    e[10] = 1;
    e[14] = 0;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
  }

  /**
   * Копировать матрицу.
   *
   * @param src исходная матрица
   * @return this
   */
  set(src) {
    let i, s, d;

    s = src.elements;
    d = this.elements;

    if (s === d) {
      return;
    }

    for (i = 0; i < 16; ++i) {
      d[i] = s[i];
    }

    return this;
  }

  /**
   * Умножить матрицу справа.
   *
   * @param other Матрица умножения
   * @return this
   */
  concat(other) {
    let i, e, a, b, ai0, ai1, ai2, ai3;

    // Вычислить e = a * b
    e = this.elements;
    a = this.elements;
    b = other.elements;

    // Если e равно b, скопировать b во временную матрицу.
    if (e === b) {
      b = new Float32Array(16);
      for (i = 0; i < 16; ++i) {
        b[i] = e[i];
      }
    }

    for (i = 0; i < 4; i++) {
      ai0 = a[i];
      ai1 = a[i + 4];
      ai2 = a[i + 8];
      ai3 = a[i + 12];
      e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
      e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
      e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
      e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }

    return this;
  }

  multiply(...args) {
    this.concat(...args);
  }

  /**
   * Умножить на трехмерный вектор.
   * @param pos  Вектор умножения
   * @return Результат умножения(Float32Array)
   */
  multiplyVector3(pos) {
    let e = this.elements;
    let p = pos.elements;
    let v = new Vector3();
    let result = v.elements;

    result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[12];
    result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[13];
    result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[14];

    return v;
  }

  /**
   * Умножить четырехмерный вектор.
   * @param pos Вектор умножения
   * @return Результат умножения(Float32Array)
   */
  multiplyVector4(pos) {
    let e = this.elements;
    let p = pos.elements;
    let v = new Vector4();
    let result = v.elements;

    result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
    result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
    result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
    result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

    return v;
  }

  /**
   * Переставить (транспонировать) матрицу.
   *
   * @returns {Matrix4} this
   */
  transpose() {
    let e, t;

    e = this.elements;

    t = e[1];
    e[1] = e[4];
    e[4] = t;
    t = e[2];
    e[2] = e[8];
    e[8] = t;
    t = e[3];
    e[3] = e[12];
    e[12] = t;
    t = e[6];
    e[6] = e[9];
    e[9] = t;
    t = e[7];
    e[7] = e[13];
    e[13] = t;
    t = e[11];
    e[11] = e[14];
    e[14] = t;

    return this;
  }

  /**
   * Вычислить обратную матрицу указанной матрицы и установить значение this.
   * @param other Исходная матрица
   * @return this
   */
  setInverseOf(other) {
    let i, s, d, inv, det;

    s = other.elements;
    d = this.elements;
    inv = new Float32Array(16);

    inv[0] =
      s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15] + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
    inv[4] =
      -s[4] * s[10] * s[15] +
      s[4] * s[11] * s[14] +
      s[8] * s[6] * s[15] -
      s[8] * s[7] * s[14] -
      s[12] * s[6] * s[11] +
      s[12] * s[7] * s[10];
    inv[8] =
      s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15] + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
    inv[12] =
      -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14] - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];

    inv[1] =
      -s[1] * s[10] * s[15] +
      s[1] * s[11] * s[14] +
      s[9] * s[2] * s[15] -
      s[9] * s[3] * s[14] -
      s[13] * s[2] * s[11] +
      s[13] * s[3] * s[10];
    inv[5] =
      s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15] + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
    inv[9] =
      -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15] - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
    inv[13] =
      s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14] + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];

    inv[2] =
      s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15] + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
    inv[6] =
      -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15] - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
    inv[10] =
      s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15] + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
    inv[14] =
      -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14] - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];

    inv[3] =
      -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11] - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
    inv[7] =
      s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11] + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
    inv[11] =
      -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11] - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
    inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10] + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];

    det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
    if (det === 0) {
      return this;
    }

    det = 1 / det;
    for (i = 0; i < 16; i++) {
      d[i] = inv[i] * det;
    }

    return this;
  }

  /**
   * Вычислить обратную матрицу this и установить значение this.
   * @return this
   */
  invert() {
    return this.setInverseOf(this);
  }

  /**
   * Установить матрицу ортогональной проекции.
   * @param left Координата слева от плоскости отсечения.
   * @param right Координата справа от плоскости отсечения.
   * @param bottom Координата нижней части плоскости отсечения.
   * @param top Координата верхней плоскости отсечения.
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение равно минусу, если плоскость должна находиться позади наблюдателя.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение равно минусу, если плоскость должна находиться позади наблюдателя.
   * @return this
   */
  setOrtho(left, right, bottom, top, near, far) {
    let e, rw, rh, rd;

    if (left === right || bottom === top || near === far) {
      throw 'null frustum';
    }

    rw = 1 / (right - left);
    rh = 1 / (top - bottom);
    rd = 1 / (far - near);

    e = this.elements;

    e[0] = 2 * rw;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = 2 * rh;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -2 * rd;
    e[11] = 0;

    e[12] = -(right + left) * rw;
    e[13] = -(top + bottom) * rh;
    e[14] = -(far + near) * rd;
    e[15] = 1;

    return this;
  }

  /**
   * Умножение матрицы ортогональной проекции справа.
   * @param left Координата слева от плоскости отсечения.
   * @param right Координата справа от плоскости отсечения.
   * @param bottom Координата нижней части плоскости отсечения.
   * @param top Координата верхней плоскости отсечения.
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение равно минусу, если плоскость должна находиться позади наблюдателя.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение равно минусу, если плоскость должна находиться позади наблюдателя.
   * @return this
   */
  ortho(left, right, bottom, top, near, far) {
    return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
  }

  /**
   * Установить матрицу перспективной проекции.
   * @param left Координата слева от плоскости отсечения.
   * @param right Координата справа от плоскости отсечения.
   * @param bottom Координата нижней части плоскости отсечения.
   * @param top Координата верхней плоскости отсечения.
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение должно быть плюсовым значением.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение должно быть плюсовым значением.
   * @return this
   */
  setFrustum(left, right, bottom, top, near, far) {
    let e, rw, rh, rd;

    if (left === right || top === bottom || near === far) {
      throw 'null frustum';
    }
    if (near <= 0) {
      throw 'near <= 0';
    }
    if (far <= 0) {
      throw 'far <= 0';
    }

    rw = 1 / (right - left);
    rh = 1 / (top - bottom);
    rd = 1 / (far - near);

    e = this.elements;

    e[0] = 2 * near * rw;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = 2 * near * rh;
    e[6] = 0;
    e[7] = 0;

    e[8] = (right + left) * rw;
    e[9] = (top + bottom) * rh;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
  }

  /**
   * Умножить матрицу перспективной проекции справа.
   * @param left Координата слева от плоскости отсечения.
   * @param right Координата справа от плоскости отсечения.
   * @param bottom Координата нижней части плоскости отсечения.
   * @param top Координата верхней плоскости отсечения.
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение должно быть плюсовым значением.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение должно быть плюсовым значением.
   * @return this
   */
  frustum(left, right, bottom, top, near, far) {
    return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
  }

  /**
   * Установить матрицу перспективной проекции по fov и аспекту.
   * @param fovy Угол между верхней и нижней сторонами усеченного конуса.
   * @param aspect Соотношение сторон усеченного конуса. (ширина/высота)
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение должно быть плюсовым значением.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение должно быть плюсовым значением.
   * @return this
   */
  setPerspective(fovy, aspect, near, far) {
    let e, rd, s, ct;

    if (near === far || aspect === 0) {
      throw 'null frustum';
    }
    if (near <= 0) {
      throw 'near <= 0';
    }
    if (far <= 0) {
      throw 'far <= 0';
    }

    fovy = (Math.PI * fovy) / 180 / 2;
    s = Math.sin(fovy);
    if (s === 0) {
      throw 'null frustum';
    }

    rd = 1 / (far - near);
    ct = Math.cos(fovy) / s;

    e = this.elements;

    e[0] = ct / aspect;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = ct;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
  }

  /**
   * Умножить матрицу перспективной проекции справа.
   * @param fovy Угол между верхней и нижней сторонами усеченного конуса.
   * @param aspect Соотношение сторон усеченного конуса. (ширина/высота)
   * @param near Расстояния до ближайшей плоскости отсечения глубины. Это значение должно быть плюсовым значением.
   * @param far Расстояния до плоскости отсечения большей глубины. Это значение должно быть плюсовым значением.
   * @return this
   */
  perspective(fovy, aspect, near, far) {
    return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
  }

  /**
   * Установить матрицу для масштабирования.
   * @param x Коэффициент масштаба по оси X
   * @param y Коэффициент масштаба по оси Y
   * @param z Коэффициент масштаба по оси Z
   * @return this
   */
  setScale(x, y, z) {
    let e = this.elements;
    e[0] = x;
    e[4] = 0;
    e[8] = 0;
    e[12] = 0;
    e[1] = 0;
    e[5] = y;
    e[9] = 0;
    e[13] = 0;
    e[2] = 0;
    e[6] = 0;
    e[10] = z;
    e[14] = 0;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
  }

  /**
   * Умножить матрицу для масштабирования справа.
   * @param x Коэффициент масштаба по оси X
   * @param y Коэффициент масштаба по оси Y
   * @param z Коэффициент масштаба по оси Z
   * @return this
   */
  scale(x, y, z) {
    let e = this.elements;
    e[0] *= x;
    e[4] *= y;
    e[8] *= z;
    e[1] *= x;
    e[5] *= y;
    e[9] *= z;
    e[2] *= x;
    e[6] *= y;
    e[10] *= z;
    e[3] *= x;
    e[7] *= y;
    e[11] *= z;
    return this;
  }

  /**
   * Установить матрицу для перемещения.
   * @param x Значение X для перемещения.
   * @param y Y значение перемещения.
   * @param z Значение Z перемещения.
   * @return this
   */
  setTranslate(x, y, z) {
    let e = this.elements;
    e[0] = 1;
    e[4] = 0;
    e[8] = 0;
    e[12] = x;
    e[1] = 0;
    e[5] = 1;
    e[9] = 0;
    e[13] = y;
    e[2] = 0;
    e[6] = 0;
    e[10] = 1;
    e[14] = z;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
  }

  /**
   * Умножить матрицу для перемещения справа.
   * @param x Значение X для перемещения.
   * @param y Y значение перемещения.
   * @param z Значение Z перемещения.
   * @return this
   */
  translate(x, y, z) {
    let e = this.elements;
    e[12] += e[0] * x + e[4] * y + e[8] * z;
    e[13] += e[1] * x + e[5] * y + e[9] * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this;
  }

  /**
   * Установить матрицу для вращения.
   * Вектор оси вращения может быть не нормализован.
   * @param angle Угол поворота (градусы)
   * @param x Координата X вектора оси вращения.
   * @param y Координата Y вектора оси вращения.
   * @param z Координата Z вектора оси вращения.
   * @return this
   */
  setRotate(angle, x, y, z) {
    let e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

    angle = (Math.PI * angle) / 180;
    e = this.elements;

    s = Math.sin(angle);
    c = Math.cos(angle);

    if (0 !== x && 0 === y && 0 === z) {
      // Вращение вокруг оси X
      if (x < 0) {
        s = -s;
      }
      e[0] = 1;
      e[4] = 0;
      e[8] = 0;
      e[12] = 0;
      e[1] = 0;
      e[5] = c;
      e[9] = -s;
      e[13] = 0;
      e[2] = 0;
      e[6] = s;
      e[10] = c;
      e[14] = 0;
      e[3] = 0;
      e[7] = 0;
      e[11] = 0;
      e[15] = 1;
    } else if (0 === x && 0 !== y && 0 === z) {
      // Вращение вокруг оси Y
      if (y < 0) {
        s = -s;
      }
      e[0] = c;
      e[4] = 0;
      e[8] = s;
      e[12] = 0;
      e[1] = 0;
      e[5] = 1;
      e[9] = 0;
      e[13] = 0;
      e[2] = -s;
      e[6] = 0;
      e[10] = c;
      e[14] = 0;
      e[3] = 0;
      e[7] = 0;
      e[11] = 0;
      e[15] = 1;
    } else if (0 === x && 0 === y && 0 !== z) {
      // Вращение вокруг оси Z
      if (z < 0) {
        s = -s;
      }
      e[0] = c;
      e[4] = -s;
      e[8] = 0;
      e[12] = 0;
      e[1] = s;
      e[5] = c;
      e[9] = 0;
      e[13] = 0;
      e[2] = 0;
      e[6] = 0;
      e[10] = 1;
      e[14] = 0;
      e[3] = 0;
      e[7] = 0;
      e[11] = 0;
      e[15] = 1;
    } else {
      // Вращение вокруг другой оси
      len = Math.sqrt(x * x + y * y + z * z);
      if (len !== 1) {
        rlen = 1 / len;
        x *= rlen;
        y *= rlen;
        z *= rlen;
      }
      nc = 1 - c;
      xy = x * y;
      yz = y * z;
      zx = z * x;
      xs = x * s;
      ys = y * s;
      zs = z * s;

      e[0] = x * x * nc + c;
      e[1] = xy * nc + zs;
      e[2] = zx * nc - ys;
      e[3] = 0;

      e[4] = xy * nc - zs;
      e[5] = y * y * nc + c;
      e[6] = yz * nc + xs;
      e[7] = 0;

      e[8] = zx * nc + ys;
      e[9] = yz * nc - xs;
      e[10] = z * z * nc + c;
      e[11] = 0;

      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;
    }

    return this;
  }

  /**
   * Умножить матрицу для поворота справа.
   * Вектор оси вращения может быть не нормализован.
   * @param angle Угол поворота (градусы)
   * @param x Координата X вектора оси вращения.
   * @param y Координата Y вектора оси вращения.
   * @param z Координата Z вектора оси вращения.
   * @return this
   */
  rotate(angle, x, y, z) {
    return this.concat(new Matrix4().setRotate(angle, x, y, z));
  }

  /**
   * Установливаем матрицу просмотра.
   * @param eyeX, eyeY, eyeZ Положение точки глаза.
   * @param centerX, centerY, centerZ Положение контрольной точки.
   * @param upX, upY, upZ Направление вектора вверх.
   * @return this
   */
  setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    let e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

    fx = centerX - eyeX;
    fy = centerY - eyeY;
    fz = centerZ - eyeZ;

    // Нормализуем f.
    rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;

    // Вычисляем перекрестное произведение f и выше.
    sx = fy * upZ - fz * upY;
    sy = fz * upX - fx * upZ;
    sz = fx * upY - fy * upX;

    // Нормализуем s.
    rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    // Вычисляем перекрестное произведение s и f.
    ux = sy * fz - sz * fy;
    uy = sz * fx - sx * fz;
    uz = sx * fy - sy * fx;

    // записать в this.
    e = this.elements;
    e[0] = sx;
    e[1] = ux;
    e[2] = -fx;
    e[3] = 0;

    e[4] = sy;
    e[5] = uy;
    e[6] = -fy;
    e[7] = 0;

    e[8] = sz;
    e[9] = uz;
    e[10] = -fz;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;

    // Перевести.
    return this.translate(-eyeX, -eyeY, -eyeZ);
  }

  /**
   * Умножить матрицу просмотра справа.
   * @param eyeX, eyeY, eyeZ Положение точки глаза.
   * @param centerX, centerY, centerZ Положение контрольной точки.
   * @param upX, upY, upZ Направление вектора вверх.
   * @return this
   */
  lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
  }

  /**
   * Умножить матрицу для проекции вершины на плоскость справа.
   * @param plane Массив[A, B, C, D] уравнения плоскости "Ax + By + Cz + D = 0".
   * @param light Массив, в котором хранятся координаты источника света. если свет[3]=0, то рассматривается как параллельный свет.
   * @return this
   */
  dropShadow(plane, light) {
    const mat = new Matrix4();
    let e = mat.elements;

    let dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

    e[0] = dot - light[0] * plane[0];
    e[1] = -light[1] * plane[0];
    e[2] = -light[2] * plane[0];
    e[3] = -light[3] * plane[0];

    e[4] = -light[0] * plane[1];
    e[5] = dot - light[1] * plane[1];
    e[6] = -light[2] * plane[1];
    e[7] = -light[3] * plane[1];

    e[8] = -light[0] * plane[2];
    e[9] = -light[1] * plane[2];
    e[10] = dot - light[2] * plane[2];
    e[11] = -light[3] * plane[2];

    e[12] = -light[0] * plane[3];
    e[13] = -light[1] * plane[3];
    e[14] = -light[2] * plane[3];
    e[15] = dot - light[3] * plane[3];

    return this.concat(mat);
  }

  /**
   * Умножение матрицы для проекции вершины на плоскость справа.(Проецируется параллельным светом.)
   * @param normX, normX, normY, normZ - вектор нормали к плоскости.(Нет необходимости в нормализации.)
   * @param planeX, planeY, planeZ Координата произвольных точек на плоскости.
   * @param lightX, lightY, lightZ Вектор направления света.(Нет необходимости в нормализации.)
   * @return this
   */
  dropShadowDirectionally(normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
    let a = planeX * normX + planeY * normY + planeZ * normZ;
    return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
  }
}

export { Matrix4 };

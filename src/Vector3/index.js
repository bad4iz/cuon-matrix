
/**
 * Constructor of Vector3
 * If opt_src is specified, new vector is initialized by opt_src.
 * @param opt_src source vector(option)
 */
const Vector3 = function(opt_src) {
    const v = new Float32Array(3);
    if (opt_src && typeof opt_src === 'object') {
        v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2];
    }
    this.elements = v;
}

/**
 * Normalize.
 * @return this
 */
Vector3.prototype.normalize = function() {
    const v = this.elements;
    let c = v[0], d = v[1], e = v[2], g = Math.sqrt(c*c+d*d+e*e);
    if(g){
        if(g == 1)
            return this;
    } else {
        v[0] = 0; v[1] = 0; v[2] = 0;
        return this;
    }
    g = 1/g;
    v[0] = c*g; v[1] = d*g; v[2] = e*g;
    return this;
};


export {Vector3}

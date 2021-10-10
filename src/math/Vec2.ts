
export class Vec2 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 2;}

  /** static method ========================================================= */

  /** getter ================================================================ */
  get x(): number {return this.value[0];}
  get y(): number {return this.value[1];}
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /** setter ================================================================ */
  set x(v: number) {this.value[0] = v;}
  set y(v: number) {this.value[1] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Vec2.DIMENSION_COUNT);

  /** constructor =========================================================== */
  constructor(x: number = 0.0, y: number = 0.0) {
    this.set(x, y);
  }

  /** chain method ========================================================== */
  set(x: number, y: number): Vec2 {
    this.x = x;
    this.y = y;
    return this;
  }
  setScalar(scalar: number): Vec2 {
    this.x = scalar;
    this.y = scalar;
    return this;
  }
  copy(v: Vec2): Vec2 {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  add(v: Vec2): Vec2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(v: Vec2): Vec2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  mul(v: Vec2): Vec2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  div(v: Vec2): Vec2 {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  lerp(t: number, v: Vec2): Vec2 {
    const diff = v.subVec2(this);
    this.x = this.x + diff.x * t;
    this.y = this.y + diff.y * t;
    return this;
  }
  normalize(): Vec2 {
    const length = this.length;
    if(length !== 0.0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }
  negate(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /** method ================================================================ */
  sum(): number {
    return this.x + this.y;
  }
  difference(): number {
    return this.x - this.y;
  }
  product(): number {
    return this.x * this.y;
  }
  quotient(): number {
    return this.x / this.y;
  }
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }
  addScalar(v: number): Vec2 {
    return new Vec2(
      this.x + v,
      this.y + v,
    );
  }
  subScalar(v: number): Vec2 {
    return new Vec2(
      this.x - v,
      this.y - v,
    );
  }
  mulScalar(v: number): Vec2 {
    return new Vec2(
      this.x * v,
      this.y * v,
    );
  }
  divScalar(v: number): Vec2 {
    return new Vec2(
      this.x / v,
      this.y / v,
    );
  }
  addVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x + v.x,
      this.y + v.y,
    );
  }
  subVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x - v.x,
      this.y - v.y,
    );
  }
  mulVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x * v.x,
      this.y * v.y,
    );
  }
  divVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x / v.x,
      this.y / v.y,
    );
  }
  lerpVec2(t: number, v: Vec2): Vec2 {
    const diff = v.subVec2(this);
    return new Vec2(
      this.x + diff.x * t,
      this.y + diff.y * t,
    );
  }
  distance(v: Vec2): number {
    return v.clone().sub(this).length;
  }
  dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }
  cross(v: Vec2): number {
    return this.x * v.y - this.y * v.x;
  }
  equals(v: Vec2): boolean {
    return this.x === v.x && this.y === v.y;
  }
}

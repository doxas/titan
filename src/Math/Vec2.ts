
import { ForEach } from '../Utility/Signature';

export class Vec2 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 2;}

  /** static method ========================================================= */
  static zero(): Vec2 {return new Vec2(0.0, 0.0);}

  /** getter ================================================================ */
  get x(): number {return this.value[0];}
  get y(): number {return this.value[1];}
  get length(): number {
    return Math.hypot(this.x, this.y);
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
  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }
  setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;
    return this;
  }
  copy(v: Vec2): this {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  add(v: Vec2): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(v: Vec2): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  mul(v: Vec2): this {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  div(v: Vec2): this {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  addScalar(v: number): this {
    this.x += v;
    this.y += v;
    return this;
  }
  subScalar(v: number): this {
    this.x -= v;
    this.y -= v;
    return this;
  }
  mulScalar(v: number): this {
    this.x *= v;
    this.y *= v;
    return this;
  }
  divScalar(v: number): this {
    this.x /= v;
    this.y /= v;
    return this;
  }
  lerp(t: number, v: Vec2): this {
    const diff = v.subClone(this);
    this.x = this.x + diff.x * t;
    this.y = this.y + diff.y * t;
    return this;
  }
  normalize(): this {
    const length = this.length;
    if(length !== 0.0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }
  negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  invert(): this {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
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
  addClone(v: Vec2): Vec2 {
    return this.clone().add(v);
  }
  subClone(v: Vec2): Vec2 {
    return this.clone().sub(v);
  }
  mulClone(v: Vec2): Vec2 {
    return this.clone().mul(v);
  }
  divClone(v: Vec2): Vec2 {
    return this.clone().div(v);
  }
  addScalarClone(v: number): Vec2 {
    return this.clone().addScalar(v);
  }
  subScalarClone(v: number): Vec2 {
    return this.clone().subScalar(v);
  }
  mulScalarClone(v: number): Vec2 {
    return this.clone().mulScalar(v);
  }
  divScalarClone(v: number): Vec2 {
    return this.clone().divScalar(v);
  }
  lerpClone(t: number, v: Vec2): Vec2 {
    return this.clone().lerp(t, v);
  }
  normalizeClone(): Vec2 {
    return this.clone().normalize();
  }
  negateClone(): Vec2 {
    return this.clone().negate();
  }
  invertClone(): Vec2 {
    return this.clone().invert();
  }
  distance(v: Vec2): number {
    return v.subClone(this).length;
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
  toArray(): number[] {
    return [this.x, this.y];
  }
  toString(separator: string = ','): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}

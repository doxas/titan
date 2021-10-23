
import { ForEach } from '../Utility/Signature';

export class Vec3 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 3;}

  /** static method ========================================================= */
  static zero(): Vec3 {return new Vec3(0.0, 0.0, 0.0);}

  /** getter ================================================================ */
  get x(): number {return this.value[0];}
  get y(): number {return this.value[1];}
  get z(): number {return this.value[2];}
  get length(): number {
    return Math.hypot(this.x, this.y, this.z);
  }

  /** setter ================================================================ */
  set x(v: number) {this.value[0] = v;}
  set y(v: number) {this.value[1] = v;}
  set z(v: number) {this.value[2] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Vec3.DIMENSION_COUNT);

  /** constructor =========================================================== */
  constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
    this.set(x, y, z);
  }

  /** chain method ========================================================== */
  set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }
  copy(v: Vec3): this {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  add(v: Vec3): this {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  sub(v: Vec3): this {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  mul(v: Vec3): this {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }
  div(v: Vec3): this {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }
  addScalar(v: number): this {
    this.x += v;
    this.y += v;
    this.z += v;
    return this;
  }
  subScalar(v: number): this {
    this.x -= v;
    this.y -= v;
    this.z -= v;
    return this;
  }
  mulScalar(v: number): this {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    return this;
  }
  divScalar(v: number): this {
    this.x /= v;
    this.y /= v;
    this.z /= v;
    return this;
  }
  lerp(t: number, v: Vec3): this {
    const diff = v.subClone(this);
    this.x = this.x + diff.x * t;
    this.y = this.y + diff.y * t;
    this.z = this.z + diff.z * t;
    return this;
  }
  normalize(): this {
    const length = this.length;
    if(length !== 0.0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
    return this;
  }
  negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  invert(): this {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    return this;
  }

  /** method ================================================================ */
  sum(): number {
    return this.x + this.y + this.z;
  }
  difference(): number {
    return this.x - this.y - this.z;
  }
  product(): number {
    return this.x * this.y * this.z;
  }
  quotient(): number {
    return this.x / this.y / this.z;
  }
  clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }
  addClone(v: Vec3): Vec3 {
    return this.clone().add(v);
  }
  subClone(v: Vec3): Vec3 {
    return this.clone().sub(v);
  }
  mulClone(v: Vec3): Vec3 {
    return this.clone().mul(v);
  }
  divClone(v: Vec3): Vec3 {
    return this.clone().div(v);
  }
  addScalarClone(v: number): Vec3 {
    return this.clone().addScalar(v);
  }
  subScalarClone(v: number): Vec3 {
    return this.clone().subScalar(v);
  }
  mulScalarClone(v: number): Vec3 {
    return this.clone().mulScalar(v);
  }
  divScalarClone(v: number): Vec3 {
    return this.clone().divScalar(v);
  }
  lerpClone(t: number, v: Vec3): Vec3 {
    return this.clone().lerp(t, v);
  }
  normalizeClone(): Vec3 {
    return this.clone().normalize();
  }
  negateClone(): Vec3 {
    return this.clone().negate();
  }
  invertClone(): Vec3 {
    return this.clone().invert();
  }
  distance(v: Vec3): number {
    return v.subClone(this).length;
  }
  dot(v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v: Vec3): Vec3 {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }
  equals(v: Vec3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }
  toArray(): number[] {
    return [this.x, this.y, this.z];
  }
  toString(separator: string = ','): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}


import { ForEach } from "../Common/Signature";

export class Vec4 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 4;}

  /** static method ========================================================= */
  static zero(): Vec4 {return new Vec4(0.0, 0.0, 0.0, 0.0);}

  /** getter ================================================================ */
  get x(): number {return this.value[0];}
  get y(): number {return this.value[1];}
  get z(): number {return this.value[2];}
  get w(): number {return this.value[3];}
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  /** setter ================================================================ */
  set x(v: number) {this.value[0] = v;}
  set y(v: number) {this.value[1] = v;}
  set z(v: number) {this.value[2] = v;}
  set w(v: number) {this.value[3] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Vec4.DIMENSION_COUNT);

  /** constructor =========================================================== */
  constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0, w: number = 0.0) {
    this.set(x, y, z, w);
  }

  /** chain method ========================================================== */
  set(x: number, y: number, z: number, w: number): Vec4 {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  setScalar(scalar: number): Vec4 {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
    return this;
  }
  copy(v: Vec4): Vec4 {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w;
    return this;
  }
  add(v: Vec4): Vec4 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }
  sub(v: Vec4): Vec4 {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }
  mul(v: Vec4): Vec4 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }
  div(v: Vec4): Vec4 {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
    return this;
  }
  addScalar(v: number): Vec4 {
    this.x += v;
    this.y += v;
    this.z += v;
    this.w += v;
    return this;
  }
  subScalar(v: number): Vec4 {
    this.x -= v;
    this.y -= v;
    this.z -= v;
    this.w -= v;
    return this;
  }
  mulScalar(v: number): Vec4 {
    this.x *= v;
    this.y *= v;
    this.z *= v;
    this.w *= v;
    return this;
  }
  divScalar(v: number): Vec4 {
    this.x /= v;
    this.y /= v;
    this.z /= v;
    this.w /= v;
    return this;
  }
  lerp(t: number, v: Vec4): Vec4 {
    const diff = v.subClone(this);
    this.x = this.x + diff.x * t;
    this.y = this.y + diff.y * t;
    this.z = this.z + diff.z * t;
    this.w = this.w + diff.w * t;
    return this;
  }
  normalize(): Vec4 {
    const length = this.length;
    if(length !== 0.0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
      this.w /= length;
    }
    return this;
  }
  negate(): Vec4 {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  inverse(): Vec4 {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    this.z = 1.0 / this.z;
    this.w = 1.0 / this.w;
    return this;
  }

  /** method ================================================================ */
  sum(): number {
    return this.x + this.y + this.z + this.w;
  }
  difference(): number {
    return this.x - this.y - this.z - this.w;
  }
  product(): number {
    return this.x * this.y * this.z * this.w;
  }
  quotient(): number {
    return this.x / this.y / this.z / this.w;
  }
  clone(): Vec4 {
    return new Vec4(this.x, this.y, this.z, this.w);
  }
  addClone(v: Vec4): Vec4 {
    return this.clone().add(v);
  }
  subClone(v: Vec4): Vec4 {
    return this.clone().sub(v);
  }
  mulClone(v: Vec4): Vec4 {
    return this.clone().mul(v);
  }
  divClone(v: Vec4): Vec4 {
    return this.clone().div(v);
  }
  addScalarClone(v: number): Vec4 {
    return this.clone().addScalar(v);
  }
  subScalarClone(v: number): Vec4 {
    return this.clone().subScalar(v);
  }
  mulScalarClone(v: number): Vec4 {
    return this.clone().mulScalar(v);
  }
  divScalarClone(v: number): Vec4 {
    return this.clone().divScalar(v);
  }
  lerpClone(t: number, v: Vec4): Vec4 {
    return this.clone().lerp(t, v);
  }
  normalizeClone(): Vec4 {
    return this.clone().normalize();
  }
  distance(v: Vec4): number {
    return v.clone().sub(this).length;
  }
  dot(v: Vec4): number {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  equals(v: Vec4): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
  }
  toArray(): number[] {
    return [this.x, this.y, this.z, this.w];
  }
  toString(separator?: string): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}


import { ForEach } from '../Utility/Signature';
import { Vec2 } from './Vec2';

export class Mat2 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 2;}

  /** static method ========================================================= */
  static zero(): Mat2 {return new Mat2(0.0, 0.0, 0.0, 0.0);}
  static identityMatrix(): Mat2 {return new Mat2().identity();}
  static fromRotation(radian: number): Mat2 {
    const out = new Mat2();
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    out.m00 =  cos;
    out.m01 =  sin;
    out.m10 = -sin;
    out.m11 =  cos;
    return out;
  }
  static fromScalling(scale: number): Mat2 {
    const out = new Mat2();
    out.m00 = scale;
    out.m01 = 0.0;
    out.m10 = 0.0;
    out.m11 = scale;
    return out;
  }

  /** getter ================================================================ */
  get m00(): number {return this.value[0];}
  get m01(): number {return this.value[1];}
  get m10(): number {return this.value[2];}
  get m11(): number {return this.value[3];}
  get array(): Float32Array {
    return this.value;
  }

  /** setter ================================================================ */
  set m00(v: number) {this.value[0] = v;}
  set m01(v: number) {this.value[1] = v;}
  set m10(v: number) {this.value[2] = v;}
  set m11(v: number) {this.value[3] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Math.pow(Mat2.DIMENSION_COUNT, 2));

  /** constructor =========================================================== */
  constructor(
    m00: number = 0.0,
    m01: number = 0.0,
    m10: number = 0.0,
    m11: number = 0.0,
  ) {
    this.set(m00, m01, m10, m11);
  }

  /** chain method ========================================================== */
  set(
    m00: number,
    m01: number,
    m10: number,
    m11: number,
  ): this {
    this.m00 = m00;
    this.m01 = m01;
    this.m10 = m10;
    this.m11 = m11;
    return this;
  }
  setScalar(scalar: number): this {
    this.m00 = scalar;
    this.m01 = scalar;
    this.m10 = scalar;
    this.m11 = scalar;
    return this;
  }
  copy(v: Mat2): this {
    this.m00 = v.m00;
    this.m01 = v.m01;
    this.m10 = v.m10;
    this.m11 = v.m11;
    return this;
  }
  identity(): this {
    this.m00 = 1.0;
    this.m01 = 0.0;
    this.m10 = 0.0;
    this.m11 = 1.0;
    return this;
  }
  transpose(): this {
    const m01 = this.m01;
    const m10 = this.m10;
    this.m01 = m01;
    this.m10 = m10;
    return this;
  }
  multiply(v: Mat2): this {
    const m00 = this.m00;
    const m01 = this.m01;
    const m10 = this.m10;
    const m11 = this.m11;
    this.m00 = m00 * v.m00 + m10 * v.m01;
    this.m01 = m01 * v.m00 + m11 * v.m01;
    this.m10 = m00 * v.m10 + m10 * v.m11;
    this.m11 = m01 * v.m10 + m11 * v.m11;
    return this;
  }
  rotate(radian: number): this {
    const m00 = this.m00;
    const m01 = this.m01;
    const m10 = this.m10;
    const m11 = this.m11;
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    this.m00 = m00 *  cos + m10 * sin;
    this.m01 = m01 *  cos + m11 * sin;
    this.m10 = m00 * -sin + m10 * cos;
    this.m11 = m01 * -sin + m11 * cos;
    return this;
  }
  scale(v: Vec2): this {
    this.m00 *= v.x;
    this.m01 *= v.x;
    this.m10 *= v.y;
    this.m11 *= v.y;
    return this;
  }
  invert(): this {
    const m00 = this.m00;
    const m01 = this.m01;
    const m10 = this.m10;
    const m11 = this.m11;
    const determinant = this.determinant();
    if(determinant !== 0.0) {
      const inverseDeterminant = 1.0 / determinant;
      this.m00 =  m11 * inverseDeterminant;
      this.m01 = -m01 * inverseDeterminant;
      this.m10 = -m10 * inverseDeterminant;
      this.m11 =  m00 * inverseDeterminant;
    }
    return this;
  }

  /** method ================================================================ */
  clone(): Mat2 {
    return new Mat2(
      this.m00,
      this.m01,
      this.m10,
      this.m11,
    );
  }
  multiplyClone(v: Mat2): Mat2 {
    return this.clone().multiply(v);
  }
  rotateClone(radian: number): Mat2 {
    return this.clone().rotate(radian);
  }
  scaleClone(v: Vec2): Mat2 {
    return this.clone().scale(v);
  }
  invertClone(): Mat2 {
    return this.clone().invert();
  }
  determinant(): number {
    return this.m00 * this.m11 - this.m10 * this.m01;
  }
  equals(v: Mat2): boolean {
    return (
      this.m00 === v.m00 &&
      this.m01 === v.m01 &&
      this.m10 === v.m10 &&
      this.m11 === v.m11
    );
  }
  toArray(): number[] {
    return [this.m00, this.m01, this.m10, this.m11];
  }
  toString(separator: string = ','): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}

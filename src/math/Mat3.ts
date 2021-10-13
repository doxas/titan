
import { ForEach } from "../Common/Signature";
import { Vec2 } from "./Vec2";

export class Mat3 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 3;}

  /** static method ========================================================= */
  static zero(): Mat3 {return new Mat3(
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
  );}
  static identityMatrix(): Mat3 {return new Mat3().identity();}

  /** getter ================================================================ */
  get m00(): number {return this.value[0];}
  get m01(): number {return this.value[1];}
  get m02(): number {return this.value[2];}
  get m10(): number {return this.value[3];}
  get m11(): number {return this.value[4];}
  get m12(): number {return this.value[5];}
  get m20(): number {return this.value[6];}
  get m21(): number {return this.value[7];}
  get m22(): number {return this.value[8];}

  /** setter ================================================================ */
  set m00(v: number) {this.value[0] = v;}
  set m01(v: number) {this.value[1] = v;}
  set m02(v: number) {this.value[2] = v;}
  set m10(v: number) {this.value[3] = v;}
  set m11(v: number) {this.value[4] = v;}
  set m12(v: number) {this.value[5] = v;}
  set m20(v: number) {this.value[6] = v;}
  set m21(v: number) {this.value[7] = v;}
  set m22(v: number) {this.value[8] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Math.pow(Mat3.DIMENSION_COUNT, 2));

  /** constructor =========================================================== */
  constructor(
    m00: number = 0.0,
    m01: number = 0.0,
    m02: number = 0.0,
    m10: number = 0.0,
    m11: number = 0.0,
    m12: number = 0.0,
    m20: number = 0.0,
    m21: number = 0.0,
    m22: number = 0.0,
  ) {
    this.set(
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22,
    );
  }

  /** chain method ========================================================== */
  set(
    m00: number,
    m01: number,
    m02: number,
    m10: number,
    m11: number,
    m12: number,
    m20: number,
    m21: number,
    m22: number,
  ): Mat3 {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
    return this;
  }
  setScalar(scalar: number): Mat3 {
    this.m00 = scalar;
    this.m01 = scalar;
    this.m02 = scalar;
    this.m10 = scalar;
    this.m11 = scalar;
    this.m12 = scalar;
    this.m20 = scalar;
    this.m21 = scalar;
    this.m22 = scalar;
    return this;
  }
  copy(v: Mat3): Mat3 {
    this.m00 = v.m00;
    this.m01 = v.m01;
    this.m02 = v.m02;
    this.m10 = v.m10;
    this.m11 = v.m11;
    this.m12 = v.m12;
    this.m20 = v.m20;
    this.m21 = v.m21;
    this.m22 = v.m22;
    return this;
  }
  identity(): Mat3 {
    this.m00 = 1.0;
    this.m01 = 0.0;
    this.m02 = 0.0;
    this.m10 = 0.0;
    this.m11 = 1.0;
    this.m12 = 0.0;
    this.m20 = 0.0;
    this.m21 = 0.0;
    this.m22 = 1.0;
    return this;
  }
  transpose(): Mat3 {
    const m01 = this.m01;
    const m02 = this.m02;
    const m10 = this.m10;
    const m12 = this.m12;
    const m20 = this.m20;
    const m21 = this.m21;
    this.m01 = m10;
    this.m02 = m20;
    this.m10 = m01;
    this.m12 = m21;
    this.m20 = m02;
    this.m21 = m12;
    return this;
  }
  multiply(v: Mat3): Mat3 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    this.m00 = m00 * v.m00 + m10 * v.m01 + m20 * v.m02;
    this.m01 = m01 * v.m00 + m11 * v.m01 + m21 * v.m02;
    this.m02 = m02 * v.m00 + m12 * v.m01 + m22 * v.m02;
    this.m10 = m00 * v.m10 + m10 * v.m11 + m20 * v.m12;
    this.m11 = m01 * v.m10 + m11 * v.m11 + m21 * v.m12;
    this.m12 = m02 * v.m10 + m12 * v.m11 + m22 * v.m12;
    this.m20 = m00 * v.m20 + m10 * v.m21 + m20 * v.m22;
    this.m21 = m01 * v.m20 + m11 * v.m21 + m21 * v.m22;
    this.m22 = m02 * v.m20 + m12 * v.m21 + m22 * v.m22;
    return this;
  }
  translate(v: Vec2): Mat3 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    this.m20 = v.x * m00 + v.y * m10 + m20;
    this.m21 = v.x * m01 + v.y * m11 + m21;
    this.m22 = v.x * m02 + v.y * m12 + m22;
    return this;
  }
  rotate(radian: number): Mat3 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    this.m00 = cos * m00 + sin * m10;
    this.m01 = cos * m01 + sin * m11;
    this.m02 = cos * m02 + sin * m12;
    this.m10 = cos * m10 - sin * m00;
    this.m11 = cos * m11 - sin * m01;
    this.m12 = cos * m12 - sin * m02;
    return this;
  }
  scale(v: Vec2): Mat3 {
    this.m00 *= v.x;
    this.m01 *= v.x;
    this.m02 *= v.x;
    this.m10 *= v.y;
    this.m11 *= v.y;
    this.m12 *= v.y;
    return this;
  }
  invert(): Mat3 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const determinant = this.determinant();
    if(determinant !== 0.0) {
      const inverseDeterminant = 1.0 / determinant;
      const a =  m22 * m11 - m12 * m21;
      const b = -m22 * m10 + m12 * m20;
      const c =  m21 * m10 - m11 * m20;
      this.m00 = a * inverseDeterminant;
      this.m01 = (-m22 * m01 + m02 * m21) * inverseDeterminant;
      this.m02 = ( m12 * m01 - m02 * m11) * inverseDeterminant;
      this.m10 = b * inverseDeterminant;
      this.m11 = ( m22 * m00 - m02 * m20) * inverseDeterminant;
      this.m12 = (-m12 * m00 + m02 * m10) * inverseDeterminant;
      this.m20 = c * inverseDeterminant;
      this.m21 = (-m21 * m00 + m01 * m20) * inverseDeterminant;
      this.m22 = ( m11 * m00 - m01 * m10) * inverseDeterminant;
    }
    return this;
  }
  fromTranslation(v: Vec2): Mat3 {
    this.m00 = 1.0;
    this.m01 = 0.0;
    this.m02 = 0.0;
    this.m10 = 0.0;
    this.m11 = 1.0;
    this.m12 = 0.0;
    this.m20 = v.x;
    this.m21 = v.y;
    this.m22 = 1.0;
    return this;
  }
  fromRotation(radian: number): Mat3 {
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    this.m00 =  cos;
    this.m01 =  sin;
    this.m02 =  0.0;
    this.m10 = -sin;
    this.m11 =  cos;
    this.m12 =  0.0;
    this.m20 =  0.0;
    this.m21 =  0.0;
    this.m22 =  1.0;
    return this;
  }
  fromScalling(v: Vec2): Mat3 {
    this.m00 = v.x;
    this.m01 = 0.0;
    this.m02 = 0.0;
    this.m10 = 0.0;
    this.m11 = v.y;
    this.m12 = 0.0;
    this.m20 = 0.0;
    this.m21 = 0.0;
    this.m22 = 1.0;
    return this;
  }

  /** method ================================================================ */
  clone(): Mat3 {
    return new Mat3(
      this.m00,
      this.m01,
      this.m02,
      this.m10,
      this.m11,
      this.m12,
      this.m20,
      this.m21,
      this.m22,
    );
  }
  multiplyClone(v: Mat3): Mat3 {
    return this.clone().multiply(v);
  }
  translateClone(v: Vec2): Mat3 {
    return this.clone().translate(v);
  }
  rotateClone(radian: number): Mat3 {
    return this.clone().rotate(radian);
  }
  scaleClone(v: Vec2): Mat3 {
    return this.clone().scale(v);
  }
  invertClone(): Mat3 {
    return this.clone().invert();
  }
  determinant(): number {
    return (
      this.m00 * ( this.m22 * this.m11 - this.m12 * this.m21) +
      this.m01 * (-this.m22 * this.m10 + this.m12 * this.m20) +
      this.m02 * ( this.m21 * this.m10 - this.m11 * this.m20)
    );
  }
  equals(v: Mat3): boolean {
    return (
      this.m00 === v.m00 &&
      this.m01 === v.m01 &&
      this.m02 === v.m02 &&
      this.m10 === v.m10 &&
      this.m11 === v.m11 &&
      this.m12 === v.m12 &&
      this.m20 === v.m20 &&
      this.m21 === v.m21 &&
      this.m22 === v.m22
    );
  }
  toArray(): number[] {
    return [
      this.m00,
      this.m01,
      this.m02,
      this.m10,
      this.m11,
      this.m12,
      this.m20,
      this.m21,
      this.m22,
    ];
  }
  toString(separator?: string): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}


import { ForEach } from '../Utility/Signature';
import { Vec3 } from './Vec3';

export class Mat4 {
  /** static getter ========================================================= */
  static get DIMENSION_COUNT(): number {return 3;}

  /** static method ========================================================= */
  static zero(): Mat4 {return new Mat4(
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
  );}
  static identityMatrix(): Mat4 {return new Mat4().identity();}
  static fromTranslation(v: Vec3): Mat4 {
    const out = new Mat4();
    out.m00 = 1.0;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = 1.0;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22 = 1.0;
    out.m23 = 0.0;
    out.m20 = v.x;
    out.m21 = v.y;
    out.m22 = v.z;
    out.m23 = 1.0;
    return out;
  }
  static fromRotation(radian: number, axis: Vec3): Mat4 {
    const out = new Mat4();
    const axisLength = axis.length;
    if(axisLength !== 0.0){
      const sin = Math.sin(radian);
      const cos = Math.cos(radian);
      const inv = 1.0 - cos;
      const normalizedAxis = axis.normalizeClone();
      const nx = normalizedAxis.x;
      const ny = normalizedAxis.y;
      const nz = normalizedAxis.z;
      out.m00 = nx * nx * inv + cos;
      out.m01 = ny * nx * inv + nz * sin;
      out.m02 = nz * nx * inv - ny * sin;
      out.m03 = 0.0;
      out.m10 = nx * ny * inv - nz * sin;
      out.m11 = ny * ny * inv + cos;
      out.m12 = nz * ny * inv + nx * sin;
      out.m13 = 0.0;
      out.m20 = nx * nz * inv + ny * sin;
      out.m21 = ny * nz * inv - nx * sin;
      out.m22 = nz * nz * inv + cos;
      out.m23 = 0.0;
      out.m30 = 0.0;
      out.m31 = 0.0;
      out.m32 = 0.0;
      out.m33 = 1.0;
    }
    return out;
  }
  static fromScalling(v: Vec3): Mat4 {
    const out = new Mat4();
    out.m00 = v.x;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = v.y;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22 = v.z;
    out.m23 = 0.0;
    out.m30 = 0.0;
    out.m31 = 0.0;
    out.m32 = 0.0;
    out.m33 = 1.0;
    return out;
  }
  static frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const out = new Mat4();
    const diffRL = 1.0 / (right - left);
    const diffTB = 1.0 / (top - bottom);
    const diffNF = 1.0 / (near - far);
    out.m00 = near * 2.0 * diffRL;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = near * 2.0 * diffTB;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = (right + left) * diffRL;
    out.m21 = (top + bottom) * diffTB;
    out.m22 = (far + near) * diffNF;
    out.m23 = -1.0;
    out.m30 = 0.0;
    out.m31 = 0.0;
    out.m32 = far * near * 2.0 * diffNF;
    out.m33 = 0.0;
    return out;
  }
  // negative to positive
  static perspectiveNP(fovy: number, aspect: number, near: number, far: number): Mat4 {
    const out = new Mat4();
    const f = 1.0 / Math.tan(fovy / 2.0);
    out.m00 = f / aspect;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = f;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22
    out.m23 = -1.0;
    out.m30 = 0.0;
    out.m31 = 0.0;
    out.m32
    out.m33 = 0.0;
    if(far != null && far !== Infinity) {
      const diffNF = 1.0 / (near - far);
      out.m22 = (far + near) * diffNF;
      out.m32 = 2.0 * far * near * diffNF;
    } else {
      out.m22 = -1.0;
      out.m32 = -2.0 * near;
    }
    return out;
  }
  // origin to positive
  static perspectiveOP(fovy: number, aspect: number, near: number, far: number): Mat4 {
    const out = new Mat4();
    const f = 1.0 / Math.tan(fovy / 2.0);
    out.m00 = f / aspect;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = f;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22
    out.m23 = -1.0;
    out.m30 = 0.0;
    out.m31 = 0.0;
    out.m32
    out.m33 = 0.0;
    if(far != null && far !== Infinity) {
      const diffNF = 1.0 / (near - far);
      out.m22 = far * diffNF;
      out.m32 = far * near * diffNF;
    } else {
      out.m22 = -1.0;
      out.m32 = -near;
    }
    return out;
  }
  static perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
    // with WebGPU: device coord range from 0.0 to 1.0
    return Mat4.perspectiveOP(fovy, aspect, near, far);
  }
  // negative to positive
  static orthoNP(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const out = new Mat4();
    const diffLR = 1.0 / (left - right);
    const diffBT = 1.0 / (bottom - top);
    const diffNF = 1.0 / (near - far);
    out.m00 = -2.0 * diffLR;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = -2.0 * diffBT;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22 = 2.0 * diffNF;
    out.m23 = 0.0;
    out.m30 = (left + right) * diffLR;
    out.m31 = (bottom + top) * diffBT;
    out.m32 = (far + near) * diffNF;
    out.m33 = 1.0;
    return out;
  }
  // origin to positive
  static orthoOP(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const out = new Mat4();
    const diffLR = 1.0 / (left - right);
    const diffBT = 1.0 / (bottom - top);
    const diffNF = 1.0 / (near - far);
    out.m00 = -2.0 * diffLR;
    out.m01 = 0.0;
    out.m02 = 0.0;
    out.m03 = 0.0;
    out.m10 = 0.0;
    out.m11 = -2.0 * diffBT;
    out.m12 = 0.0;
    out.m13 = 0.0;
    out.m20 = 0.0;
    out.m21 = 0.0;
    out.m22 = diffNF;
    out.m23 = 0.0;
    out.m30 = (left + right) * diffLR;
    out.m31 = (bottom + top) * diffBT;
    out.m32 = near * diffNF;
    out.m33 = 1.0;
    return out;
  }
  static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    // with WebGPU: device coord range from 0.0 to 1.0
    return Mat4.orthoOP(left, right, bottom, top, near, far);
  }
  static lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4 {
    const out = new Mat4();
    const normal = eye.subClone(center).normalize();
    const z0 = normal.x;
    const z1 = normal.y;
    const z2 = normal.z;
    const tangent = up.cross(normal).normalize();
    const x0 = tangent.x;
    const x1 = tangent.y;
    const x2 = tangent.z;
    const binormal = normal.cross(tangent).normalize();
    const y0 = binormal.x;
    const y1 = binormal.y;
    const y2 = binormal.z;
    out.m00 = x0;
    out.m01 = y0;
    out.m02 = z0;
    out.m03 = 0.0;
    out.m10 = x1;
    out.m11 = y1;
    out.m12 = z1;
    out.m13 = 0.0;
    out.m20 = x2;
    out.m21 = y2;
    out.m22 = z2;
    out.m23 = 0.0;
    out.m30 = -(x0 * eye.x + x1 * eye.y + x2 * eye.z);
    out.m31 = -(y0 * eye.x + y1 * eye.y + y2 * eye.z);
    out.m32 = -(z0 * eye.x + z1 * eye.y + z2 * eye.z);
    out.m33 = 1.0;
    return out;
  }

  /** getter ================================================================ */
  get m00(): number {return this.value[ 0];}
  get m01(): number {return this.value[ 1];}
  get m02(): number {return this.value[ 2];}
  get m03(): number {return this.value[ 3];}
  get m10(): number {return this.value[ 4];}
  get m11(): number {return this.value[ 5];}
  get m12(): number {return this.value[ 6];}
  get m13(): number {return this.value[ 7];}
  get m20(): number {return this.value[ 8];}
  get m21(): number {return this.value[ 9];}
  get m22(): number {return this.value[10];}
  get m23(): number {return this.value[11];}
  get m30(): number {return this.value[12];}
  get m31(): number {return this.value[13];}
  get m32(): number {return this.value[14];}
  get m33(): number {return this.value[15];}

  /** setter ================================================================ */
  set m00(v: number) {this.value[ 0] = v;}
  set m01(v: number) {this.value[ 1] = v;}
  set m02(v: number) {this.value[ 2] = v;}
  set m03(v: number) {this.value[ 3] = v;}
  set m10(v: number) {this.value[ 4] = v;}
  set m11(v: number) {this.value[ 5] = v;}
  set m12(v: number) {this.value[ 6] = v;}
  set m13(v: number) {this.value[ 7] = v;}
  set m20(v: number) {this.value[ 8] = v;}
  set m21(v: number) {this.value[ 9] = v;}
  set m22(v: number) {this.value[10] = v;}
  set m23(v: number) {this.value[11] = v;}
  set m30(v: number) {this.value[12] = v;}
  set m31(v: number) {this.value[13] = v;}
  set m32(v: number) {this.value[14] = v;}
  set m33(v: number) {this.value[15] = v;}

  /** property ============================================================== */
  private value = new Float32Array(Math.pow(Mat4.DIMENSION_COUNT, 2));

  /** constructor =========================================================== */
  constructor(
    m00: number = 0.0,
    m01: number = 0.0,
    m02: number = 0.0,
    m03: number = 0.0,
    m10: number = 0.0,
    m11: number = 0.0,
    m12: number = 0.0,
    m13: number = 0.0,
    m20: number = 0.0,
    m21: number = 0.0,
    m22: number = 0.0,
    m23: number = 0.0,
    m30: number = 0.0,
    m31: number = 0.0,
    m32: number = 0.0,
    m33: number = 0.0,
  ) {
    this.set(
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33,
    );
  }

  /** chain method ========================================================== */
  set(
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number,
  ): Mat4 {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m03 = m03;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m30 = m30;
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
    return this;
  }
  setScalar(scalar: number): Mat4 {
    this.m00 = scalar;
    this.m01 = scalar;
    this.m02 = scalar;
    this.m03 = scalar;
    this.m10 = scalar;
    this.m11 = scalar;
    this.m12 = scalar;
    this.m13 = scalar;
    this.m20 = scalar;
    this.m21 = scalar;
    this.m22 = scalar;
    this.m23 = scalar;
    this.m30 = scalar;
    this.m31 = scalar;
    this.m32 = scalar;
    this.m33 = scalar;
    return this;
  }
  copy(v: Mat4): Mat4 {
    this.m00 = v.m00;
    this.m01 = v.m01;
    this.m02 = v.m02;
    this.m03 = v.m03;
    this.m10 = v.m10;
    this.m11 = v.m11;
    this.m12 = v.m12;
    this.m13 = v.m13;
    this.m20 = v.m20;
    this.m21 = v.m21;
    this.m22 = v.m22;
    this.m23 = v.m23;
    this.m30 = v.m30;
    this.m31 = v.m31;
    this.m32 = v.m32;
    this.m33 = v.m33;
    return this;
  }
  identity(): Mat4 {
    this.m00 = 1.0;
    this.m01 = 0.0;
    this.m02 = 0.0;
    this.m03 = 0.0;
    this.m10 = 0.0;
    this.m11 = 1.0;
    this.m12 = 0.0;
    this.m13 = 0.0;
    this.m20 = 0.0;
    this.m21 = 0.0;
    this.m22 = 1.0;
    this.m23 = 0.0;
    this.m30 = 0.0;
    this.m31 = 0.0;
    this.m32 = 0.0;
    this.m33 = 1.0;
    return this;
  }
  transpose(): Mat4 {
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m23 = this.m23;
    const m30 = this.m30;
    const m31 = this.m31;
    const m32 = this.m32;
    this.m01 = m10;
    this.m02 = m20;
    this.m03 = m30;
    this.m10 = m01;
    this.m12 = m21;
    this.m13 = m31;
    this.m20 = m02;
    this.m21 = m12;
    this.m23 = m32;
    this.m30 = m03;
    this.m31 = m13;
    this.m32 = m23;
    return this;
  }
  multiply(v: Mat4): Mat4 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const m23 = this.m23;
    const m30 = this.m30;
    const m31 = this.m31;
    const m32 = this.m32;
    const m33 = this.m33;
    this.m00 = m00 * v.m00 + m10 * v.m01 + m20 * v.m02 + m30 * v.m03;
    this.m01 = m01 * v.m00 + m11 * v.m01 + m21 * v.m02 + m31 * v.m03;
    this.m02 = m02 * v.m00 + m12 * v.m01 + m22 * v.m02 + m32 * v.m03;
    this.m03 = m03 * v.m00 + m13 * v.m01 + m23 * v.m02 + m33 * v.m03;
    this.m10 = m00 * v.m10 + m10 * v.m11 + m20 * v.m12 + m30 * v.m13;
    this.m11 = m01 * v.m10 + m11 * v.m11 + m21 * v.m12 + m31 * v.m13;
    this.m12 = m02 * v.m10 + m12 * v.m11 + m22 * v.m12 + m32 * v.m13;
    this.m13 = m03 * v.m10 + m13 * v.m11 + m23 * v.m12 + m33 * v.m13;
    this.m20 = m00 * v.m20 + m10 * v.m21 + m20 * v.m22 + m30 * v.m23;
    this.m21 = m01 * v.m20 + m11 * v.m21 + m21 * v.m22 + m31 * v.m23;
    this.m22 = m02 * v.m20 + m12 * v.m21 + m22 * v.m22 + m32 * v.m23;
    this.m23 = m03 * v.m20 + m13 * v.m21 + m23 * v.m22 + m33 * v.m23;
    this.m30 = m00 * v.m30 + m10 * v.m31 + m20 * v.m32 + m30 * v.m33;
    this.m31 = m01 * v.m30 + m11 * v.m31 + m21 * v.m32 + m31 * v.m33;
    this.m32 = m02 * v.m30 + m12 * v.m31 + m22 * v.m32 + m32 * v.m33;
    this.m33 = m03 * v.m30 + m13 * v.m31 + m23 * v.m32 + m33 * v.m33;
    return this;
  }
  translate(v: Vec3): Mat4 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const m23 = this.m23;
    const m30 = this.m30;
    const m31 = this.m31;
    const m32 = this.m32;
    const m33 = this.m33;
    this.m30 = v.x * m00 + v.y * m10 + v.z * m20 + m30;
    this.m31 = v.x * m01 + v.y * m11 + v.z * m21 + m31;
    this.m32 = v.x * m02 + v.y * m12 + v.z * m22 + m32;
    this.m33 = v.x * m03 + v.y * m13 + v.z * m23 + m33;
    return this;
  }
  rotate(radian: number, axis: Vec3): Mat4 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const m23 = this.m23;
    const axisLength = axis.length;
    if(axisLength !== 0.0){
      const sin = Math.sin(radian);
      const cos = Math.cos(radian);
      const inv = 1.0 - cos;
      const normalizedAxis = axis.normalizeClone();
      const nx = normalizedAxis.x;
      const ny = normalizedAxis.y;
      const nz = normalizedAxis.z;
      const r00 = nx * nx * inv + cos;
      const r01 = ny * nx * inv + nz * sin;
      const r02 = nz * nx * inv - ny * sin;
      const r10 = nx * ny * inv - nz * sin;
      const r11 = ny * ny * inv + cos;  
      const r12 = nz * ny * inv + nx * sin;
      const r20 = nx * nz * inv + ny * sin;
      const r21 = ny * nz * inv - nx * sin;
      const r22 = nz * nz * inv + cos;
      this.m00 = m00 * r00 + m10 * r01 + m20 * r02;
      this.m01 = m01 * r00 + m11 * r01 + m21 * r02;
      this.m02 = m02 * r00 + m12 * r01 + m22 * r02;
      this.m03 = m03 * r00 + m13 * r01 + m23 * r02;
      this.m10 = m00 * r10 + m10 * r11 + m20 * r12;
      this.m11 = m01 * r10 + m11 * r11 + m21 * r12;
      this.m12 = m02 * r10 + m12 * r11 + m22 * r12;
      this.m13 = m03 * r10 + m13 * r11 + m23 * r12;
      this.m20 = m00 * r20 + m10 * r21 + m20 * r22;
      this.m21 = m01 * r20 + m11 * r21 + m21 * r22;
      this.m22 = m02 * r20 + m12 * r21 + m22 * r22;
      this.m23 = m03 * r20 + m13 * r21 + m23 * r22;
    }
    return this;
  }
  scale(v: Vec3): Mat4 {
    this.m00 *= v.x;
    this.m01 *= v.x;
    this.m02 *= v.x;
    this.m03 *= v.x;
    this.m10 *= v.y;
    this.m11 *= v.y;
    this.m12 *= v.y;
    this.m13 *= v.y;
    this.m20 *= v.z;
    this.m21 *= v.z;
    this.m22 *= v.z;
    this.m23 *= v.z;
    return this;
  }
  invert(): Mat4 {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const m23 = this.m23;
    const m30 = this.m30;
    const m31 = this.m31;
    const m32 = this.m32;
    const m33 = this.m33;

    const a = m00 * m11 - m01 * m10;
    const b = m00 * m12 - m02 * m10;
    const c = m00 * m13 - m03 * m10;
    const d = m01 * m12 - m02 * m11;
    const e = m01 * m13 - m03 * m11;
    const f = m02 * m13 - m03 * m12;
    const g = m20 * m31 - m21 * m30;
    const h = m20 * m32 - m22 * m30;
    const i = m20 * m33 - m23 * m30;
    const j = m21 * m32 - m22 * m31;
    const k = m21 * m33 - m23 * m31;
    const l = m22 * m33 - m23 * m32;
    const determinant = a * l - b * k + c * j + d * i - e * h + f * g;
    if(determinant !== 0.0) {
      const inverseDeterminant = 1.0 / determinant;
      this.m00 = (m11 * l - m12 * k + m13 * j) * inverseDeterminant;
      this.m01 = (m02 * k - m01 * l - m03 * j) * inverseDeterminant;
      this.m02 = (m31 * f - m32 * e + m33 * d) * inverseDeterminant;
      this.m03 = (m22 * e - m21 * f - m23 * d) * inverseDeterminant;
      this.m10 = (m12 * i - m10 * l - m13 * h) * inverseDeterminant;
      this.m11 = (m00 * l - m02 * i + m03 * h) * inverseDeterminant;
      this.m12 = (m32 * c - m30 * f - m33 * b) * inverseDeterminant;
      this.m13 = (m20 * f - m22 * c + m23 * b) * inverseDeterminant;
      this.m20 = (m10 * k - m11 * i + m13 * g) * inverseDeterminant;
      this.m21 = (m01 * i - m00 * k - m03 * g) * inverseDeterminant;
      this.m22 = (m30 * e - m31 * c + m33 * a) * inverseDeterminant;
      this.m23 = (m21 * c - m20 * e - m23 * a) * inverseDeterminant;
      this.m30 = (m11 * h - m10 * j - m12 * g) * inverseDeterminant;
      this.m31 = (m00 * j - m01 * h + m02 * g) * inverseDeterminant;
      this.m32 = (m31 * b - m30 * d - m32 * a) * inverseDeterminant;
      this.m33 = (m20 * d - m21 * b + m22 * a) * inverseDeterminant;
    }
    return this;
  }

  /** method ================================================================ */
  clone(): Mat4 {
    return new Mat4(
      this.m00,
      this.m01,
      this.m02,
      this.m03,
      this.m10,
      this.m11,
      this.m12,
      this.m13,
      this.m20,
      this.m21,
      this.m22,
      this.m23,
      this.m30,
      this.m31,
      this.m32,
      this.m33,
    );
  }
  multiplyClone(v: Mat4): Mat4 {
    return this.clone().multiply(v);
  }
  translateClone(v: Vec3): Mat4 {
    return this.clone().translate(v);
  }
  rotateClone(radian: number, axis: Vec3): Mat4 {
    return this.clone().rotate(radian, axis);
  }
  scaleClone(v: Vec3): Mat4 {
    return this.clone().scale(v);
  }
  invertClone(): Mat4 {
    return this.clone().invert();
  }
  determinant(): number {
    const m00 = this.m00;
    const m01 = this.m01;
    const m02 = this.m02;
    const m03 = this.m03;
    const m10 = this.m10;
    const m11 = this.m11;
    const m12 = this.m12;
    const m13 = this.m13;
    const m20 = this.m20;
    const m21 = this.m21;
    const m22 = this.m22;
    const m23 = this.m23;
    const m30 = this.m30;
    const m31 = this.m31;
    const m32 = this.m32;
    const m33 = this.m33;
    const a = m00 * m11 - m01 * m10;
    const b = m00 * m12 - m02 * m10;
    const c = m00 * m13 - m03 * m10;
    const d = m01 * m12 - m02 * m11;
    const e = m01 * m13 - m03 * m11;
    const f = m02 * m13 - m03 * m12;
    const g = m20 * m31 - m21 * m30;
    const h = m20 * m32 - m22 * m30;
    const i = m20 * m33 - m23 * m30;
    const j = m21 * m32 - m22 * m31;
    const k = m21 * m33 - m23 * m31;
    const l = m22 * m33 - m23 * m32;
    return a * l - b * k + c * j + d * i - e * h + f * g;
  }
  equals(v: Mat4): boolean {
    return (
      this.m00 === v.m00 &&
      this.m01 === v.m01 &&
      this.m02 === v.m02 &&
      this.m03 === v.m03 &&
      this.m10 === v.m10 &&
      this.m11 === v.m11 &&
      this.m12 === v.m12 &&
      this.m13 === v.m13 &&
      this.m20 === v.m20 &&
      this.m21 === v.m21 &&
      this.m22 === v.m22 &&
      this.m23 === v.m23 &&
      this.m30 === v.m30 &&
      this.m31 === v.m31 &&
      this.m32 === v.m32 &&
      this.m33 === v.m33
    );
  }
  toArray(): number[] {
    return [
      this.m00,
      this.m01,
      this.m02,
      this.m03,
      this.m10,
      this.m11,
      this.m12,
      this.m13,
      this.m20,
      this.m21,
      this.m22,
      this.m23,
      this.m30,
      this.m31,
      this.m32,
      this.m33,
    ];
  }
  toString(separator: string = ','): string {
    return this.toArray().join(separator);
  }
  forEach(callback: ForEach, thisArg?: any): void {
    this.toArray().forEach(callback, thisArg);
  }
}

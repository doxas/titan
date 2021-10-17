
import { Vec2 } from './math/Vec2';
import { Vec3 } from './math/Vec3';
import { Vec4 } from './math/Vec4';
import { Mat2 } from './math/Mat2';
import { Mat3 } from './math/Mat3';
import { Mat4 } from './math/Mat4';

export class TITAN {
  static get Vec2() {return Vec2;}
  static get Vec3() {return Vec3;}
  static get Vec4() {return Vec4;}
  static get Mat2() {return Mat2;}
  static get Mat3() {return Mat3;}
  static get Mat4() {return Mat4;}
}

if(window != null) {
  // @ts-ignore
  window.TITAN = TITAN;
}

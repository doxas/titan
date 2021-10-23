
import { Core } from './Core/Core';
import { CONSTANT } from './Core/Constant';
import { Vec2 } from './Math/Vec2';
import { Vec3 } from './Math/Vec3';
import { Vec4 } from './Math/Vec4';
import { Mat2 } from './Math/Mat2';
import { Mat3 } from './Math/Mat3';
import { Mat4 } from './Math/Mat4';
import { Loader } from './Utility/Loader';
import { Logger } from './Utility/Logger';

export class TITAN {
  // core
  static get CONSTANT() {return CONSTANT;}
  static get Core() {return Core;}
  // common
  // math
  static get Vec2() {return Vec2;}
  static get Vec3() {return Vec3;}
  static get Vec4() {return Vec4;}
  static get Mat2() {return Mat2;}
  static get Mat3() {return Mat3;}
  static get Mat4() {return Mat4;}
  // utility
  static get Loader() {return Loader;}
  static get Logger() {return Logger;}
}

if (window != null) {
  // @ts-ignore
  window.TITAN = TITAN;
}

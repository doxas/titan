
import { CONSTANT } from './Common/Constant';
import { Logger } from './Common/logger';
import { Core } from './Core/Core';
import { Buffer } from './Core/Buffer';
import { ShaderModule } from './Core/ShaderModule';
import { Configration } from './Interface/Configuration';
import { Descriptor } from './Interface/Descriptor';
import { Layout } from './Interface/Layout';
import { State } from './Interface/State';
import { Vec2 } from './Math/Vec2';
import { Vec3 } from './Math/Vec3';
import { Vec4 } from './Math/Vec4';
import { Mat2 } from './Math/Mat2';
import { Mat3 } from './Math/Mat3';
import { Mat4 } from './Math/Mat4';
import { Loader } from './Loader/Loader';

export class TITAN {
  static get CONSTANT() {return CONSTANT;}
  static get Logger() {return Logger;}
  static get Core() {return Core;}
  static get Buffer() {return Buffer;}
  static get ShaderModule() {return ShaderModule;}
  static get Configration() {return Configration;}
  static get Descriptor() {return Descriptor;}
  static get Layout() {return Layout;}
  static get State() {return State;}
  static get Vec2() {return Vec2;}
  static get Vec3() {return Vec3;}
  static get Vec4() {return Vec4;}
  static get Mat2() {return Mat2;}
  static get Mat3() {return Mat3;}
  static get Mat4() {return Mat4;}
  static get Loader() {return Loader;}
}

if(window != null) {
  // @ts-ignore
  window.TITAN = TITAN;
}

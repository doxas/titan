
import { Core } from './Core/Core';
import { Pipeline } from './Core/Pipeline';
import { CONSTANT } from './Core/Constant';
import { Vec2 } from './Math/Vec2';
import { Vec3 } from './Math/Vec3';
import { Vec4 } from './Math/Vec4';
import { Mat2 } from './Math/Mat2';
import { Mat3 } from './Math/Mat3';
import { Mat4 } from './Math/Mat4';
import { Loader } from './Utility/Loader';
import { Logger } from './Utility/Logger';
import { Base } from './Common/Base';
import { Base3D } from './Common/Base3D';
import { Node3D } from './Common/Node3D';
import { Buffer } from './Common/Buffer';
import { Camera } from './Common/Camera';
import { Framebuffer } from './Common/Framebuffer';
import { Geometry } from './Common/Geometry';
import { Material } from './Common/Material';
import { Scene } from './Common/Scene';
import { Texture } from './Common/Texture';
import { VertexAttribute } from './Common/VertexAttribute';
import { VertexBuffer } from './Common/VertexBuffer';
import { IndexBuffer } from './Common/IndexBuffer';

export class TITAN {
  // core
  static get CONSTANT() {return CONSTANT;}
  static get Core() {return Core;}
  static get Pipeline() {return Pipeline;}
  // common
  static get Base() {return Base;}
  static get Base3D() {return Base3D;}
  static get Node3D() {return Node3D;}
  static get Buffer() {return Buffer;}
  static get Camera() {return Camera;}
  static get Framebuffer() {return Framebuffer;}
  static get Geometry() {return Geometry;}
  static get Material() {return Material;}
  static get Scene() {return Scene;}
  static get Texture() {return Texture;}
  static get VertexAttribute() {return VertexAttribute;}
  static get VertexBuffer() {return VertexBuffer;}
  static get IndexBuffer() {return IndexBuffer;}
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

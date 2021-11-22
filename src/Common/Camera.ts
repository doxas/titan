
import { Mat4 } from '../Math/Mat4';
import { Vec3 } from '../Math/Vec3';
import { Base3D } from './Base3D';

export interface ICamera {
  position?: Vec3;
  center?: Vec3;
  upDirection?: Vec3;
  fovy?: number;
  near?: number;
  far?: number;
  width?: number;
  height?: number;
}

export class Camera extends Base3D {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  position: Vec3;
  center: Vec3;
  upDirection: Vec3;
  fovy: number;
  near: number;
  far: number;
  width: number;
  height: number;
  viewMatrix: Mat4;
  projectionMatrix: Mat4;

  /** constructor =========================================================== */
  constructor(option: ICamera) {
    super();
    this.name = 'Camera';

    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: ICamera): this {
    this.position = option.position ?? this.position;
    this.center = option.center ?? this.center;
    this.upDirection = option.upDirection ?? this.upDirection;
    this.fovy = option.fovy ?? this.fovy;
    this.near = option.near ?? this.near;
    this.far = option.far ?? this.far;
    this.width = option.width ?? this.width;
    this.height = option.height ?? this.height;
    this._changed = true;
    return this;
  }
  update(): this {
    if (!this._changed) {return;}
    this.viewMatrix = Mat4.lookAt(this.position, this.center, this.upDirection);
    this.projectionMatrix = Mat4.perspective(this.fovy, this.width / this.height, this.near, this.far);
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
}

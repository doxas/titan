
import { Base } from './Base';
import { VertexBuffer } from './VertexBuffer';

export interface IGeometry {
  vertexBuffers: VertexBuffer[];
}

export class Geometry extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  vertexBuffers: VertexBuffer[];

  /** constructor =========================================================== */
  constructor(option: IGeometry) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IGeometry): this {
    this.vertexBuffers = option.vertexBuffers;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.vertexBuffers.forEach((vertexBuffer) => {
      vertexBuffer.destroy();
    });
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
  createByDevice(device: GPUDevice): void {
    if (!this._changed) {return;}
    this.destroy();
    this.vertexBuffers.forEach((vertexBuffer) => {
      vertexBuffer.create().buffer.createByDevice(device);
    });
  }
}



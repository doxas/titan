
import { Base } from './Base';
import { VertexBuffer } from './VertexBuffer';
import { IndexBuffer } from './IndexBuffer';

export interface IGeometry {
  vertexBufferSource: number[][];
  indexBufferSource?: number[];
  // vertexBuffer: VertexBuffer | VertexBuffer[];
  // indexBuffer?: IndexBuffer;
}

export class Geometry extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  vertexBufferSource: number[][];
  indexBufferSource: number[];
  vertexBuffer: VertexBuffer[];
  indexBuffer: IndexBuffer;

  /** constructor =========================================================== */
  constructor(option: IGeometry) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IGeometry): this {
    this.vertexBufferSource = option.vertexBufferSource;
    this.indexBufferSource = option.indexBufferSource;
    if (this.vertexBuffer != null || this.indexBuffer != null) {
      this.destroy();
    }
    this.vertexBuffer = [];
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.vertexBuffer.forEach((vertexBuffer) => {
      vertexBuffer.destroy();
    });
    if (this.indexBuffer != null) {
      this.indexBuffer.destroy();
    }
    this.vertexBuffer = [];
    this.indexBuffer = null;
    this._changed = false;
    return this;
  }
  setToPassEncoder(passEncoder: GPURenderPassEncoder): this {
    this.vertexBuffer.forEach((vertexBuffer, index) => {
      passEncoder.setVertexBuffer(index, vertexBuffer.buffer.data);
    });
    if (this.indexBuffer != null) {
      // TODO: not uint16 type
      passEncoder.setIndexBuffer(this.indexBuffer.buffer.data, 'uint16');
    }
    return this;
  }

  /** method ================================================================ */
  createByDevice(device: GPUDevice): void {
    if (!this._changed) {return;}
    this.destroy();
    this.vertexBufferSource.forEach((vertexBufferSource, index) => {
      const option = {
        typedArray: new Float32Array(vertexBufferSource),
        shaderLocation: index,
      };
      this.vertexBuffer[index] = new VertexBuffer(option).create();
      this.vertexBuffer[index].buffer.createByDevice(device);
    });
    const option = {
      typedArray: this.indexBufferSource,
    };
    this.indexBuffer = new IndexBuffer(option).create();
    this.indexBuffer.buffer.createByDevice(device);
  }
}



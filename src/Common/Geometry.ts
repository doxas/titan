
import { Base } from './Base';
import { VertexBuffer } from './VertexBuffer';

export interface IGeometry {
  buffers: VertexBuffer[];
}

export class Geometry extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  buffers: VertexBuffer[];

  /** constructor =========================================================== */
  constructor(option: IGeometry) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IGeometry): this {
    this.buffers = option.buffers;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.buffers.forEach((buffer) => {
      buffer.destroy();
    });
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
  createByDevice(device: GPUDevice): void {
    if (!this._changed) {return;}
    this.destroy();
    const descriptor: GPUBufferDescriptor = {
      size: (this._array.byteLength + 3) & ~3,
      mappedAtCreation: true,
      usage: this._usage,
    };
    this._buffer = device.createBuffer(descriptor);

    const writeArray = this._array instanceof Uint16Array
      ? new Uint16Array(this._buffer.getMappedRange())
      : new Float32Array(this._buffer.getMappedRange());
    writeArray.set(this._array);
    this._buffer.unmap();
  }
}



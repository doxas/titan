
import { Pipeline } from '../Core/Pipeline';
import { Base } from './Base';

export class Buffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get data(): GPUBuffer {
    return this._buffer;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  private _buffer: GPUBuffer;
  private _array: Float32Array | Uint16Array;
  private _flags: GPUBufferUsageFlags;

  /** constructor =========================================================== */
  constructor() {
    super();

    this._buffer = null;
    this._array = null;
    this._flags = GPUBufferUsage.VERTEX;
  }

  /** chain method ========================================================== */
  set(arrayBuffer: Float32Array | Uint16Array, usage: GPUBufferUsageFlags): this {
    this._array = arrayBuffer;
    this._flags = usage;
    this._changed = true;

    return this;
  }
  destroy(): this {
    if (this._buffer != null) {
      this._buffer.destroy();
      this._buffer = null;
    }
    this._changed = false;

    return this;
  }

  /** method ================================================================ */
  createByPipeline(pipeline: Pipeline): void {
    if (!this._changed) {return;}

    this.destroy();

    const descriptor: GPUBufferDescriptor = {
      size: (this._array.byteLength + 3) & ~3,
      mappedAtCreation: true,
      usage: this._flags,
    };
    this._buffer = pipeline.device.createBuffer(descriptor);

    const writeArray = this._array instanceof Uint16Array
      ? new Uint16Array(this._buffer.getMappedRange())
      : new Float32Array(this._buffer.getMappedRange());
    writeArray.set(this._array);
    this._buffer.unmap();
  }
}




import { Pipeline } from '../Core/Pipeline';
import { Base } from './Base';

export interface IBuffer {
  typedArray: Float32Array | Uint16Array;
  usage: GPUBufferUsageFlags;
}

export class Buffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get data(): GPUBuffer {
    return this._buffer;
  }
  get usage(): GPUBufferUsageFlags {
    return this._usage;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  private _array: Float32Array | Uint16Array;
  private _usage: GPUBufferUsageFlags;
  private _buffer: GPUBuffer;

  /** constructor =========================================================== */
  constructor(option: IBuffer) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IBuffer): this {
    this._array = option.typedArray;
    this._usage = option.usage;
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
      usage: this._usage,
    };
    this._buffer = pipeline.device.createBuffer(descriptor);

    const writeArray = this._array instanceof Uint16Array
      ? new Uint16Array(this._buffer.getMappedRange())
      : new Float32Array(this._buffer.getMappedRange());
    writeArray.set(this._array);
    this._buffer.unmap();
  }
}



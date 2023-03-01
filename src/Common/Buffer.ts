
import { Base } from './Base';

export interface IBuffer {
  typedArray: Float32Array | Uint32Array;
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
  private _array: Float32Array | Uint32Array;
  private _usage: GPUBufferUsageFlags;
  private _buffer: GPUBuffer;

  /** constructor =========================================================== */
  constructor(option: IBuffer) {
    super();
    this.name = 'Buffer';

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
      this._array = null;
      this._usage = null;
    }
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
  createByDevice(device: GPUDevice): void {
    if (!this._changed) {return;}
    this.destroy();
    const descriptor: GPUBufferDescriptor = {
      size: this._array.byteLength,
      mappedAtCreation: true,
      usage: this._usage,
    };
    this._buffer = device.createBuffer(descriptor);

    if (this._array instanceof Uint32Array === true) {
      const writeArray = new Uint32Array(this._buffer.getMappedRange())
      writeArray.set(this._array);
    } else {
      const writeArray = new Float32Array(this._buffer.getMappedRange());
      writeArray.set(this._array);
    }
    this._buffer.unmap();
  }
}

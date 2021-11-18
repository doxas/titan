
import { Base } from './Base';
import { Buffer } from './Buffer';

export interface IUniformBuffer {
  data: number[] | Float32Array;
}

export class UniformBuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  source: number[] | Float32Array;
  buffer: Buffer;
  updateSource: boolean;
  updateOffset: number;

  /** constructor =========================================================== */
  constructor(option: IUniformBuffer) {
    super();
    this.name = 'UniformBuffer';

    this.updateSource = false;
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IUniformBuffer): this {
    this.source = option.data;
    this._changed = true;
    return this;
  }
  destroy(): this {
    if (this.buffer != null) {
      this.buffer.destroy();
      this.buffer = null;
    }
    this._changed = false;
    return this;
  }
  create(): this {
    if (!this._changed) {return;}
    this.destroy();
    this.buffer = new Buffer({
      typedArray: Float32Array.from(this.source),
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    return this;
  }
  update(data: number[] | Float32Array, offset: number): this {
    this.updateSource = true;
    this.updateOffset = offset;
    this.source = data;
    return this;
  }

  /** method ================================================================ */
}

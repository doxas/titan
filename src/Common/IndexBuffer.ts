
import { Base } from './Base';
import { Buffer } from './Buffer';

export interface IIndexBuffer {
  typedArray: number[] | Uint32Array;
}

export class IndexBuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  source: number[] | Uint32Array;
  buffer: Buffer;

  /** constructor =========================================================== */
  constructor(option: IIndexBuffer) {
    super();
    this.name = 'IndexBuffer';

    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IIndexBuffer): this {
    this.source = option.typedArray;
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
      typedArray: Uint32Array.from(this.source),
      usage: GPUBufferUsage.INDEX,
    });
    return this;
  }

  /** method ================================================================ */
}

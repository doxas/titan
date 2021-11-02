
import { Base } from './Base';
import { Buffer } from './Buffer';

export interface IIndexBuffer {
  typedArray: number[] | Uint16Array;
}

export class IndexBuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  source: number[] | Uint16Array;
  buffer: Buffer;

  /** constructor =========================================================== */
  constructor(option: IIndexBuffer) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IIndexBuffer): this {
    this.source = option.typedArray;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.buffer.destroy();
    this.buffer = null;
    this._changed = false;
    return this;
  }
  create(): this {
    if (!this._changed) {return;}
    this.destroy();
    this.buffer = new Buffer({
      typedArray: Uint16Array.from(this.source),
      usage: GPUBufferUsage.INDEX,
    });
    return this;
  }

  /** method ================================================================ */
}




import { Base } from './Base';
import { Buffer } from './Buffer';

export interface IVertexBuffer {
  typedArray: number[] | Float32Array;
  shaderLocation: GPUIndex32;
}

export class VertexBuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  source: number[] | Float32Array;
  shaderLocation: GPUIndex32;
  array: Buffer;

  /** constructor =========================================================== */
  constructor(option: IVertexBuffer) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IVertexBuffer): this {
    this.source = option.typedArray;
    this.shaderLocation = option.shaderLocation;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.array.destroy();
    this.array = null;
    this._changed = false;
    return this;
  }
  create(): this {
    if (!this._changed) {return;}
    this.destroy();
    this.array = new Buffer({
      typedArray: Float32Array.from(this.source),
      usage: GPUBufferUsage.VERTEX,
    });
    return this;
  }

  /** method ================================================================ */
}



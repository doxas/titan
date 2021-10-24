
import { Base } from './Base';

export interface IVertexAttribute {
  format: GPUVertexFormat;
  offset: GPUSize64;
  shaderLocation: GPUIndex32;
}

export class VertexAttribute extends Base {
  /** static getter ========================================================= */
  static get SIZE_FLOAT32(): number {return 4;}

  /** static method ========================================================= */
  static getStrideFromVertexFormat(format: GPUVertexFormat): GPUSize64 {
    switch (format) {
      case 'float32':
        return VertexAttribute.SIZE_FLOAT32;
      case 'float32x2':
        return VertexAttribute.SIZE_FLOAT32 * 2;
      case 'float32x3':
        return VertexAttribute.SIZE_FLOAT32 * 3;
      case 'float32x4':
        return VertexAttribute.SIZE_FLOAT32 * 4;
      default:
        return 0;
    }
  }

  /** getter ================================================================ */
  get vertexBufferLayout(): GPUVertexBufferLayout {
    return this._bufferLayout;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  format: GPUVertexFormat;
  offset: GPUSize64;
  shaderLocation: GPUIndex32;
  private _attribute: GPUVertexAttribute;
  private _bufferLayout: GPUVertexBufferLayout;

  /** constructor =========================================================== */
  constructor(option: IVertexAttribute) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IVertexAttribute): this {
    this.format = option.format;
    this.offset = option.offset;
    this.shaderLocation = option.shaderLocation;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.format = null;
    this.offset = 0;
    this.shaderLocation = 0;
    this._attribute = null;
    this._bufferLayout = null;
    this._changed = false;
    return this;
  }
  create(): this {
    if (!this._changed) {return;}
    this.destroy();
    this._attribute = {
      format: this.format,
      offset: this.offset,
      shaderLocation: this.shaderLocation,
    };
    this._bufferLayout = {
      arrayStride: VertexAttribute.getStrideFromVertexFormat(this.format),
      stepMode: 'vertex',
      attributes: [this._attribute],
    };
    return this;
  }

  /** method ================================================================ */
}



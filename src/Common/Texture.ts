
import { Pipeline } from '../Core/Pipeline';
import { Base } from './Base';

export interface ITextureResource {
  source: ImageBitmap | HTMLCanvasElement | OffscreenCanvas;
}
export interface ITexture {
  size: GPUExtent3D;
  format: GPUTextureFormat;
  usage: GPUTextureUsageFlags;
  source?: ITextureResource | ITextureResource[];
}

export class Texture extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get width(): number {
    return this._width;
  }
  get height(): number {
    return this._height;
  }
  get depth(): number {
    return this._depth;
  }
  get format(): GPUTextureFormat {
    return this._format;
  }
  get usage(): GPUTextureUsageFlags {
    return this._usage;
  }
  get data(): GPUTexture {
    return this._texture;
  }
  get view(): GPUTextureView {
    return this._view;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  private _width: number;
  private _height: number;
  private _depth: number;
  private _format: GPUTextureFormat;
  private _usage: GPUTextureUsageFlags;
  private _texture: GPUTexture;
  private _view: GPUTextureView;
  private _source: ITextureResource | ITextureResource[];

  /** constructor =========================================================== */
  constructor(option: ITexture) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: ITexture): this {
    this._width = option.size[0];
    this._height = option.size[1];
    this._depth = option.size[2];
    this._format = option.format;
    this._usage = option.usage;
    this._source = option.source;
    this._changed = true;
    return this;
  }
  destroy(): this {
    if (this._texture != null) {
      this._texture.destroy();
      this._texture = null;
      this._width = 0;
      this._height = 0;
      this._depth = 0;
      this._format = null;
      this._usage = null;
      this._source = null;
    }
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
  createByDevice(device: GPUDevice): void {
    if (!this._changed) {return;}

    this.destroy();

    const size: GPUExtent3D = [this._width, this._height, this._depth];
    const descriptor: GPUTextureDescriptor = {
      size: size,
      format: this._format,
      usage: this._usage,
    };
    this._texture = device.createTexture(descriptor);
    this._view = this._texture.createView();

    // TODO: exists source
  }
}



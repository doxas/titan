
import { Base } from './Base';
import { Vec4 } from '../Math/Vec4';

export interface IFramebuffer {
  width: number;
  height: number;
  clearColor: Vec4;
  colorTexture?: GPUTexture;
  depthStencilTexture?: GPUTexture;
}

export class Framebuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  width: number;
  height: number;
  clearColor: Vec4;
  private _isDefaultColor: boolean;
  private _isDefaultDepthStencil: boolean;
  private _colorTexture: GPUTexture;
  private _depthStencilTexture: GPUTexture;
  private _colorTextureView: GPUTextureView;
  private _depthStencilTextureView: GPUTextureView;
  private _colorAttachment: GPURenderPassColorAttachment;
  private _depthStencilAttachment: GPURenderPassDepthStencilAttachment;
  private _renderPassDescriptor: GPURenderPassDescriptor;

  /** constructor =========================================================== */
  constructor(option: IFramebuffer) {
    super();
    this.name = 'Framebuffer';

    this._isDefaultColor = true;
    this._isDefaultDepthStencil = true;
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IFramebuffer): this {
    this.width = option.width;
    this.height = option.height;
    this.clearColor = option.clearColor;
    this.setColorTexture(option.colorTexture);
    this._changed = true;
    return this;
  }
  destroy(): this {
    if (!this._isDefaultColor && this._colorTexture != null) {
      this._colorTexture.destroy();
      this._isDefaultColor = true;
      this._colorTexture = null;
      this._colorTextureView = null;
    }
    if (!this._isDefaultDepthStencil && this._depthStencilTexture != null) {
      this._depthStencilTexture.destroy();
      this._isDefaultDepthStencil = true;
      this._depthStencilTexture = null;
      this._depthStencilTextureView = null;
    }
    this._colorAttachment = null;
    this._depthStencilAttachment = null;
    this._renderPassDescriptor = null;
    this._changed = false;
    return this;
  }
  setColorTexture(texture?: GPUTexture): this {
    if (this._isDefaultColor !== true && this._colorTexture != null) {
      this._colorTexture.destroy();
    }
    if (texture != null) {
      this._colorTexture = texture;
      this._colorTextureView = this._colorTexture.createView();
      this._isDefaultColor = false;
    } else {
      this._colorTexture = null;
      this._colorTextureView = null;
      this._isDefaultColor = true;
    }
    return this;
  }
  setDepthStencilTexture(texture?: GPUTexture): this {
    if (this._isDefaultDepthStencil !== true && this._depthStencilTexture != null) {
      this._depthStencilTexture.destroy();
    }
    if (texture != null) {
      this._depthStencilTexture = texture;
      this._depthStencilTextureView = this._depthStencilTexture.createView();
      this._isDefaultDepthStencil = false;
    } else {
      this._depthStencilTexture = null;
      this._depthStencilTextureView = null;
      this._isDefaultDepthStencil = true;
    }
    return this;
  }

  /** method ================================================================ */
  getRenderPassDescriptor(context: GPUCanvasContext): GPURenderPassDescriptor {
    const colorTexture = this._isDefaultColor ? context.getCurrentTexture() : this._colorTexture;
    const colorTextureView = this._isDefaultColor ? colorTexture.createView() : this._colorTextureView;
    
    const view: GPUTextureView = colorTextureView;
    const loadValue: GPUColor = {r: this.clearColor.x, g: this.clearColor.y, b: this.clearColor.z, a: this.clearColor.w};
    const storeOp: GPUStoreOp = 'store';
    this._colorAttachment = {view, loadValue, storeOp};
    if (this._depthStencilTexture != null) {
      const view: GPUTextureView = this._depthStencilTextureView;
      const depthLoadValue: GPULoadOp | number = 1;
      const depthStoreOp: GPUStoreOp = 'store';
      const depthReadOnly: boolean = false;
      const stencilLoadValue: GPULoadOp | GPUStencilValue = 'load';
      const stencilStoreOp: GPUStoreOp = 'store';
      const stencilReadOnly: boolean = false;
      this._depthStencilAttachment = {
        view, depthLoadValue, depthStoreOp, depthReadOnly, stencilLoadValue, stencilStoreOp, stencilReadOnly,
      };
    } else {
      this._depthStencilAttachment = null;
    }
    const colorAttachments = [this._colorAttachment];
    const depthStencilAttachment = this._depthStencilAttachment;
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments,
      depthStencilAttachment,
    };
    this._renderPassDescriptor = renderPassDescriptor;

    return renderPassDescriptor;
  }
}


import { Framebuffer } from '../Common/Framebuffer';

export class Pipeline {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get framebuffer(): Framebuffer {
    return this._currentFramebuffer;
  }

  /** setter ================================================================ */
  set framebuffer(v: Framebuffer) {
    this._currentFramebuffer = v;
  }

  /** property ============================================================== */
  device: GPUDevice;
  context: GPUCanvasContext;
  queue: GPUQueue;
  private _defaultFramebuffer: Framebuffer;
  private _currentFramebuffer: Framebuffer;

  /** constructor =========================================================== */
  constructor(device: GPUDevice, context: GPUCanvasContext, queue: GPUQueue) {
    this.device = device;
    this.context = context;
    this.queue = queue;
    this._defaultFramebuffer = new Framebuffer();
  }

  /** chain method ========================================================== */
  setup(): this {
    // setup pipeline
    return this;
  }

  /** method ================================================================ */
  setFramebuffer(v: Framebuffer): void {
    this.framebuffer = v;
  }
  createPipelineLayout(desc: GPUPipelineLayoutDescriptor): GPUPipelineLayout {
    return this.device.createPipelineLayout(desc);
  }
  createRenderPipeline(desc: GPURenderPipelineDescriptor): GPURenderPipeline {
    return this.device.createRenderPipeline(desc);
  }
}



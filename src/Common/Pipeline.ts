
import { Framebuffer } from './Framebuffer';

export class Pipeline {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get framebuffer(): Framebuffer {
    return this.currentFramebuffer;
  }

  /** setter ================================================================ */
  set framebuffer(v: Framebuffer) {
    this.currentFramebuffer = v;
  }

  /** property ============================================================== */
  device: GPUDevice;
  context: GPUCanvasContext;
  queue: GPUQueue;
  private currentFramebuffer: Framebuffer;

  /** constructor =========================================================== */
  constructor(device: GPUDevice, context: GPUCanvasContext, queue: GPUQueue) {
    this.device = device;
    this.context = context;
    this.queue = queue;
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
}




import { Framebuffer } from '../Common/Framebuffer';

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
  createVertexBuffer(attribute: number[] | Float32Array): GPUBuffer {
    const typedArray = new Float32Array(attribute);
    return this._buffer.create(typedArray, GPUBufferUsage.VERTEX);
  }
  createIndexBuffer(indices: number[] | Uint16Array): GPUBuffer {
    const typedArray = new Uint16Array(indices);
    return this._buffer.create(typedArray, GPUBufferUsage.INDEX);
  }
  createShaderModule(source: string): GPUShaderModule {
    return this._shaderModule.create(source);
  }
  getShaderInfo(module: GPUShaderModule): Promise<GPUCompilationInfo> {
    return module.compilationInfo();
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



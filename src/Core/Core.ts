
import { Logger } from '../Common/logger';
import { Configration } from '../Interface/Configuration';
import { Descriptor } from '../Interface/Descriptor';

import { Buffer } from './Buffer';
import { ShaderModule } from './ShaderModule';

export class Core {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get ready(): boolean {
    return this.gpu != null;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  canvas: HTMLCanvasElement;
  gpu: GPU;
  adapter: GPUAdapter;
  device: GPUDevice;
  queue: GPUQueue;
  context: GPUCanvasContext;
  depthTexture: GPUTexture;
  depthTextureView: GPUTextureView;
  // instance
  buffer: Buffer;
  shaderModule: ShaderModule;

  /** constructor =========================================================== */
  constructor() {
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  async initialize(canvas?: HTMLCanvasElement): Promise<boolean> {
    this.gpu = navigator.gpu;
    if(this.gpu == null) {
      Logger.log('webgpu not support');
      return false;
    }
    this.adapter = await this.gpu.requestAdapter();
    this.device = await this.adapter.requestDevice();
    this.queue = this.device.queue;

    // canvas
    this.canvas = canvas != null ? canvas : document.createElement('canvas');
    this.initializeContext();
    this.initializeDepthTexture();

    // initialze instance (with device)
    this.buffer = new Buffer(this.device);
    this.shaderModule = new ShaderModule(this.device);

    return true;
  }
  createPipelineLayout(desc: GPUPipelineLayoutDescriptor): GPUPipelineLayout {
    return this.device.createPipelineLayout(desc);
  }
  createRenderPipeline(desc: GPURenderPipelineDescriptor): GPURenderPipeline {
    return this.device.createRenderPipeline(desc);
  }

  /** private method ======================================================== */
  private initializeContext(): void {
    // TODO: implement arguments
    this.context = this.canvas.getContext('webgpu');
    const config = Configration.canvasConfiguration(this.device, 'bgra8unorm', GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC);
    this.context.configure(config);
  }
  private initializeDepthTexture(): void {
    // TODO: implement arguments
    const size3D = [this.canvas.width, this.canvas.height, 1];
    const descriptor = Descriptor.textureDescriptor(size3D, 'depth24plus-stencil8', GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC, '2d');
    if(this.depthTexture != null) {
      this.depthTexture.destroy();
    }
    this.depthTexture = this.device.createTexture(descriptor);
    this.depthTextureView = this.depthTexture.createView();
  }
}

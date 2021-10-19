
import { Logger } from '../Common/logger';
import { Configration } from '../Interface/Configuration';
import { Descriptor } from '../Interface/Descriptor';

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

  /** constructor =========================================================== */
  constructor() {
  }

  /** chain method ========================================================== */
  async initialize(canvas?: HTMLCanvasElement): Promise<Core> {
    this.gpu = navigator.gpu;
    if(this.gpu == null) {
      Logger.log('webgpu not support');
    }
    if(this.ready) {
      return null;
    }
    this.adapter = await this.gpu.requestAdapter();
    this.device = await this.adapter.requestDevice();
    this.queue = this.device.queue;

    this.canvas = canvas != null ? canvas : document.createElement('canvas');
    this.initializeContext();
    this.initializeDepthTexture();

    return this;
  }

  /** method ================================================================ */

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
    const descriptor = Descriptor.textureDescriptor(size3D, 'depth24plus-stencil8', GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC);
    if(this.depthTexture != null) {
      this.depthTexture.destroy();
    }
    this.depthTexture = this.device.createTexture(descriptor);
    this.depthTextureView = this.depthTexture.createView();
  }
}

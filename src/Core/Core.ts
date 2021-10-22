
import { Logger } from '../Common/logger';
import { Buffer } from './Buffer';
import { ShaderModule } from './ShaderModule';

export interface ICoreInitialize {
  canvas?: HTMLCanvasElement;
  devicePixelRatio?: number;
  width?: number;
  height?: number;
}

export class Core {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */
  get ready(): boolean {
    return this.gpu != null;
  }
  get devicePixelRatio(): number {
    return this._devicePixelRatio;
  }

  /** setter ================================================================ */
  set devicePixelRatio(v: number) {
    this._devicePixelRatio = v;
    this.resize(this.canvas.width, this.canvas.height);
  }

  /** property ============================================================== */
  canvas: HTMLCanvasElement;
  gpu: GPU;
  adapter: GPUAdapter;
  device: GPUDevice;
  queue: GPUQueue;
  context: GPUCanvasContext;
  depthTexture: GPUTexture;
  depthTextureView: GPUTextureView;
  width: number;
  height: number;
  private _devicePixelRatio: number;
  private _deviceWidth: number;
  private _deviceHeight: number;
  // instance
  private _buffer: Buffer;
  private _shaderModule: ShaderModule;

  /** constructor =========================================================== */
  constructor() {
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  async initialize(option?: ICoreInitialize): Promise<boolean> {
    // gpu
    const isGpu = this.initializeGpu();
    if (!isGpu) {return false;}
    // adapter and device
    this.adapter = await this.gpu.requestAdapter();
    this.device = await this.adapter.requestDevice();
    this.queue = this.device.queue;

    // common properties
    this._devicePixelRatio = option?.devicePixelRatio != null ? option.devicePixelRatio : window.devicePixelRatio;

    // canvas
    this.canvas = option?.canvas != null ? option.canvas : document.createElement('canvas');
    const isContext = this.initializeContext();
    if (!isContext) {return false;}
    const width = option?.width != null ? option.width : this.canvas.width;
    const height = option?.height != null ? option.height : this.canvas.height;
    this.resize(width, height);

    // initialze instance (with device)
    this._buffer = new Buffer(this.device);
    this._shaderModule = new ShaderModule(this.device);

    return true;
  }
  resize(width?: number, height?: number): void {
    if (this.canvas == null) {
      Logger.log('not initialization');
      return;
    }
    if (width != null) {
      this.width = width;
    }
    if (height != null) {
      this.height = height;
    }
    this._deviceWidth = Math.floor(this.width * this._devicePixelRatio);
    this._deviceHeight = Math.floor(this.height * this._devicePixelRatio);
    this.canvas.width = this._deviceWidth;
    this.canvas.height = this._deviceHeight;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.resetContext();
    this.resetDepthTexture();
  }
  createPipelineLayout(desc: GPUPipelineLayoutDescriptor): GPUPipelineLayout {
    return this.device.createPipelineLayout(desc);
  }
  createRenderPipeline(desc: GPURenderPipelineDescriptor): GPURenderPipeline {
    return this.device.createRenderPipeline(desc);
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

  /** private method ======================================================== */
  private initializeGpu(): boolean {
    this.gpu = navigator.gpu;
    if (this.gpu == null) {
      Logger.log('webgpu not support');
      return false;
    }
    return true;
  }
  private initializeContext(): boolean {
    this.context = this.canvas.getContext('webgpu');
    if (this.context == null) {
      Logger.log('webgpu not support');
      return false;
    }
    return true;
  }
  private resetContext(): void {
    const size: GPUExtent3D = [this._deviceWidth, this._deviceHeight, 1];
    const config: GPUCanvasConfiguration = {
      device: this.device,
      format: 'bgra8unorm',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
      size: size,
    };
    this.context.configure(config);
  }
  private resetDepthTexture(): void {
    const size: GPUExtent3D = [this._deviceWidth, this._deviceHeight, 1];
    const descriptor: GPUTextureDescriptor = {
      size: size,
      format: 'depth24plus-stencil8',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC, 
    };
    if (this.depthTexture != null) {
      this.depthTexture.destroy();
    }
    this.depthTexture = this.device.createTexture(descriptor);
    this.depthTextureView = this.depthTexture.createView();
  }
}

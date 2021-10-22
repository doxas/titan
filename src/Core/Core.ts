
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
  private _devicePixelRatio: number;
  private _width: number;
  private _height: number;
  // instance
  private buffer: Buffer;
  private shaderModule: ShaderModule;

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
    const width = option?.width != null ? option.width : this.canvas.width;
    const height = option?.height != null ? option.height : this.canvas.height;
    const isContext = this.initializeContext();
    if (!isContext) {return false;}
    this.resize(width, height);

    // initialze instance (with device)
    this.buffer = new Buffer(this.device);
    this.shaderModule = new ShaderModule(this.device);

    return true;
  }
  resize(width: number, height: number): void {
    if (this.canvas == null) {
      Logger.log('not initialization');
      return;
    }
    this._width = Math.floor(width * this._devicePixelRatio);
    this._height = Math.floor(height * this._devicePixelRatio);
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
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
    return this.buffer.create(typedArray, GPUBufferUsage.VERTEX);
  }
  createIndexBuffer(indices: number[] | Uint16Array): GPUBuffer {
    const typedArray = new Uint16Array(indices);
    return this.buffer.create(typedArray, GPUBufferUsage.INDEX);
  }
  createShaderModule(source: string): GPUShaderModule {
    return this.shaderModule.create(source);
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
    const size: GPUExtent3D = [this._width, this._height, 1];
    const config: GPUCanvasConfiguration = {
      device: this.device,
      format: 'bgra8unorm',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
      size: size,
    };
    this.context.configure(config);
  }
  private resetDepthTexture(): void {
    const size: GPUExtent3D = [this._width, this._height, 1];
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


import { Pipeline } from './Pipeline';
import { Framebuffer } from '../Common/Framebuffer';
import { Scene } from '../Common/Scene';
import { Camera } from '../Common/Camera';
import { Texture } from '../Common/Texture';
import { Logger } from '../Utility/Logger';

import { Material } from '../Common/Material';
import { IndexBuffer } from '../Common/IndexBuffer';
import { VertexBuffer } from '../Common/VertexBuffer';
import { Geometry } from '../Common/Geometry';
import { Node3D } from '../Common/Node3D';
import { Base3D } from '../Common/Base3D';
import { Mat4 } from '../Math/Mat4';

export interface ICoreInitialize {
  canvas?: HTMLCanvasElement;
  devicePixelRatio?: number;
  width?: number;
  height?: number;
}
export interface IRender {
  target?: Framebuffer;
  scene: Scene;
  camera: Camera;
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
  depthTexture: Texture;
  depthTextureData: GPUTexture;
  depthTextureView: GPUTextureView;
  width: number;
  height: number;
  private _devicePixelRatio: number;
  private _deviceWidth: number;
  private _deviceHeight: number;

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
  async createPipeline(material: Material): Promise<Pipeline> {
    const pipeline = new Pipeline(this._deviceWidth, this._deviceHeight, this.device, this.context, this.queue);
    const result = await pipeline.setMaterial(material);
    if (!result) {
      throw new Error('failed material setting');
    } else {
      return pipeline;
    }
  }
  render(scene: Scene, camera?: Camera, option?: IRender): void {
    if (camera != null) {
      camera.set({
        width: this._deviceWidth,
        height: this._deviceHeight,
      });
      camera.update();
    }
    const vMatrix = camera?.viewMatrix ?? Mat4.identityMatrix();
    const pMatrix = camera?.projectionMatrix ?? Mat4.identityMatrix();
    const pvMatrix = pMatrix.multiply(vMatrix);
    // TODO: set matrix into pipeline

    scene.traverse((node) => {
      if (node instanceof Node3D) {
        node.geometry.createByDevice(this.device);
        node.pipeline.setup();

        const renderPassDescriptor = node.pipeline.framebuffer.getRenderPassDescriptor(this.context);

        const commandEncoder = this.device.createCommandEncoder();
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(node.pipeline.renderPipeline);
        passEncoder.setViewport(0, 0, this._deviceWidth, this._deviceHeight, 0, 1);
        passEncoder.setScissorRect(0, 0, this._deviceWidth, this._deviceHeight);

        node.pipeline.setToPassEncoder(passEncoder);
        node.geometry.setToPassEncoder(passEncoder);
        passEncoder.drawIndexed(3);
        passEncoder.end();

        this.queue.submit([commandEncoder.finish()]);
      }
    });
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
    if (this.depthTexture == null) {
      this.depthTexture = new Texture(descriptor);
    } else {
      this.depthTexture.destroy();
      this.depthTexture.set(descriptor);
    }
    this.depthTexture.createByDevice(this.device);
    this.depthTextureData = this.depthTexture.data;
    this.depthTextureView = this.depthTexture.view;
  }
}

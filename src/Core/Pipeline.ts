
import { Framebuffer } from '../Common/Framebuffer';
import { Material } from '../Common/Material';
import { Texture } from '../Common/Texture';
import { Vec4 } from '../Math/Vec4';

export class Pipeline {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  device: GPUDevice;
  context: GPUCanvasContext;
  queue: GPUQueue;
  depthStencilState: GPUDepthStencilState;
  primitiveState: GPUPrimitiveState;
  multisampleState: GPUMultisampleState;
  pipelineLayoutDescriptor: GPUPipelineLayoutDescriptor;
  pipelineLayout: GPUPipelineLayout;
  renderPipelineDescriptor: GPURenderPipelineDescriptor;
  renderPipeline: GPURenderPipeline;
  framebuffer: Framebuffer;

  /** constructor =========================================================== */
  constructor(width: number, height: number, device: GPUDevice, context: GPUCanvasContext, queue: GPUQueue) {
    this.device = device;
    this.context = context;
    this.queue = queue;

    const framebufferOption = {
      width: window.innerWidth,
      height: window.innerHeight,
      clearColor: new Vec4(0.3, 0.3, 0.3, 1.0),
    };
    this.framebuffer = new Framebuffer(framebufferOption);

    const size: GPUExtent3D = [width, height, 1];
    const descriptor: GPUTextureDescriptor = {
      size: size,
      format: 'depth24plus-stencil8',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC, 
    };
    const depthTexture = new Texture(descriptor);
    depthTexture.createByDevice(this.device);

    this.framebuffer.setDepthStencilTexture(depthTexture.data);
  }

  /** chain method ========================================================== */
  setup(): this {
    this.depthStencilState = {
      format: 'depth24plus-stencil8',
      depthWriteEnabled: true,
      depthCompare: 'less',
    };
    this.pipelineLayoutDescriptor = {bindGroupLayouts: []};
    this.pipelineLayout = this.device.createPipelineLayout(this.pipelineLayoutDescriptor);
    // TODO: primitive and multisample, move to prop in material
    this.primitiveState = {topology: 'triangle-list'};
    this.multisampleState = {};
    return this;
  }

  /** method ================================================================ */
  async setMaterial(material: Material): Promise<this> {
    if (material.changed) {
      const succeeded = await material.createByDevice(this.device);
      if (succeeded) {
        this.renderPipelineDescriptor = {
          vertex: material.vertexShaderState,
          fragment: material.fragmentShaderState,
          depthStencil: this.depthStencilState,
          primitive: this.primitiveState,
          multisample: this.multisampleState,
        };
        this.renderPipeline = this.device.createRenderPipeline(this.renderPipelineDescriptor);
      }
    }
    return this;
  }
}



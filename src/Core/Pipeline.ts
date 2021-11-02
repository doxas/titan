
import { Framebuffer } from '../Common/Framebuffer';
import { Material } from '../Common/Material';

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

  /** constructor =========================================================== */
  constructor(device: GPUDevice, context: GPUCanvasContext, queue: GPUQueue) {
    this.device = device;
    this.context = context;
    this.queue = queue;
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
  setMaterial(material: Material): this {
    this.renderPipelineDescriptor = {
      vertex: material.vertexShaderState,
      fragment: material.fragmentShaderState,
      depthStencil: this.depthStencilState,
      primitive: this.primitiveState,
      multisample: this.multisampleState,
    };
    this.renderPipeline = this.device.createRenderPipeline(this.renderPipelineDescriptor);
    return this;
  }

  /** method ================================================================ */
}




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
  latestMaterial: Material;

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

    this.latestMaterial = null;
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  setup(): void {
    if (this.latestMaterial == null) {return;}
    this.depthStencilState = {
      format: this.latestMaterial.depthStencilFormat,
      depthWriteEnabled: this.latestMaterial.depthWriteEnabled,
      depthCompare: this.latestMaterial.depthCompare,
    };
    this.pipelineLayoutDescriptor = {bindGroupLayouts: []};
    this.pipelineLayout = this.device.createPipelineLayout(this.pipelineLayoutDescriptor);
    // TODO: primitive and multisample, move to prop in material
    this.primitiveState = this.latestMaterial.primitiveState;
    this.multisampleState = this.latestMaterial.multisampleState;
  }
  async setMaterial(material: Material): Promise<boolean> {
    let result = true;
    if (material.changed) {
      const succeeded = await material.createByDevice(this.device);
      if (succeeded) {
        this.setup();
        this.renderPipelineDescriptor = {
          vertex: material.vertexShaderState,
          fragment: material.fragmentShaderState,
          depthStencil: this.depthStencilState,
          primitive: this.primitiveState,
          multisample: this.multisampleState,
        };
        this.renderPipeline = this.device.createRenderPipeline(this.renderPipelineDescriptor);
      } else {
        result = false;
      }
    }
    return result;
  }
}



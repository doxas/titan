
import { Framebuffer } from '../Common/Framebuffer';
import { Material } from '../Common/Material';
import { Texture } from '../Common/Texture';
import { UniformBuffer } from '../Common/UniformBuffer';
import { UniformSampler } from '../Common/UniformSampler';
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
  uniformBindGroup: GPUBindGroup;

  /** constructor =========================================================== */
  constructor(width: number, height: number, device: GPUDevice, context: GPUCanvasContext, queue: GPUQueue) {
    this.device = device;
    this.context = context;
    this.queue = queue;

    const framebufferOption = {
      width: window.innerWidth,
      height: window.innerHeight,
      clearColor: new Vec4(0.3, 0.3, 0.3, 1.0), // TODO:
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
    this.primitiveState = this.latestMaterial.primitiveState;
    this.multisampleState = this.latestMaterial.multisampleState;

    this.renderPipelineDescriptor = {
      vertex: this.latestMaterial.vertexShaderState,
      fragment: this.latestMaterial.fragmentShaderState,
      depthStencil: this.depthStencilState,
      primitive: this.primitiveState,
      multisample: this.multisampleState,
    };
    this.renderPipeline = this.device.createRenderPipeline(this.renderPipelineDescriptor);

    // uniform
    if (this.latestMaterial.uniformEntry.size > 0) {
      const entries = [];
      this.latestMaterial.uniformEntry.forEach((entry) => {
        if (entry instanceof UniformBuffer) {
          const uniformBuffer = entry;
          uniformBuffer.create();
          uniformBuffer.buffer.createByDevice(this.device);
          if (uniformBuffer.updateSource) {
            this.queue.writeBuffer(
              uniformBuffer.buffer.data,
              uniformBuffer.updateOffset,
              new Float32Array(uniformBuffer.source),
            );
          }
          const bufferBinding: GPUBufferBinding = {buffer: uniformBuffer.buffer.data};
          const bindGroup: GPUBindGroupEntry = {
            binding: entries.length,
            resource: bufferBinding,
          };
          entries.push(bindGroup);
        } else if (entry instanceof UniformSampler) {
          // TODO
        } else if (entry instanceof Texture) {
          // TODO
        }
      });
      const bindGroupLayouts = this.renderPipeline.getBindGroupLayout(0);
      const bindGroupDescriptor: GPUBindGroupDescriptor = {
        layout: bindGroupLayouts,
        entries: entries,
      };
      this.uniformBindGroup = this.device.createBindGroup(bindGroupDescriptor);
    }
  }
  async setMaterial(material: Material): Promise<boolean> {
    let result = true;
    if (material.changed) {
      const succeeded = await material.createByDevice(this.device);
      if (succeeded) {
        this.latestMaterial = material;
        this.setup();
      } else {
        result = false;
      }
    } else {
      if (material.isReady) {
        this.latestMaterial = material;
        this.setup();
      }
    }
    return result;
  }
  setToPassEncoder(passEncoder: GPURenderPassEncoder): void {
    passEncoder.setBindGroup(0, this.uniformBindGroup);
  }
}

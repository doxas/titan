
export class Descriptor {
  static textureDescriptor(
    size: GPUExtent3D,
    format: GPUTextureFormat,
    usage: GPUTextureUsageFlags,
    dimension: GPUTextureDimension = '2d',
    mipLevelCount: GPUIntegerCoordinate = 1,
    sampleCount: GPUSize32 = 1,
  ): GPUTextureDescriptor {
    return {size, format, usage, dimension, mipLevelCount, sampleCount};
  }
  static bufferDescriptor(
    size: GPUSize64,
    usage: GPUBufferUsageFlags,
    mappedAtCreation: boolean = false,
  ): GPUBufferDescriptor {
    return {size, usage, mappedAtCreation};
  }
  static shaderModuleDescriptor(
    code: string,
    sourceMap?: object,
  ): GPUShaderModuleDescriptor {
    return {code, sourceMap};
  }
  static pipelineLayoutDescriptor(
    bindGroupLayouts: GPUBindGroupLayout[],
  ): GPUPipelineLayoutDescriptor {
    return {bindGroupLayouts};
  }
  static renderPipelineDescriptor(
    vertex: GPUVertexState,
    fragment: GPUFragmentState,
    depthStencil: GPUDepthStencilState,
    primitive: GPUPrimitiveState = {},
    multisample: GPUMultisampleState = {},
  ): GPURenderPipelineDescriptor {
    return {vertex, fragment, depthStencil, primitive, multisample};
  }
  static renderPassDescriptor(
    colorAttachments: GPURenderPassColorAttachment[],
    depthStencilAttachment: GPURenderPassDepthStencilAttachment,
    occlusionQuerySet?: GPUQuerySet,
  ): GPURenderPassDescriptor {
    return {colorAttachments, depthStencilAttachment, occlusionQuerySet};
  }
}

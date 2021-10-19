
export class State {
  static depthStencilState(
    format: GPUTextureFormat,
    depthWriteEnabled: boolean = false,
    depthCompare: GPUCompareFunction = 'always',
    stencilFront: GPUStencilFaceState = {},
    stencilBack: GPUStencilFaceState = {},
    stencilReadMask: GPUStencilValue = 0xFFFFFFFF,
    stencilWriteMask: GPUStencilValue = 0xFFFFFFFF,
    depthBias: GPUDepthBias = 0,
    depthBiasSlopeScale: number = 0.0,
    depthBiasClamp: number = 0.0,
  ): GPUDepthStencilState {
    return {
      format,
      depthWriteEnabled,
      depthCompare,
      stencilFront,
      stencilBack,
      stencilReadMask,
      stencilWriteMask,
      depthBias,
      depthBiasSlopeScale,
      depthBiasClamp,
    };
  }
  static vertexState(
    module: GPUShaderModule,
    entryPoint: string,
    buffers: GPUVertexBufferLayout[] = [],
  ): GPUVertexState {
    return {module, entryPoint, buffers};
  }
  static fragmentStatel(
    module: GPUShaderModule,
    entryPoint: string,
    targets: GPUColorTargetState[] = [],
  ): GPUFragmentState {
    return {module, entryPoint, targets};
  }
  static colorTargetState(
    format: GPUTextureFormat,
    blend: GPUBlendState,
    writeMask: GPUColorWriteFlags = GPUColorWrite.ALL,
  ): GPUColorTargetState {
    return {format, blend, writeMask};
  }
  static primitiveState(
    topology: GPUPrimitiveTopology = 'triangle-list',
    stripIndexFormat: GPUIndexFormat = 'uint16',
    frontFace: GPUFrontFace = 'ccw',
    cullMode: GPUCullMode = 'none',
    clampDepth: boolean = false,
  ): GPUPrimitiveState {
    return {stripIndexFormat, topology, frontFace, cullMode, clampDepth};
  }
}

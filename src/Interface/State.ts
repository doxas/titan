
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
  static fragmentState(
    module: GPUShaderModule,
    entryPoint: string,
    targets: GPUColorTargetState[] = [],
  ): GPUFragmentState {
    return {module, entryPoint, targets};
  }
  static colorTargetState(
    format: GPUTextureFormat,
    blend?: GPUBlendState,
    writeMask: GPUColorWriteFlags = GPUColorWrite.ALL,
  ): GPUColorTargetState {
    return {format, blend, writeMask};
  }
  static blendState(
    color: GPUBlendComponent,
    alpha: GPUBlendComponent,
  ): GPUBlendState {
    return {color, alpha};
  }
  static primitiveState(
    topology: GPUPrimitiveTopology = 'triangle-list',
    frontFace: GPUFrontFace = 'ccw',
    cullMode: GPUCullMode = 'none',
    stripIndexFormat: GPUIndexFormat = 'uint16',
    clampDepth: boolean = false,
  ): GPUPrimitiveState {
    return {topology, frontFace, cullMode}; //, stripIndexFormat, clampDepth};
    // return {topology, frontFace, cullMode, stripIndexFormat}; // , clampDepth}; // only using strip-primitive-type
    // return {topology, frontFace, cullMode, stripIndexFormat, clampDepth}; // clampdepth feature not support at 2021.10 on chrome94
  }
  static multisampleState(
    count: GPUSize32 = 1,
    mask: GPUSampleMask = 0xffffffff,
    alphaToCoverageEnabled: boolean = false,
  ): GPUMultisampleState {
    return {count, mask, alphaToCoverageEnabled};
  }
}

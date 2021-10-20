
export class Layout {
  static vertexAttribute(
    format: GPUVertexFormat,
    shaderLocation: GPUIndex32,
    offset: GPUSize64 = 0,
  ): GPUVertexAttribute {
    return {format, shaderLocation, offset};
  }
  static vertexBufferLayout(
    arrayStride: GPUSize64,
    attributes: GPUVertexAttribute[],
    stepMode: GPUVertexStepMode = 'vertex',
  ): GPUVertexBufferLayout {
    return {arrayStride, attributes, stepMode};
  }
  static renderPassColorAttachment(
    view: GPUTextureView,
    resolveTarget: GPUTextureView,
    loadValue: GPULoadOp | GPUColor,
    storeOp: GPUStoreOp,
  ): GPURenderPassColorAttachment {
    return {view, resolveTarget, loadValue, storeOp};
  }
  static renderPassDepthStencilAttachment(
    view: GPUTextureView,
    depthLoadValue: GPULoadOp | number,
    depthStoreOp: GPUStoreOp,
    depthReadOnly: boolean = false,
    stencilLoadValue: GPULoadOp | GPUStencilValue,
    stencilStoreOp: GPUStoreOp,
    stencilReadOnly: boolean = false,
  ): GPURenderPassDepthStencilAttachment {
    return {view, depthLoadValue, depthStoreOp, depthReadOnly, stencilLoadValue, stencilStoreOp, stencilReadOnly};
  }
}

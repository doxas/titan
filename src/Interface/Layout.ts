
export class Layout {
  static vertexAttribute(
    format: GPUVertexFormat,
    offset: GPUSize64,
    shaderLocation: GPUIndex32,
  ): GPUVertexAttribute {
    return {format, offset, shaderLocation};
  }
  static vertexBufferLayout(
    arrayStride: GPUSize64,
    attributes: GPUVertexAttribute[],
    stepMode: GPUVertexStepMode = 'vertex',
  ): GPUVertexBufferLayout {
    return {arrayStride, attributes, stepMode};
  }
}


export class Descriptor {
  static textureDescriptor(
    size: GPUExtent3D,
    format: GPUTextureFormat,
    usage: GPUTextureUsageFlags,
    mipLevelCount: GPUIntegerCoordinate = 1,
    sampleCount: GPUSize32 = 1,
    dimension: GPUTextureDimension = '2d',
  ): GPUTextureDescriptor {
    return {size, format, usage, mipLevelCount, sampleCount, dimension};
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
}

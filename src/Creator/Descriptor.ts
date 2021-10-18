
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
}

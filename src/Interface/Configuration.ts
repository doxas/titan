
export class Configration {
  static canvasConfiguration(
    device: GPUDevice,
    format: GPUTextureFormat,
    usage: GPUTextureUsageFlags = GPUTextureUsage.RENDER_ATTACHMENT,
    colorSpace: GPUPredefinedColorSpace = 'srgb',
    compositingAlphaMode: GPUCanvasCompositingAlphaMode = 'opaque',
    size?: GPUExtent3D,
  ): GPUCanvasConfiguration {
    return {device, format, usage, colorSpace, compositingAlphaMode, size};
  }
}


import { Descriptor } from '../Creator/Descriptor';

export class ShaderModule {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  device: GPUDevice;

  /** constructor =========================================================== */
  constructor(device: GPUDevice) {
    this.device = device;
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  create(code: string, sourceMap: object): GPUShaderModule {
    const descriptor = Descriptor.shaderModuleDescriptor(code, sourceMap);
    const shader = this.device.createShaderModule(descriptor);
    return shader;
  }
}



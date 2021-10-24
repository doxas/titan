
import { Base } from './Base';

export interface IMaterial {
  vertexShaderSource?: string;
  fragmentShaderSource?: string;
  computeShaderSource?: string;
  vertexShaderSourceMap?: object;
  fragmentShaderSourceMap?: object;
  computeShaderSourceMap?: object;
}

export class Material extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  vertexShaderSource: string;
  fragmentShaderSource: string;
  computeShaderSource: string;
  vertexShaderSourceMap: object;
  fragmentShaderSourceMap: object;
  computeShaderSourceMap: object;
  vertexShaderModule: GPUShaderModule;
  fragmentShaderModule: GPUShaderModule;
  computeShaderModule: GPUShaderModule;
  vertexShaderInfo: GPUCompilationInfo;
  fragmentShaderInfo: GPUCompilationInfo;
  computeShaderInfo: GPUCompilationInfo;

  /** constructor =========================================================== */
  constructor(option: IMaterial) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IMaterial): this {
    this.vertexShaderSource = option.vertexShaderSource != null ? option.vertexShaderSource : '';
    this.fragmentShaderSource = option.fragmentShaderSource != null ? option.fragmentShaderSource : '';
    this.computeShaderSource = option.computeShaderSource != null ? option.computeShaderSource : '';
    this.vertexShaderSourceMap = option.vertexShaderSourceMap != null ? option.vertexShaderSourceMap : null;
    this.fragmentShaderSourceMap = option.fragmentShaderSourceMap != null ? option.fragmentShaderSourceMap : null;
    this.computeShaderSourceMap = option.computeShaderSourceMap != null ? option.computeShaderSourceMap : null;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.vertexShaderSource = '';
    this.fragmentShaderSource = '';
    this.computeShaderSource = '';
    this.vertexShaderSourceMap = null;
    this.fragmentShaderSourceMap = null;
    this.computeShaderSourceMap = null;
    this.vertexShaderModule = null;
    this.fragmentShaderModule = null;
    this.computeShaderModule = null;
    this.vertexShaderInfo = null;
    this.fragmentShaderInfo = null;
    this.computeShaderInfo = null;
    this._changed = false;
    return this;
  }

  /** method ================================================================ */
  async createByDevice(device: GPUDevice): Promise<boolean> {
    if (!this._changed) {return null;}
    this.destroy();
    let succeeded = true;
    if (this.vertexShaderSource !== '') {
      const code = this.vertexShaderSource;
      const sourceMap = this.vertexShaderSourceMap;
      const descriptor: GPUShaderModuleDescriptor = {code, sourceMap};
      this.vertexShaderModule = device.createShaderModule(descriptor);
      this.vertexShaderInfo = await this.vertexShaderModule.compilationInfo();
      if (this.vertexShaderInfo.messages.length > 0) {
        succeeded = false;
      }
    }
    if (this.fragmentShaderSource !== '') {
      const code = this.fragmentShaderSource;
      const sourceMap = this.fragmentShaderSourceMap;
      const descriptor: GPUShaderModuleDescriptor = {code, sourceMap};
      this.fragmentShaderModule = device.createShaderModule(descriptor);
      this.fragmentShaderInfo = await this.fragmentShaderModule.compilationInfo();
      if (this.fragmentShaderInfo.messages.length > 0) {
        succeeded = false;
      }
    }
    if (this.computeShaderSource !== '') {
      const code = this.computeShaderSource;
      const sourceMap = this.computeShaderSourceMap;
      const descriptor: GPUShaderModuleDescriptor = {code, sourceMap};
      this.computeShaderModule = device.createShaderModule(descriptor);
      this.computeShaderInfo = await this.computeShaderModule.compilationInfo();
      if (this.computeShaderInfo.messages.length > 0) {
        succeeded = false;
      }
    }
    return succeeded;
  }
}



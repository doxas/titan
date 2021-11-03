
import { Base } from './Base';
import { VertexAttribute } from './VertexAttribute';

export interface IMaterial {
  vertexShaderSource?: string;
  fragmentShaderSource?: string;
  vertexShaderSourceMap?: object;
  fragmentShaderSourceMap?: object;
  vertexShaderEntryPoint?: string;
  fragmentShaderEntryPoint?: string;
  colorTargetStateFormat?: GPUTextureFormat;
  colorTargetStateBlend?: GPUBlendState;
  colorTargetStateWriteMask?: GPUColorWriteFlags;
}

export class Material extends Base {
  /** static getter ========================================================= */
  static get ENTRY_POINT_NAME(): string {return 'main';}
  static get COLOR_TARGET_STATE_FORMAT(): GPUTextureFormat {return 'bgra8unorm';}
  static get COLOR_TARGET_STATE_BLEND(): GPUBlendState {
    const color: GPUBlendComponent = {operation: 'add', srcFactor: 'one', dstFactor: 'zero'};
    const alpha: GPUBlendComponent = {operation: 'add', srcFactor: 'one', dstFactor: 'zero'};
    return {color, alpha};
  }
  static get COLOR_TARGET_STATE_WRITE_MASK(): GPUColorWriteFlags {return GPUColorWrite.ALL;}

  /** static method ========================================================= */

  /** getter ================================================================ */
  get changed(): boolean {
    return this._changed;
  }

  /** setter ================================================================ */

  /** property ============================================================== */
  vertexShaderSource: string;
  fragmentShaderSource: string;
  vertexShaderSourceMap: object;
  fragmentShaderSourceMap: object;
  vertexShaderEntryPoint: string;
  fragmentShaderEntryPoint: string;
  colorTargetStateFormat: GPUTextureFormat;
  colorTargetStateBlend: GPUBlendState;
  colorTargetStateWriteMask: GPUColorWriteFlags;
  // private?
  vertexShaderModule: GPUShaderModule;
  fragmentShaderModule: GPUShaderModule;
  vertexShaderInfo: GPUCompilationInfo;
  fragmentShaderInfo: GPUCompilationInfo;
  vertexShaderState: GPUVertexState;
  fragmentShaderState: GPUFragmentState;

  /** constructor =========================================================== */
  constructor(option: IMaterial) {
    super();
    this.set(option);
  }

  /** chain method ========================================================== */
  set(option: IMaterial): this {
    this.vertexShaderSource = option.vertexShaderSource != null ? option.vertexShaderSource : '';
    this.fragmentShaderSource = option.fragmentShaderSource != null ? option.fragmentShaderSource : '';
    this.vertexShaderSourceMap = option.vertexShaderSourceMap != null ? option.vertexShaderSourceMap : null;
    this.fragmentShaderSourceMap = option.fragmentShaderSourceMap != null ? option.fragmentShaderSourceMap : null;
    this.vertexShaderEntryPoint = option.vertexShaderEntryPoint != null ? option.vertexShaderEntryPoint : Material.ENTRY_POINT_NAME;
    this.fragmentShaderEntryPoint = option.fragmentShaderEntryPoint != null ? option.fragmentShaderEntryPoint : Material.ENTRY_POINT_NAME;
    this.colorTargetStateFormat = option.colorTargetStateFormat != null ? option.colorTargetStateFormat : Material.COLOR_TARGET_STATE_FORMAT;
    this.colorTargetStateBlend = option.colorTargetStateBlend != null ? option.colorTargetStateBlend : Material.COLOR_TARGET_STATE_BLEND;
    this.colorTargetStateWriteMask = option.colorTargetStateWriteMask != null ? option.colorTargetStateWriteMask : Material.COLOR_TARGET_STATE_WRITE_MASK;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.vertexShaderSource = '';
    this.fragmentShaderSource = '';
    this.vertexShaderSourceMap = null;
    this.fragmentShaderSourceMap = null;
    this.vertexShaderEntryPoint = Material.ENTRY_POINT_NAME;
    this.fragmentShaderEntryPoint = Material.ENTRY_POINT_NAME;
    this.colorTargetStateFormat = Material.COLOR_TARGET_STATE_FORMAT;
    this.colorTargetStateBlend = Material.COLOR_TARGET_STATE_BLEND;
    this.colorTargetStateWriteMask = Material.COLOR_TARGET_STATE_WRITE_MASK;
    // private?
    this.vertexShaderModule = null;
    this.fragmentShaderModule = null;
    this.vertexShaderInfo = null;
    this.fragmentShaderInfo = null;
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
      } else {
        // compilation success then...
        const positionAttribute = new VertexAttribute({
          format: 'float32x3',
          offset: 0,
          shaderLocation: 0,
        });
        const colorAttribute = new VertexAttribute({
          format: 'float32x3',
          offset: 0,
          shaderLocation: 1,
        });
        this.vertexShaderState = {
          module: this.vertexShaderModule,
          entryPoint: this.vertexShaderEntryPoint,
          buffers: [positionAttribute.bufferLayout, colorAttribute.bufferLayout],
        };
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
      } else {
        // compilation success then...
        const colorTargetState: GPUColorTargetState = {
          format: this.colorTargetStateFormat,
          blend: this.colorTargetStateBlend,
          writeMask: this.colorTargetStateWriteMask,
        };
        this.fragmentShaderState = {
          module: this.fragmentShaderModule,
          entryPoint: this.fragmentShaderEntryPoint,
          targets: [colorTargetState],
        };
      }
    }
    return succeeded;
  }
}



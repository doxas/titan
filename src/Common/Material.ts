
import { Base } from './Base';
import { Texture } from './Texture';
import { UniformBuffer } from './UniformBuffer';
import { UniformSampler } from './UniformSampler';
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
  depthStencilFormat?: GPUTextureFormat;
  depthWriteEnabled?: boolean;
  depthCompare?: GPUCompareFunction;
  primitiveState?: GPUPrimitiveState;
  multisampleState?: GPUMultisampleState;
}

export interface IUniformBufferEntry {
  name: string;
  source: number[] | Float32Array;
}

export interface IUniformSamplerEntry {
  name: string;
  source: GPUSamplerDescriptor;
}

export interface IUniformTextureEntry {
  name: string;
  source: Texture;
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
  static get DEPTH_STENCIL_FORMAT(): GPUTextureFormat {return 'depth24plus-stencil8';}
  static get DEPTH_WRITE_ENABLED(): boolean {return true;}
  static get DEPTH_COMPARE(): GPUCompareFunction {return 'less';}
  static get PRIMITIVE_STATE(): GPUPrimitiveState {return {topology: 'point-list'};}
  static get MULTISAMPLE_STATE(): GPUMultisampleState {return {};}

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
  // from pipeline
  depthStencilFormat: GPUTextureFormat;
  depthWriteEnabled: boolean;
  depthCompare: GPUCompareFunction;
  primitiveState: GPUPrimitiveState;
  multisampleState: GPUMultisampleState;
  // uniform
  uniformEntry: Map<string, UniformBuffer | UniformSampler | Texture>;
  // todo
  isReady: boolean;

  /** constructor =========================================================== */
  constructor(option: IMaterial) {
    super();
    this.name = 'Material';

    this.uniformEntry = new Map();
    this.isReady = false;
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
    this.depthStencilFormat = option.depthStencilFormat != null ? option.depthStencilFormat : Material.DEPTH_STENCIL_FORMAT;
    this.depthWriteEnabled = option.depthWriteEnabled != null ? option.depthWriteEnabled : Material.DEPTH_WRITE_ENABLED;
    this.depthCompare = option.depthCompare != null ? option.depthCompare : Material.DEPTH_COMPARE;
    this.primitiveState = option.primitiveState != null ? option.primitiveState : Material.PRIMITIVE_STATE;
    this.multisampleState = option.multisampleState != null ? option.multisampleState : Material.MULTISAMPLE_STATE;
    this._changed = true;
    return this;
  }
  destroy(): this {
    this.vertexShaderModule = null;
    this.fragmentShaderModule = null;
    this.vertexShaderInfo = null;
    this.fragmentShaderInfo = null;
    this._changed = false;
    return this;
  }
  addUniformBufferEntry(uniform: IUniformBufferEntry): this {
    const buffer = new UniformBuffer({data: uniform.source});
    this.uniformEntry.set(uniform.name, buffer);
    return this;
  }
  addUniformSamplerEntry(uniform: IUniformSamplerEntry): this {
    const sampler = new UniformSampler(uniform.source);
    this.uniformEntry.set(uniform.name, sampler);
    return this;
  }
  addUniformTextureEntry(uniform: IUniformTextureEntry): this {
    this.uniformEntry.set(uniform.name, uniform.source);
    return this;
  }
  removeUniformEntry(name: string): this {
    this.uniformEntry.delete(name);
    return this;
  }
  updateUniformBufferEntry(name: string, data: number[] | Float32Array, offset: number = 0): this {
    const entry = this.uniformEntry.get(name);
    if (entry != null) {
      if (entry instanceof UniformBuffer) {
        entry.update(data, offset);
      } else if(entry instanceof UniformSampler) {
        // TODO
      } else if(entry instanceof Texture) {
        // TODO
      }
    }
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
        }).create();
        const colorAttribute = new VertexAttribute({
          format: 'float32x3',
          offset: 0,
          shaderLocation: 1,
        }).create();
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
    this.isReady = succeeded;
    return succeeded;
  }
}

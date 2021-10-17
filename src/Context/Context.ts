
import { Logger } from "../Common/logger";

export class Context {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  canvas: HTMLCanvasElement;
  gpu: GPU;
  adapter: GPUAdapter;
  device: GPUDevice;
  queue: GPUQueue;

  /** constructor =========================================================== */
  constructor(canvas?: HTMLCanvasElement) {
    this.gpu = navigator.gpu;
    if(this.gpu == null) {
      Logger.log('webgpu not support');
    }
    this.canvas = canvas != null ? canvas : document.createElement('canvas');
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
}

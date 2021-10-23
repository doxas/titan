
import { Base } from './Base';

export class Framebuffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  device: GPUDevice;
  width: number;
  height: number;

  /** constructor =========================================================== */
  constructor(device: GPUDevice, width: number, height: number) {
    super();
    this.device = device;
    this.width = width;
    this.height = height;
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
}



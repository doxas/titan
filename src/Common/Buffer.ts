
import { Base } from './Base';

export class Buffer extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */

  /** constructor =========================================================== */
  constructor() {
    super();
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  create(arrayBuffer: Float32Array | Uint16Array, usage: GPUBufferUsageFlags): GPUBuffer {
    const size = (arrayBuffer.byteLength + 3) & ~3;
    const mappedAtCreation = true;
    const descriptor = Descriptor.bufferDescriptor(size, usage, mappedAtCreation);
    const buffer = this.device.createBuffer(descriptor);

    // TODO: why do this?
    const writeArray = arrayBuffer instanceof Uint16Array
      ? new Uint16Array(buffer.getMappedRange())
      : new Float32Array(buffer.getMappedRange());
    writeArray.set(arrayBuffer);

    buffer.unmap();
    return buffer;
  }
}



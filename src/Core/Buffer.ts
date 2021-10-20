
import { Descriptor } from '../Interface/Descriptor';

export class Buffer {
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



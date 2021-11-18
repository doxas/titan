
import { Pipeline } from '../Core/Pipeline';
import { Base3D } from './Base3D';
import { Geometry } from './Geometry';

export class Node3D extends Base3D {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  pipeline: Pipeline;
  geometry: Geometry;

  /** constructor =========================================================== */
  constructor(pipeline: Pipeline, geometry: Geometry) {
    super();
    this.name = 'Node3D';

    this.pipeline = pipeline;
    this.geometry = geometry;
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
}

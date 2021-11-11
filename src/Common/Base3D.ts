
import { Base } from './Base';
import { Traverse } from '../Utility/Signature';

export class Base3D extends Base {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  children: Base3D[];

  /** constructor =========================================================== */
  constructor() {
    super();

    this.children = [];
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  traverse(callback: Traverse): void {
    callback(this);
    for (let i = 0, j = this.children.length; i < j; ++i) {
      this.children[i].traverse(callback);
    }
  }
}



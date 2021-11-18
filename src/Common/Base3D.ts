
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
    this.name = 'Base';

    this.children = [];
  }

  /** chain method ========================================================== */
  add(child: Base3D): this {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
    return this;
  }
  remove(child: Base3D): this {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
    return this;
  }

  /** method ================================================================ */
  traverse(callback: Traverse): void {
    callback(this);
    for (let i = 0, j = this.children.length; i < j; ++i) {
      this.children[i].traverse(callback);
    }
  }
}


import { Emitter } from './Emitter';
import { UUID } from '../Utility/UUID';

export class Base extends Emitter {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  name: string;
  uuid: string;
  protected _changed: boolean;

  /** constructor =========================================================== */
  constructor() {
    super();

    this.name = 'common';
    this.uuid = UUID.generate();
    this._changed = false;
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
}

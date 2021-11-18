
type callback = (...arg: any[]) => {};

export class Emitter {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  private _listener: {[key: string]: callback[]};

  /** constructor =========================================================== */
  constructor() {
    this._listener = {};
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  on(eventName: string, callbackFunction: callback): void {
    if (Array.isArray(this._listener[eventName]) !== true) {
      this._listener[eventName] = [];
    }
    this._listener[eventName].push(callbackFunction);
  }
  off(eventName: string, callback: callback): boolean {
    let removed = false;
    if (Array.isArray(this._listener[eventName]) === true) {
      this._listener[eventName].forEach((listener, index) => {
        if (listener === callback) {
          this._listener[eventName].splice(index, 1);
          removed = true;
        }
      });
    }
    return removed;
  }
}

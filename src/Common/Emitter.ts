
type callback = (...arg: any[]) => {};

export class Emitter {
  /** static getter ========================================================= */

  /** static method ========================================================= */

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */
  listener: {[key: string]: callback[]};

  /** constructor =========================================================== */
  constructor() {
    this.listener = {};
  }

  /** chain method ========================================================== */

  /** method ================================================================ */
  on(eventName: string, callbackFunction: callback): void {
    if (Array.isArray(this.listener[eventName]) !== true) {
      this.listener[eventName] = [];
    }
    this.listener[eventName].push(callbackFunction);
  }
  off(eventName: string, callback: callback): boolean {
    let removed = false;
    if (Array.isArray(this.listener[eventName]) === true) {
      this.listener[eventName].forEach((listener, index) => {
        if (listener === callback) {
          this.listener[eventName].splice(index, 1);
          removed = true;
        }
      });
    }
    return removed;
  }
}



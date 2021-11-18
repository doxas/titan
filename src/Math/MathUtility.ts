
export class MathUtility {
  /** static getter ========================================================= */

  /** static method ========================================================= */
  static union32Array(...args: (number[] | Float32Array)[]): Float32Array {
    // TODO: optimization...
    let length = 0;
    for (let i = 0, j = args.length; i < j; ++i) {
      length += args[i].length;
    }
    const result = new Float32Array(length);
    length = 0;
    for (let i = 0, j = args.length; i < j; ++i) {
      result.set(args[i], length);
      length += args[i].length;
    }
    return result;
  }

  /** getter ================================================================ */

  /** setter ================================================================ */

  /** property ============================================================== */

  /** constructor =========================================================== */

  /** chain method ========================================================== */
}

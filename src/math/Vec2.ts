
export class Vec2 {
  /** static getter */
  static get ELEMENT_COUNT(): number {return 2;}

  /** static method */
  static sum(v: Vec2): number {
    return v.x + v.y;
  }
  static difference(v: Vec2): number {
    return v.x - v.y;
  }
  static product(v: Vec2): number {
    return v.x * v.y;
  }
  static quotient(v: Vec2): number {
    return v.x / v.y;
  }

  /** getter */
  get x(): number {return this.value[0];}
  get y(): number {return this.value[1];}
  get length(): number {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  /** setter */
  set x(v: number) {this.value[0] = v;}
  set y(v: number) {this.value[1] = v;}

  /** property */
  private value = new Float32Array(2);

  /** constructor */
  constructor(x = 0.0, y = 0.0) {
    this.set(x, y);
  }

  /** chain method */
  set(x = 0.0, y = 0.0): Vec2 {
    this.x = x;
    this.y = y;
    return this;
  }
  copy(v: Vec2) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  add(v: Vec2): Vec2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(v: Vec2): Vec2 {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  mul(v: Vec2): Vec2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  div(v: Vec2): Vec2 {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  lerp(time: number, v: Vec2): Vec2 {
    const diff = v.subVec2(this);
    this.x = this.x + diff.x * time;
    this.y = this.y + diff.y * time;
    return this;
  }
  normalize(): Vec2 {
    if(this.length !== 0.0) {
      const length = this.length;
      this.x /= length;
      this.y /= length;
    }
    return this;
  }
  negate(): Vec2 {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /** method */
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }
  get(): Vec2 {
    return this.clone();
  }
  addScalar(v: number): Vec2 {
    return new Vec2(
      this.x + v,
      this.y + v,
    );
  }
  subScalar(v: number): Vec2 {
    return new Vec2(
      this.x - v,
      this.y - v,
    );
  }
  mulScalar(v: number): Vec2 {
    return new Vec2(
      this.x * v,
      this.y * v,
    );
  }
  divScalar(v: number): Vec2 {
    return new Vec2(
      this.x / v,
      this.y / v,
    );
  }
  addVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x + v.x,
      this.y + v.y,
    );
  }
  subVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x - v.x,
      this.y - v.y,
    );
  }
  mulVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x * v.x,
      this.y * v.y,
    );
  }
  divVec2(v: Vec2): Vec2 {
    return new Vec2(
      this.x / v.x,
      this.y / v.y,
    );
  }
  lerpVec2(time: number, v: Vec2): Vec2 {
    const diff = v.subVec2(this);
    return new Vec2(
      this.x + diff.x * time,
      this.y + diff.y * time,
    );
  }
  distance(v: Vec2): number {
    return v.clone().sub(this).length;
  }
  dot(v: Vec2): number {
    return this.x * v.x + this.y * v.y;
  }
  cross(v: Vec2): number {
    return this.x * v.y - this.y * v.x;
  }
  equals(v: Vec2): boolean {
    return this.x === v.x && this.y === v.y;
  }
}
import type Vector from './vector';

export type PointT = {
  x: number;
  y: number;
};

export class Point {
  x: number;

  y: number;

  constructor(coords: PointT) {
    this.x = coords.x;
    this.y = coords.y;
  }

  static distance(p1: Point, p2: Point): number {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
  }

  static midpoint(p1: Point, p2: Point): Point {
    return new Point({
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    });
  }

  translate(vector: Vector): Point {
    return new Point({
      x: this.x + vector.x,
      y: this.y + vector.y,
    });
  }
  
  scale(factor: number): Point {
    return new Point({
      x: this.x * factor,
      y: this.y * factor,
    });
  }

  rotate(angle: number): Point {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Point({
      x: this.x * cos - this.y * sin,
      y: this.x * sin + this.y * cos,
    });
  }
  //     this.x += vector.x;
  //     this.y += vector.y;
  //     return this;
  //   }
}

import type { Point } from './point';

export default class Vector {
  x: number;

  y: number;

  endPoint: Point;

  startPoint?: Point;

  constructor(endPoint: Point, startPoint?: Point) {
    this.endPoint = endPoint;
    this.startPoint = startPoint;
    this.x = endPoint.x - (startPoint ? startPoint.x : 0);
    this.y = endPoint.y - (startPoint ? startPoint.y : 0);
  }
}

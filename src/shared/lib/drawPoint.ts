import type { Point } from '../types/point';

export default function drawPoint(ctx: CanvasRenderingContext2D, point: Point): void {
  ctx.fillStyle = 'white';
  ctx.fillRect(point.x, point.y, 1.2, 1.2);
}

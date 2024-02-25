import type { Point } from '../types/point';
import drawPoint from './drawPoint';

export default function renderPointsOnCanvas(canvas: HTMLCanvasElement, points: Point[]): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.forEach((point) => drawPoint(ctx, point));
}

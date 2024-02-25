import { Point } from '../types/point';
import drawPoint from './drawPoint';

export default function addRandomPoint(canvas: HTMLCanvasElement): Point {
  const { width, height } = canvas;
  const newPoint = new Point({
    x: Math.random() * width,
    y: Math.random() * height,
  });
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No context');
  drawPoint(ctx, newPoint);
  return newPoint;
}

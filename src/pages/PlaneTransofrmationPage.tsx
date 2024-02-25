import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Point } from '../shared/types/point';
import addRandomPoint from '../shared/lib/addRandomPoint';
import Vector from '../shared/types/vector';
import renderPointsOnCanvas from '../shared/lib/renderPointsOnCanvas';

export default function PlaneTransofrmationPage(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDownOverCanvas, setMouseDownOverCanvas] = useState(false);
  const [reperPoints, setReperPoints] = useState<[Point?, Point?]>([]);
  const [initialPoints, setInitialPoints] = useState<Point[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  }, []);

  useEffect(() => {
    const [r1, r2] = reperPoints;
    if (!r1 || !r2) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setPoints((prev) => prev.map((point) => point.translate(new Vector(r2, r1))));
  }, [reperPoints]);

  useEffect(() => {
    if (points.length <= 10) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderPointsOnCanvas(canvas, [...points, ...initialPoints]);
  }, [points]);

  return (
    // <div onMouseUp={}>
    <Container style={{ background: 'black' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6} justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              setInitialPoints((prev) => {
                const newPoints = [
                  ...prev,
                  ...new Array(500).fill(null).map(() => addRandomPoint(canvas)),
                ];
                setPoints(newPoints);
                return newPoints;
              });
            }}
          >
            Add noise
          </Button>
          <Button
            variant="contained"
            onClick={() => setPoints((prev) => prev.map((point) => point.scale(0.99)))}
          >
            Scale down
          </Button>
          <Button
            variant="contained"
            onClick={() => setPoints((prev) => prev.map((point) => point.rotate(0.03)))}
          >
            Rotate
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4} justifyContent="center" alignItems="center">
          <canvas
            ref={canvasRef}
            onMouseDown={(event) => {
              setMouseDownOverCanvas(true);
              const newPoint = new Point({ x: event.clientX, y: event.clientY });
              setReperPoints([newPoint]);
            }}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOut={() => {
              setMouseDownOverCanvas(false);
              setReperPoints([]);
            }}
            onMouseUp={() => {
              setMouseDownOverCanvas(false);
              setReperPoints([]);
            }}
            onMouseMove={(event) => {
              if (!mouseDownOverCanvas) return;
              const canvas = canvasRef.current;
              if (!canvas) return;

              const currentPoint = new Point({ x: event.clientX, y: event.clientY });
              setReperPoints((prev) => [prev[1], currentPoint]);
              //   setPoints((prev) => [...prev, addRandomPoint(canvas, event.offsetX, event.offsetY)]);
              //   console.log(event.offsetX, event.offsetY);
            }}
            style={{
              width: '500px',
              height: '500px',
              border: '1px solid white',
              margin: '5px',
              background: 'black',
            }}
          />
        </Grid>
      </Grid>
    </Container>
    // </div>
  );
}

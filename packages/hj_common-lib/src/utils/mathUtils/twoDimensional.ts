import { radToDeg } from "./common";

export type Point = {
  x: number;
  y: number;
};

/**
 * 두 점 사이의 거리를 구한다.
 * @example
 * distanceBetweenPoints({ x: 0, y: 0 }, { x: 3, y: 4 }) // 5
 */
export const distanceBetweenPoints = (p1: Point, p2: Point): number => {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

/**
 * (0, 0)에서 Point (x, y)의 각도를 구한다
 * @example
 * calcAngleDegrees({ x: 1, y: 1 }) // 45
 * calcAngleDegrees({ x: -2, y: 1 }) // 153.43494882292202
 */
export function pointToAngleDeg({ x, y }: Point) {
  return radToDeg(Math.atan2(y, x));
}

/**
 * (0, 0)에서 Point (x, y)의 라디안을 구한다
 * @example
 * getPointRadian({x: 1, y: 1}) // 0.7853981633974483
 */
export function pointToRad({ x, y }: Point) {
  return Math.atan2(y, x);
}

// tau(𝝉) == 2pi
export const tau = Math.PI * 2;

// 1rad ≈ 57.29577951308232deg
export const rad = tau / 360; /*?*/

/**
 * @param degree 각도
 * @example
 * degreesToRadians(57.2958) // 1.0000003575641672
 */
export function degToRad(degree: number): number {
  return (degree * Math.PI) / 180;
}

/**
 * 호의 길이를 구한다.
 * @param radius 반지름
 * @param radian 라디안
 * @example
 * getArc(3, 3) // 9
 */
export function getArc(radius: number, radian: number): number {
  return radius * radian;
}

/**
 * 라디안 -> 각도
 * @param radian 라디안
 * @example
 * radiansToDegrees(1) // 57.29577951308232
 */
export function radToDeg(radian: number): number {
  return (radian * 180) / Math.PI;
}

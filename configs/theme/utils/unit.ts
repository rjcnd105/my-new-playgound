export const pxremUnitTransform = (base: number) => ({
  px2rem: (px: number) => `${px / base}rem`,
  rem2px: (rem: number) => `${rem * base}px`,
});
export const { px2rem, rem2px } = pxremUnitTransform(16);

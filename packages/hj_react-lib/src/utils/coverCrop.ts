export type ImgSize = {
  width: number;
  height: number;
};
export type CanvasOptions = {
  width: number;
  height: number;
  align?: [number, number];
};

/**
 * cover 형태로 이미지 자르기
 * @example
 * const { width, height, x, y } = coverCrop({ width: 120, height: 100 }, { width: 50, height: 50 });
 * context.drawImage(img, x, y, width, height)
 **/
export function coverCrop(
  imgSize: ImgSize,
  { align = [0.5, 0.5], ...canvasSize }: CanvasOptions,
) {
  const ratio = imgSize.width / imgSize.height;

  const isHorizontal = ratio > canvasSize.width / canvasSize.height;

  const size = {
    width: isHorizontal
      ? imgSize.width * (canvasSize.height / imgSize.height)
      : canvasSize.width,
    height: isHorizontal
      ? canvasSize.height
      : imgSize.height * (canvasSize.width / imgSize.width),
  };
  const position = {
    x: isHorizontal ? (canvasSize.width - size.width) * align[0] : 0,
    y: isHorizontal ? 0 : (canvasSize.height - size.height) * align[1],
  };

  return {
    ...size,
    ...position,
  };
}

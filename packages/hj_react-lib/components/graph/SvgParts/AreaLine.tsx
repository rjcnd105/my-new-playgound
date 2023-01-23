import { Line } from "@visx/shape";
import type { ComponentProps } from "react";

type SvgLineProps = ComponentProps<typeof Line>;
export type AreaLineProps = SvgLineProps & {
  areaStrokeWidth: SvgLineProps["strokeWidth"];
  areaLineProps?: Partial<SvgLineProps>;
};

export default function AreaLine({
  onClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  areaStrokeWidth,
  areaLineProps,
  ...props
}: AreaLineProps) {
  const defaultAreaProps = {
    from: props.from,
    to: props.to,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
  } as AreaLineProps;

  const areaCirclePropsMerged = Object.assign(defaultAreaProps, areaLineProps);
  return (
    <>
      <Line {...props} />
      <Line
        strokeWidth={areaStrokeWidth}
        opacity={0}
        stroke="transparent"
        {...areaCirclePropsMerged}
      />
    </>
  );
}

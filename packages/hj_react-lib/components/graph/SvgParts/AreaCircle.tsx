import { Circle } from "@visx/shape";
import type { ComponentProps } from "react";

type CircleProps = ComponentProps<typeof Circle>;
export type AreaCircleProps = ComponentProps<typeof Circle> & {
  areaR: CircleProps["r"];
  areaCircleProps?: Partial<CircleProps>;
};

export default function AreaCircle({
  onClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  areaR,
  areaCircleProps,
  ...props
}: AreaCircleProps) {
  const defaultCircleProps = {
    cx: props.cx,
    cy: props.cy,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
  };
  const areaCirclePropsMerged = Object.assign(
    defaultCircleProps,
    areaCircleProps,
  );
  return (
    <>
      <Circle {...props} />
      <Circle
        opacity={0}
        r={areaR}
        fill="transparent"
        {...areaCirclePropsMerged}
      />
    </>
  );
}

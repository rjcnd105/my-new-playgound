import { Group } from "@visx/group";
import * as Scale from "@visx/scale";
import { Pie } from "@visx/shape";
import type { PieProps } from "@visx/shape/lib/shapes/Pie";
import { Text } from "@visx/text";
import { useAnimatedNumber } from "../../../src/hooks/useAnimateNumber";
import { radToDeg, tau } from "@hj/common-lib/src/utils/mathUtils/common";
import { useState } from "react";

const width = 500;
const height = 300;

const quadrant = tau / 4;

export type TachometerData = Array<{
  label: string;
  color: CSSStyleDeclaration["color"];
}>;

type TachometerPieProps = PieProps<TachometerData[number]>;

export type ValueInfo = {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  formatter: (value: TachometerProps["value"]) => string;
};

export type TachometerProps = {
  value: number;
  valueInfo: ValueInfo;
  data: TachometerData;
};

const gaugeRadius = {
  outerRadius: 150,
  innerRadius: 65,
};

const infoRadius = {
  outerRadius: 195,
  innerRadius: 160,
};

const startYPos = height - 80;
const infoPieColor = "#3e3e3e";

const gaugeValueBoxWidth = 72;
const gaugeValueBoxHeight = 42;
const gaugeValueBoxRound = 12;

export const TachometerGraph = ({
  data,
  value,
  valueInfo,
}: TachometerProps) => {
  const [valueText, setValueText] = useState<string>(
    valueInfo.formatter(value),
  );

  const scale = Scale.scaleLinear<number>({
    domain: [valueInfo.min, valueInfo.max],
    range: [-quadrant, quadrant],
  });

  const calcGaugeDeg = (value: number) => radToDeg(scale(value));

  const [gaugeRotateDeg, setGaugeRotateDeg] = useState<number>(
    calcGaugeDeg(value),
  );

  const pieCommonProps: TachometerPieProps = {
    data,
    startAngle: scale(valueInfo.min),
    endAngle: scale(valueInfo.max),
    pieValue: () => 1,
  };

  useAnimatedNumber({
    value,
    springOpt: {
      bounce: 0.25,
      mass: 0.7,
      duration: 350,
    },
    subscribe(animateNumber) {
      setGaugeRotateDeg(calcGaugeDeg(animateNumber));
    },
  });

  useAnimatedNumber({
    value,
    springOpt: {
      bounce: 0,
      duration: 700,
    },
    subscribe(animateNumber) {
      setValueText(valueInfo.formatter(animateNumber));
    },
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <Group top={startYPos} left={width / 2}>
        <Pie padAngle={0.02} {...gaugeRadius} {...pieCommonProps}>
          {(pie) =>
            pie.arcs.map((arc) => (
              <g key={`arc-${arc.data.label}`}>
                <path d={pie.path(arc) ?? undefined} fill={arc.data.color} />
              </g>
            ))
          }
        </Pie>
        <Pie {...infoRadius} {...pieCommonProps} fill={infoPieColor}>
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const datum = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);

              const textRotateRad = (arc.endAngle + arc.startAngle) / 2;
              console.log(
                arc.data.label,
                "arc.endAngle, arc.startAngle",
                arc.endAngle,
                arc.startAngle,
              );

              return (
                <g key={`info-arc-${datum.label}`}>
                  <path d={pie.path(arc) ?? undefined} fill={infoPieColor} />
                  <Text
                    className="chart__number"
                    x={centroidX}
                    y={centroidY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    angle={radToDeg(textRotateRad)}
                    fill="#fff"
                  >
                    {datum.label}
                  </Text>
                </g>
              );
            });
          }}
        </Pie>

        <Group
          className="tachometer_gauge-value-block"
          left={-gaugeValueBoxWidth / 2}
          top={-gaugeValueBoxHeight + gaugeValueBoxHeight / 4}
        >
          <path
            d={`M${gaugeValueBoxWidth / 2},${
              gaugeValueBoxHeight / 1.5
            } l-3,${-gaugeRadius.outerRadius} h3 z`}
            transform={`rotate(${gaugeRotateDeg}, ${gaugeValueBoxWidth / 2}, ${
              gaugeValueBoxHeight / 1.5
            })`}
          ></path>
          <rect
            fill={infoPieColor}
            width={gaugeValueBoxWidth}
            height={gaugeValueBoxHeight}
            rx={gaugeValueBoxRound}
            ry={gaugeValueBoxRound}
          />
          <text
            fill="#fff"
            fontWeight="bold"
            x={gaugeValueBoxWidth / 2}
            y={gaugeValueBoxHeight / 2 + 1}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {valueText}
          </text>
        </Group>
      </Group>
      <GraphBottom {...valueInfo} data={data} />
    </svg>
  );
};

const infoBarWidth = infoRadius.outerRadius - infoRadius.innerRadius;
const infoBarHeight = 45;
const infoRoundValue = 15;

const labelBlockWidth = gaugeRadius.outerRadius - gaugeRadius.innerRadius + 5;
const labelBlockHeight = 34;
const labelBlockHalfWidth = labelBlockWidth / 2;
const labelBlockHalfHeight = labelBlockHeight / 2;
const labelSpace = infoRadius.innerRadius - gaugeRadius.outerRadius;

function GraphBottom({
  minLabel,
  maxLabel,
  data,
}: Pick<ValueInfo, "minLabel" | "maxLabel"> & { data: TachometerData }) {
  return (
    <Group top={startYPos - 1} left={width / 2}>
      <path
        fill={infoPieColor}
        d={`M${-infoRadius.outerRadius},0 V${infoBarHeight} H${
          -infoRadius.outerRadius + infoBarWidth - infoRoundValue
        } a${infoRoundValue} ${infoRoundValue} 0 0 0 ${infoRoundValue} -${infoRoundValue} V0 z`}
      />
      <Group
        left={-infoRadius.outerRadius + infoBarWidth + labelSpace}
        top={labelSpace / 2}
      >
        <path
          fill={data[0]?.color}
          d={`M0,0 V${labelBlockHeight} H${labelBlockWidth} v-${labelBlockHalfHeight} a${labelBlockHalfHeight} ${labelBlockHalfHeight} 0 0 0 -${labelBlockHalfHeight} -${labelBlockHalfHeight}  z`}
        />
        <Text
          fill="#fff"
          x={labelBlockHalfWidth}
          y={labelBlockHalfHeight + 1}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {minLabel}
        </Text>
      </Group>
      <Group
        left={
          infoRadius.outerRadius - infoBarWidth - labelSpace - labelBlockWidth
        }
        top={labelSpace / 2}
      >
        <path
          fill={data[data.length - 1]?.color}
          d={`M${labelBlockHalfHeight},0 a${labelBlockHalfHeight} ${labelBlockHalfHeight} 0 0 0 -${labelBlockHalfHeight} ${labelBlockHalfHeight} V${labelBlockHeight} H${labelBlockWidth} V0  z`}
        />
        <Text
          fill="#fff"
          x={labelBlockHalfWidth}
          y={labelBlockHalfHeight + 1}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {maxLabel}
        </Text>
      </Group>
      <path
        fill={infoPieColor}
        d={`M${infoRadius.outerRadius},0 V${infoBarHeight} h${
          -infoBarWidth + infoRoundValue
        } a-${infoRoundValue} -${infoRoundValue} 0 0 1 -${infoRoundValue} -${infoRoundValue} V0 z`}
      />
    </Group>
  );
}

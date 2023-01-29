import "./index.css";

import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import * as Scale from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import clsx from "clsx";
import { extent } from "d3-array";
import React, { useReducer } from "react";

import type {
  Actions,
  GroupHandleEvents,
  LineRankingProps,
  RankCircleHandleEvents,
  RankData,
  State,
  TooltipData,
} from "./common";
import { ActionKind, colors, initialState } from "./common";
import RankingLine from "./RankingLine";

const itemByWidth = 100;
const itemByHeight = 50;

const padding = {
  top: 60,
  left: 40,
  right: 100,
  bottom: 80,
};

const calcChartWidth = (xCount: number) => itemByWidth * (xCount + 1);
const calcChartHeight = (itemCount: number) => itemByHeight * (itemCount + 1);

const dateColor = "#666666";

export const LineRanking = <RD extends RankData>({
  data,
  dateFormatter,
  Tooltip,
}: LineRankingProps<RD>) => {
  const itemCount = data.length;

  const dateTicks = data[0]?.rankings.map((d) => d.date);
  const dateCount = dateTicks?.length;

  if (dateCount === undefined) throw Error("dateCount is undefined");

  const chartWidth = calcChartWidth(dateCount);
  const chartHeight = calcChartHeight(dateCount);

  const svgWidth = chartWidth + padding.left + padding.right;
  const svgHeight = chartHeight + padding.top + padding.bottom;

  const [activeItem, dispatchActiveItem] = useReducer(
    (state: State, action: Actions) => {
      switch (action.type) {
        case ActionKind.HOVER:
          return {
            activeId: state.activeId === action.payload ? null : action.payload,
            isClicked: false,
          };
        case ActionKind.CLICK: {
          const isBeforeClicked =
            state.isClicked && state.activeId === action.payload;
          return {
            activeId: isBeforeClicked ? null : action.payload,
            isClicked: !isBeforeClicked,
          };
        }
        case ActionKind.CLEAR:
          return { activeId: null, isClicked: false };
        default:
          return state;
      }
    },
    initialState,
  );

  const isInvisible = !!activeItem.activeId;
  const isBlockHoverEvent = activeItem.isClicked;

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData<RD & RankData>>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const dateSortedData = data.map(({ name, rankings }) => ({
    name,
    rankings: rankings.sort((a, b) => a.date.getTime() - b.date.getTime()),
  }));

  if (dateSortedData[0] === undefined)
    throw Error("dateSortedData[0] is undefined");

  const [minDate, maxDate] = extent(
    dateSortedData[0].rankings,
    (d) => d.date as Date,
  );

  if (!minDate || !maxDate) throw Error("minDate or maxDate is null");

  const xScale = Scale.scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });
  const yScale = Scale.scaleLinear({
    domain: [1, itemCount],
    range: [0, chartHeight],
  });

  const groupEventGenerator: GroupHandleEvents<RD> = (itemID: string) => ({
    onMouseEnter() {
      if (isBlockHoverEvent) return;
      dispatchActiveItem({ type: ActionKind.HOVER, payload: itemID });
    },
    onMouseLeave() {
      if (isBlockHoverEvent) return;
      dispatchActiveItem({ type: ActionKind.HOVER, payload: null });
    },
    onClick(e) {
      dispatchActiveItem({ type: ActionKind.CLICK, payload: itemID });
      hideTooltip();
      e.stopPropagation();
    },
  });

  const circleEventGenerator: RankCircleHandleEvents<RD> = (
    itemID: string,
    item,
    data,
  ) => ({
    onMouseEnter() {
      if (isBlockHoverEvent) return;
      dispatchActiveItem({ type: ActionKind.HOVER, payload: itemID });
      showTooltip({
        tooltipLeft: data.cx,
        tooltipTop: data.cy,
        tooltipData: {
          name: item.name,
          data,
        },
      });
    },
    onMouseLeave() {
      if (isBlockHoverEvent) return;
      dispatchActiveItem({ type: ActionKind.HOVER, payload: null });
      hideTooltip();
    },
    onClick(e) {
      dispatchActiveItem({ type: ActionKind.CLICK, payload: itemID });
      showTooltip({
        tooltipLeft: data.cx,
        tooltipTop: data.cy,
        tooltipData: {
          name: item.name,
          data,
        },
      });
      e.stopPropagation();
    },
  });

  return (
    <>
      <svg
        ref={containerRef}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        onClick={() => {
          dispatchActiveItem({ type: ActionKind.CLEAR });
          hideTooltip();
        }}
      >
        <Group
          className={clsx("line-ranking-contents", isInvisible && "invisible")}
          top={padding.top}
          left={padding.left}
        >
          {dateSortedData.map((item, i) => (
            <RankingLine
              key={`${item.name}-${i}`}
              color={colors[i % (colors.length + 1)]!}
              datum={item}
              activeItem={activeItem}
              xScale={xScale}
              yScale={yScale}
              groupEvents={groupEventGenerator}
              circleEvents={circleEventGenerator}
              dateFormatter={dateFormatter}
            />
          ))}
        </Group>
        <Group id="line-ranking_x-axis">
          <AxisBottom
            scale={xScale}
            left={padding.left}
            top={chartHeight + padding.top + padding.bottom / 2}
            tickValues={dateTicks}
            stroke="#cfcfcf"
            hideTicks
            tickLabelProps={(params) => ({
              fontSize: 12,
              textAnchor: "middle",
              dominantBaseline: "middle",
              fill: dateColor,
            })}
            tickFormat={(d, i) => {
              if (d instanceof Date) {
                return dateFormatter(new Date(d));
              }
              return "";
            }}
          />
        </Group>
      </svg>
      {tooltipOpen &&
        !!tooltipData &&
        tooltipLeft !== undefined &&
        tooltipTop !== undefined && (
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <Tooltip {...tooltipData} />
          </TooltipInPortal>
        )}
    </>
  );
};

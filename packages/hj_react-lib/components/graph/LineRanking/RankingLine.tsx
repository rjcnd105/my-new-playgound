import { Group } from "@visx/group";
import type { ScaleTypeToD3Scale } from "@visx/scale";
import { Text } from "@visx/text";
import clsx from "clsx";
import type { ReactElement } from "react";
import React from "react";

import AreaCircle from "../SvgParts/AreaCircle";
import AreaLine from "../SvgParts/AreaLine";
import type {
  Actions,
  DateByRankingData,
  GroupHandleEvents,
  LineRankingProps,
  RankCircleHandleEvents,
  RankData,
  State,
} from "./common";

type Props<D extends RankData> = {
  color: string;
  datum: DateByRankingData<D>;
  activeItem: State;
  dispatchActiveItem: React.Dispatch<Actions>;
  xScale: ScaleTypeToD3Scale<number, number>["time"];
  yScale: ScaleTypeToD3Scale<number, number>["linear"];
  groupEvents: GroupHandleEvents<D>;
  circleEvents: RankCircleHandleEvents<D>;
  dateFormatter: LineRankingProps<D>["dateFormatter"];
};

const groupBaseName = "group-ranking";
const dotBaseName = "ranking-dot";

export default function RankingLine<D extends RankData>({
  color,
  datum,
  activeItem,
  dispatchActiveItem,
  xScale,
  yScale,
  dateFormatter,
  groupEvents,
  circleEvents,
}: Props<D>) {
  const groupClassName = `${groupBaseName}-${datum.name}`;
  const isGroupActive = activeItem.activeId === groupClassName;
  const datumGroupEvents = groupEvents(groupClassName);

  const lastRank = datum.rankings[datum.rankings.length - 1].rank;
  return (
    <Group
      className={clsx(groupClassName, isGroupActive && "active-group")}
      key={groupClassName}
    >
      {datum.rankings.reduce<ReactElement[]>((pv, cv, i, allItem) => {
        const nextRanking = allItem[i + 1];

        if (!nextRanking) return pv;

        const path = {
          from: {
            x: xScale(cv.date),
            y: yScale(cv.rank) ?? 0,
          },
          to: {
            x: xScale(nextRanking.date),
            y: yScale(nextRanking.rank) ?? 0,
          },
        };

        pv.push(
          <AreaLine
            areaStrokeWidth={25}
            stroke={color}
            strokeWidth={5}
            strokeOpacity={0.7}
            {...datumGroupEvents}
            {...path}
          />,
        );

        return pv;
      }, [])}

      {datum.rankings.map((ranking, rankingIndex) => {
        const dateStr = dateFormatter(ranking.date);
        const dotID = `${dotBaseName}-${datum.name}-${dateStr}`;
        const dotClassName = clsx(dotBaseName, dotID);
        const isActive = dotID === activeItem.activeId;

        const point = {
          cx: xScale(ranking.date),
          cy: yScale(ranking.rank),
        };
        return (
          <AreaCircle
            key={`${datum.name}-${dateStr}`}
            className={clsx(dotClassName, isActive && "active-dot")}
            areaR={16}
            r={5}
            fill={color}
            {...circleEvents(dotID, datum, {
              ...ranking,
              ...point,
            })}
            {...point}
          />
        );
      })}
      <Text
        x={xScale.range()[1] + 16}
        y={yScale(lastRank)}
        fill={color}
        {...datumGroupEvents}
      >
        {`${lastRank}. ${datum.name}`}
      </Text>
    </Group>
  );
}

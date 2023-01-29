import { shuffle } from 'd3-array';
import type { MouseEventHandler } from 'react';

export type RankData = {
  date: Date;
  rank: number;
};

export type TooltipData<D extends RankData> = {
  name: DateByRankingData<D>['name'];
  data: D;
};

export type DateByRankingData<D extends RankData> = {
  name: string;
  rankings: D[];
};

export type LineRankingProps<D extends RankData> = {
  data: Array<DateByRankingData<D>>;
  dateFormatter: (date: Date) => string;
  Tooltip: (data: TooltipData<D>) => JSX.Element;
};

type Events = {
  onMouseEnter: MouseEventHandler<SVGElement>;
  onMouseLeave: MouseEventHandler<SVGElement>;
  onClick: MouseEventHandler<SVGElement>;
};

export type GroupHandleEvents<D extends RankData> = (itemID: string) => Events;
export type RankCircleHandleEvents<D extends RankData> = (
  itemID: string,
  item: DateByRankingData<D>,
  rankCircleData: D & {
    cx: number;
    cy: number;
  },
) => Events;

export const colors = shuffle([
  '#FF0000',
  '#FF8700',
  '#ffbe0b',
  '#335c67',
  '#8ac926',
  '#ff006e',
  '#78290f',
  '#147DF5',
  '#580AFF',
  '#BE0AFF',
]);

export type State = {
  activeId: string | null;
  isClicked: boolean;
};

export const initialState: State = { isClicked: false, activeId: null };

export const ActionKind = {
  HOVER: 'hover',
  CLICK: 'click',
  CLEAR: 'clear',
} as const;

export type Actions =
  | {
      type: typeof ActionKind.HOVER | typeof ActionKind.CLICK;
      payload: State['activeId'];
    }
  | {
      type: typeof ActionKind.CLEAR;
    };

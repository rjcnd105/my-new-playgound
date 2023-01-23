import type { ComponentMeta } from "@storybook/react";
import dayjs from "dayjs";

import { LineRanking } from "./index";

type Ranking = {
  date: string;
  rank: number;
};

type Data = Array<{
  name: string;
  rankings: Ranking[];
}>;

type ParsedRanking = {
  date: Date;
  rank: number;
};
const dateConverter = (ranking: Ranking): ParsedRanking => ({
  date: new Date(ranking.date),
  rank: ranking.rank,
});

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "visx/LineRanking",
  component: LineRanking,
} as ComponentMeta<typeof LineRanking>;

const data = [
  {
    name: "A",
    rankings: [
      {
        date: "2021-1-1",
        rank: 3,
      },
      {
        date: "2021-1-2",
        rank: 1,
      },
      {
        date: "2021-1-3",
        rank: 2,
      },
    ],
  },

  {
    name: "B",
    rankings: [
      {
        date: "2021-1-1",
        rank: 1,
      },
      {
        date: "2021-1-2",
        rank: 2,
      },
      {
        date: "2021-1-3",
        rank: 3,
      },
    ],
  },
  {
    name: "C",
    rankings: [
      {
        date: "2021-1-1",
        rank: 2,
      },
      {
        date: "2021-1-2",
        rank: 3,
      },
      {
        date: "2021-1-3",
        rank: 1,
      },
    ],
  },

  {
    name: "D",
    rankings: [
      {
        date: "2021-1-1",
        rank: 4,
      },
      {
        date: "2021-1-2",
        rank: 4,
      },
      {
        date: "2021-1-3",
        rank: 4,
      },
    ],
  },
];

export const Sample = () => {
  const parsedData = data.map((d) => ({
    name: d.name,
    rankings: d.rankings.map(dateConverter),
  }));
  const myDateFormatter = (d: Date) => dayjs(d).format("YYYY-MM-DD");

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <div>랭킹 그래프</div>
      <LineRanking
        data={parsedData}
        dateFormatter={(d) => dayjs(d).format("YYYY-MM-DD")}
        Tooltip={({ name, data }) => (
          <div>
            <p>{myDateFormatter(data.date)}</p>

            <p>
              <strong>{name}</strong>: {data.rank}위
            </p>
          </div>
        )}
      />
    </div>
  );
};

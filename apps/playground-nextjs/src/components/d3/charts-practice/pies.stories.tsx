// import "./style.css";

import { flow } from "@effect/data/Function";
import * as d3 from "d3";
import { useLayoutEffect, useRef } from "react";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/pies"
};

type Format =
  | "year"
  | "vinyl"
  | "eight_track"
  | "cassette"
  | "cd"
  | "download"
  | "streaming"
  | "other";

type DataFormat = Exclude<Format, "year">;

type Data = {
  [key in Format]: number;
};

type FormattedData = {
  format: DataFormat;
  sales: number;
};

const svgWidth = 800;
const rowPieMaxCount = 3;
const padding = 32;
const margin = 0;
const pieChartSize = svgWidth / rowPieMaxCount - padding - margin;
const divisionSpace = (svgWidth - margin * 2) / rowPieMaxCount;
const filterYears = [1975, 1995, 2013, 2018];
const perInnerRadius = 0.6;
const perOuterRadius = 1;
const getIndexX = (i: number) => (i % rowPieMaxCount) + 1;
const getX = flow(
  getIndexX,
  (xIndex) => xIndex * divisionSpace - divisionSpace / 2 + margin
);
const getIndexY = (i: number) => Math.floor(i / rowPieMaxCount) + 1;
const getY = flow(
  getIndexY,
  (yIndex) => yIndex * divisionSpace - divisionSpace / 2 + margin
);

export const Basic = () => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    d3.csv<Data, keyof Data>("d3-data/chapter5/data1.csv", d3.autoType).then(
      (data) => {
        const formats = data.columns.filter(
          (d) => d !== "year"
        ) as DataFormat[];
        const yearSet = new Set(filterYears);

        const dataFormatter = (data: Data): FormattedData[] =>
          formats.map((key) => ({ format: key, sales: data[key] }));

        // 갯수에 따른 가변 크기 Svg
        const svg = d3
          .select(wrapRef.current)
          .style("padding", `${padding}px`)
          .append("svg")
          .attr(
            "viewBox",
            `0 0 ${svgWidth} ${
              getIndexY(filterYears.length) * divisionSpace + margin
            }`
          );

        // 파이를 그릴 데이터를 만듦
        const filteredData = data.reduce((pv, cur) => {
          if (yearSet.has(cur.year)) pv.push([cur.year, dataFormatter(cur)]);
          return pv;
        }, [] as Array<[Data["year"], FormattedData[]]>);

        const filteredMap = new Map(filteredData);

        // 파이는 직접 그리는데 관여하는게 아니라
        // 파이를 그리는데 필요한 좌표와 데이터만 제공해줌.
        const pieDrawDataGenerator = d3
          .pie<FormattedData>()
          .value((d) => d.sales);

        for (let i = 0; i < filterYears.length; i++) {
          const year = filterYears[i];
          const pieData = filteredMap.get(year);

          if (!pieData) continue;

          const index = i;

          const pieDrawData = pieDrawDataGenerator(pieData);

          const arcGenerator = d3.arc().cornerRadius(3);
          const arcOptions = {
            innerRadius: (perInnerRadius * pieChartSize) / 2,
            padAngle: 0.02,
            outerRadius: (perOuterRadius * pieChartSize) / 2
          };

          const colorScale = d3.scaleOrdinal(formats, [
            "#8dd3c7",
            "#fb8072",
            "#80b1d3",
            "#fdb462",
            "#b3de69",
            "#bc80bd",
            "#ffed6f"
          ]);
          const arcX = getX(index);
          const arcY = getY(index);
          // const pieCenter =

          const arcGroups = svg
            .append("g")
            .attr("transform", `translate(${arcX}, ${arcY})`)
            .attr("class", `arc-${year}`);

          const arc = arcGroups
            .selectAll(`path.arc.arc-${year}`)
            .data(pieDrawData)
            .join("g");

          arc
            .append("path")
            .attr("d", (d) =>
              arcGenerator({
                startAngle: d.startAngle,
                endAngle: d.endAngle,
                ...arcOptions
              })
            )
            .attr("fill", (d) => colorScale(d.data.format));

          arcGroups
            .append("text")
            .text(`${year}`)
            .attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle");

          arc
            .append("text")
            .datum((d) => {
              const [x, y] = arcGenerator.centroid({
                startAngle: d.startAngle,
                endAngle: d.endAngle,
                ...arcOptions
              });
              // 2PI 라디안은 360deg dl므로
              // startAngle, endAngle은 라디안 단위이므로
              // 퍼센티지를 구하려면 2PI로 나누어주어야함
              const percentage = (d.endAngle - d.startAngle) / (Math.PI * 2);
              console.log(year, d.data.format);
              console.log("d.startAngle", d.startAngle);
              console.log("d.endAngle", d.endAngle);
              console.log("percentage", percentage);

              return {
                ...d,
                percentage,
                x,
                y
              };
            })
            .text((d) => {
              // round 백분율. ex: 0.237 -> 24%
              return d3.format(".0%")(d.percentage);
            })
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("opacity", (d) => (d.percentage > 0.05 ? 1 : 0))
            .attr("fill", "white");
        }
      }
    );
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className="w-full max-w-[1200px] bg-yellow-50 mx-auto"
    ></div>
  );
};

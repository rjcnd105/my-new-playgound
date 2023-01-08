// import "./style.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/stackBar",
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

const width = 1200;
const height = 600;
const padding = {
  top: 20,
  bottom: 60,
  left: 60,
  right: 180,
};
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;

export const Basic = () => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    d3.csv<Data>("d3-data/chapter5/data1.csv", d3.autoType).then((data) => {
      const dataColumns = data.columns.filter(
        (d) => d !== "year",
      ) as DataFormat[];

      const stackGenerate = d3
        .stack()
        .keys(dataColumns)
        .order(d3.stackOrderDescending)
        .offset(d3.stackOffsetExpand);

      const stackData = stackGenerate(data);

      const maxData = d3.max(
        stackData[stackData.length - 1],
        ([_, max]) => max,
      );
      const [minYear, maxYear] = d3.extent(data, (d) => d.year);

      if (!maxData || !minYear || !maxYear) return;

      const xScale = d3
        .scaleBand(d3.range(minYear, maxYear + 1), [0, chartWidth])
        .padding(0.2);
      const yScale = d3.scaleLinear([0, maxData], [chartHeight, 0]).nice();

      const colorScale = d3.scaleOrdinal(dataColumns, d3.schemeTableau10);

      const svg = d3
        .select(wrapRef.current)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

      const chart = svg
        .append("g")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

      // draw chart
      // 바 별로 그리기 위해 별도의 while로 돌림
      let barCount = 0;
      while (true) {
        if (stackData[0][barCount] == undefined) break;
        const barData = stackData.map((d) => ({
          barData: d[barCount],
          key: d.key as DataFormat,
        }));
        const year = stackData[0][barCount].data.year;

        console.log(year, "xScale(year)", xScale(year));
        chart
          .append("g")
          .attr("transform", `translate(${xScale(year)!}, 0)`)
          .selectAll("rect")
          .data(barData)
          .join("rect")
          // .attr("x", (d, i) => )
          .attr("y", (d) => yScale(d.barData[1]))
          .attr("width", xScale.bandwidth())
          .attr("height", (d) => yScale(d.barData[0]) - yScale(d.barData[1]))
          .attr("fill", (d) => colorScale(d.key))
          .attr("data-d", (d) => [d.barData[0], d.barData[1]]);

        barCount = barCount + 1;
      }
      // console.log("xScale", );

      const xAxis = d3
        .axisBottom(xScale)
        .tickValues(d3.ticks(minYear, maxYear, 10).concat([minYear, maxYear]))
        // tickSizeOuter(0)은 외부 눈금을 숨김
        .tickSizeOuter(0);

      const yAxis = d3
        .axisLeft(yScale)
        .tickValues(d3.range(0, 1, 0.1).concat([1]))
        .tickSizeOuter(0)
        .tickFormat((d) => `${Math.floor(d.valueOf() * 100)}%`);

      chart
        .append("g")
        .attr("transform", `translate(0, ${yScale.range()[0]})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", 14);

      chart.append("g").call(yAxis).style("font-size", 14);

      // 범주
      const category = svg
        .append("g")
        .attr(
          "transform",
          `translate(${padding.left + chartWidth + 24}, ${
            padding.top + chartHeight / 2
          })`,
        )
        .selectAll("text")
        .data(dataColumns)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${i * 28})`);

      category
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", (d) => colorScale(d));
      category
        .append("text")
        .attr("x", 28)
        .attr("y", 10)
        .text((d) => d)
        .style("dominant-baseline", "middle");
    });
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className="w-full max-w-[1000px] bg-yellow-50 mx-auto"
    ></div>
  );
};

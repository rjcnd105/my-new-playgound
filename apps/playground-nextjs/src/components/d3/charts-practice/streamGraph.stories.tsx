// import "./style.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { startOfMonth } from "date-fns";
import * as d3 from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/streamGraph",
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
  top: 66,
  bottom: 32,
  left: 88,
  right: 180,
};
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;

export const Basic = () => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const svg = d3
      .select(wrapRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${padding.left}, ${padding.top})`);

    d3.csv<Data>("d3-data/chapter5/data1.csv", d3.autoType).then((data) => {
      const dataFormatKey = data.columns.filter(
        (d) => d !== "year",
      ) as DataFormat[];

      const stackGenerator = d3
        .stack()
        .keys(dataFormatKey)
        .order(d3.stackOrderInsideOut)
        // d3.stackOffsetSilhouette 를 하면 음수 값이 나오므로 있으므로 주의.
        .offset(d3.stackOffsetSilhouette);
      const stackData = stackGenerator(data);

      const [minYear, maxYear] = d3.extent(data, (d) => d.year);

      const { min, max } = stackData.reduce<{ min: number; max: number }>(
        (pv, cv) => {
          const tempMin = d3.min(cv, (d) => d[0]) ?? Infinity;
          const tempMax = d3.max(cv, (d) => d[1]) ?? -Infinity;
          return {
            min: pv.min > tempMin ? tempMin : pv.min,
            max: pv.max < tempMax ? tempMax : pv.max,
          };
        },
        {
          min: Infinity,
          max: -Infinity,
        },
      );
      if (!minYear || !maxYear) return;
      console.log("min,  max", min, max);

      const xScale = d3.scaleLinear([minYear, maxYear], [0, chartWidth]);
      const yScale = d3.scaleLinear([min, max], [chartHeight, 0]).nice();

      const colorScale = d3.scaleOrdinal(dataFormatKey, d3.schemeTableau10);
      const areaGenerator = d3
        .area<(typeof stackData)[number][number]>()
        .x((d) => xScale(d.data.year))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
        .curve(d3.curveCatmullRom);

      const leftAxis = d3.axisLeft(yScale);
      const bottomAxis = d3
        .axisBottom(xScale)
        .tickValues(d3.ticks(minYear, maxYear, 8).concat([minYear, maxYear]))
        .tickSizeOuter(0)
        .tickSize(chartHeight * -1)
        .tickFormat((v) => "");

      chart.append("g").call(leftAxis).style("font-size", 16);
      chart
        .append("g")
        .attr("class", "x-axis-streamgraph")
        .attr("transform", `translate(0, ${yScale.range()[0]})`)
        .call(bottomAxis)
        .style("font-size", 16);

      chart.selectAll(".x-axis-streamgraph path").style("stroke-opacity", 0);

      chart
        .append("g")
        .attr("class", "area-container")
        .selectAll("path")
        .data(stackData)
        .join("path")
        .attr("d", areaGenerator)
        .attr("fill", (d) => colorScale(d.key as DataFormat));

      const leftAxisLabel = svg
        .append("text")
        .attr("dominant-baseline", "hanging")
        .attr("transform", `translate(28, 8)`);

      leftAxisLabel.append("tspan").text("Total revenue");
      leftAxisLabel
        .append("tspan")
        .text("(million USD)")
        .attr("fill-opacity", 0.7);
      leftAxisLabel
        .append("tspan")
        .text("Adjusted for inflation")
        .attr("x", 0)
        .attr("dy", 20)
        .attr("fill-opacity", 0.7)
        .attr("font-size", 14);
    });
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className={`w-full max-w-[1000px] bg-yellow-50 mx-auto`}
    ></div>
  );
};

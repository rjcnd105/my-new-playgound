// import "./style.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/bar",
};
type Data = {
  technology: string;
  count: number;
};

type Props = {
  barHeight?: number;
  barSpacing?: number;
  barX?: number;
  barY?: number;
};
export const Basic = {
  render: ({
    barHeight = 40,
    barSpacing = 8,
    barX = 100,
    barY = 24,
  }: Props) => {
    const wrapRef = useRef(null);

    useLayoutEffect(() => {
      if (!wrapRef.current) return;
      const svg = d3
        .select(wrapRef.current)
        .append("svg")
        .attr("viewBox", "0 0 600 700");

      d3.csv<Data, keyof Data>("d3-data/chapter3/data.csv", (d) => ({
        technology: d.technology ?? "",
        count: +(d.count ?? 0),
      })).then((data) => {
        const lensCount = (data: Data) => data.count;
        const maxCount = d3.max(data, lensCount); // => 1078
        const minCount = d3.min(data, lensCount); // => 20
        const extend = d3.extent(data, lensCount); // => [20, 1078]

        if (!maxCount) return;

        const sortData = data.sort((a, b) => (a.count < b.count ? 1 : -1));

        const xScale = d3.scaleLinear().domain([0, maxCount]).range([0, 450]);
        // xScale(1078) // => 450

        const yScale = d3
          .scaleBand()
          .domain(sortData.map((d) => d.technology))
          .range([0, 700])
          // paddingInner - 0.2는 20%다 각 밴드 사이의 padding을 의미한다.
          // 나중에 yScale.bandWidth()를 사용하면 20%를 제외한 80%의 밴드 너비를 구할 수 있다.
          .paddingInner(0.2);
        // scaleBand
        // 균등하게 분배해줌
        // yScale("Excel")   // => 0
        // yScale("D3.js")   // => 272.72

        const barGroups = svg
          // selectAll + join을 하면 각각에 해당하는 엘리먼트를 생성한다.
          .selectAll("g")
          .data(data)
          .join("g")
          .attr("transform", (d) => `translate(0, ${yScale(d.technology)})`);

        const barWidth = yScale.bandwidth();
        const bars = barGroups
          .append("rect")
          .attr("class", (d, i) => `bar bar-${i}`)
          .attr("width", (d) => xScale(d.count))
          // bandwidth는 각 너비를 계산해준다.
          .attr("height", barWidth)
          .attr("x", barX)
          .attr("fill", (d) =>
            d.technology === "D3.js" ? "yellowgreen" : "skyblue",
          );
        barGroups
          .append("text")
          .text((d) => d.technology)
          .attr("x", barX - 4)
          .attr("y", 12)
          .attr("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "11px");

        barGroups
          .append("text")
          .text((d) => d.count)
          .attr("x", (d) => barX + xScale(d.count) + 4)
          .attr("y", 12)
          .style("font-family", "sans-serif")
          .style("font-size", "9px");

        svg
          .append("line")
          .attr("x1", barX)
          .attr("x2", barX)
          .attr("y1", 0)
          .attr("y2", 700)
          .attr("stroke", "black");
      });
    }, [wrapRef.current]);

    return (
      <div
        ref={wrapRef}
        className="w-full max-w-[600px] bg-yellow-50 mx-auto"
      ></div>
    );
  },
};

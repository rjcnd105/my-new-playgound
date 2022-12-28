// import "./style.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { startOfMonth } from "date-fns";
import * as d3 from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/line",
};
type WeeklyTemperatureData = {
  date: Date;
  max_temp_F: number;
  avg_temp_F: number;
  min_temp_F: number;
};

type Props = {
  chartMargin?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  width?: number;
  height?: number;
  chartColor?: string;
};
const defaultChartMargin = {
  top: 40,
  right: 160,
  bottom: 25,
  left: 40,
};
export const Basic = ({
  chartMargin = {
    top: 40,
    right: 160,
    bottom: 25,
    left: 40,
  },
  width = 1000,
  height = 500,
  chartColor = "steelblue",
}: Props) => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    const svg = d3
      .csv<WeeklyTemperatureData>(
        "d3-data/chapter4/weekly_temperature.csv",
        d3.autoType,
      )
      .then((data) => {
        const resultChartMargin = Object.assign(
          {},
          defaultChartMargin,
          chartMargin,
        );
        const innerWidth =
          width - resultChartMargin?.left - resultChartMargin.right;
        const innerHeight =
          height - resultChartMargin.top - resultChartMargin.bottom;

        const [minDate, maxDate] = d3.extent(data, (d) => d.date);
        const maxTemp = d3.max(data, (d) => d.max_temp_F);
        if (!minDate || !maxDate || !maxTemp) return;

        // x축 Date
        const xScale = d3
          .scaleTime()
          .domain([startOfMonth(minDate), maxDate])
          .range([0, innerWidth]);

        // y축 Temperature
        const yScale = d3
          .scaleLinear()
          .domain([0, maxTemp])
          .range([innerHeight, 0]);

        const bottomAxis = d3.axisBottom<Date>(xScale).tickFormat((date) => {
          const month = date.getMonth() + 1;
          return `${month}월`;
        });
        const leftAxis = d3.axisLeft<number>(yScale);

        // avg_temp_F line
        const avgTempLineGenerator = d3
          .line<WeeklyTemperatureData>()
          .x((d) => xScale(d.date))
          .y((d) => yScale(d.avg_temp_F))
          // curveCatmullRom은 각 점을 연결하면서도 부드러운 곡선을 그린다.
          .curve(d3.curveCatmullRom);

        const tempAreaGenerator = d3
          .area<WeeklyTemperatureData>()
          .x((d) => xScale(d.date))
          .y0((d) => yScale(d.min_temp_F))
          .y1((d) => yScale(d.max_temp_F))
          .curve(d3.curveCatmullRom);

        // ** DRAWING ** //
        const svg = d3
          .select(wrapRef.current)
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`);

        const chart = svg
          .append("g")
          .attr(
            "transform",
            `translate(${resultChartMargin.left}, ${resultChartMargin.top})`,
          );

        // y-axios label
        svg
          .append("text")
          .attr("class", "y-axis-label")
          // 수직 위 기준 정렬
          .attr("dominant-baseline", "hanging")
          .attr("y", 8)
          .text("Temperature (F)");

        // average temperature label
        {
          const showAvgLabel = data[data.length - 1];
          chart
            .append("text")
            .text("Average temperature")
            .attr("x", xScale(showAvgLabel.date) + 10)
            .attr("y", yScale(showAvgLabel.avg_temp_F))
            .attr("dominant-baseline", "middle")
            .attr("fill", chartColor)
            .style("font-size", "14px");
        }

        // min temperature label
        {
          const showMinLabel = data[data.length - 3];
          const x = xScale(showMinLabel.date);
          const y = yScale(showMinLabel.min_temp_F);

          chart
            .append("line")
            .attr("x1", x)
            .attr("y1", y + 3)
            .attr("x2", x + 10)
            .attr("y2", y + 20)
            .attr("stroke", chartColor);
          chart
            .append("text")
            .text("Minimum temperature")
            .attr("x", x + 13)
            .attr("y", y + 20)
            .attr("alignment-baseline", "hanging")
            .attr("fill", chartColor)
            .style("font-size", "14px");
        }

        // max temperature label
        {
          const showMaxLabel = data[data.length - 4];
          const x = xScale(showMaxLabel.date);
          const y = yScale(showMaxLabel.max_temp_F);
          chart
            .append("text")
            .text("Maximum temperature")
            .attr("x", x + 13)
            .attr("y", y - 20)
            .attr("fill", chartColor)
            .style("font-size", "14px");

          chart
            .append("line")
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x + 13)
            .attr("y2", y - 13)
            .attr("stroke", chartColor);
        }

        // chart
        //   .append("line")
        //   .attr("x1", minX)
        //   .attr("y1", minY + 3)
        //   .attr("x2", minX + 10)
        //   .attr("y2", minY + 20)
        //   .attr("stroke", chartColor);
        //
        // chart
        //   .append("rect")
        //   .attr("x", minX)
        //   .attr("y", minY)
        //   .attr("width", 5)
        //   .attr("height", 5)
        //   .attr("fill", "black");
        //
        // chart
        //   .append("text")
        //   .text("Minimal temperature")
        //   .attr("x", minX + 16)
        //   .attr("y", minY + 22)
        //   .attr("dominant-baseline", "Hanging")
        //   .attr("fill", chartColor)
        //   .style("font-size", "14px");

        // Axis X draw
        chart
          .append("g")
          .attr("class", "axis-x")
          .attr("transform", `translate(0, ${innerHeight})`)
          // call은 axisGenerator를 받아 화면에 그려준다.
          .call(bottomAxis);

        // axis x 텍스트 각 tick의 중앙으로 이동, margin
        d3.selectAll(".axis-x text")
          .attr("x", (d) => {
            // 어떻게 데이터가 바인딩이 되어 있지?
            // axis generate할때 내부의 엘리먼트에도 데이터를 바인딩 해주는 것 같다.
            const currentMonth = d as Date;
            const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
            return (xScale(nextMonth) - xScale(currentMonth)) / 2;
          })
          .attr("y", "10px");

        // Axis Y draw
        chart.append("g").attr("class", "axis-y").call(leftAxis);

        // axis y 텍스트 margin
        d3.selectAll(".axis-y text").attr("x", "-10px");

        d3.selectAll(".axis-x text, .axis-y text")
          .style("font-family", "Roboto, sans-serif")
          .style("font-size", "14px");

        // avg_temp_F line draw
        chart
          .append("path")
          .attr("d", avgTempLineGenerator(data))
          .attr("fill", "none")
          .attr("stroke", "steelblue");

        // avg_temp_F line circle draw
        chart
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("r", 4)
          .attr("cx", (d) => xScale(d.date))
          .attr("cy", (d) => yScale(d.avg_temp_F))
          .attr("fill", chartColor);

        chart
          .append("path")
          .attr("d", tempAreaGenerator(data))
          .attr("fill", chartColor)
          .attr("fill-opacity", 0.2);
      });
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className={`w-full max-w-[${width}] bg-yellow-50 mx-auto`}
    ></div>
  );
};

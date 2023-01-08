// import "./style.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DefaultArcObject } from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-charts-practice/arc",
};
type Data = {
  date: Date;
  total_precip_in: number;
};

const pieChartWidth = 300;
export const Basic = () => {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    d3.csv<Data, keyof Data>(
      "d3-data/chapter4/daily_precipitations.csv",
      d3.autoType,
    ).then((data) => {
      const numberOfDays = data.length;
      const numberOfDaysWithPrecipitations = data.filter(
        (d) => d.total_precip_in > 0,
      ).length;

      const precipitations_per = Math.round(
        (numberOfDaysWithPrecipitations / numberOfDays) * 100,
      );

      // 백분율을 각도로 바꾼다.
      const perToDeg = (per: number) => per * (360 / 100);
      const precipitations_deg = perToDeg(precipitations_per);

      // 이걸 라디안으로 바꾸어야함
      // https://ko.wikipedia.org/wiki/%EB%9D%BC%EB%94%94%EC%95%88
      // 2PIr 은 360도 이므로..
      const degToRad = (deg: number) => (deg / 180) * Math.PI;
      const precipitations_rad = degToRad(precipitations_deg);

      const arcGenerator = d3
        .arc()
        // radian을 받음
        .padAngle(0.02)
        .cornerRadius(6);

      const svg = d3
        .select(wrapRef.current)
        .insert("svg", ":first-child")
        .attr("viewBox", `0 0 ${pieChartWidth} ${pieChartWidth}`);

      d3.select(wrapRef.current)
        .insert("h2", ":first-child")
        .text("Days with precipitations")
        .style("font-size", "32px")
        .style("text-align", "center")
        .style("font-weight", 500);

      const chart = svg
        .append("g")
        .attr(
          "transform",
          `translate(${pieChartWidth / 2}, ${pieChartWidth / 2})`,
        );

      const precipitations_arc_info: DefaultArcObject = {
        // 내부 반지름
        innerRadius: 80,
        // 외부 반지름
        outerRadius: 120,
        startAngle: 0,
        endAngle: precipitations_rad,
      };
      const arc_precipitations = chart
        .append("path")
        .attr("d", arcGenerator(precipitations_arc_info))
        .attr("fill", "#6EB7C2");

      // arc의 센터를 구함
      const [precipitationsLabelX, precipitationsLabelY] =
        arcGenerator.centroid(precipitations_arc_info);
      chart
        .append("text")
        .text((d) => d3.format(".0%")(precipitations_per / 100))
        .attr("x", precipitationsLabelX)
        .attr("y", precipitationsLabelY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 500);

      const arc_remain = chart
        .append("path")
        .attr(
          "d",
          arcGenerator({
            ...precipitations_arc_info,
            startAngle: precipitations_rad,
            endAngle: degToRad(360), // Math.PI * 2
          }),
        )
        .attr("fill", "#DCE2E2");
    });
  }, [wrapRef.current]);

  return (
    <div ref={wrapRef} className="w-full max-w-[600px] bg-yellow-50 mx-auto">
      <img className="max-w-[600px]" src="images/arc.png" alt="" />
    </div>
  );
};

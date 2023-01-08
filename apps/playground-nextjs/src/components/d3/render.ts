import * as d3 from "d3";

export type Format =
  | "year"
  | "vinyl"
  | "eight_track"
  | "cassette"
  | "cd"
  | "download"
  | "streaming"
  | "other";

export type DataFormat = Exclude<Format, "year">;

export type Data = {
  [key in Format]: number;
};

type StackDatum = {
  0: number;
  1: number;
  data: Data;
};

const width = 1200;
const height = 600;
const padding = {
  top: 32,
  bottom: 60,
  left: 80,
  right: 32,
};
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;

export const stackRender = (
  wrap: HTMLElement,
  data: d3.DSVParsedArray<Data>,
  stackGenerator: d3.Stack<unknown, Data, DataFormat>,
) => {
  // 앞의 svg는 네임스페이스
  // https://github.com/d3/d3-selection/blob/v3.0.0/README.md#namespaces
  const dataFormatKey = data.columns.filter(
    (d) => d !== "year",
  ) as DataFormat[];

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
  const xScale = d3.scaleLinear([minYear, maxYear], [0, chartWidth]);
  const yScale = d3.scaleLinear([min, max], [chartHeight, 0]).nice();

  const colorScale = d3.scaleOrdinal(dataFormatKey, d3.schemeTableau10);
  const areaGenerator = d3
    .area<typeof stackData[number][number]>()
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

  const svg = d3
    .select(wrap)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${padding.left}, ${padding.top})`);
  chart
    .append("g")
    .attr("class", "x-axis-streamgraph")
    .attr("transform", `translate(0, ${yScale.range()[0]})`)
    .call(bottomAxis)
    .style("font-size", 18);

  chart.append("g").call(leftAxis).style("font-size", 20);

  chart
    .append("g")
    .attr("class", "area-container")
    .selectAll("path")
    .data(stackData)
    .join("path")
    .attr("d", areaGenerator)
    .attr("fill", (d) => colorScale(d.key as DataFormat));
};

export function descriptionRender(wrap: Element, title: string, desc: string) {
  const textWrap = d3.select(wrap).append("div").style("padding-right", "16px");
  textWrap.append("h3").text(title).style("font-size", "20px");
  textWrap
    .append("p")
    .text(desc)
    .style("margin-top", "12px")
    .style("font-size", "16px");
}

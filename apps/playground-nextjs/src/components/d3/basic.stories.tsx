// import "./style.css";

import { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-basic",
};

export const Selector = () => {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const d3wrapper = d3.select(wrapRef.current);
    d3wrapper.select("h1").style("color", "plum");

    // append는 마지막에 요소를 추가한다.
    d3wrapper.append("p").text("append로 추가한 요소1");
    d3wrapper.append("p").text("append로 추가한 요소2");

    // insert는 맨앞에 요소를 추가한다는데 왜 난 뒤에 추가됌??
    d3wrapper
      .insert("p")
      .text("insert로 추가한 요소1")
      // attr로 속성 편집 가능
      .attr("class", "my-insert-element");
  }, [wrapRef.current]);
  return (
    <div ref={wrapRef}>
      <h1>h1h1</h1>
    </div>
  );
};

export const SvgBasic = () => {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const svg = d3
      .select(wrapRef.current)
      .append("svg")
      .attr("viewBox", "0 0 1200 1600");

    svg
      .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 414)
      .attr("height", 16)
      // style은 inline style로 들어가는데 이는 attr보다 나중에 적용되므로 plum이 적용된다.
      .style("fill", "plum")
      .attr("fill", "turquoise");
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className="w-full max-w-[1200px] bg-yellow-50 mx-auto"
    ></div>
  );
};

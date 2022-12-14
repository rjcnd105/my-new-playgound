// import "./style.css";

import { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

export default {
  /* ๐ The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "d3-basic/basic",
};

export const Selector = () => {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const d3wrapper = d3.select(wrapRef.current);
    d3wrapper.select("h1").style("color", "plum");

    // append๋ ๋ง์ง๋ง์ ์์๋ฅผ ์ถ๊ฐํ๋ค.
    d3wrapper.append("p").text("append๋ก ์ถ๊ฐํ ์์1");
    d3wrapper.append("p").text("append๋ก ์ถ๊ฐํ ์์2");

    // insert๋ ๋งจ์์ ์์๋ฅผ ์ถ๊ฐํ๋ค๋๋ฐ ์ ๋ ๋ค์ ์ถ๊ฐ๋??
    d3wrapper
      .insert("p")
      .text("insert๋ก ์ถ๊ฐํ ์์1")
      // attr๋ก ์์ฑ ํธ์ง ๊ฐ๋ฅ
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
      // style์ inline style๋ก ๋ค์ด๊ฐ๋๋ฐ ์ด๋ attr๋ณด๋ค ๋์ค์ ์ ์ฉ๋๋ฏ๋ก plum์ด ์ ์ฉ๋๋ค.
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

import * as d3 from "d3";
import {
  createElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Data, DataFormat, descriptionRender, stackRender } from "./render";

export default {
  title: "d3-stack/order",
};

export const Basic = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    d3.csv<Data>("d3-data/chapter5/data1.csv", d3.autoType).then((data) => {
      const dataFormatKey = data.columns.filter(
        (d) => d !== "year",
      ) as DataFormat[];
      if (!wrapRef.current) return;

      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderNone),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderNone",
        "key 접근자의 순서대로 데이터를 쌓습니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderReverse),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderReverse",
        "key 접근자의 reversed된 순서대로 쌓습니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderAscending),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderAscending",
        "total값이 가장 적은 key가 나중에 추가됩니다. 즉, total 값이 작을수록 앞에 보여집니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderDescending),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderDescending",
        "total값이 클수록 앞에 보여집니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderAppearance),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderAppearance",
        "가장 빠르게 최대값을 갖는 series가 맨 아래에 배치되고, 가장 늦게 최대값을 갖는 series가 맨 위에 배치됩니다.",
      );

      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderInsideOut),
      );
      descriptionRender(
        wrapRef.current,
        "order - stackOrderInsideOut",
        "스택의 레이어가 가장 안쪽 레이어에서 가장 바깥쪽 레이어로 정렬되도록 지정합니다. 가장 안쪽 레이어는 스택의 맨 아래에 있고 가장 바깥쪽 레이어는 맨 위에 있습니다. 이는 내부 계층이 더 구체적이거나 자세한 데이터를 나타내고 외부 계층이 더 일반적이거나 집계된 데이터를 나타내는 계층적 데이터를 시각화하는 데 유용할 수 있습니다.\n offset의 stackOffsetWiggle, stackOffsetSilhouette와 같이 쓰는 경우가 많습니다.",
      );
    });
  }, [wrapRef.current]);

  return (
    <div
      ref={wrapRef}
      className="wrap w-full bg-yellow-50 mx-auto grid grid-cols-2 gap-[8px]"
    ></div>
  );
};

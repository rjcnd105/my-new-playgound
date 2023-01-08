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
  title: "d3-stack/offset",
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
          .offset(d3.stackOffsetNone),
      );
      descriptionRender(
        wrapRef.current,
        "offset - stackOffsetNone",
        "레이어 사이의 추가 공간 없이 바로 위에 쌓임",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .offset(d3.stackOffsetDiverging),
      );
      descriptionRender(
        wrapRef.current,
        "offset - stackOffsetDiverging",
        "Diverging(발산) 오프셋을 사용하면 양수 값과 음수 값이 0 기준선에서 동일한 양만큼 오프셋되어 데이터가 반대 방향으로 쌓입니다." +
          " 이는 재무 데이터와 같이 양수 값과 음수 값이 모두 있는 데이터를 시각화하는 데 유용할 수 있습니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .offset(d3.stackOffsetExpand),
      );
      descriptionRender(
        wrapRef.current,
        "offset - stackOffsetExpand",
        "확장 오프셋은 누적 데이터의 위치를 제어하는데 사용할 수 있는 여러 사용 가능한 오프셋 중 하나입니다. 확장 오프셋을 사용하면 누적된 데이터의 전체 영역이 차트의 전체 영역과 같도록 데이터가 누적됩니다." +
          " 이는 측량 데이터와 같이 비례하는 데이터를 시각화하는 데 유용할 수 있습니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderInsideOut)
          .offset(d3.stackOffsetWiggle),
      );
      descriptionRender(
        wrapRef.current,
        "offset - stackOffsetWiggle & order - stackOrderInsideOut",
        "wiggle 오프셋은 누적된 데이터의 위치를 제어하는데 사용할 수 있는 여러 사용 가능한 오프셋 중 하나입니다. wiggle 오프셋을 사용하면 레이어가 0 기준선 주변에서 흔들리도록 데이터가 누적되어 물결 모양 패턴이 생성됩니다. 이는 변동이 작은 데이터를 시각화하고 개별 레이어의 값을 쉽게 비교할 수 있도록 하는 데 유용할 수 있습니다.",
      );
      stackRender(
        wrapRef.current,
        data,
        d3
          .stack<Data, DataFormat>()
          .keys(dataFormatKey)
          .order(d3.stackOrderInsideOut)
          .offset(d3.stackOffsetSilhouette),
      );
      descriptionRender(
        wrapRef.current,
        "offset - stackOffsetSilhouette & order - stackOrderInsideOut",
        "실루엣 오프셋은 누적 데이터의 위치를 제어하는데 사용할 수 있는 여러 사용 가능한 오프셋 중 하나입니다." +
          " 실루엣 오프셋을 사용하면 레이어가 0 기준선을 중심으로 중심에 오도록 데이터가 누적되어 실루엣과 같은 효과를 생성합니다. 이는 데이터의 전체 모양을 보다 명확하게 볼 수 있으므로 양수 값과 음수 값이 모두 있는 데이터를 시각화하는 데 유용할 수 있습니다.",
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

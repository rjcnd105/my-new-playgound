import type { ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";

import type { TachometerProps } from "./index";
import { TachometerGraph } from "./index";
import { defaultPercentValueInfo } from "./utils";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "visx/TachometerGraph",
  component: TachometerGraph,
} as ComponentMeta<typeof TachometerGraph>;

const data: TachometerProps["data"] = [
  { color: "#2cba00", label: "매우 낮음" },
  { color: "#a3ff00", label: "낮음" },
  { color: "#fff400", label: "보통" },
  { color: "#ffa700", label: "높음" },
  { color: "#ff0000", label: "매우 높음" },
];

const valueInfo: TachometerProps["valueInfo"] = {
  ...defaultPercentValueInfo,
  minLabel: "쾌적",
  maxLabel: "치열",
};

export const Sample = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(0);

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      경쟁 강도&nbsp;
      <input
        type="number"
        style={{ padding: 8, width: 80 }}
        min={0}
        max={100}
        defaultValue={value}
        ref={inputRef}
      />
      <button
        style={{ padding: 8 }}
        onClick={() => {
          if (inputRef.current) setValue(Number(inputRef.current.value));
        }}
      >
        0~100 값 적용
      </button>
      <TachometerGraph data={data} value={value} valueInfo={valueInfo} />
    </div>
  );
};

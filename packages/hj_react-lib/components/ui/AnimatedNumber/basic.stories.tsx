import type { ComponentMeta, ComponentStory } from "@storybook/react";
import AnimatedNumber from "./index";
import { useState } from "react";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ui/AnimatedNumber",
  component: AnimatedNumber,
} as ComponentMeta<typeof AnimatedNumber>;

export const Basic = () => {
  const [v, setV] = useState(100);
  return (
    <>
      <button onClick={() => setV(v * 2)}>x2 update!</button>
      <div style={{ padding: 8 }}>
        <AnimatedNumber value={v} comma />
      </div>
    </>
  );
};

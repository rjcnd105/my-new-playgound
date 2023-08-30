import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import type { CertiInputProps } from "./index";
import CertiInputs from "./index";

const meta = {
  title: "common/ui/Input/CertiInputs",
  component: CertiInputs,
} satisfies Meta<typeof CertiInputs>;

export default meta;

type Story = StoryObj<typeof CertiInputs>;

export const basic: Story = {
  render(props: CertiInputProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [str, setStr] = useState("");
    return (
      <>
        <p className="mb-4">
          - 영문, 숫자만 입력 가능. <br />- 붙혀넣기 가능. <br />
        </p>
        <CertiInputs
          key={props.inputNumber}
          {...props}
          onKeyDownWithFullValue={(e, fullValue) => setStr(fullValue)}
        ></CertiInputs>
        <div className="mt-4">value: {str}</div>
      </>
    );
  },
  args: {
    inputNumber: 4,
    onChange(e: any) {
      console.log("my onChange: e", e);
    },
    onError({ code, value }: any) {
      alert(code + ': "' + value + '"는 사용할 수 없는 문자입니다.');
    },
    invalid: false,
  },
};

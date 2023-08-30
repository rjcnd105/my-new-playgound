import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import type { InputFieldProps } from "./index";
import InputField from "./index";

const meta = {
  title: "common/ui/Input/InputField",
  component: InputField,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password"],
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof InputField>;

export const basic: Story = {
  args: {
    label: "아이디",
    invalid: false,
    disabled: false,
    type: "text",
    onEnter(e) {
      alert("enter! " + (e.target as HTMLInputElement).value);
    },
  } satisfies InputFieldProps,
};
export const password: Story = {
  args: {
    label: "비밀번호",
    invalid: false,
    disabled: false,
    type: "password",
  } satisfies InputFieldProps,
};

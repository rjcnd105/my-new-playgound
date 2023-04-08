import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import PlusIcon from '../../../assets/icon/plus.svg';
import Button from './index';

const meta = {
  title: 'ui/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {
    children: (
      <>
        Button <PlusIcon />
      </>
    ),
    theme: 'primary',
    size: 'small',
    disabled: false,
    isLoading: false,
    style: {
      width: '200px',
    },
  },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['transparent', 'primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

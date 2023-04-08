import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import SearchInput from './index';

const meta = {
  title: 'ui/Input/SearchInput',
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchInputStory: Story = {
  args: {
    placeholder: 'Search',
    defaultValue: '',
    onEnter(e) {
      alert('enter! ' + (e.target as HTMLInputElement).value);
    },
  },
};

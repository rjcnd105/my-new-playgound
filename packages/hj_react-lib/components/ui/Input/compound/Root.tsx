import type { PolymorphicComponentProps } from '@utils/reactUtils';
import React from 'react';

type Props = Pick<
  PolymorphicComponentProps<'div'>,
  'className' | 'children' | 'onClick'
>;

const Root = (props: Props) => {
  return <div {...props} />;
};

export default Root;

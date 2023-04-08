import { createPolymorphicComponentWithAllProps } from '@utils/reactUtils';
import clsx from 'clsx';
import React from 'react';

type Props = {
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
};
const Input = createPolymorphicComponentWithAllProps('input')<Props>()(
  ({ onEnter, className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={clsx('w-full bg-transparent', className)}
        ref={ref}
        onKeyDown={(e) => {
          props.onKeyDown?.(e);
          if (e.key === 'Enter') onEnter?.(e);
        }}
      />
    );
  },
);

export default Input;

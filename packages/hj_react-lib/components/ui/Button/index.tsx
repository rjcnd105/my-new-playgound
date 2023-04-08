import { Player } from '@lottiefiles/react-lottie-player';
import { createPolymorphicComponentWithAllProps } from '@utils/reactUtils';
import clsx from 'clsx';
import React from 'react';

import buttonLoadingLottie from '../../../assets/lottie/button-loading.json';
import styles from './Button.module.css';

type Props = {
  theme: 'transparent' | 'primary' | 'secondary';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Button = createPolymorphicComponentWithAllProps('button')<Props>()(
  (
    { size, theme, isLoading, className, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        data-theme={theme}
        data-size={size}
        disabled={isLoading || disabled}
        className={clsx(styles.button, className)}
        ref={ref}
      >
        {isLoading ? (
          <Player src={buttonLoadingLottie} autoplay loop />
        ) : (
          children
        )}
      </button>
    );
  },
);

export default Button;

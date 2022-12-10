import { ComplexStyleRule } from "@vanilla-extract/css";

type Props = Record<'tablet' | 'desktop', ComplexStyleRule>;

export const responsiveStyle = ({ tablet, desktop }: Props) => ({
  '@media': {
    'screen and (min-width: 768px)': tablet,
    'screen and (min-width: 1024px)': desktop
  }
});

import { globalStyle, style } from "@vanilla-extract/css";
import { responsiveStyle } from "../styles";

export const wrapStyle = style({
  // cast to pixels
  width: "100%",
  padding: 12,
  // selectors: {
  //   '& div': {
  //     width: 30,
  //     height: 30,
  //     backgroundColor: 'red'
  //   }
  // },

  ':hover': {
    color: 'pink'
  },
  ':first-of-type': {
    color: 'blue'
  },
  '::before': {
    content: ''
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: 16
    },
    'screen and (min-width: 1024px)': {
      maxWidth: 1008,
    }
  },
  
});

globalStyle('body', {
  margin: 0
});
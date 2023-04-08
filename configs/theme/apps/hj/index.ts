import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { px2rem } from "../../utils/unit";

export const theme = {
  extend: {
    borderRadius: {
      1: px2rem(4),
      2: px2rem(8),
      3: px2rem(12),
      4: px2rem(16),
    },
  },
  fontSize: {
    head1: px2rem(36),
    head2: px2rem(24),
    subHead1: px2rem(20),
    subHead2: px2rem(18),
    body1: px2rem(16),
    body2: px2rem(14),
    caption: px2rem(12),
  },
  fontWeight: {
    regular: "400",
    bold: "700",
  },
  screens: {
    // tablet
    // @media (min-width: 768px) { ... }
    tablet: "768px",

    // pc
    // @media (min-width: 1280px) { ... }
    pc: "1280px",
  },
  gap: {
    2: px2rem(8),
  },
  colors: {
    transparent: "transparent",

    /* Main */
    primary: "#8A57F5",
    secondary: "#5679D6",

    /* Base */
    black: "#232323",
    gray10: "#575757",
    gray20: "#8A8A8A",
    gray30: "#A8ACB5",
    gray40: "#E3E5EB",
    white: "#FFFFFF",

    /* Background */
    lightPurple1: "#F0F1FF",
    lightPurple2: "#ECE3FF",
    lightPurple3: "#F6F9FF",

    /* system */
    error: "#FF5E5E",
    success: "#45D08B",

    /* sub */
    yellow: "#FFCE7B",
    orange: "#FD7B59",
    purple: "#C56CF0",
    indigo: "#636DF8",
  },
  lineHeight: {
    head1: px2rem(48),
    head2: px2rem(36),
    subHead1: px2rem(28),
    subHead2: px2rem(26),
    body1: px2rem(24),
    body2: px2rem(20),
    caption: px2rem(26),
  },
  borderWidth: {
    none: "0",
    1: "1px",
  },
  boxShadow: {
    grey12: "0px 4px 12px rgba(113, 113, 113, 0.15)",
    grey24: "0px 6px 24px rgba(113, 113, 113, 0.15)",
    red12: "0px 4px 12px rgba(151, 5, 27, 0.1)",
    red24: "0px 6px 24px rgba(151, 5, 27, 0.1)",
  },
} satisfies Config["theme"];

export const utilityPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".typo-head1": {
      fontSize: theme.fontSize.head1,
      lineHeight: theme.lineHeight.head1,
      fontWeight: theme.fontWeight.bold,
    },
    ".typo-head2": {
      fontSize: theme.fontSize.head2,
      lineHeight: theme.lineHeight.head2,
      fontWeight: theme.fontWeight.bold,
    },
    ".typo-subHead1": {
      fontSize: theme.fontSize.subHead1,
      lineHeight: theme.lineHeight.subHead1,
      fontWeight: theme.fontWeight.bold,
    },
    ".typo-subHead2": {
      fontSize: theme.fontSize.subHead2,
      lineHeight: theme.lineHeight.subHead2,
      fontWeight: theme.fontWeight.bold,
    },
    ".typo-body1": {
      fontSize: theme.fontSize.body1,
      lineHeight: theme.lineHeight.body1,
    },
    ".typo-body2": {
      fontSize: theme.fontSize.body2,
      lineHeight: theme.lineHeight.body2,
    },
    ".typo-caption": {
      fontSize: theme.fontSize.caption,
      lineHeight: theme.lineHeight.caption,
    },
  });
});

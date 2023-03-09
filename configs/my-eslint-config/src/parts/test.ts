import { type FlatESLintConfig } from "eslint-define-config";

export const test = {
  files: ["**/*.{test,spec}.ts?(x)"],
  rules: {
    "no-unused-expressions": "off",
  },
} as FlatESLintConfig;

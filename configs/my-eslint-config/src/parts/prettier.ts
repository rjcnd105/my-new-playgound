// @ts-ignore
import prettierConfig from "eslint-config-prettier";
import { type FlatESLintConfig } from "eslint-define-config";
// @ts-ignore
import prettierPlugin from "eslint-plugin-prettier";

export const prettier = {
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    ...prettierConfig.rules,
    ...prettierPlugin.configs.recommended.rules,
    "prettier/prettier": "warn",
  },
} as FlatESLintConfig;

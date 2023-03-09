import { type FlatESLintConfig } from "eslint-define-config";

import { GLOB_EXCLUDE } from "../shared.js";

export const jsx = {
  files: ["**/*.jsx"],
  ignores: GLOB_EXCLUDE,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
} as FlatESLintConfig;

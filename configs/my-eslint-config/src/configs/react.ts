import { type FlatESLintConfig } from "eslint-define-config";

import { GLOB_EXCLUDE, GLOB_JSX } from "../shared";

export const react = [
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  {
    files: [GLOB_JSX],
    ignores: GLOB_EXCLUDE,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
] as FlatESLintConfig[];

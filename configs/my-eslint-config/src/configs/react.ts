import { defineFlatConfig } from "eslint-define-config";

import { GLOB_EXCLUDE, GLOB_JSX } from "../shared.js";

export const react = defineFlatConfig([
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
]);

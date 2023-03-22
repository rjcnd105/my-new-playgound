import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { type FlatESLintConfig } from "eslint-define-config";

import { declare, test } from "../parts/index.js";
import { GLOB_TS, GLOB_TSX } from "../shared.js";

// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement/65874173#65874173
export const ts = [
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["eslint-recommended"].overrides![0].rules,
      ...tsPlugin.configs["recommended"].rules,

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-redeclare": "error",

      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/prefer-as-const": "warn",
    },
  },
  declare,
  test,
] as FlatESLintConfig[];

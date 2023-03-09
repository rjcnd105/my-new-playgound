import { GLOB_TS } from "../shared.js";
import { type FlatESLintConfig } from "eslint-define-config";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { test } from "../parts/test.js";
import { declare } from "../parts/declare.js";

// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement/65874173#65874173
export const ts = [
  {
    files: [GLOB_TS],
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

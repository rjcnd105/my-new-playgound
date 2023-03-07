"use strict";

const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const shared = require("./configs/my-eslint-config/src/shared");

module.exports = [
  {
    files: [shared.GLOB_TS],
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
      ...tsPlugin.configs["eslint-recommended"].overrides[0].rules,
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
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-duplicates": "off",
    },
  },
  {
    files: ["**/*.{test,spec}.ts?(x)"],
    rules: {
      "no-unused-expressions": "off",
    },
  },
];

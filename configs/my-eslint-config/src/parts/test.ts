import { defineFlatConfig } from "eslint-define-config";

export const test = defineFlatConfig({
  files: ["**/*.{test,spec}.ts?(x)"],
  rules: {
    "no-unused-expressions": "off",
  },
});

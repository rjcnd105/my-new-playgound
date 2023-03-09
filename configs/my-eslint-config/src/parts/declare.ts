import { type FlatESLintConfig } from "eslint-define-config";

export const declare = {
  files: ["**/*.d.ts"],
  rules: {
    "import/no-duplicates": "off",
  },
} as FlatESLintConfig;

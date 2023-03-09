import { type FlatESLintConfig } from "eslint-define-config";
import { ts } from "./ts.js";

export const next = [
  ts,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
] as FlatESLintConfig[];

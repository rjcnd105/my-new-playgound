// @ts-ignore
import nextjs from "@next/eslint-plugin-next";
import { type FlatESLintConfig } from "eslint-define-config";

import { GLOB_TSX } from "../shared.js";
import { base } from "./base.js";
import { ts } from "./ts.js";

export const tsNextjs = [
  ...base,
  ...ts,
  {
    files: [GLOB_TSX],
    plugins: {
      "@next/next": nextjs,
    },
    rules: nextjs.configs.recommended.rules,
  },
] as FlatESLintConfig[];

// @ts-ignore
import nextjs from "@next/eslint-plugin-next";
import { defineFlatConfig } from "eslint-define-config";

import { GLOB_TSX } from "../shared.js";
import { base } from "./base.js";
import { ts } from "./ts.js";

export const tsNextjs = defineFlatConfig([
  ...base,
  ...ts,
  {
    files: [GLOB_TSX],
    plugins: {
      "@next/next": nextjs,
    },
    rules: nextjs.configs.recommended.rules,
  },
]);

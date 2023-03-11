import { type FlatESLintConfig } from "eslint-define-config";

import { GLOB_TSX } from "../shared.js";
import { base } from "./base.js";
import { ts } from "./ts.js";
 
export const tsNext = [ 
  ...base,
  ...ts,
  {
    files: [GLOB_TSX],
    extends: ["plugin:@next/next/recommended"],
  },
] as FlatESLintConfig[];

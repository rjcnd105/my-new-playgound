import { type FlatESLintConfig } from "eslint-define-config";

import { GLOB_TSX } from "../shared";
import { base } from "./base";
import { ts } from "./ts";
 
export const tsNext = [ 
  ...base,
  ...ts,
  {
    files: [GLOB_TSX],
    extends: ["plugin:@next/next/recommended"],
  },
] as FlatESLintConfig[];

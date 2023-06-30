import { defineFlatConfig } from "eslint-define-config";
import globals from "globals";

// import { GLOB_EXCLUDE } from "../shared";
// @ts-ignore
import { imports } from "../parts/index.js";

export const base = defineFlatConfig([
  "eslint:recommended",
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", { args: "none", ignoreRestSiblings: true }],
      "no-constant-condition": "warn",
      "no-debugger": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement",
      ],
      "no-return-await": "warn",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false,
        },
      ],

      "no-var": "error",
      "prefer-const": [
        "warn",
        { destructuring: "all", ignoreReadBeforeAssign: true },
      ],
      "prefer-arrow-callback": [
        "error",
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],
      "object-shorthand": [
        "error",
        "always",
        { ignoreConstructors: false, avoidQuotes: true },
      ],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-await": "error",

      "array-callback-return": "error",
      "block-scoped-var": "error",
      eqeqeq: ["error", "smart"],
      "no-alert": "warn",
      "no-case-declarations": "error",
      "no-fallthrough": ["warn", { commentPattern: "break[\\s\\w]*omitted" }],
      "no-multi-str": "error",
      "no-with": "error",
      "no-void": "error",

      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  imports,
]);

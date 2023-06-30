import { defineFlatConfig } from "eslint-define-config";
// @ts-ignore
import markdownPlugin from "eslint-plugin-markdown";

import { GLOB_MARKDOWN } from "../shared.js";

export const md = defineFlatConfig([
  {
    files: [GLOB_MARKDOWN],
    plugins: {
      markdown: markdownPlugin,
    },
    extends: ["plugin:markdown/recommended"],
    processor: "markdown/markdown",
  },
  {
    files: ["**/*.md/*"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    rules: {
      ...markdownPlugin.configs.recommended.overrides[1].rules,

      "@typescript-eslint/no-redeclare": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-alert": "off",
      "no-console": "off",
      "no-restricted-imports": "off",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.mdx"],
    extends: ["plugin:mdx/recommended"],
    settings: {
      "mdx/code-blocks": true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      "mdx/language-mapper": {},
    },
  },
]);

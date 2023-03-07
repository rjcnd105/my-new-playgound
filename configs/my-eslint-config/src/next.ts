import { ts } from "./ts";

/** @type {import("eslint").Linter.Config} */
export default [
  ts,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

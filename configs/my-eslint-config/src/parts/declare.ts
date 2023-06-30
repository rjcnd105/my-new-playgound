import { defineFlatConfig } from "eslint-define-config";

export const declare = defineFlatConfig({
  files: ["**/*.d.ts"],
  rules: {
    "import/no-duplicates": "off",
  },
});

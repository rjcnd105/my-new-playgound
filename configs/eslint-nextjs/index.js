module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [".next", "node_modules", "storybook-static"],
  rules: {
    "no-unused-vars": "warn",
    "simple-import-sort/imports": "warn", // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "warn", // Export configuration for `eslint-plugin-simple-import-sort`
    "@typescript-eslint/no-var-requires": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["tsconfig.json"], // Specify it only for TypeScript files
      },

      extends: ["next/core-web-vitals", "plugin:jsx-a11y/recommended"],
      rules: {
        "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
        "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false,
            },
          },
        ],
      },
    },
  ],
};

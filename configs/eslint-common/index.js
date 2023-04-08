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
    node: true,
  },
  ignorePatterns: ["node_modules", "dist"],
  rules: {
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off", // Named export is easier to refactor automatically
    "simple-import-sort/imports": "warn", // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "warn", // Export configuration for `eslint-plugin-simple-import-sort`
    "@typescript-eslint/no-var-requires": "off",
  },
  overrides: [
    {
      files: ["*.ts"], // Your TypeScript files extension
      parserOptions: {
        project: ["tsconfig.json"], // Specify it only for TypeScript files
      },
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

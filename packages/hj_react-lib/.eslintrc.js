module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["@typescript-eslint", "jsx-a11y", "prettier", "simple-import-sort"],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ["node_modules/*", "*.config.ts", "*.config.js"],
  rules: {
    "turbo/no-undeclared-env-vars": "off",
    "react/jsx-pascal-case": "off",
    "react/function-component-definition": "off",
    "react/prop-types": "off",
    "no-multi-assign": "off",
    "import/first": "error",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "error",
    "react/destructuring-assignment": "off",
    // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    "jsx-a11y/anchor-is-valid": "off",
    // Next.js use his own internal link system
    "react/require-default-props": "off",
    // Allow non-defined react props as undefined
    "react/jsx-props-no-spreading": "off",
    // _app.tsx uses spread operator and also, react-hook-form
    "react-hooks/exhaustive-deps": "off",
    // Incorrectly report needed dependency with Next.js router
    "import/prefer-default-export": "off",
    // Named export is easier to refactor automatically
    "simple-import-sort/imports": "warn",
    // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "warn",
    // Export configuration for `eslint-plugin-simple-import-sort`
    "no-unused-imports": "off",
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "off",
    "react/no-unknown-property": "off",
    "@typescript-eslint/comma-dangle": "off",
    // Avoid conflict rule between Eslint and Prettier
    "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
  },
  // overrides: [
  //   // Configuration for testing
  //   {
  //     files: ["**/*.test.ts", "**/*.test.tsx"],
  //     plugins: ["jest", "jest-formatting", "testing-library", "jest-dom"],
  //     extends: [
  //       "plugin:jest/recommended",
  //       "plugin:jest-formatting/recommended",
  //       "plugin:testing-library/react",
  //       "plugin:jest-dom/recommended",
  //     ],
  //   },
  // ],
};

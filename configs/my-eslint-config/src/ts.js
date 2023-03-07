"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ts = void 0;
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const shared_1 = require("./shared");
/** @type {import('eslint-define-config').FlatESLintConfig[]} */
exports.ts = [
    {
        files: [shared_1.GLOB_TS],
        ignores: shared_1.GLOB_EXCLUDE,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs["eslint-recommended"].overrides[0].rules,
            ...tsPlugin.configs["recommended"].rules,
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-redeclare": "error",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { fixStyle: "inline-type-imports", disallowTypeAnnotations: false },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/prefer-as-const": "warn",
        },
    },
    {
        files: ["**/*.d.ts"],
        ignores: shared_1.GLOB_EXCLUDE,
        rules: {
            "import/no-duplicates": "off",
        },
    },
    {
        files: ["**/*.{test,spec}.ts?(x)"],
        rules: {
            "no-unused-expressions": "off",
        },
    },
];

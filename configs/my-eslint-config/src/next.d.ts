/** @type {import("eslint").Linter.Config} */
declare const _default: (({
    files: string[];
    ignores: string[];
    languageOptions: {
        parser: typeof import("@typescript-eslint/parser");
        parserOptions: {
            sourceType: string;
        };
    };
    plugins: {
        "@typescript-eslint": typeof import("@typescript-eslint/eslint-plugin");
    };
    rules: {
        "@typescript-eslint/no-unused-vars": string;
        "@typescript-eslint/no-redeclare": string;
        "@typescript-eslint/ban-ts-comment": string;
        "@typescript-eslint/ban-types": string;
        "@typescript-eslint/consistent-type-imports": (string | {
            fixStyle: string;
            disallowTypeAnnotations: boolean;
        })[];
        "@typescript-eslint/explicit-module-boundary-types": string;
        "@typescript-eslint/no-explicit-any": string;
        "@typescript-eslint/no-non-null-assertion": string;
        "@typescript-eslint/prefer-as-const": string;
        "import/no-duplicates"?: undefined;
        "no-unused-expressions"?: undefined;
    };
} | {
    files: string[];
    ignores: string[];
    rules: {
        "import/no-duplicates": string;
        "no-unused-expressions"?: undefined;
    };
    languageOptions?: undefined;
    plugins?: undefined;
} | {
    files: string[];
    rules: {
        "no-unused-expressions": string;
        "import/no-duplicates"?: undefined;
    };
    ignores?: undefined;
    languageOptions?: undefined;
    plugins?: undefined;
})[] | {
    rules: {
        "@next/next/no-html-link-for-pages": string;
    };
})[];
export default _default;
//# sourceMappingURL=next.d.ts.map
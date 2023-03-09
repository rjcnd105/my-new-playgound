export declare const markdown: ({
    files: string[];
    plugins: {
        markdown: any;
    };
    extends: string[];
    processor: string;
    languageOptions?: undefined;
    rules?: undefined;
    settings?: undefined;
} | {
    files: string[];
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                impliedStrict: boolean;
            };
        };
    };
    rules: any;
    plugins?: undefined;
    extends?: undefined;
    processor?: undefined;
    settings?: undefined;
} | {
    files: string[];
    extends: string[];
    settings: {
        "mdx/code-blocks": boolean;
        "mdx/language-mapper": {};
    };
    plugins?: undefined;
    processor?: undefined;
    languageOptions?: undefined;
    rules?: undefined;
})[];

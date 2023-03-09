// @ts-ignore
import prettierPlugin from "eslint-plugin-prettier";
// @ts-ignore
import prettierConfig from "eslint-config-prettier";
export const prettier = {
    plugins: {
        prettier: prettierPlugin,
    },
    rules: {
        ...prettierConfig.rules,
        ...prettierPlugin.configs.recommended.rules,
        "prettier/prettier": "warn",
    },
};

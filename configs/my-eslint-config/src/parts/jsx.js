import { GLOB_EXCLUDE } from "../shared.js";
export const jsx = {
    files: ["**/*.jsx"],
    ignores: GLOB_EXCLUDE,
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    }
};

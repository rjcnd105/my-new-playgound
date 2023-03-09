// @ts-ignore
import simpleImportSort from "eslint-plugin-simple-import-sort";
// @ts-ignore
import * as importPlugin from "eslint-plugin-import";
export const imports = {
    plugins: {
        import: importPlugin,
        "simple-import-sort": simpleImportSort,
    },
    settings: {
        "import/resolver": {
            node: { extensions: [".js", ".mjs", ".ts", ".d.ts"] },
        },
    },
    rules: {
        "import/first": "error",
        "import/no-mutable-exports": "error",
        "import/no-duplicates": "error",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
};

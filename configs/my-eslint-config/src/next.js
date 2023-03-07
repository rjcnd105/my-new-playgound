"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_1 = require("./ts");
/** @type {import("eslint").Linter.Config} */
exports.default = [
    ts_1.ts,
    {
        rules: {
            "@next/next/no-html-link-for-pages": "off",
        },
    },
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOB_EXCLUDE = exports.GLOB_LOCKFILE = exports.GLOB_DIST = exports.GLOB_NODE_MODULES = exports.GLOB_ALL_SRC = exports.GLOB_HTML = exports.GLOB_YAML = exports.GLOB_VUE = exports.GLOB_MARKDOWN = exports.GLOB_JSONC = exports.GLOB_JSON5 = exports.GLOB_JSON = exports.GLOB_SCSS = exports.GLOB_LESS = exports.GLOB_CSS = exports.GLOB_STYLE = exports.GLOB_TSX = exports.GLOB_TS = exports.GLOB_JSX = exports.GLOB_JS = exports.GLOB_SRC = void 0;
// @ts-check
exports.GLOB_SRC = "**/*.?([mt])[jt]s?(x)";
exports.GLOB_JS = "**/*.?([mt])js";
exports.GLOB_JSX = "**/*.?([mt])jsx";
exports.GLOB_TS = "**/*.?([mt])ts";
exports.GLOB_TSX = "**/*.?([mt])tsx";
exports.GLOB_STYLE = "**/*.{c,le,sc}ss";
exports.GLOB_CSS = "**/*.css";
exports.GLOB_LESS = "**/*.less";
exports.GLOB_SCSS = "**/*.scss";
exports.GLOB_JSON = "**/*.json";
exports.GLOB_JSON5 = "**/*.json5";
exports.GLOB_JSONC = "**/*.jsonc";
exports.GLOB_MARKDOWN = "**/*.md";
exports.GLOB_VUE = "**/*.vue";
exports.GLOB_YAML = "**/*.y?(a)ml";
exports.GLOB_HTML = "**/*.htm?(l)";
exports.GLOB_ALL_SRC = ([
    exports.GLOB_SRC,
    exports.GLOB_STYLE,
    exports.GLOB_JSON,
    exports.GLOB_JSON5,
    exports.GLOB_MARKDOWN,
    exports.GLOB_VUE,
    exports.GLOB_YAML,
    exports.GLOB_HTML,
]);
exports.GLOB_NODE_MODULES = ("**/node_modules/**");
exports.GLOB_DIST = ("**/dist/**");
exports.GLOB_LOCKFILE = ([
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
]);
exports.GLOB_EXCLUDE = ([
    exports.GLOB_NODE_MODULES,
    exports.GLOB_DIST,
    ...exports.GLOB_LOCKFILE,
    "**/CHANGELOG*.md",
    "**/*.min.*",
    "**/LICENSE*",
    "**/output",
    "**/coverage",
    "**/temp",
    "**/fixtures",
    "**/__snapshots__",
    "**/auto-import.d.ts",
    "**/components.d.ts",
]);

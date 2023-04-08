import * as config from "@hj/eslint-config/configs/index.js";
import * as parts from "@hj/eslint-config/parts/index.js";

export default [...config.base, ...config.ts, parts.prettier];

import * as config from "./dist/configs/index.js";
import * as parts from "./dist/parts/index.js";

export default [...config.base, ...config.ts, parts.prettier];

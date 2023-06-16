// eslint-disable-next-line import/no-duplicates
import * as config from "../configs/my-eslint-config/dist/configs/index.js";
// eslint-disable-next-line import/no-duplicates
import * as parts from "../configs/my-eslint-config/dist/parts/index.js";

export default [...config.base, ...config.ts, parts.prettier];

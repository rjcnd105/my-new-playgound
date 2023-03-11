// const { ts } = await import("./src/config/ts.js");
// import { base, ts } from "./dist/configs/index.cjs";
// import { prettier, unicorn } from "./dist/parts/index.cjs";
import * as configs from "./dist/configs/index.js";
import * as parts from "./dist/parts/index.js";
// const { prettier, unicorn } = await import("./dist/parts/index.cjs")
// import { prettier, unicorn } from "./dist/parts/index.js";
// import { prettier, unicorn } from "./dist/parts/index.js";

export default [...configs.base, ...configs.ts, parts.prettier];

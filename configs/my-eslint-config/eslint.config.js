// const { ts } = await import("./src/config/ts.js");
// import { base, ts } from "./dist/configs/index.cjs";
// import { prettier, unicorn } from "./dist/parts/index.cjs";
import myESlint from "./dist/index.cjs";
// const { prettier, unicorn } = await import("./dist/parts/index.cjs")
// import { prettier, unicorn } from "./dist/parts/index.js";
// import { prettier, unicorn } from "./dist/parts/index.js";  
 
export default [...myESlint.configs.base, ...myESlint.configs.ts, myESlint.parts.prettier];

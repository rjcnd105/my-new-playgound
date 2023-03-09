// const { ts } = await import("./src/config/ts.js");
import { base } from "./src/config/base.js";
import { ts } from "./src/config/ts.js";
import { prettier } from "./src/parts/prettier.js";
import { unicorn } from "./src/parts/unicon.js";

export default [...base, ...ts, prettier, unicorn];

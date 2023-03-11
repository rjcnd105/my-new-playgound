import { base } from "./configs/base";
import { md } from "./configs/md";
import { react } from "./configs/react";
import { ts } from "./configs/ts";
import { tsNext } from "./configs/tsNext";


import { declare } from "./parts/declare";
import { test } from "./parts/test";
import { imports } from "./parts/imports";
import { prettier } from "./parts/prettier";
import { turbo } from "./parts/turbo";
import { unicorn } from "./parts/unicon";


export default {
  configs: {
    base, md, react, ts, tsNext
  },
  parts: {
    declare, test, imports, prettier, turbo, unicorn
  }
};
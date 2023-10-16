import * as fs from "fs";

import { theme } from "./test.js";

const prefix = "mf";

type Results = [keys: string, value: string];

const flattenData = (data) => {
  const results: Results[] = [];
  const recursive = (data: any, keys: string[] = []) => {
    for (const [key, value] of Object.entries(data)) {
      const newKeys = keys.slice();
      newKeys.push(key);
      if (typeof value === "string") {
        results.push([newKeys.join("-"), value]);
      } else {
        recursive(value, newKeys);
      }
    }
  };
  recursive(data);
  return results;
};

const flattenDataToCss = (data: Results[]) => {
  let resultStr = ":root {\n";

  for (const [key, value] of data) {
    resultStr += `  --${prefix}-${key.replace("$", "")}: ${value};\n `;
  }
  return `${resultStr}}`;
};

fs.writeFileSync(
  "./src/_old/style/test.css",
  flattenDataToCss(flattenData(theme)),
);

console.log(JSON.stringify(flattenData(theme))); /*?*/

console.log("hihi");

// function gen<T extends Recursive>(v: T) {}
//
// fs.writeFileSync('./test.ts')

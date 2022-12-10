import { isObject } from "../isRecord";

export function deepMerge(target, source) {
  if (!isObject(source)) return target;

  if (!(isObject(target) && isObject(source))) return {};
  let result = { ...target };

  for (const key in source) {
    console.log(key, "sou");
    if (isObject(source[key])) {
      Object.assign(result, {
        [key]: deepMerge(result[key] ?? {}, source[key]),
      });
    } else {
      Object.assign(result, { [key]: source[key] });
    }
  }

  return result;
}

// deepMerge(
//   { a: 10, b: { d: [1, 2, 3], z: new Set(["a", "b"]) } },
//   { c: 30, f: { kk: "kk" }, b: { z: [2, 3, 4] } },
// ); /*?*/

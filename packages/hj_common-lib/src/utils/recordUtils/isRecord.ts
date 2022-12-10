import { UnknownRecord } from "type-fest/source/internal";

export function isObject(item: any): item is UnknownRecord {
  return item && typeof item === "object" && !Array.isArray(item);
}

// isObject({}); /*?*/ // true
// isObject([]); /*?*/ // false
// isObject(1); /*?*/ // false
// isObject("aa"); /*?*/ // false

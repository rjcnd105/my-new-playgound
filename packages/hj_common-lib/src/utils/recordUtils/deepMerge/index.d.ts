import { MergeDeep } from "type-fest";
import { UnknownRecord } from "type-fest/source/internal";

export declare function deepMerge<
  A extends UnknownRecord,
  B extends UnknownRecord,
>(a: A, b: B): MergeDeep<A, B>;

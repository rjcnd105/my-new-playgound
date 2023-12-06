import { UnknownRecord } from "type-fest/source/internal";
import { MergeDeep, PartialDeep } from "type-fest";
import { ExceptForDeepComparison } from "../../../types/ExceptForDeepComparison";
import { deepMerge } from "../deepMerge";

const exceptForDeepComparison =
  <A extends UnknownRecord>() =>
  <B extends Partial<A>, C extends Omit<Partial<A>, B>>(b: B, c: C) =>
    deepMerge(b, c) as ExceptForDeepComparison<A, MergeDeep<B, C>, false>;

const f = exceptForDeepComparison<{ a: 30; b: { c: 40; ee: "ee" } }>()(
  { b: { c: 40 } },
  { a: 30, fff: "ff" },
); /*?*/

console.log(f);

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

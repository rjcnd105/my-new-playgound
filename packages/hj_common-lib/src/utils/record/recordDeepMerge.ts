import {
  deepmergeCustom,
  DeepMergeHKT,
  DeepMergeLeafURI,
  DeepMergeMergeFunctionsDefaultURIs,
} from "deepmerge-ts";

export const deepMerge = deepmergeCustom({
  mergeArrays: false,
  mergeSets: false,
  mergeMaps: false,
});

type RecordDeepMergeMergeFunctionsURIs = Readonly<{
  DeepMergeRecordsURI: DeepMergeLeafURI;
  DeepMergeArraysURI: DeepMergeMergeFunctionsDefaultURIs["DeepMergeArraysURI"];
  DeepMergeSetsURI: DeepMergeMergeFunctionsDefaultURIs["DeepMergeSetsURI"];
  DeepMergeMapsURI: DeepMergeMergeFunctionsDefaultURIs["DeepMergeMapsURI"];
  DeepMergeOthersURI: DeepMergeMergeFunctionsDefaultURIs["DeepMergeOthersURI"];
}>;

export type DeepMerge<Ts extends ReadonlyArray<unknown>> = DeepMergeHKT<
  Ts,
  RecordDeepMergeMergeFunctionsURIs,
  never
>;

// type test = DeepMerge<[typeof d1, typeof d2]>;
//
// const d1 = {
//   a: 1,
//   o: {
//     arr: [1, 2, 3],
//     map: new Map([
//       ["a", 1],
//       ["b", 2],
//     ]),
//     set: new Set([1, 2, 3]),
//     str: "aaastr",
//     num: 123,
//     b: true,
//     oo: {
//       k: "kk",
//       date: new Date(2020, 7, 12),
//     },
//   },
// };
//
// const d2 = {
//   a: 1,
//   o: {
//     arr: [{ v: 4 }, { v: 7 }, { v: 9 }],
//     map: new Map([
//       [11, "1"],
//       [22, "2"],
//     ]),
//     set: new Set(["11", "22", "33"]),
//     b: false,
//     oo: {
//       l: "ll",
//       date: new Date(2021, 2, 12),
//     },
//   },
// };

//
// propsDeepMerge(d1, d2); /*?*/
// deepmerge(d1, d2); /*?*/

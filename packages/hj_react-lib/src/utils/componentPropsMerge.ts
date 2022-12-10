import { deepmergeCustom, DeepMergeLeafURI } from "deepmerge-ts";

export const componentPropsMerge = deepmergeCustom<{
  DeepMergeArraysURI: DeepMergeLeafURI; // <-- Needed for correct output type.
}>({
  mergeArrays: false,
  mergeSets: false,
  mergeMaps: false,
});

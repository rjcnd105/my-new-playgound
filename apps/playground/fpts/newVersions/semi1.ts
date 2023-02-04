import * as Semi from "@fp-ts/core/typeclass/Semigroup";
import * as E from "@fp-ts/core/Either";
import * as ReadonlyArray from "@fp-ts/core/ReadonlyArray";

const arrSemi = Semi.array();

arrSemi.combine([1], [2]); /*?*/ // [1, 2]
arrSemi.combineMany([1], [[2, 4, 7]]); /*?*/ // [1, 2, 4, 7]

const eitherArraySemi = E.getFirstLeftSemigroup(arrSemi);

eitherArraySemi.combine(E.left([1]), E.left([2])); /*?*/ // left([1])
eitherArraySemi.combine(E.right([1]), E.right([4])); /*?*/ // right([1,4])

ReadonlyArray.of(1); /*?*/

[1, 4, 7, 8].reduce((acc, cur) => {
  acc.concat(ReadonlyArray.of(cur));
  return acc;
}, [] as number[]);

ReadonlyArray.fromEither(E.left([1])); /*?*/ // []
ReadonlyArray.fromEither(E.right(1)); /*?*/ // [1]

ReadonlyArray.separate([E.left(1), E.right(2), E.left(3), E.right(4)]); /*?*/ // [[1, 3], [2, 4]]

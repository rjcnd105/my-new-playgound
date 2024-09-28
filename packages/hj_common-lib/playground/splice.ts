import { createNone, type Option } from "option-t/plain_option";

const a = [1, 2, 3, 4, 5, 6, 7, 8];

a.toSpliced(3, 3, "hello"); /*?*/
a.slice(3, 4); /*?*/
a; /*?*/

a.toSpliced(9, 3, "hello"); /*?*/
a.slice(9, 10); /*?*/
a; /*?*/

interface InsertElemsParams<T> {
  arr: T[];
  index: number;
  elems: T[];
}
type InsertElemsReturn<T> = Option<{
  beforeElems: T[];
  newArr: T[];
}>;

/**
 * 배열에 elems 삽입
 * @example
 * insertElems({ arr: [1, 2, 3, 4, 5, 6], index: 2, elems: ["a", "b"] });
 * // -> { beforeElems: [ 3, 4 ], newArr: Array(6) [ 1, 2, 'a', 'b', 5, 6 ] }
 */
function insertElems<T>({
  arr,
  index,
  elems,
}: InsertElemsParams<T>): InsertElemsReturn<T> {
  return {
    beforeElems: arr.slice(index, index + elems.length),
    newArr: arr.toSpliced(index, elems.length, ...elems),
  };
}

insertElems({ arr: [1, 2, 3, 4, 5, 6], index: 2, elems: ["a", "b"] }); /*?*/

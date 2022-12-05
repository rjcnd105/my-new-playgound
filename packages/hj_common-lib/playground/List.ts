import { deepEqual } from "fast-equals";
import { Combinator } from "./utils";

export const foldl =
  <T>(f: Combinator<T>) =>
    (start: T) =>
      (xs: T[]): T => {
        let acc = start;
        for (const x of xs) {
          acc = f(acc, x);
        }
        return acc;
      };

export const reverse = <T>(xs: T[]): T[] => {
  let reverseList: T[] = [];
  for (let i = xs.length - 1; i >= 0; i--) {
    reverseList.push(xs[i]);
  }
  return reverseList;
};


const monoid = <T>(xs: T[]) => (ys: T[]) => [...xs, ...ys];


deepEqual(2, 2);  /*?*/


const List = function <T>(xs: T[]): List<T> {
  return {
    equals: equals(xs),
  };
};


List([1, 2, 3]); /*?*/

// export const foldr = flow2(foldl, (x) => (xs) => x(reverse(xs)) ) 



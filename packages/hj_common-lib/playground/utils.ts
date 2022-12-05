import { deepEqual } from "fast-equals";


export type Combinator<T> = (a: T, b: T) => T

export const equals = <T>(xs: T) => (ys: T) => deepEqual(xs, ys)
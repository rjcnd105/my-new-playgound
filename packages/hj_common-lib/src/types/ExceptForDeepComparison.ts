import { UnknownRecord } from "type-fest/source/internal";
import { And, HasKey, IsRecord, Not } from "./Default";
import { SimplifyDeep } from "type-fest/source/merge-deep";
import { PartialDeep, Simplify } from "type-fest";

type tt = IsRecord<{ a: 30 }>;
type tt2 = IsRecord<never>;
type tt3 = IsRecord<null>;

type T = HasKey<{ a: 30 }, "b">;

export type ExceptForDeepComparison<
  Origin,
  Except,
  Leaf extends boolean,
> = SimplifyDeep<ExceptForDeepComparisonHelper<Origin, Except, Leaf>>;

export type ExceptForDeepComparisonHelper<
  Origin,
  Except,
  Leaf extends boolean,
> = {
  [Key in Exclude<keyof Origin, keyof Except>]: Origin[Key];
} & {
  [Key in keyof (Origin | Except) as IsRecord<Origin[Key]> extends true
    ? Except[Key] extends PartialDeep<Origin[Key]> | {}
      ? Leaf extends true
        ? never
        : Key
      : never
    : never]: ExceptForDeepComparison<Origin[Key], Except[Key], Leaf>;
};

type Tt = IsRecord<{ A: 30 }>;

type AAAA = Exclude<"a" | "b" | "c", "a" | "b" | "c" | "d">;

type D1 = {
  a: number;
  b: number;
  dd: {
    a?: [1, 2, 3];
    b: never;
    c: {
      z: {};
      p: string;
    };
    pp?: string;
  };
};
type D2 = {
  a: number;
  c?: {
    z: {};
  };
  ff: number;
  dd: {
    a: [1, 2, 3];
    c?: number;
  };
};

type fs = ExceptForDeepComparison<D1, D2, false>;

type KA = keyof (D1 & D2);
type KO = keyof (D1 | D2);

type DD1 = {
  [Key in keyof (D1 | D2) as D1[Key] extends never ? never : Key]: Key;
};
// export type ExceptForDeepComparison<
//   FullObject,
//   ExceptObject extends PartialDeepProps<FullObject>,
//   Leaf,
// > = OmitNever<{
//   [Key in keyof FullObject]: Key extends keyof ExceptObject
//     ? Leaf extends false
//       ? FullObject[Key] extends UnknownRecord
//         ? ExceptObject[Key] extends FullObject[Key]
//           ? never
//           : ExceptObject[Key] extends PartialDeep<FullObject[Key]>
//           ? ExceptForDeepComparison<FullObject[Key], ExceptObject[Key], Leaf>
//           : never
//         : never
//       : never
//     : FullObject[Key];
// }>;

export type DoExceptForDeepComparison<
  T,
  Left extends boolean = false,
> = ExceptForDeepComparison<T, {}, Left>;

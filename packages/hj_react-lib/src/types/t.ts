import {
  EnforceOptional,
  OptionalFilter,
  RequiredFilter,
} from "type-fest/source/enforce-optional";
import { UnknownArrayOrTuple, UnknownRecord } from "type-fest/source/internal";
import {
  MergeDeepArrayOrTuple,
  MergeDeepInternalOptions,
  MergeDeepRecord,
  MergeDeepRecordProperty,
  SimplifyDeep,
} from "type-fest/source/merge-deep";
import { Merge } from "type-fest/source/merge";
import { PickIndexSignature } from "type-fest/source/pick-index-signature";
import { Simplify } from "type-fest/source/simplify";
import { Except, PartialDeep } from "type-fest";

export type EnforceOptional<ObjectType> = Simplify<
  {
    [Key in keyof ObjectType as RequiredFilter<
      ObjectType,
      Key
    >]: ObjectType[Key];
  } & {
    [Key in keyof ObjectType as OptionalFilter<ObjectType, Key>]?: Exclude<
      ObjectType[Key],
      undefined
    >;
  }
>;

export type OmitIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
};

type tt = OmitIndexSignature<{ a: 30 }>;

type MergeDeepRecord<
  Destination extends UnknownRecord,
  Source extends UnknownRecord,
  Options extends MergeDeepInternalOptions,
> = DoMergeDeepRecord<
  OmitIndexSignature<Destination>,
  OmitIndexSignature<Source>,
  Options
> &
  Merge<PickIndexSignature<Destination>, PickIndexSignature<Source>>;

type DoMergeDeepRecord<
  Destination extends UnknownRecord,
  Source extends UnknownRecord,
> = EnforceOptional<{
  [Key in keyof Destination | keyof Source]: Key extends keyof Source
    ? Key extends keyof Destination
      ? MergeDeepRecordProperty<Destination[Key], Source[Key], Options>
      : Source[Key]
    : Key extends keyof Destination
    ? Destination[Key]
    : never;
}>;

type MergeDeepOrReturn<
  DefaultType,
  Destination,
  Source,
  Options extends MergeDeepInternalOptions,
> = SimplifyDeep<
  [undefined] extends [Destination | Source]
    ? DefaultType
    : Destination extends UnknownRecord
    ? Source extends UnknownRecord
      ? MergeDeepRecord<Destination, Source, Options>
      : DefaultType
    : Destination extends UnknownArrayOrTuple
    ? Source extends UnknownArrayOrTuple
      ? MergeDeepArrayOrTuple<
          Destination,
          Source,
          Merge<Options, { spreadTopLevelArrays: false }>
        >
      : DefaultType
    : DefaultType
>;

// type P<
//   FullObject extends UnknownRecord,
//   ExceptObject extends Partial<FullObject>,
//   Leaf = false,
// > = EnforceOptional<{
//   [Key in
//     | keyof FullObject
//     | keyof ExceptObject]: FullObject[Key] extends UnknownRecord
//     ? ExceptObject[Key] extends Partial<FullObject[Key]>
//       ? // FullObject[Key]를 전부 구현 했을때
//         ExceptObject[Key] extends FullObject[Key]
//         ? never
//         : // 부분 구현 했을때
//           P<FullObject[Key], ExceptObject[Key], Leaf>
//       : FullObject[Key]
//     : ExceptObject[Key] extends FullObject[Key] | undefined
//     ? // Record가 아닌 키를 ExceptObject에서 가지고 있을때
//       never
//     : ExceptObject[Key] extends FullObject[Key] | undefined
//     ? never
//     : FullObject[Key];
// }>;
type ExceptForDeepComparison<
  FullObject extends UnknownRecord,
  ExceptObject extends Partial<FullObject> | PartialDeep<FullObject>,
  Leaf,
> = EnforceOptional<{
  [Key in keyof FullObject]: Key extends keyof ExceptObject
    ? Leaf extends false
      ? FullObject[Key] extends UnknownRecord
        ? ExceptObject[Key] extends FullObject[Key]
          ? never
          : ExceptObject[Key] extends PartialDeep<FullObject[Key]>
          ? ExceptForDeepComparison<FullObject[Key], ExceptObject[Key]>
          : never
        : never
      : never
    : FullObject[Key];
}>;
type DoExceptForDeepComparison<
  T extends UnknownRecord,
  Left = false,
> = ExceptForDeepComparison<T, {}, Left>;

type f123 = "A" | "B" | "C" extends "A" | "B" | "D" ? true : false; // false
type f125 = "A" | "B" | "C" extends "A" | "B" | "C" | "D" ? true : false; // true
type f126 = { a: number; b: { c: number } } extends {
  a: number;
  b: { c: number; d: number };
}
  ? true
  : false; // false
type f127 = { a: number; b: { c: number; d: number } } extends {
  a: number;
  b: { c: number };
}
  ? true
  : false; // true
// type f125 = "A" | "B" | "C" extends "A" | "B" | "C" | "D" ? true : false; // true
type f124 = { d4?: 30 } extends Partial<{
  d4: 30;
  v4?: [1, 2, 3];
  kr4: Map<string, string>;
}>
  ? true
  : false;

type tt2 = Except<test, "a">;

type ff8 = { a?: number; b: { zz?: string } } extends PartialDeep<{
  a: number;
  c: string;
  b: { zf: string; zz: string };
}>
  ? true
  : false;

type ff9 = { a?: number; b: { zz?: string } } extends Partial<{
  a: number;
  c: string;
  b: { zf: string; zz: string };
}>
  ? true
  : false;

type test = {
  a: {
    b2: {
      c3: { d4: 30; v4?: [1, 2, 3] };
      y3: string;
    };
  };
  aa: {
    bb: {
      cc: number;
    };
  };
  o: number[];
  k: Set<string>;
};
type test2 = {
  a: { b2: { c3: { d4?: 30 } } };
  aa: {
    bb: {
      cc?: number;
    };
  };
  o: number[];
};

type f = DoP<test>;
type f2 = P<test, test2>;
type f23 = P<test, test2, true>;

type pt = Partial<test>;

type FFF<T1 extends UnknownRecord, T2 extends PartialDeep<T1>> = T1 & T2;
type aasda = FFF<test, test>;

type kadsf = FFF<{ a: { c: 10 }; b: string }, { a: {} }>;

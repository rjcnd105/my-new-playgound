import { UnknownRecord } from "type-fest/source/internal";
import { MergeDeep, PartialDeep } from "type-fest";
import { ExceptForDeepComparison } from "../types/ExceptForDeepComparison";
import { deepMerge } from "../utils/recordUtils/deepMerge";
import { flow } from "fp-ts/function";

const target = Symbol("target");

export interface PartialDerived<
  A extends UnknownRecord = UnknownRecord,
  B extends PartialDeep<A> | {} = {},
> {
  readonly [target]: A;
  readonly derived: B;
}

type GetTarget<P> = P extends PartialDerived<infer A, {}> ? A : never;
type GetDerived<P> = P extends PartialDerived<{}, infer B> ? B : never;

type Do<T extends UnknownRecord> = PartialDerived<T, {}>;

export const Do = <A extends UnknownRecord>(): Do<A> => ({
  [target]: {} as A,
  derived: {},
});

export const of =
  <A extends UnknownRecord>() =>
  <B extends PartialDeep<A>>(partial: B): PartialDerived<A, B> => ({
    [target]: {} as A,
    derived: partial,
  });

export const changeDerived =
  <T extends UnknownRecord, A extends PartialDeep<T>>(
    partialDerived: PartialDerived<T, A>,
  ) =>
  <B extends PartialDeep<T>>(
    chainDerivedFn: (partialDerived: A) => B,
  ): PartialDerived<T, B> => ({
    [target]: partialDerived[target],
    derived: chainDerivedFn(partialDerived.derived),
  });

export const derive =
  <T extends UnknownRecord, A extends PartialDeep<T>>(
    partialImpl: PartialDerived<T, A>,
  ) =>
  <DA extends Partial<ExceptForDeepComparison<T, A, false>>>(except: DA) => ({
    [target]: partialImpl[target],
    derived: deepMerge(partialImpl.derived as MergeDeep<A, DA>, except),
  });

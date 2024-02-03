// import { type ExceptForDeepComparison } from "../types/ExceptForDeepComparison";
// import { type PartialDeepProps } from "../types/utilityTypes";
// import {
//   type DeepMerge,
//   deepMerge,
// } from "../utils/recordUtils/recordDeepMerge";
//
// export const target = Symbol.for("target");
//
// export interface PartialDerived<A, B extends PartialDeepProps<A> | {} = {}> {
//   readonly [target]: A;
//   readonly derived: B;
// }
//
// export type GetTarget<P> = P extends PartialDerived<infer A, {}> ? A : never;
// export type GetDerived<P> = P extends PartialDerived<unknown, infer B>
//   ? B
//   : never;
//
// type Do<T> = PartialDerived<T, {}>;
//
// // eslint-disable-next-line @typescript-eslint/no-redeclare,@typescript-eslint/no-unused-vars
// export const Do = <A>(): Do<A> => ({
//   [target]: {} as A,
//   derived: {},
// });
//
// export const of =
//   <A>() =>
//   <B extends PartialDeepProps<A>>(partial: B): PartialDerived<A, B> => ({
//     [target]: {} as A,
//     derived: partial,
//   });
//
// export const changeDerived =
//   <T, A extends PartialDeepProps<T>>(partialDerived: PartialDerived<T, A>) =>
//   <B extends PartialDeepProps<T>>(
//     chainDerivedFn: (partialDerived: A) => B
//   ): PartialDerived<T, B> => ({
//     [target]: partialDerived[target],
//     derived: chainDerivedFn(partialDerived.derived),
//   });
//
// export const derive =
//   <T, A extends PartialDeepProps<T>>(partialImpl: PartialDerived<T, A>) =>
//   <DA extends PartialDeepProps<ExceptForDeepComparison<T, A, false>>>(
//     except: DA
//   ) =>
//     ({
//       [target]: partialImpl[target],
//       derived: deepMerge(partialImpl.derived, except),
//     } as unknown as PartialDerived<T, DeepMerge<[A, DA]>>);

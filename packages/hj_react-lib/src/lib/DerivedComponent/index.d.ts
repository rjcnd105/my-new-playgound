import * as PartialDerived from "@hj/common-lib/src/lib/PartialDerived";
import { flow } from "fp-ts/lib/function";
import { MergeDeep, PartialDeep } from "type-fest";
import { ExceptForDeepComparison } from "@hj/common-lib/src/types/ExceptForDeepComparison";
import React, { ReactElement } from "react";
import { PartialDeepProps } from "@hj/common-lib/src/types/utilityTypes";
import {
  PropsDeepMerge,
  propsDeepMerge,
} from "../../utils/componentPropsMerge";

interface UnknownFn<P = {}> {
  (props: P): ReactElement<any, any> | null;
}

export interface DerivedFn<
  OriginProps,
  PartialProps extends PartialDeepProps<OriginProps>,
> extends PartialDerived.PartialDerived<OriginProps, PartialProps>,
    React.ExoticComponent<
      ExceptForDeepComparison<OriginProps, PartialProps, false>
    > {}

export const of =
  <P, _PP extends PartialDeepProps<P>>(
    origin: UnknownFn<P> | DerivedFn<P, _PP>,
  ) =>
  <PP extends PartialDeepProps<P>>(
    pd: PartialDerived.PartialDerived<P, PP>,
    displayName?: React.ForwardRefRenderFunction<unknown>["displayName"],
  ) => {
    const derivedFn = Object.assign({}, origin, pd, { displayName });
    return derivedFn as unknown as DerivedFn<P, PP>;
  };

export const fromOrigin = <P>(origin: UnknownFn<P>) =>
  flow(PartialDerived.of<P>(), of(origin));

export const derive =
  <OriginProps, DerivedProps extends PartialDeepProps<OriginProps>>(
    derivedComponent: DerivedFn<OriginProps, DerivedProps>,
  ) =>
  <
    PartialProps extends PartialDeepProps<
      ExceptForDeepComparison<OriginProps, DerivedProps, false>
    >,
    Leaf extends boolean = false,
  >(
    partialProps: PartialProps,
  ) => {
    const derived2Fn = Object.assign({}, derivedComponent, {
      derived: propsDeepMerge(derivedComponent.derived, partialProps),
    }) as DerivedFn<OriginProps, PropsDeepMerge<DerivedProps, PartialProps>>;
    return derived2Fn;
  };

export const changeDerived = <P, PP extends PartialDeepProps<P>>(
  derivedFn: DerivedFn<P, PP>,
) => flow(PartialDerived.changeDerived<P, PP>(derivedFn), of(derivedFn));

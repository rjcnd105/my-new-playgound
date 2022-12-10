import type { ComponentType } from "react";
import { Merge, PartialDeep } from "type-fest";
import { componentPropsMerge } from "./componentPropsMerge";

export function isNil(v: unknown): v is {} {
  return v === undefined || v === null;
}

// 부분적으로 props 적용
export const PartialProps =
  <A extends {}>(_Component: ComponentType<A>) =>
  <V extends PartialDeep<A>>(partialProps: V) => {
    const Component = (restProps: Omit<A, keyof V>) => {
      const totalArgs = componentPropsMerge(
        {},
        partialProps,
        restProps,
      ) as unknown as A;
      return <_Component {...totalArgs} />;
    };
    Component.displayName = _Component.displayName;

    return Component;
  };

// props를 받아 partial props를 반환하는 함수를 받아 props 합성
export const PartialApProps =
  <A extends {}>(_Component: ComponentType<A>) =>
  <OtherArgs, CalcArgs extends PartialDeep<A>>(
    makeArgsFn: (a: OtherArgs) => CalcArgs,
  ) => {
    const Component = (args: Merge<Omit<A, keyof CalcArgs>, OtherArgs>) => {
      const totalArgs = Object.assign(
        {},
        args,
        makeArgsFn(args),
      ) as unknown as A;
      return <_Component {...totalArgs} />;
    };
    Component.displayName = _Component.displayName;

    return Component;
  };

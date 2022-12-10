// object 값들의 타입을 추출
// M 에 N 타입 덮어쓰기
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type MapKeyOf<M> = M extends Map<infer K, unknown> ? K : never;
export type MapValueOf<M> = M extends Map<unknown, infer K> ? K : never;

// |를 &로
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type C<A> = { [K in keyof A]: A[K] };

export type Optional<A, B extends keyof A> = C<
  Omit<A, B> & { [K in B]?: A[K] }
>;

export type PartialRequired<A, B extends keyof A> = C<
  Omit<A, B> & { [K in B]: A[K] }
>;

// 첫번째 파라미터 추출
export type FirstParameter<T extends (...args: any) => any> = T extends (
  arg1: infer P,
) => any
  ? P extends {}
    ? P
    : never
  : never;

// Awaited + ReturnType
export type AwaitedReturn<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

type AnyFunction = (...args: any[]) => any;

export type MergeFirstParameter<
  M extends AnyFunction,
  N extends AnyFunction,
> = Merge<FirstParameter<M>, FirstParameter<N>>;

// 전체 필드 nullish 제외
export type RequiredNonNull<T> = Required<{
  [P in keyof T]: NonNullable<T[P]>;
}>;

// 부분적으로 필드 nullish 제외
export type PartialRequiredNotNull<A, B extends keyof A> = Omit<A, B> &
  Required<{
    [P in keyof A]: NonNullable<A[P]>;
  }>;

// Iterator 타입을 추출
export type IterValueOf<K> = K extends Iterator<infer T extends string>
  ? T
  : never;

type UnionToTuple<T> = (
  (T extends any ? (t: T) => T : never) extends infer U
    ? (U extends any ? (u: U) => any : never) extends (v: infer V) => any
      ? V
      : never
    : never
) extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

export type IterToTuple<I> = I extends Iterator<infer K> ? [...[K]] : never;

export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

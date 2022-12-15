export type Is<T1, T2> = [T1] extends [T2] ? true : false;
export type And<T1 extends boolean, T2 extends boolean> = T1 extends false
  ? false
  : T2;
export type Not<T extends boolean> = T extends true ? false : true;
export type IsNever<T> = Is<T, never>;
export type NotNever<T> = Not<IsNever<T>>;

export type IsRecord<T> = And<
  NotNever<T>,
  T extends Readonly<Record<PropertyKey, unknown>> ? true : false
>;
export type IsMap<T> = And<
  NotNever<T>,
  T extends Readonly<ReadonlyMap<unknown, unknown>> ? true : false
>;
export type IsArray<T> = And<
  NotNever<T>,
  T extends ReadonlyArray<unknown> ? true : false
>;
export type IsSet<T> = And<
  NotNever<T>,
  T extends Readonly<ReadonlySet<unknown>> ? true : false
>;
export type IsTuple<T extends ReadonlyArray<unknown>> = T extends readonly []
  ? true
  : T extends readonly [unknown, ...ReadonlyArray<unknown>]
  ? true
  : false;

export type HasKey<T, K> = keyof T extends K ? true : false;

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type ValueOfKey<
  T extends Record<PropertyKey, unknown>,
  K extends PropertyKey,
> = K extends keyof T ? T[K] : never;

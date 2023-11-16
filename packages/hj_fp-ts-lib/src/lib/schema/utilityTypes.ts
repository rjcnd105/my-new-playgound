import type { Schema } from "@effect/schema";
import type { FromOptionalKeys } from "@effect/schema/Schema";

type AllRecord = Record<PropertyKey, any>;

export type SchemaKeys<Fields> = {
  [K in keyof Fields]: Fields[K] extends Schema.Schema<any, any> ? K : never;
}[keyof Fields];

export type AllSchemaKeys<Fields> =
  | {
      [K in keyof Fields]: Fields[K] extends Schema.Schema<any, any>
        ? K
        : never;
    }[keyof Fields]
  | FromOptionalKeys<Fields>;

// TODO: 추후 ApiSpecFetcher에서 이 타입 유틸들로 대체
export type FromAllStruct<Fields extends AllRecord> = {
  readonly [K in Extract<keyof Fields, SchemaKeys<Fields>>]: Schema.Schema.From<
    Fields[K]
  >;
} & {
  readonly [K in FromOptionalKeys<Fields>]?: Schema.Schema.From<Fields[K]>;
} & {
  readonly [K in Exclude<keyof Fields, AllSchemaKeys<Fields>>]: Fields[K];
};

export type ToAllStruct<Fields extends AllRecord> = {
  readonly [K in Extract<keyof Fields, SchemaKeys<Fields>>]: Schema.Schema.From<
    Fields[K]
  >;
} & {
  readonly [K in FromOptionalKeys<Fields>]?: Schema.Schema.From<Fields[K]>;
} & {
  readonly [K in Exclude<keyof Fields, AllSchemaKeys<Fields>>]: Fields[K];
};

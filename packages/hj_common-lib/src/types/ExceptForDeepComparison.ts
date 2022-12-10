import { UnknownRecord } from "type-fest/source/internal";
import { PartialDeep } from "type-fest";
import { OmitNever } from "./utilityTypes";
import { EnforceOptional } from "type-fest/source/enforce-optional";

export type ExceptForDeepComparison<
  FullObject extends UnknownRecord,
  ExceptObject extends Partial<FullObject> | PartialDeep<FullObject>,
  Leaf,
> = EnforceOptional<
  OmitNever<{
    [Key in keyof FullObject]: Key extends keyof ExceptObject
      ? Leaf extends false
        ? FullObject[Key] extends UnknownRecord
          ? ExceptObject[Key] extends FullObject[Key]
            ? never
            : ExceptObject[Key] extends PartialDeep<FullObject[Key]>
            ? ExceptForDeepComparison<FullObject[Key], ExceptObject[Key], Leaf>
            : never
          : never
        : never
      : FullObject[Key];
  }>
>;

export type DoExceptForDeepComparison<
  T extends UnknownRecord,
  Left = false,
> = ExceptForDeepComparison<T, {}, Left>;

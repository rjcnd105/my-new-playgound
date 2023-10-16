import * as S from "@fp-ts/schema";
import * as AST from "@fp-ts/schema/AST";
import * as E from "@fp-ts/core/Either";
import { alt } from "@hj/fp-ts-lib/src/lib/fp-ts/Either/alt";
import { pipe } from "@fp-ts/core/Function";
import { thousandsSeparators } from "@hj/common-lib/src/utils/numUtils";
import { getAnnotation } from "@fp-ts/schema/AST";

const key = S.string;

S.decode(key)("hello"); /*?*/ // Right("hello")

const userKey = S.literal("user");

const itemKey = S.literal("item");
const keySeparator = S.literal(":");

const myKey = S.templateLiteral(
  userKey,
  S.string,
  keySeparator,
  itemKey,
  S.string,
);

const _d1 = S.decode(myKey)("user:hello"); /*?*/ // Left([{_tag: Type, actual: 'user:hello', expected: ...}])
const _d2 = S.decode(myKey)("user147:item238"); /*?*/ // Right({_tag: Type, actual: 'user:hello', expected: ...})

if (E.isRight(_d2)) _d2.right; /*?*/ // 'user147:item238'

const _dd1 = E.orElseFail(() => ({ message: "dd" }))(_d1); /*?*/
const _dd11 = alt({ message: "dd" })(_d1); /*?*/

const mySchema = S.struct({
  name: pipe(
    S.string,
    S.minLength(3),
    S.maxLength(7, {
      identifier: "tooLong",
      message: () => "too long",
    }),
  ),
  age: pipe(
    S.number,
    S.greaterThan(0, {
      identifier: "tooYoung",
      message: () => "too young",
    }),
  ),
  amount: pipe(
    S.string,
    S.transform(
      S.number,
      (str) => Number.parseInt(str),
      (num) => num.toString(),
    ),
    S.filter((n) => !Number.isNaN(n), {
      identifier: "transform failed",
      message: () => "transform failed",
    }),
    // S.({
    //   identifier: "notFinite",
    //   message: () => "not finite",
    // }),
  ),
});

S.decode(mySchema)({ name: "hello", age: 10 }); /*?*/ // Right({name: 'hello', age: 10})
S.decode(mySchema)({ name: "hello2", age: -3 }); /*?*/ // Left
S.decode(mySchema)({ name: "hello4", age: 17, amount: "백원" }); /*?*/ // Left
S.decode(mySchema)({ name: "hello3", age: 14, amount: "2414" }); /*?*/

S.keyof(mySchema); /*?*/

mySchema; /*?*/
mySchema.ast; /*?*/

const amountTransformDecode = (str: string): number => {
  return Number.parseInt(str.replaceAll(",", ""));
};
const amountTransformEncode = thousandsSeparators;

export const nameSchema = pipe(
  S.string,
  S.minLength(0, {
    identifier: "최소글자수미달",
    message: () => "항목의 이름을 입력해줘",
  }),
  S.maxLength(8, {
    identifier: "최대글자수초과",
    message: () => "항목은 8자까지 입력 가능해",
  }),
);

export const amountSchema = pipe(
  S.string,
  S.transform(S.number, amountTransformDecode, amountTransformEncode),
  S.filter((n) => Number.isSafeInteger(n), {
    identifier: "올바른형식아님",
    message: () => "금액이 올바른 형식이 아니야",
  }),
  S.greaterThan(0, {
    identifier: "최소금액미달",
    message: () => "금액이 -가 될 수는 없어",
  }),
  S.lessThan(10000000000, {
    identifier: "최대금액초과",
    message: () => "금액은 10억원 이하로 입력해줘",
  }),
);

S.decode(amountSchema)("14,23"); /*?*/

// 리터럴에 재구성된 스키마를 넣으면 안됌.
// export const payItemSeparator = pipe(
//   S.templateLiteral(nameSchema, S.literal("/"), amountSchema),
// );

// S.decode(payItemSeparator)("안녕/142323"); /*?*/

export const payerSchema = pipe(
  S.array(S.string),
  S.filter((v) => v.length <= 10, {
    identifier: "최대인원초과",
    message: () => "10명까지만 가능해",
  }),
  S.filter((v) => v.length > 0, {
    identifier: "최소인원미달",
    message: () => "최소 1명은 있어야 해",
  }),
);

import * as S from "@fp-ts/schema";
import * as E from "@fp-ts/core/Either";
import { alt } from "@hj/fp-ts-lib/src/lib/Either/alt";
import { pipe } from "@fp-ts/core/Function";

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

mySchema; /*?*/

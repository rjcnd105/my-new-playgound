import { pipe } from "@effect/data/Function";
import * as S from "@effect/schema/Schema";
import { transform } from "@effect/schema/Schema";
import z from "zod";

const zz = z.object({
  id: z.string().refine((a) => a === "dd"),
});

const a = pipe(
  S.struct({
    id: pipe(
      S.string,
      transform(
        S.number,
        (a) => a.length,
        (s) => `${s}`
      ),
      S.description("id")
    ),
  }),
  S.filter((a) => a.id > 2),
  S.message(() => "hihi")
);

const shape = S.getPropertySignatures(a);

const f = S.decode(shape.id)("aaa"); /*?*/

const b = pipe(S.string, S.brand("dd"));

S.encode(shape.id)(20); /*?*/

S.decode(a)({
  id: "ssss",
}); /*?*/

a.A; /*?*/
b.A; /*?*/
a.ast; /*?*/
const getProperty = <A, K extends keyof A>(
  s: S.Schema<A>,
  name: { [key in keyof A]: Schema<A[key]> }[K]
): {} => {
  if (s.ast._tag === "Refinement") {
  }
  if (s.ast._tag === "TypeLiteral") {
    return S.make(s.ast.propertySignatures[name]);
  }
  throw Error("Not a TypeLiteral");
};

getProperty(a); /*?*/

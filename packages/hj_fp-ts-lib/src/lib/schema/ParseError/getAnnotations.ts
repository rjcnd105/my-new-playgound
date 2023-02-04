import * as S from "@fp-ts/schema";
import * as AST from "@fp-ts/schema/AST";
import * as PR from "@fp-ts/schema/ParseResult";
import * as O from "@fp-ts/core/Option";
import { pipe } from "@fp-ts/core/Function";
import {
  CustomId,
  DescriptionId,
  DocumentationId,
  ExamplesId,
  IdentifierId,
  JSONSchemaId,
  Message,
  MessageId,
  TitleId,
} from "@fp-ts/schema/annotation/AST";
import { AnnotationOptions } from "@fp-ts/schema/Schema";
import { LazyArg } from "@fp-ts/core/src/Function";

const getMessage = AST.getAnnotation<LazyArg<string>>(MessageId);
const getTitle = AST.getAnnotation(TitleId);
const getIdentifier = AST.getAnnotation(IdentifierId);
const getDescription = AST.getAnnotation(DescriptionId);
const getJSONSchema = AST.getAnnotation(JSONSchemaId);
const getExamples = AST.getAnnotation(ExamplesId);
const getDocumentation = AST.getAnnotation(DocumentationId);
const getCustom = AST.getAnnotation(CustomId);

const getExpected = (ast: AST.Annotated) =>
  pipe(
    getIdentifier(ast),
    O.catchAll(() => getTitle(ast)),
    O.catchAll(() => getDescription(ast)),
  );

const annotationFns: Record<
  keyof AnnotationOptions<unknown>,
  (annotated: AST.Annotated) => O.Option<unknown>
> = {
  message: getMessage,
  title: getTitle,
  identifier: getIdentifier,
  description: getDescription,
  jsonSchema: getJSONSchema,
  examples: getExamples,
  documentation: getDocumentation,
  custom: getCustom,
};

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

const d = S.decode(nameSchema)("123456789"); /*?*/
// if (PR.isFailure(d)) getAnnotation(MessageId)(d.left[0]?.expected); /*?*/
// if (PR.isFailure(d)) getAnnotation(IdentifierId)(d.left[0]?.expected); /*?*/

const getPRFirstAnnotationOrElse =
  <A extends AnnotationOptions<unknown>>(elseAnnotation: A) =>
  <R>(r: PR.ParseResult<R>) => {
    return PR.isFailure(r)
      ? getAnnotationOrElse(elseAnnotation)(r.left[0])
      : r.right;
  };

const getAnnotationOrElse =
  <A extends AnnotationOptions<unknown>>(elseAnnotation: A) =>
  (e: PR.ParseError) => {
    switch (e._tag) {
      case "Missing":
      case "Index":
      case "Unexpected":
        return elseAnnotation;
      case "Key":
      case "UnionMember":
        return e.errors[0]._tag === "Type"
          ? { ...elseAnnotation, ...e.errors[0].expected.annotations }
          : elseAnnotation;
      case "Type": {
        return {
          ...elseAnnotation,
        };
      }
    }
  };
getPRFirstAnnotationOrElse({ identifier: "default", message: () => "" })(
  d,
); /*?*/

export const getErrorToMessageOrElse =
  (defaultMessage: LazyArg<string>) => (e: PR.ParseError) => {
    switch (e._tag) {
      case "Missing":
      case "Index":
      case "Unexpected":
        return defaultMessage;
      case "Key":
      case "UnionMember": {
        for (const error of e.errors) {
          if (error._tag === "Type") {
            return pipe(
              getMessage(error.expected),
              O.getOrElse(() => defaultMessage),
            );
          }
        }
        return defaultMessage;
      }
      case "Type": {
        return pipe(
          getMessage(e.expected),
          O.getOrElse(() => defaultMessage),
        );
      }
    }
  };

export const getFirstErrorMessageOrElse =
  (defaultMessage: LazyArg<string>) =>
  <A>(r: PR.ParseResult<A>) =>
    S.isFailure(r)
      ? getErrorToMessageOrElse(defaultMessage)(r.left[0])()
      : null;

if (S.isFailure(d)) getErrorToMessageOrElse(() => "default")(d.left[0])(); /*?*/
//
// export const getAnnotationsOrElse =
//   <A extends AnnotationOptions<unknown>>(elseAnnotation: A) =>
//   (e: PR.ParseError) => {
//     switch (e._tag) {
//       case "Missing":
//       case "Index":
//       case "Unexpected":
//         return elseAnnotation;
//       case "Key":
//       case "UnionMember": {
//         for (const error of e.errors) {
//           if (error._tag === "Type") {
//             return { ...elseAnnotation, ...error.expected.annotations };
//           }
//         }
//       }
//       case "Type": {
//         return {
//           ...elseAnnotation,
//         };
//       }
//     }
//   };

// function errorToAnnotation(error: PR.ParseError) {
//   switch (error._tag) {
//     case "Missing":
//       break;
//     case "Index":
//       getAnnotation(error._tag);
//       break;
//   }
//   return {
//     path: error.path,
//     message: error.message,
//   };
// }

// const getAnnotations = (
//   errors: readonly [PR.ParseError, ...PR.ParseError[]],
// ) => {
//   errors.map((error) => {
//     return error._tag;
//   });
// };

export default getAnnotations;

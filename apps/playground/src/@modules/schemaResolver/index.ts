import * as E from '@effect/data/Either'
import { apply, pipe } from '@effect/data/Function'
import * as O from '@effect/data/Option'
import * as A from '@effect/data/ReadonlyArray'
import * as RR from '@effect/data/ReadonlyRecord'
import * as Match from '@effect/match'
import * as AST from '@effect/schema/AST'
import type * as ParseResult from '@effect/schema/ParseResult'
import * as Schema from '@effect/schema/Schema'

type Entry = [
  string,
  {
    readonly message: string
  },
]

const getMessage = AST.getAnnotation<AST.MessageAnnotation<unknown>>(AST.MessageAnnotationId)
// const getExamples = AST.getAnnotation<AST.ExamplesAnnotation>(AST.MessageAnnotationId)

const buildError = (error: ParseResult.ParseErrors, path = [] as string[]): Array<Entry> =>
  pipe(
    Match.value(error),
    Match.tag('Key', (e) =>
      A.flatMap(e.errors, (err) => buildError(err, A.append(path, String(e.key)))),
    ),
    Match.tag('Index', (e) =>
      A.flatMap(e.errors, (err) => buildError(err, A.append(path, String(e.index)))),
    ),
    Match.tag('UnionMember', (e) => A.flatMap(e.errors, (err) => buildError(err, path))),
    Match.tag('Type', (err) => [
      [
        A.join(path, '.'),
        {
          message: pipe(
            err.message,
            O.orElse(() => O.map(getMessage(err.expected), apply(err.actual))),
            // // Example Annotation 제외
            // O.orElse(() =>
            //   pipe(
            //     getExamples(err.expected),
            //     O.filter(A.every(Predicate.isString)),
            //     O.map(A.join(', ')),
            //   ),
            // ),
            O.getOrElse(() => `Unexpected value: ${err.actual}`),
          ),
        },
      ] as Entry,
    ]),
    Match.tag('Missing', (err) => [[A.join(path, '.'), { message: 'Missing' }] as Entry]),
    Match.tag('Forbidden', (err) => [[A.join(path, '.'), { message: 'Forbidden' }] as Entry]),
    Match.tag('Unexpected', (err) => [
      [A.join(path, '.'), { message: `Unexpected value: ${err.actual}` }] as Entry,
    ]),
    Match.exhaustive,
  )

export const schemaResolver =
  <I, A>(schema: Schema.Schema<I, A>) =>
  (data: I, _context: any) =>
    pipe(
      Schema.decodeEither(schema)(data, { errors: 'all' }),
      E.match({
        onLeft: ({ errors }) => {
          return {
            values: {},
            errors: RR.fromEntries(A.flatMap(errors, (err) => buildError(err))),
          }
        },
        onRight: (values) => ({ values, errors: {} }),
      }),
    )

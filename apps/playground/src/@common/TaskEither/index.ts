import * as Either from '@effect/data/Either'
import { isLeft } from '@effect/data/Either'

/**
 * TaskEither 일부분 구현
 * 개념 - https://medium.com/@miclau2004/using-taskeither-with-fp-ts-in-your-typescript-code-part-1-78ef5f948779
 */

export type TaskEither<L, R> = Promise<Either.Either<L, R>>

export const fromPromise = <E, R>(promise: Promise<R>): TaskEither<E, R> =>
  promise.then((data) => Either.right(data)).catch(Either.left)

export const map =
  <L, R, R2>(f: (r: R) => R2) =>
  (taskEither: TaskEither<L, R>): TaskEither<L, R2> =>
    taskEither.then((r) => Either.map(f)(r))

export const getOrThrow = <L, R>(taskEither: TaskEither<L, R>) =>
  taskEither.then((r) => {
    if (isLeft(r)) throw r.left
    return r.right
  })

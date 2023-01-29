import * as E from "@fp-ts/core/Either";

export const alt =
  <E2>(e2: E2) =>
  <E, A>(e: E.Either<E, A>): E.Either<E2, A> =>
    E.isLeft(e) ? E.left(e2) : e;

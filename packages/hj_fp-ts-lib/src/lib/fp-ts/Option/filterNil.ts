import * as O from "@fp-ts/core/Option";
import { pipe } from "@fp-ts/core/Function";

export const filterNil = <A>(o: O.Option<A>): O.Option<NonNullable<A>> =>
  pipe(
    o,
    O.filter((a): a is NonNullable<A> => a !== null && a !== undefined),
  );

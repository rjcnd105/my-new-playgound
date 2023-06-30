import { pipe } from "@effect/data/Function";
import * as Either from "@effect/data/Either";
import * as Effect from "@effect/io/Effect";
import * as Schema from "@effect/schema/Schema";
import * as Layer from "@effect/io/Layer";
import * as Context from "@effect/data/Context";

const id = "97459c0045f373f4eaf126998d8f65dc";

/*
 * Here, we use Effect.attemptCatchPromise to wrap a Promise-returning function
 * into an Effect
 *
 * The first argument is a callback that returns the Promise to wrap.
 *
 * The second is a callback that returns a value to put in the error channel
 * (E in Effect<R, E, A>) in case the Promise throws an exception.
 */
const fetchGist = (id: string) =>
  Effect.tryCatchPromise(
    () => fetch(`https://api.github.com/gists/${id}`),
    () => "fetch" as const,
  ); // Effect.Effect<never, "fetch", Response> 

const getJson = (res: Response) =>
  Effect.tryCatchPromise(
    () => res.json() as Promise<unknown>, // Promise<any> otherwise
    () => "json" as const,
  ); // Effect.Effect<never, "json", unknown>

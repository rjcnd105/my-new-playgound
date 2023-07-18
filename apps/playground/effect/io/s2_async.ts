import * as Context from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import * as Layer from "@effect/io/Layer";
import * as Schema from "@effect/schema/Schema";

const id = "97459c0045f373f4eaf126998d8f65dc";

/*
 * tryPromise
 * promise를 통해 effect를 만든다.
 * */
const fetchGist = (id: string) =>
  Effect.tryPromise({
    try: () => fetch(`https://api.github.com/gists/${id}`),
    catch: () => "fetch" as const,
  });
// -> Effect.Effect<never, "fetch", Response>

const getJson = (res: Response) =>
  Effect.tryPromise({
    try: () => res.json() as Promise<unknown>, // Promise<any> otherwise
    catch: () => "json" as const,
  });
// -> Effect.Effect<never, "json", unknown>

const GistSchema = Schema.struct({
  url: Schema.string,
  files: Schema.record(
    Schema.string,
    Schema.struct({
      filename: Schema.string,
      type: Schema.string,
      language: Schema.string,
      raw_url: Schema.string,
    }),
  ),
});

type Gist = Schema.To<typeof GistSchema>;

await fetchGist(id); /*?*/

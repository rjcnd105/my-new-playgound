// The second main type of code you can find in the wild is callback based
import * as fs from "node:fs"; /*?*/

import * as Context from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import * as Layer from "@effect/io/Layer";
import * as Schema from "@effect/schema/Schema";
import { parseEither } from "@effect/schema/Schema";

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

const getAndParseGist = pipe(
  fetchGist(id),
  // Effect.Effect<never, 'fetch', Response>

  // fp-ts를 알던 사람이면 flatMap은 기존의 chain과 비슷하다고 생각하면 된다.
  // Effect.Effect<never, 'fetch' | 'json', unknown>
  Effect.flatMap(getJson),

  // Effect.Effect<never, 'fetch' | 'json' | DecodeError, Gist>
  Effect.flatMap(Schema.parseEither(GistSchema)),
);

Effect.runPromise(getAndParseGist)
  .then((x) => console.log("decoded gist %o", x))
  .catch((err) => console.error(err));

/*
 * async
 * 콜백 함수를 넘기는 경우를 Effect로 감쌀 수 있습니다.
 * */
export const readFileEffect = (path: fs.PathOrFileDescriptor) =>
  Effect.async<never, NodeJS.ErrnoException, Buffer>((resume) =>
    fs.readFile(path, (error, data) => {
      if (error) {
        resume(Effect.fail(error));
      } else {
        resume(Effect.succeed(data));
      }
    }),
  );

/*
 * asyncInterrupt
 * async에서 Interrupt를 발생시킬 수 있습니다.
 * */
export const readFileEffectInterrupt = (path: fs.PathOrFileDescriptor) =>
  Effect.asyncInterrupt<never, NodeJS.ErrnoException, Buffer>((resume) => {
    const controller = new AbortController();

    fs.readFile(path, { signal: controller.signal }, (error, data) => {
      if (error) {
        resume(Effect.fail(error));
      } else {
        resume(Effect.succeed(data));
      }
    });

    // AbourtController의 abort는 가져오기 요청, 응답 본문, 또는 스트림의 사용을 중단시킵니다.
    return Effect.sync(() => controller.abort());
  });

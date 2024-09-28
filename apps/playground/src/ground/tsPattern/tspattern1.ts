import { match, P } from "ts-pattern";

type Data =
  | { type: "deep"; deepType: any }
  | { type: "text"; content: string }
  | { type: "img"; src: string };

type Result = { type: "ok"; data: Data } | { type: "error"; error: Error };

const result = {
  type: "ok",
  data: {
    type: "img",
    src: "https://remix.run",
    deepType: {
      category: "02",
    },
  },
} as Result;

const html = match(result)
  .with({ type: "error" }, () => "error")
  .with({ type: "ok", data: { type: "text" } }, (res) => "fok")
  .with(
    { type: "ok", data: { deepType: { category: "01" } } },
    (src) => `category 01!`,
  )
  .with(
    { type: "ok", data: { type: "img", src: P.select() } },
    (src) => `image src: ${src}`,
  )
  .exhaustive(); /*?*/

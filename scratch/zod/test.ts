import * as z from "zod";
import {ZodNullable, ZodOptional} from "zod";

const d = z.object({
  hihi: z.string().nullish(),
  d: z.number(),
  z: z.array(z.string()),
  as: z.number()
});

function makeNullish<
  Schema extends z.AnyZodObject,
  K extends keyof Schema["shape"]
>(schema: Schema, keys: K[] = []) {
  const nullishKeySet = new Set<K>(keys);
  const entries = Object.entries(schema.shape) as [
    keyof Schema["shape"],
    Schema["shape"][keyof Schema["shape"]]
  ][];

  const nullishSchema = entries.reduce((acc, [key, shape]) => {
    if (nullishKeySet.has(key as K)) {
      acc[key] = shape.nullish();
    } else {
      acc[key] = shape;
    }

    return acc;
  }, {} as { [key in keyof Schema["shape"]]: key extends K ? ZodOptional<ZodNullable<Schema["shape"][key]>> : Schema["shape"][key] });

  return z.object(nullishSchema);
}

const f = makeNullish(d, [
  "z",
  "as"
]); 
 
type E = z.infer<typeof f>;

const a: E = {
  z: null,
  as: null
}




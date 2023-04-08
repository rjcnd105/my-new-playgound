import type {CookieSerializeOptions} from "cookie";
import {serialize} from "cookie";
import type {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import type {ReadonlyRequestCookies} from "next/dist/server/app-render";
import type {z} from "zod";

// JSON Parseable 타입
type Literal = string | number | boolean | null;
type Json = Literal | { [key: string]: Json } | Json[];

// Zod를 활용한 Json Parsed Typesafe Cookie
export const cookieSchema = <T extends Json>(
    schema: z.ZodType<T>,
    name: string
) => ({ 
    schema, 
    name,
    setCookie(value: T, options?: CookieSerializeOptions) {
        return {
            "Set-Cookie": serialize(name, JSON.stringify(value), options),
        };
    },
    getCookie(res: RequestCookies | ReadonlyRequestCookies) {
        const rawValue = res.get(name);

        // header cookie에 해당하는 값이 없을 경우 Error
        if (!rawValue) throw Error(name + ": No Cookie");

        return schema.parse(JSON.parse(rawValue.value));
    },
});

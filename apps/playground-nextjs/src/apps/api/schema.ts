import {isBoolean} from "@effect/data/Boolean";
import {z} from "zod";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies.js";

export interface CookieSerializeOptions {
    domain?: string | undefined; 

    encode?(value: string): string; 

    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    maxAge?: number | undefined;
    path?: string | undefined;
    priority?: 'low' | 'medium' | 'high' | undefined;
    sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean | undefined;
}


export const {
    getCookie: getTokenCookie,
    parseCookie: parseTokenCookie,
    schema: tokenSchema,
} = cookieSchema(z.object({__token: z.string()}), "token");


// JSON Parseable 타입
type Literal = string | number | boolean | null;
type Json = Literal | { [key: string]: Json } | Json[];

// Zod를 활용한 Json Parsed Typesafe Cookie
export function cookieSchema<T extends Json>(
    schema: z.ZodType<T>,
    name: string
) {
    return ({
        schema,
        name,
        parseCookie(value: T, options?: CookieSerializeOptions) {
            return (
                `${name}=${JSON.stringify(value)}; ${
                    options ? cookieOptionParser(options) : ""
                }` + " Path=/;"
            );
        },
        getCookie(cookieStore: ReadonlyRequestCookies) {
            const rawValue = cookieStore.get(name);

            // header cookie에 해당하는 값이 없을 경우 Error
            if (!rawValue) throw Error(name + ": No Cookie");

            return schema.parse(JSON.parse(rawValue.value));
        },
    })
};

function cookieOptionParser(options: CookieSerializeOptions) {
    let parsedOptions = "";

    for (const _key in options) {
        const key = _key as keyof CookieSerializeOptions;
        parsedOptions +=
            (isBoolean(options[key]) ? `${key}` : `${key}=${options[key]}`) + "; ";
    }

    return parsedOptions;
}

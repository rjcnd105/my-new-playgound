import { hasProperty } from 'effect/Predicate'
import type { Simplify } from 'effect/Types'
import * as v from 'valibot'

import type { RemoveNever } from '@/utils/types.ts'

import type { ParserUnify } from '../Codec/Parser'
import type { PathToPathParamsKeys } from './pathParams'

export type InputBase = Record<string, unknown>
export type OutputBase = unknown

const tagName = 'ApiSpec' as const

export const httpMethodSchema = v.enum_({
  GET: 'GET',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const)

export type HttpMethod = v.Input<typeof httpMethodSchema>

export interface ApiSpecDataParams {
  name: string
  path: string
  method: HttpMethod

  paramsParser?: ParserUnify<any, any>
  dataParser?: ParserUnify<any, any>
  responseDataParser?: ParserUnify<any, any>
}

/**
 * Spec을 parser로 부터 타입 추론없이 타입을 주입할때 사용
 */
export interface ApiSpecTypeParams {
  data?: InputBase
  params?: InputBase
  responseData?: OutputBase
}

const hasHttpMethod = (val: unknown): val is HttpMethod => {
  return (
    hasProperty(val, 'method') &&
    v.safeParse(httpMethodSchema, val.method).success
  )
}

const hasPath = hasProperty('path')

function isApiSpecData(a: unknown): a is ApiSpecDataParams {
  return hasPath(a) && hasHttpMethod(a)
}

export type ApiSpec<
  SpecTypeT extends ApiSpecTypeParams = ApiSpecTypeParams,
  SpecDataT extends ApiSpecDataParams = ApiSpecDataParams,
> = Simplify<
  SpecTypeT &
    SpecDataT & {
      readonly _tag: 'ApiSpec'
    }
>

/**
 * ApiSpec helper types
 */
export declare module ApiSpec {
  // 헬퍼 타입들은 직접 넣은 타입과 parser 기반으로 타입 추론, 둘 다 있는 경우 parser가 우선순위가 더 높음

  // request inputs
  export type Request<ApiSpecT extends ApiSpec> = RemoveNever<{
    data: ApiSpec.RequestData<ApiSpecT>
    params: ApiSpec.Params<ApiSpecT>
    pathParams: ApiSpec.PathParams<ApiSpecT>
  }>

  export type Params<T extends ApiSpec> = T extends {
    paramsParser(a: infer In): unknown
  }
    ? In
    : T extends { params: infer ParamsT }
      ? ParamsT
      : never

  export type RequestData<T extends ApiSpec> = T extends {
    dataParser(a: infer In): unknown
  }
    ? In
    : T extends { data: infer Data }
      ? Data
      : never

  export type PathParams<T extends ApiSpec> =
    PathToPathParamsKeys<T['path']> extends never
      ? never
      : { [K in PathToPathParamsKeys<T['path']>]: { toString(): string } }

  // response output
  export type ResponseData<T extends ApiSpec> = T extends {
    responseDataParser(a: unknown): infer Out
  }
    ? Out
    : T extends { responseData: infer Data }
      ? Data
      : never
}

export function apiSpec<const Data extends ApiSpecDataParams>(
  data: Data,
): ApiSpec<{}, Data>

export function apiSpec<const Type extends ApiSpecTypeParams>(): <
  const Data extends ApiSpecDataParams,
>(
  data: Data,
) => ApiSpec<Type, Data>

/**
 * 타입, parser 기반으로 하는 Api의 Spec을 만든다.
 */
export function apiSpec<const A extends ApiSpecTypeParams | ApiSpecDataParams>(
  data?: A,
) {
  if (isApiSpecData(data)) {
    return Object.assign(data, { _tag: tagName }) as unknown as ApiSpec<
      {},
      typeof data
    >
  }
  return <const Data extends ApiSpecDataParams>(a: Data) =>
    // @ts-ignore
    Object.assign(a, { _tag: tagName }) as ApiSpec<A, Data>
}

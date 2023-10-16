import type * as S from '@effect/schema/Schema'
import type { Schema } from '@effect/schema/Schema'
import type { Merge, Simplify } from 'type-fest'

import type { Method } from ':/@common/http/index.ts'
import type { MakePathParamsFromPath } from ':/@common/pathParams'

export interface InputApiRoute {
  path: string
  method: Method
  data?: S.Schema<any>
  params?: S.Schema<any>
  responseData?: S.Schema<any>
  headers?: HeadersInit
}

export interface InputApiRouteWithPathParams extends InputApiRoute {
  pathParams?: unknown
}
export type ApiRoute<T extends InputApiRouteWithPathParams = InputApiRouteWithPathParams> = Merge<
  T,
  MakePathParamsFromPath<T['path']>
>

// ApiRoute의 키 값들 추출, Schema일 경우 Schema To 타입 추출
export type ApiRouteAdapterOut<
  T extends ApiRoute<InputApiRouteWithPathParams>,
  PickKeysT extends keyof T = keyof T,
> = Simplify<{
  [K in PickKeysT as T[K] extends NonNullable<unknown> ? K : never]: T[K] extends S.Schema<
    any,
    infer Out
  >
    ? Out
    : T[K]
}>

// ApiRoute의 키 값들 추출, Schema일 경우 Schema To 타입 추출
export type ApiRouteAdapterInput<
  T extends InputApiRoute,
  PickKeysT extends keyof T = keyof T,
> = Simplify<{
  [K in PickKeysT as T[K] extends NonNullable<unknown> ? K : never]: T[K] extends S.Schema<
    infer In,
    any
  >
    ? In
    : T[K]
}>

// apiRoute에서의 ResponseData Output 타입 추출
// 서버로부터 받은 데이터가 parse 된 후의 값
export type ApiRouteOutput<T extends Pick<InputApiRoute, 'responseData'>> =
  T['responseData'] extends Schema<unknown> ? S.Schema.To<T['responseData']> : never

// 서버로 요청할 params 타입 추출
// parse 되기 전의 값
export type ApiRouteInputParams<T extends Pick<InputApiRoute, 'params'>> =
  T['params'] extends Schema<unknown> ? S.Schema.From<T['params']> : never

// 서버로 요청할 data 타입 추출
// parse 되기 전의 값
export type ApiRouteInputData<T extends Pick<InputApiRoute, 'data'>> =
  T['data'] extends Schema<unknown> ? S.Schema.From<T['data']> : never

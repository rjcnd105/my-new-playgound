import type { Simplify } from '@effect/data/Types'

import type {
  ServerErrorResponseData,
  ServerSuccessResponseData,
} from ':/@common/http/response/ServerResponseData.ts'
import { API_RESPONSE_ERROR, API_RESPONSE_SUCCESS } from ':/@common/http/response/types.ts'
import type { RESULT_TYPES, ResultError, ResultSuccess } from ':/@common/result'
/* 서버에서 받아서 클라이언트로 해석한 Response */

export interface ApiSuccessResponse<T> extends ResultSuccess {
  data: ServerSuccessResponseData<T>['data']
  code: ServerSuccessResponseData<T>['code'] | null
  message: ServerSuccessResponseData<T>['message']
  type: RESULT_TYPES['API_RESPONSE_SUCCESS']
  statusCode: number
}

export interface ApiErrorResponse extends ResultError {
  data: ServerErrorResponseData['data']
  message: ServerErrorResponseData['message']
  code: ServerErrorResponseData['code'] | null
  type: RESULT_TYPES['API_RESPONSE_ERROR']
  statusCode: number | null
}

//
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export const isSuccessResponse = <T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> =>
  response.type === API_RESPONSE_SUCCESS
export const isErrorResponse = <T>(response: ApiResponse<T>): response is ApiErrorResponse =>
  response.type === API_RESPONSE_ERROR

export const apiSuccessResponse = <T>(
  res: ApiSuccessResponse<T>,
): Simplify<ApiSuccessResponse<T>> => res
export const apiErrorResponse = <T extends ApiErrorResponse>(res: T) => res

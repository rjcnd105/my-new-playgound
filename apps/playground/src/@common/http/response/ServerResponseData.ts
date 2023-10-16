import type { ErrorMessage } from './types'
import type { ErrorCode } from './types'

/* 서버에서 오는 Response Data */

export interface ServerSuccessResponseData<T> {
  data: T
  code: null
  message: null
}

export interface ServerErrorResponseData {
  data: null
  code: ErrorCode
  message: ErrorMessage
}

export type ServerResponseData<T> = ServerSuccessResponseData<T> | ServerErrorResponseData

export const isServerSuccessResponseData = <T>(
  response: ServerResponseData<T>,
): response is ServerSuccessResponseData<T> => response.code === null

export const isServerErrorResponseData = <T>(
  response: ServerResponseData<T>,
): response is ServerErrorResponseData => !isServerSuccessResponseData(response)

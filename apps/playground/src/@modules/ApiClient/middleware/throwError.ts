import { AxiosError } from 'axios'

import { apiErrorResponse } from ':/@common/http/response/ApiResponse.ts'
import type { ServerErrorResponseData } from ':/@common/http/response/ServerResponseData.ts'
import { API_RESPONSE_ERROR } from ':/@common/http/response/types.ts'
import { UNKNOWN_ERROR_TYPE } from ':/@common/result/resultTypes.ts'
import { resultError } from ':/@common/result/utils'

export const throwError = (e: AxiosError) => {
  console.debug('fetch Error', e)

  if (e instanceof AxiosError) {
    const error = e as AxiosError<ServerErrorResponseData>

    // 서버측에서의 response가 있을 시
    if (error.response) {
      throw apiErrorResponse({
        data: null,
        code: error.response.data.code,
        message: error.response.data.message,
        type: API_RESPONSE_ERROR,
        statusCode: error.status ?? null,
        err: e,
      })
    }
    throw apiErrorResponse({
      data: null,
      code: error.code ?? null,
      message: '서버측에서 응답을 받지 못한 에러입니다.',
      type: API_RESPONSE_ERROR,
      statusCode: error.status ?? null,
      err: e,
    })
  }

  throw resultError({
    type: UNKNOWN_ERROR_TYPE,
    code: null,
    message: null,
    err: e,
  })
}

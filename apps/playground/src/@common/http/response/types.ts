export const API_RESPONSE_ERROR = 'API_RESPONSE_ERROR'
export const API_RESPONSE_SUCCESS = 'API_RESPONSE_SUCCESS'

// RESULT_TYPES interface Merge
declare module ':/@common/result' {
  export interface RESULT_TYPES {
    API_RESPONSE_ERROR: typeof API_RESPONSE_ERROR
    API_RESPONSE_SUCCESS: typeof API_RESPONSE_SUCCESS
  }
}

export type ErrorCode = string
export type ErrorMessage = string

// module declare interface merge를 통해 확장됨
export interface RESULT_TYPES {}
export interface RESULT_CODES {}

interface CommonResult {
  // 종류
  type: RESULT_TYPES[keyof RESULT_TYPES]
  // type에 대한 코드
  code: RESULT_CODES[keyof RESULT_CODES] | unknown
  message?: unknown
}

export interface ResultSuccess extends CommonResult {
  data?: unknown
}

export interface ResultError extends CommonResult {
  data?: unknown
  err?: unknown
}

export type Result = ResultSuccess | ResultError

export const UNKNOWN_ERROR_TYPE = 'UNKNOWN_ERROR_TYPE'

declare module ':/@common/result' {
  export interface RESULT_TYPES {
    UNKNOWN_ERROR_TYPE: typeof UNKNOWN_ERROR_TYPE
  }
}

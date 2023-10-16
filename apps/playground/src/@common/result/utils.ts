import type { ResultError, ResultSuccess } from ':/@common/result/index'

export const resultError = <RE extends ResultError>(re: RE) => re
export const resultSuccess = <RE extends ResultSuccess>(re: RE) => re

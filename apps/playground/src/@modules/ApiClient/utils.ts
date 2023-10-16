import * as P from '@effect/data/Predicate'
import * as ReadonlyRecord from '@effect/data/ReadonlyRecord'

export function getNonNullableSearchParams(params: unknown) {
  if (!P.isRecord(params)) return new URLSearchParams()
  const stringRecord = ReadonlyRecord.filter(params, P.isString)
  return new URLSearchParams(stringRecord)
}

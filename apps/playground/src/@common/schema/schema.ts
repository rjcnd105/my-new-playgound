import { pipe } from '@effect/data/Function'
import * as Str from '@effect/data/String'
import * as S from '@effect/schema/Schema'

/**
 * 빈 문자열 스키마
 * @category primitives
 */
export const EmptyString = pipe(S.string, S.filter(Str.isEmpty))

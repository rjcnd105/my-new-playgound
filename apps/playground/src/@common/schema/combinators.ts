import * as S from '@effect/schema/Schema'

import { EmptyString } from ':/@common/schema/schema.ts'

/**
 * 스키마에 빈 문자열을 허용하게 합니다.
 * @category combinators
 */
export const allowEmptyString = <I, A>(schema: S.Schema<I, A>) => S.union(EmptyString, schema)

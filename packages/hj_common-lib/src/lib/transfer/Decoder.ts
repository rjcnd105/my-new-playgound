import { hasProperty } from 'effect/Predicate'

export interface DecoderImpl<A, B> {
  decode(a: B): A
}

export const hasDecode = hasProperty('decode')

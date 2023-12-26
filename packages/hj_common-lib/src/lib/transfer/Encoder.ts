import { hasProperty } from 'effect/Predicate'

export interface EncoderImpl<A, B> {
  encode(a: A): B
}

export const hasEncode = hasProperty('encode')

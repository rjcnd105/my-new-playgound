import { hasProperty } from 'effect/Predicate'

import type { ParserUnify } from '@/libs/Codec/Parser.ts'

export interface EncoderUnify<A, B> {
  encode: ParserUnify<A, B>
}

export const hasEncode = hasProperty('encode')

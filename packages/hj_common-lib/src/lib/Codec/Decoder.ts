import { hasProperty } from 'effect/Predicate'

import type { ParserUnify } from './Parser.ts'

export interface DecoderUnify<A, B> {
  decode: ParserUnify<B, A>
}

export const hasDecode = hasProperty('decode')

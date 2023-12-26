import { isObject } from 'effect/Predicate'

import type { DecoderImpl } from './Decoder.ts'
import type { EncoderImpl } from './Encoder.ts'

const TypeId: unique symbol = Symbol.for('@shared/transfer/Codec') as TypeId
export type TypeId = typeof TypeId

export interface CodecImpl<A = any, B = any> extends EncoderImpl<A, B>, DecoderImpl<A, B> {}

export interface Codec<out A, out B> extends CodecImpl<A, B> {
  readonly [TypeId]: {
    _A: (_: never) => A
    _B: (_: never) => B
  }

  encode(a: ReturnType<this[TypeId]['_A']>): ReturnType<this[TypeId]['_B']>
  decode(b: ReturnType<this[TypeId]['_B']>): ReturnType<this[TypeId]['_A']>

  forArray<A, B>(codec: Codec<A, B>): Codec<A[], B[]>
  inverse<A, B>(codec: Codec<A, B>): Codec<B, A>
}
const isCodecImpl = (codec: unknown): codec is CodecImpl =>
  isObject(codec) && 'encode' in codec && 'decode' in codec

const isCodec = (codec: unknown): codec is Codec<any, any> => isObject(codec) && TypeId in codec

export type CodecFrom<CodecT> = CodecT extends CodecImpl<infer A> ? A : never
export type CodecTo<CodecT> = CodecT extends CodecImpl<any, infer B> ? B : never

type StructCodecFrom<CodecT> = {
  [K in Exclude<keyof CodecT, TypeId>]: CodecFrom<CodecT[K]>
}

type StructCodecTo<CodecT> = {
  [K in Exclude<keyof CodecT, TypeId>]: CodecTo<CodecT[K]>
}

export const _makeCodecFromCodecImpl = <A, B>(codec: CodecImpl<A, B>): Codec<A, B> =>
  Object.assign(Object.create(CodecPrototype), codec)

export const _makeCodecFromStructCodec = <CodecT extends { [key: string]: CodecImpl }>(
  structCodec: CodecT,
) =>
  _makeCodecFromCodecImpl<StructCodecFrom<CodecT>, StructCodecTo<CodecT>>({
    encode: (a) => {
      const b: any = {}
      for (const key in a) {
        b[key] = structCodec[key].encode(a[key])
      }
      return b
    },
    decode: (b) => {
      const a: any = {}
      for (const key in b) {
        a[key] = structCodec[key].encode(a[key])
      }
      return a
    },
  })
export const _makeCodecForArray = <A, B>({ encode, decode }: CodecImpl<A, B>) =>
  _makeCodecFromCodecImpl<A[], B[]>({
    encode: (a) => a.map(encode),
    decode: (b) => b.map(decode),
  })

const _makeInverseCodec = <A, B>({ encode, decode }: CodecImpl<A, B>): Codec<B, A> =>
  codec.make({
    encode: decode,
    decode: encode,
  })

const _dummy = (_: never) => _

const CodecPrototype: Omit<Codec<unknown, unknown>, 'encode' | 'decode'> = {
  [TypeId]: { _A: _dummy, _B: _dummy },

  forArray<A, B>(this: Codec<A, B>) {
    return _makeCodecForArray<A, B>(this)
  },
  inverse<A, B>(this: Codec<A, B>) {
    return _makeInverseCodec<A, B>(this)
  },
}

const codec = {
  make: _makeCodecFromCodecImpl,
  makeStruct: _makeCodecFromStructCodec,
  makeArray: _makeCodecForArray,
  makeInverse: _makeInverseCodec,

  isCodec,
  isCodecImpl,
}

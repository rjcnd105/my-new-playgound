import { isObject } from 'effect/Predicate'
import type { Simplify } from 'effect/Types'

import type { DecoderImpl } from './Decoder'
import type { EncoderImpl } from './Encoder.ts'

const TypeId: unique symbol = Symbol.for('@shared/transfer/Codec') as TypeId
export type TypeId = typeof TypeId

export interface CodecImpl<A = any, B = any> extends EncoderImpl<A, B>, DecoderImpl<A, B> {}

export interface Codec<A, B> extends CodecImpl<A, B> {
  readonly [TypeId]: {
    _A: (_: never) => A
    _B: (_: never) => B
  }

  encode(a: A): B
  decode(b: B): A

  forArray<A, B>(this: Codec<A, B>): Codec<A[], B[]>
  inverse<A, B>(this: Codec<A, B>): Codec<B, A>
}

export const isCodecImpl = (codec: unknown): codec is CodecImpl =>
  isObject(codec) && 'encode' in codec && 'decode' in codec

export const isCodec = (codec: unknown): codec is Codec<any, any> =>
  isObject(codec) && TypeId in codec

export type CodecFrom<CodecT> = CodecT extends CodecImpl<infer A> ? A : never
export type CodecTo<CodecT> = CodecT extends CodecImpl<any, infer B> ? B : never

type StructCodecFrom<CodecT> = {
  [K in Exclude<keyof CodecT, TypeId>]: CodecFrom<CodecT[K]>
}

type StructCodecTo<CodecT> = {
  [K in Exclude<keyof CodecT, TypeId>]: CodecTo<CodecT[K]>
}

const _makeCodecFromCodecImpl = <A, B>(codec: CodecImpl<A, B>): Codec<A, B> =>
  Object.assign(Object.create(CodecPrototype), codec)

/**
 * struct 형태를 통해 각각의 프로퍼티에 코덱을 적용한다.
 */
const _makeCodecFromStructCodec = <CodecT extends { [key: string]: CodecImpl }>(
  structCodec: CodecT,
) =>
  _makeCodecFromCodecImpl<Simplify<StructCodecFrom<CodecT>>, Simplify<StructCodecTo<CodecT>>>({
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

/**
 * 코덱을 배열 전용으로 만든다.
 * @example
 * const mycodec = codec.makeArray({
 *  encode: (a: number) => `myData-${a}`,
 *  decode: (b) => parseInt(b.split('myData-')[1]),
 * })
 * const encodeData = mycodec.encode([1, 2, 3])
 * // [ 'myData-1', 'myData-2', 'myData-3' ]
 */
const _makeCodecForArray = <A, B>({ encode, decode }: CodecImpl<A, B>) =>
  _makeCodecFromCodecImpl<A[], B[]>({
    encode: (a) => a.map(encode),
    decode: (b) => b.map(decode),
  })

/**
 * 인코더와 디코더를 바꾼 새로운 코덱을 만든다.
 */
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

/**
 * From에 대한 타입을 미리 바인딩 시킨다.
 */
const _makeFromBound =
  <A>() =>
  <B>(_codec: CodecImpl<A, B>) =>
    _makeCodecFromCodecImpl(_codec)

export const codec = {
  make: _makeCodecFromCodecImpl,
  makeStruct: _makeCodecFromStructCodec,
  makeArray: _makeCodecForArray,
  makeInverse: _makeInverseCodec,
  makeFromBound: _makeFromBound,

  isCodec,
  isCodecImpl,
}

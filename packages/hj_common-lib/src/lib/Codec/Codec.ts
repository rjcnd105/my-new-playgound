import { isObject, isTagged } from 'effect/Predicate'
import type { Simplify } from 'effect/Types'

import type { DecoderUnify } from './Decoder.ts'
import type { EncoderUnify } from './Encoder.ts'

/**
 * Codec는 인코더와 디코더를 가지고 있습니다.
 * 그로 인해 데이터의 변환과 역변환을 통한 복구를 할 수 있습니다.
 * 구조체, array 형태로 쉽게 확장 가능하게 만들었습니다.
 *
 * 도메인을 타입 단위로 관리한다면
 * 코덱을 통해 변환된 타입이 프론트에서의 도메인 타입이 될 것이며
 * 변환되기 전의 타입은 백엔드에서의 도메인 타입이 될 것입니다.
 */
const Tag = 'libs/Codec'
export type Tag = typeof Tag

export type CodecUnify<A = any, B = any> = EncoderUnify<A, B> &
  DecoderUnify<A, B>

export interface Codec<A = any, B = any> extends CodecUnify<A, B> {
  readonly _tag: Tag

  forArray(this: Codec<A, B>): Codec<A[], B[]>
  inverse(this: Codec<A, B>): Codec<B, A>
}

export module Codec {
  export type From<CodecT> = CodecT extends CodecUnify<infer A> ? A : never
  export type To<CodecT> = CodecT extends CodecUnify<any, infer B> ? B : never

  export type StructFrom<T> = Simplify<{
    [K in Exclude<keyof T, '_tag'>]: T[K] extends CodecUnify ? From<T[K]> : T[K]
  }>
  export type StructTo<T> = Simplify<{
    [K in Exclude<keyof T, '_tag'>]: T[K] extends CodecUnify ? To<T[K]> : T[K]
  }>
}

export const isCodecUnify = (codec: unknown): codec is CodecUnify =>
  isObject(codec) && 'encode' in codec && 'decode' in codec

export const isCodec = (codec: unknown): codec is Codec<any, any> =>
  isTagged(codec, '_tag')

const makeCodecFromCodecUnify = <A, B>(codec: CodecUnify<A, B>): Codec<A, B> =>
  Object.assign(Object.create(CodecPrototype), codec, { _tag: Tag })

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
const makeCodecForArray = <A, B>({ encode, decode }: CodecUnify<A, B>) =>
  makeCodecFromCodecUnify<A[], B[]>({
    encode: (a) => a.map(encode),
    decode: (b) => b.map(decode),
  })

/**
 * 인코더와 디코더를 바꾼 새로운 코덱을 만든다.
 */
const makeInverseCodec = <A, B>({
  encode,
  decode,
}: CodecUnify<A, B>): Codec<B, A> =>
  makeCodecFromCodecUnify({
    encode: decode,
    decode: encode,
  })

const CodecPrototype: Omit<
  CodecUnify<unknown, unknown>,
  'encode' | 'decode' | '_tag'
> = {
  forArray<A, B>(this: Codec<A, B>) {
    return makeCodecForArray<A, B>(this)
  },
  inverse<A, B>(this: Codec<A, B>) {
    return makeInverseCodec<A, B>(this)
  },
}

/**
 * struct 형태를 통해 각각의 프로퍼티에 코덱을 적용한다.
 * @example
 * const structCodec = codec.makeStruct({
 *   a: myCodecA,
 *   b: myCodecB,
 * })
 */
const makeCodecFromStructCodec = <
  CodecT extends Record<string, CodecUnify>,
  NonCodecT = {},
>(
  structCodec: CodecT,
) => {
  const codecKeys = new Set(Object.keys(structCodec))

  return makeCodecFromCodecUnify({
    encode(a: Codec.StructFrom<CodecT>) {
      const b: any = {}
      // @ts-ignore
      for (const [key, value] of Object.entries(a)) {
        const isPropertyCodec = codecKeys.has(key)

        if (isPropertyCodec) {
          const codec = structCodec[key]
          b[key] = codec.encode(value)
        } else {
          b[key] = value
        }
      }
      return b
    },
    decode(b: Codec.StructTo<CodecT>) {
      const a: any = {}
      // @ts-ignore
      for (const [key, value] of Object.entries(b)) {
        const isPropertyCodec = codecKeys.has(key)

        if (isPropertyCodec) {
          const codec = structCodec[key]
          a[key] = codec.decode(value)
        } else {
          a[key] = value
        }
      }
      return a
    },
  }) as Codec<
    Codec.StructFrom<CodecT & NonCodecT>,
    Codec.StructTo<CodecT & NonCodecT>
  >
}

const makeStructFromBoundedA =
  <A>() =>
  <CodecT extends Record<string, CodecUnify>>(structCodec: CodecT) =>
    makeCodecFromStructCodec<CodecT, A>(structCodec)

/**
 * From에 대한 타입을 미리 바인딩 시킨다.
 */
const makeFromBoundedA =
  <A>() =>
  <B>(_codec: CodecUnify<A, B>) =>
    makeCodecFromCodecUnify(_codec)

export module Codec {
  export const make = makeCodecFromCodecUnify
  export const makeStruct = makeCodecFromStructCodec
  export const makeArray = makeCodecForArray
  export const makeInverse = makeInverseCodec
  export const makeStructFromA = makeStructFromBoundedA
  export const makeFromA = makeFromBoundedA
}

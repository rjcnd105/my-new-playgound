import { describe, it } from 'vitest'

import { Codec } from './Codec.ts'

describe('codec test', () => {
  it('코덱 정의', async ({ expect }) => {
    const mycodec = Codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => Number(b.split('myData-')[1]),
    })

    const encodeData = mycodec.encode(1)

    expect(encodeData).toBe('myData-1')

    const restoreData = mycodec.decode(encodeData)

    expect(restoreData).toBe(1)

    const myCodecForInverse = mycodec.inverse()
    const encodeDataForInverse = myCodecForInverse.encode(`myData-1`)

    expect(encodeDataForInverse).toBe(1)

    console.log('encode after: ', encodeData)
    console.log('restore(decode) after: ', restoreData)
  })

  it('코덱을 배열 전용으로 변경', async ({ expect }) => {
    const mycodec = Codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => Number(b.split('myData-')[1]),
    })
    const myCodecForArray = mycodec.forArray()
    // or const myCodecForArray = codec.makeArray(mycodec)
    // or const myCodecForArray = codec.makeArray({ encode: ... , decode: ... })
    const encodeDataForArray = myCodecForArray.encode([1, 2, 3])

    expect(encodeDataForArray).toEqual(['myData-1', 'myData-2', 'myData-3'])

    // 2차원 배열 codec으로 만들려면 한번 더 해주면 됨
    const myCodecFor2DArray = myCodecForArray.forArray()
    const encodeDataFor2DArray = myCodecFor2DArray.encode([
      [1, 2],
      [3, 4],
    ])

    expect(encodeDataFor2DArray).toEqual([
      ['myData-1', 'myData-2'],
      ['myData-3', 'myData-4'],
    ])

    console.log('encode after: ', encodeDataFor2DArray)
    console.log(
      'restore(decode) after: ',
      myCodecFor2DArray.decode(encodeDataFor2DArray),
    )
  })

  it('구조체 코덱을 사용', async ({ expect }) => {
    const numToStrCodec = Codec.make({
      encode: (a: number) => `${a}`,
      decode: (b) => parseInt(b, 10),
    })

    const dateToStrCodec = Codec.make({
      encode: (a: Date) => a.toISOString(),
      decode: (b) => new Date(b),
    })

    const mycodec = Codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => Number(b.split('myData-')[1]),
    })
    const profileCodec = Codec.makeStruct({
      // 타입에 안전하게 다음과 같이 코덱으로 선언하고 만드는게 좋다.
      name: Codec.make<string, `userName-${string}`>({
        encode: (a) => `userName-${a}` as const,
        decode: (b) => b.split('userName-')[1],
      }),
      // 다음과 같이 코덱으로 선언하지 않고 만드는 것도 가능하다. 추천하진 않는다.
      gender: {
        encode: (a: 0 | 1 | 2) => {
          switch (a) {
            case 0:
              return 'none' as const
            case 1:
              return 'man' as const
            case 2:
              return 'woman' as const
            default:
              return 'none' as const
          }
        },
        decode(b: 'none' | 'man' | 'woman') {
          switch (b) {
            case 'none':
              return 0
            case 'man':
              return 1
            case 'woman':
              return 2
            default:
              return 0
          }
        },
      },
      // 기존의 코덱을 재활용 가능
      age: mycodec,
    })

    const myStructCodec = Codec.makeStruct({
      createAt: dateToStrCodec,
      profile: profileCodec,
    })

    const encodingData = myStructCodec.encode({
      createAt: new Date(),
      profile: {
        age: 32,
        gender: 1,
        name: 'hoejun',
      },
    })
    console.log('encodingData:', encodingData)
    // encodingData: {
    //   createAt: '2023-12-26T09:22:55.278Z',
    //   profile: { age: 'myData-32', gender: 'man', name: 'userName-hoejun' }
    // }

    // 마찬가지로 배열로 받게도 변환 가능
    const myStructCodecForArray = myStructCodec.forArray()

    const encodingDataForArray = myStructCodecForArray.encode([
      {
        createAt: new Date('1992.12.29'),
        profile: {
          age: 31,
          gender: 1,
          name: 'hoejun',
        },
      },
      {
        createAt: new Date('1996.07.30'),
        profile: {
          age: 27,
          gender: 2,
          name: 'suhyun',
        },
      },
    ])
  })
})

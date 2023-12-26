import { describe, it } from 'vitest'

import { codec } from './Codec'

describe('login api test', () => {
  it('코덱 정의', async ({ expect }) => {
    const mycodec = codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => parseInt(b.split('myData-')[1]),
    })

    const encodeData = mycodec.encode(1)
    console.log('encodeData:', encodeData)
    // encodeData: myData-1

    const restoreData = mycodec.decode(encodeData)
    console.log('restoreData:', restoreData)
    // restoreData: 1

    const myCodecForInverse = mycodec.inverse()
    const encodeDataForInverse = myCodecForInverse.encode(`myData-1`)
    console.log('encodeDataForInverse:', encodeDataForInverse)
    // encodeDataForInverse: 1
  })

  it('코덱을 배열 전용으로 변경', async ({ expect }) => {
    const mycodec = codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => parseInt(b.split('myData-')[1]),
    })
    const myCodecForArray = mycodec.forArray()
    // or const myCodecForArray = codec.makeArray(mycodec)
    // or const myCodecForArray = codec.makeArray({ ... })
    const encodeDataForArray = myCodecForArray.encode([1, 2, 3])
    console.log('encodeDataForArray:', encodeDataForArray)
    // [ 'myData-1', 'myData-2', 'myData-3' ]

    const myCodecFor2DArray = myCodecForArray.forArray()
    const encodeDataFor2DArray = myCodecFor2DArray.encode([
      [1, 2],
      [3, 4],
    ])
    console.log('encodeDataFor2DArray:', encodeDataFor2DArray)
    // [ [ 'myData-1', 'myData-2' ], [ 'myData-3', 'myData-4' ] ]
    // it('잘못 선언된 ApiSpec로 인한 스키마 변환 실패', async ({ expect }) => {}),
    //   it.fails('서버 에러로 인한 실패', async ({ expect }) => {})
  })

  it('구조체 코댁을 사용', async ({ expect }) => {
    const numToStrCodec = codec.make({
      encode: (a: number) => `${a}`,
      decode: (b) => parseInt(b, 10),
    })

    const dateToStrCodec = codec.make({
      encode: (a: Date) => a.toISOString(),
      decode: (b) => new Date(b),
    })

    const mycodec = codec.make({
      encode: (a: number) => `myData-${a}`,
      decode: (b) => parseInt(b.split('myData-')[1]),
    })
    const profileCodec = codec.makeStruct({
      // 타입에 안전하게 다음과 같이 코덱으로 선언하고 만드는게 좋다.
      name: codec.make<string, `userName-${string}`>({
        encode: (a) => `userName-${a}` as const,
        decode: (b) => b.split('userName-')[1],
      }),
      // 다음과 같이 코덱으로 선언하지 않고 만드는 것도 불가능한 것은 아니다. 추천하진 않는다.
      gender: {
        encode: (a: 0 | 1 | 2) => {
          switch (a) {
            case 0:
              return 'none' as const
            case 1:
              return 'man' as const
            case 2:
              return 'woman' as const
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
          }
        },
      },
      // 기존의 코덱을 재활용 가능
      age: mycodec,
    })

    const myStructCodec = codec.makeStruct({
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
      // copilot, please fill this
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
    console.log('encodingDataForArray:', encodingDataForArray)
    // encodingDataForArray: [
    //   {
    //     createAt: '1992-12-28T15:00:00.000Z',
    //     profile: { age: 'myData-31', gender: 'man', name: 'userName-hoejun' }
    //   },
    //   {
    //     createAt: '1996-07-29T15:00:00.000Z',
    //     profile: { age: 'myData-27', gender: 'woman', name: 'userName-suhyun' }
    //   }
    // ]
  })
})

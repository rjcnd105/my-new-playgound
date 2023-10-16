import * as S from '@effect/schema/Schema'
import { describe, it } from 'vitest'

import { makeApiClient } from ':/@modules/ApiClient/apiClient.ts'

import { apiRoute } from '../ApiRoute/apiRoute'

const { apiClient, axiosInstance } = makeApiClient({
  baseURL: 'https://api2-dev.mathflat.com',
  headers: {
    'x-platform': 'STUDENT',
  },
})

axiosInstance.defaults.timeout = 3000

describe('login api test', () => {
  const loginApiRoute = apiRoute({
    method: 'POST',
    path: 'login',
    data: S.struct({
      id: S.string,
      password: S.string,
    }),
    responseData: S.struct({
      id: S.string,
      userType: S.enums({ TEACHER: 'TEACHER', STUDENT: 'STUDENT' } as const),
      academyId: S.templateLiteral(S.literal('D'), S.string),
      relationId: S.templateLiteral(S.literal('T'), S.string),
      token: S.string,
    }),
    headers: {
      'x-my-header': 'test',
    },
  })

  it('스키마 성공', async ({ expect }) => {
    const login = apiClient(loginApiRoute)

    const loginResponseData = await login({
      data: {
        id: 'develop02',
        password: 'develop02',
      },
    })
    console.log('loginSuccess: ', loginResponseData)

    // expect(loginResponseData.kind).toBe(ResultTypes.API_RESPONSE_SUCCESS)
  })
  it('잘못 선언된 apiRoute로 인한 스키마 변환 실패', async ({ expect }) => {
    const wrongLoginApiRoute = apiRoute({
      method: 'POST',
      path: 'login',
      requestData: S.struct({
        id: S.string,
        password: S.string,
      }),
      responseData: S.struct({
        // 일부로 잘못 선언함
        idd: S.string,
        userType: S.enums({ TEACHER: 'TEACHER', STUDENT: 'STUDENT' }),
        academyId: S.templateLiteral(S.literal('D'), S.string),
        relationId: S.templateLiteral(S.literal('T'), S.string),
        token: S.string,
      }),
    })

    const wrongLoginResponseData = await apiClient(wrongLoginApiRoute)(
      {
        data: {
          id: 'develop02',
          password: 'develop02',
        },
      },
      { isDecodeResponse: true },
    ).catch(console.log)
  })
  it('서버 에러로 인한 실패', async ({ expect }) => {
    const failLogin = await apiClient(loginApiRoute)({
      data: {
        id: 'develop022222',
        password: 'develop02',
      },
    }).catch(console.log)
  })
})
